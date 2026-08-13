import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { ContentCopy } from "@mui/icons-material";

import {
  Box,
  Button,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";

import {
  Mic,
  MicOff,
  Videocam,
  VideocamOff,
  ScreenShare,
  CallEnd,
} from "@mui/icons-material";

const SOCKET_URL = "http://localhost:5000";

export default function MeetingRoom() {
  const { meetingCode } = useParams();
  const navigate = useNavigate();

  const socketRef = useRef(null);
  const peerConnectionRef = useRef(null);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const localStreamRef = useRef(null);
  const screenStreamRef = useRef(null);

  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [connected, setConnected] = useState(false);
  const [roomFull, setRoomFull] = useState(false);

  useEffect(() => {
    startMeeting();

    return () => {
      cleanup();
    };
  }, []);

  const startMeeting = async () => {
    try {
      // Get camera and microphone
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      localStreamRef.current = stream;

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Connect to Socket.IO
      const socket = io(SOCKET_URL);

      socketRef.current = socket;

      // Create WebRTC connection
      const peerConnection = new RTCPeerConnection({
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302",
          },
        ],
      });

      peerConnectionRef.current = peerConnection;

      // Add camera and microphone tracks
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });

      // Receive remote stream
      peerConnection.ontrack = (event) => {
  const remoteStream = event.streams[0];

  // Make sure we don't display our own stream
  if (
    remoteStream &&
    remoteStream.id !== localStreamRef.current?.id
  ) {
    console.log("🎥 Remote stream received:", remoteStream.id);

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }

    setConnected(true);
  }
};

      // Send ICE candidates
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", {
            roomId: meetingCode,
            candidate: event.candidate,
          });
        }
      };

      // Join Socket.IO room
      socket.emit("join-room", {
        roomId: meetingCode,
      });

      // Room is full
      socket.on("room-full", () => {
        setRoomFull(true);

        stream.getTracks().forEach((track) => {
          track.stop();
        });
      });

      // Second participant joined
      socket.on("user-joined", async () => {
        console.log("👤 Participant joined");

        const offer = await peerConnection.createOffer();

        await peerConnection.setLocalDescription(offer);

        socket.emit("offer", {
          roomId: meetingCode,
          offer,
        });
      });

      // Receive offer
      socket.on("offer", async (offer) => {
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(offer)
        );

        const answer = await peerConnection.createAnswer();

        await peerConnection.setLocalDescription(answer);

        socket.emit("answer", {
          roomId: meetingCode,
          answer,
        });
      });

      // Receive answer
      socket.on("answer", async (answer) => {
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
      });

      // Receive ICE candidate
      socket.on("ice-candidate", async (candidate) => {
        try {
          await peerConnection.addIceCandidate(
            new RTCIceCandidate(candidate)
          );
        } catch (error) {
          console.log("ICE candidate error:", error);
        }
      });

      // Participant left
      socket.on("user-left", () => {
        setConnected(false);

        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = null;
        }
      });
    } catch (error) {
      console.error("Camera/Microphone error:", error);

      alert(
        "Please allow camera and microphone permissions to join the meeting."
      );
    }
  };

  // Microphone toggle
  const toggleMic = () => {
    if (!localStreamRef.current) return;

    const audioTrack =
      localStreamRef.current.getAudioTracks()[0];

    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setMicOn(audioTrack.enabled);
    }
  };

  // Camera toggle
  const toggleCamera = () => {
    if (!localStreamRef.current) return;

    const videoTrack =
      localStreamRef.current.getVideoTracks()[0];

    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setCameraOn(videoTrack.enabled);
    }
  };

  // Start screen sharing
  const startScreenShare = async () => {
    try {
      const screenStream =
        await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });

      screenStreamRef.current = screenStream;

      const screenTrack =
        screenStream.getVideoTracks()[0];

      const sender =
        peerConnectionRef.current
          ?.getSenders()
          .find(
            (sender) =>
              sender.track &&
              sender.track.kind === "video"
          );

      if (sender) {
        await sender.replaceTrack(screenTrack);
      }

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = screenStream;
      }

      setScreenSharing(true);

      screenTrack.onended = () => {
        stopScreenShare();
      };
    } catch (error) {
      console.log("Screen sharing cancelled");
    }
  };

  // Stop screen sharing
  const stopScreenShare = async () => {
    if (!screenStreamRef.current) return;

    screenStreamRef.current
      .getTracks()
      .forEach((track) => track.stop());

    const cameraTrack =
      localStreamRef.current?.getVideoTracks()[0];

    const sender =
      peerConnectionRef.current
        ?.getSenders()
        .find(
          (sender) =>
            sender.track &&
            sender.track.kind === "video"
        );

    if (sender && cameraTrack) {
      await sender.replaceTrack(cameraTrack);
    }

    if (localVideoRef.current) {
      localVideoRef.current.srcObject =
        localStreamRef.current;
    }

    screenStreamRef.current = null;

    setScreenSharing(false);
  };

  // Leave meeting
  const leaveMeeting = () => {
    if (socketRef.current) {
      socketRef.current.emit("leave-room", {
        roomId: meetingCode,
      });
    }

    cleanup();

    navigate("/dashboard");
  };

  // Cleanup
  const cleanup = () => {
    if (localStreamRef.current) {
      localStreamRef.current
        .getTracks()
        .forEach((track) => track.stop());
    }

    if (screenStreamRef.current) {
      screenStreamRef.current
        .getTracks()
        .forEach((track) => track.stop());
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }

    if (socketRef.current) {
      socketRef.current.disconnect();
    }
  };

  // Full room screen
  if (roomFull) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          background: "#101114",
          color: "white",
        }}
      >
        <Typography variant="h4">
          Meeting Room is Full
        </Typography>

        <Typography>
          Only two participants are allowed in this meeting.
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#101114",
        color: "white",
        p: 3,
      }}
    >
      {/* Header */}

      <Typography
        variant="h5"
        fontWeight="bold"
        mb={1}
      >
        🎥 ConnectMeet
      </Typography>

      <Typography
        color="#aaa"
        mb={3}
      >
        Meeting Code: {meetingCode}
      </Typography>
      <Button
  variant="outlined"
  startIcon={<ContentCopy />}
  onClick={() => {
    const inviteLink = `${window.location.origin}/meeting-room/${meetingCode}`;

    navigator.clipboard.writeText(inviteLink);

    alert("Meeting invite link copied!");
  }}
  sx={{
    color: "white",
    borderColor: "#555",
    mb: 3,
    textTransform: "none",
  }}
