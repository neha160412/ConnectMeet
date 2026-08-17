import { useNavigate } from "react-router-dom";
import { deleteMeeting } from "../services/meetingService";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  Box,
} from "@mui/material";

export default function MeetingCard({ meeting }) {

  const navigate = useNavigate();

  const { token, user } = useContext(AuthContext);

  // Check whether logged-in user is the host
  const isHost =
    meeting.host &&
    user &&
    String(meeting.host._id) === String(user._id);

  // Check whether logged-in user is a participant
  const isParticipant =
    meeting.participants?.some(
      (participant) =>
        String(participant._id) === String(user?._id)
    );

  const handleDelete = async () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this meeting?"
    );

    if (!confirmDelete) return;

    try {

      await deleteMeeting(meeting._id, token);

      toast.success("Meeting Deleted Successfully");

      window.location.reload();

    } catch (err) {

      console.error(err);

      toast.error(
        err.response?.data?.message || "Delete Failed"
      );

    }
  };

  const handleJoin = () => {

    navigate(
      `/meeting-room/${meeting.meetingCode}`
    );

  };

  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 4,
        boxShadow: 4,
      }}
    >

      <CardContent>

        {/* Meeting Title */}

        <Typography
          variant="h5"
          fontWeight="bold"
        >
          {meeting.meetingTitle}
        </Typography>


        {/* Host */}

        <Typography sx={{ mt: 2 }}>

          <strong>Host:</strong>{" "}

          {meeting.host?.fullName || "Unknown"}

        </Typography>


        {/* Your Role */}

        <Box sx={{ mt: 2 }}>

          <Chip
            label={
              isHost
                ? "👑 Host"
                : isParticipant
                ? "👤 Participant"
                : "Viewer"
            }
            color={
              isHost
                ? "primary"
                : isParticipant
                ? "success"
                : "default"
            }
          />

        </Box>


        {/* Meeting Code */}

        <Typography sx={{ mt: 2 }}>

          <strong>Meeting Code:</strong>{" "}

          {meeting.meetingCode}

        </Typography>


        {/* Status */}

        <Typography sx={{ mt: 1 }}>

          <strong>Status:</strong>

        </Typography>

        <Chip
          label={meeting.status}
          color={
            meeting.status === "ongoing"
              ? "success"
              : meeting.status === "completed"
              ? "default"
              : meeting.status === "cancelled"
              ? "error"
              : "primary"
          }
          sx={{ mt: 1 }}
        />


        {/* Participants */}

        <Typography sx={{ mt: 2 }}>

          <strong>Participants:</strong>{" "}

          {meeting.participants?.length || 0}

        </Typography>


        {/* Buttons */}

        <Stack
          direction="row"
          spacing={2}
          sx={{
            mt: 3,
            flexWrap: "wrap",
            gap: 1,
          }}
        >

          {/* Details - Everyone */}

          <Button
            variant="contained"
            onClick={() =>
              navigate(`/meeting/${meeting._id}`)
            }
          >
            Details
          </Button>


          {/* Join - Host and Participant */}

          {(isHost || isParticipant) && (
            <Button
              variant="contained"
              color="success"
              onClick={handleJoin}
            >
              Join Meeting
            </Button>
          )}


          {/* Edit - HOST ONLY */}

          {isHost && (
            <Button
              variant="outlined"
              onClick={() =>
                navigate(
                  `/edit-meeting/${meeting._id}`
                )
              }
            >
              Edit
            </Button>
          )}


          {/* Delete - HOST ONLY */}

          {isHost && (
            <Button
              color="error"
              variant="contained"
              onClick={handleDelete}
            >
              Delete
            </Button>
          )}

        </Stack>

      </CardContent>

    </Card>
  );
}