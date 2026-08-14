import { useState, useContext } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { toast, ToastContainer } from "react-toastify";

import { createMeeting } from "../services/meetingService";
import { AuthContext } from "../context/AuthContext";

export default function Calendar() {
  const { token } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const [meeting, setMeeting] = useState({
    meetingTitle: "",
    date: "",
    time: "",
    description: "",
  });

  const handleChange = (e) => {
    setMeeting({
      ...meeting,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateMeeting = async () => {
    // Check login token
    if (!token) {
      toast.error("Please login again.");
      return;
    }

    // Validate title
    if (!meeting.meetingTitle.trim()) {
      toast.error("Please enter a meeting title.");
      return;
    }

    // Validate date
    if (!meeting.date) {
      toast.error("Please select a date.");
      return;
    }

    // Validate time
    if (!meeting.time) {
      toast.error("Please select a time.");
      return;
    }

    try {
      console.log("Sending meeting:", meeting);

      const res = await createMeeting(meeting, token);

      console.log("Meeting API response:", res);

      toast.success(res.message || "Meeting created successfully!");

      setOpen(false);

      setMeeting({
        meetingTitle: "",
        date: "",
        time: "",
        description: "",
      });

    } catch (error) {
      console.error("Create meeting error:", error);

      toast.error(
        error.response?.data?.message ||
        "Failed to create meeting."
      );
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <ToastContainer />

      <Typography variant="h4" fontWeight="bold" mb={3}>
        📅 Meeting Calendar
      </Typography>

      <Grid container spacing={3}>

        {/* Calendar */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar />
              </LocalizationProvider>
            </CardContent>
          </Card>
        </Grid>

        {/* Today's Schedule */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 4, p: 2 }}>
            <Typography variant="h6" mb={2}>
              Today's Schedule
            </Typography>

            <Typography>
              • Placement Discussion - 10:00 AM
            </Typography>

            <Typography>
              • Team Sync - 2:00 PM
            </Typography>

            <Typography>
              • Interview Prep - 6:00 PM
            </Typography>

            <Button
              variant="contained"
              sx={{ mt: 3 }}
              onClick={() => setOpen(true)}
            >
              Create Meeting
            </Button>
          </Card>
        </Grid>

      </Grid>

      {/* Create Meeting Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Create New Meeting
        </DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            label="Meeting Title"
            name="meetingTitle"
            value={meeting.meetingTitle}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            type="date"
            label="Date"
            name="date"
            value={meeting.date}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            fullWidth
            type="time"
            label="Time"
            name="time"
            value={meeting.time}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            name="description"
            value={meeting.description}
            onChange={handleChange}
            margin="normal"
          />

        </DialogContent>

        <DialogActions>

          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleCreateMeeting}
          >
            Create Meeting
          </Button>

        </DialogActions>
      </Dialog>
    </Box>
  );
}