>
  Copy Invite Link
</Button>

      {/* Videos */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr",
          },
          gap: 2,
        }}
      >
        {/* Local Video */}

        <Paper
          sx={{
            background: "#1c1d21",
            height: 400,
            overflow: "hidden",
            position: "relative",
            borderRadius: 3,
          }}
        >
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          <Typography
            sx={{
              position: "absolute",
              bottom: 15,
              left: 15,
              background: "rgba(0,0,0,.6)",
              px: 2,
              py: 1,
              borderRadius: 2,
            }}
          >
            You
          </Typography>
        </Paper>

        {/* Remote Video */}

        <Paper
          sx={{
            background: "#1c1d21",
            height: 400,
            overflow: "hidden",
            position: "relative",
            borderRadius: 3,
          }}
        >
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {!connected && (
            <Typography
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#aaa",
              }}
            >
              Waiting for participant...
            </Typography>
          )}

          <Typography
            sx={{
              position: "absolute",
              bottom: 15,
              left: 15,
              background: "rgba(0,0,0,.6)",
              px: 2,
              py: 1,
              borderRadius: 2,
            }}
          >
            Participant
          </Typography>
        </Paper>
      </Box>

      {/* Controls */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mt: 4,
        }}
      >
        {/* Microphone */}

        <IconButton
          onClick={toggleMic}
          sx={{
            background: micOn ? "#333" : "#d32f2f",
            color: "white",
            "&:hover": {
              background: micOn ? "#444" : "#b71c1c",
            },
          }}
        >
          {micOn ? <Mic /> : <MicOff />}
        </IconButton>

        {/* Camera */}

        <IconButton
          onClick={toggleCamera}
          sx={{
            background: cameraOn ? "#333" : "#d32f2f",
            color: "white",
            "&:hover": {
              background: cameraOn ? "#444" : "#b71c1c",
            },
          }}
        >
          {cameraOn ? (
            <Videocam />
          ) : (
            <VideocamOff />
          )}
        </IconButton>

        {/* Screen Share */}

        <IconButton
          onClick={
            screenSharing
              ? stopScreenShare
              : startScreenShare
          }
          sx={{
            background: screenSharing
              ? "#1976d2"
              : "#333",
            color: "white",
            "&:hover": {
              background: screenSharing
                ? "#1565c0"
                : "#444",
            },
          }}
        >
          <ScreenShare />
        </IconButton>

        {/* Leave */}

        <IconButton
          onClick={leaveMeeting}
          sx={{
            background: "#d32f2f",
            color: "white",
            px: 3,
            borderRadius: 3,
            "&:hover": {
              background: "#b71c1c",
            },
          }}
        >
          <CallEnd />
        </IconButton>
      </Box>
    </Box>
  );
}