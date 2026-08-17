import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

import { joinMeeting } from "../services/meetingService";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function JoinMeeting() {

  const { token } = useContext(AuthContext);

  const navigate = useNavigate();

  const [meetingCode, setMeetingCode] = useState("");

 const handleSubmit = async () => {

  if (!meetingCode.trim()) {
    toast.error("Please enter a meeting code");
    return;
  }

  try {

    const res = await joinMeeting(
      { meetingCode: meetingCode.trim().toUpperCase() },
      token
    );

    toast.success(res.message || "Joined meeting successfully!");

    setMeetingCode("");

    // Open the meeting room
    navigate(`/meeting-room/${meetingCode.trim().toUpperCase()}`);

  } catch (error) {

    console.error("Join meeting error:", error);

    toast.error(
      error.response?.data?.message ||
      "Unable to join meeting"
    );

  }
};

  return (
    <>
      <Navbar />

      <ToastContainer />

      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f5f7fb",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: 450,
            padding: 4,
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            fontWeight="bold"
          >
            🤝 Join Meeting
          </Typography>

          <Typography
            align="center"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Enter the meeting code to join.
          </Typography>

          <TextField
            fullWidth
            label="Meeting Code"
            value={meetingCode}
            onChange={(e) => setMeetingCode(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.5,
              fontSize: 16,
            }}
            onClick={handleSubmit}
          >
            Join Meeting
          </Button>
        </Paper>
      </Box>
    </>
  );
}