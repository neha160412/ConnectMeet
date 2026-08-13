import { useState, useContext } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

import { createMeeting } from "../services/meetingService";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function CreateMeeting() {

  const { token } = useContext(AuthContext);

  const [meetingTitle, setMeetingTitle] = useState("");

  const handleSubmit = async () => {

    if (!meetingTitle.trim()) {
      toast.error("Please enter a meeting title");
      return;
    }

    try {

      const res = await createMeeting(
        { meetingTitle },
        token
      );

      toast.success(res.message);

      setMeetingTitle("");

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Something went wrong"
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
            📅 Create Meeting
          </Typography>

          <Typography
            align="center"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Schedule a new meeting for your team.
          </Typography>

          <TextField
            fullWidth
            label="Meeting Title"
            value={meetingTitle}
            onChange={(e) => setMeetingTitle(e.target.value)}
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
            Create Meeting
          </Button>
        </Paper>
      </Box>
    </>
  );
}