import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

import { AuthContext } from "../context/AuthContext";

import {
  getMeetingDetails,
  updateMeeting,
} from "../services/meetingService";

import { toast } from "react-toastify";

export default function EditMeeting() {

  const { id } = useParams();

  const navigate = useNavigate();

  const { token } = useContext(AuthContext);

  const [meetingTitle, setMeetingTitle] =
    useState("");

  useEffect(() => {
    loadMeeting();
  }, []);

  const loadMeeting = async () => {

    const res = await getMeetingDetails(
      id,
      token
    );

    setMeetingTitle(res.meeting.meetingTitle);

  };

  const handleUpdate = async () => {

    try {

      await updateMeeting(
        id,
        { meetingTitle },
        token
      );

      toast.success("Meeting Updated");

      navigate("/my-meetings");

    } catch {

      toast.error("Update Failed");

    }

  };

  return (

    <Box sx={{ p: 5 }}>

      <Card
        sx={{
          maxWidth: 600,
          margin: "auto",
          borderRadius: 4,
        }}
      >

        <CardContent>

          <Typography
            variant="h4"
            gutterBottom
          >
            Edit Meeting
          </Typography>

          <TextField
            fullWidth
            label="Meeting Title"
            value={meetingTitle}
            onChange={(e) =>
              setMeetingTitle(e.target.value)
            }
            sx={{ mt: 3 }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 4 }}
            onClick={handleUpdate}
          >
            Update Meeting
          </Button>

        </CardContent>

      </Card>

    </Box>

  );

}