import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
} from "@mui/material";

import { AuthContext } from "../context/AuthContext";
import { getMeetingDetails } from "../services/meetingService";

export default function MeetingDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const { token } = useContext(AuthContext);

  const [meeting, setMeeting] = useState(null);

  useEffect(() => {
    fetchMeeting();
  }, []);

  const fetchMeeting = async () => {
    try {
      const res = await getMeetingDetails(id, token);
      setMeeting(res.meeting);
    } catch (err) {
      console.log(err);
    }
  };

  if (!meeting) {
    return (
      <Typography sx={{ p: 5 }}>
        Loading...
      </Typography>
    );
  }

  return (

    <Box sx={{ p: 5 }}>

      <Card
        sx={{
          maxWidth: 700,
          margin: "auto",
          borderRadius: 4,
          boxShadow: 5,
        }}
      >

        <CardContent>

          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
          >
            {meeting.meetingTitle}
          </Typography>

          <Typography sx={{ mt: 2 }}>
            <strong>Meeting Code:</strong>{" "}
            {meeting.meetingCode}
          </Typography>

          <Typography sx={{ mt: 2 }}>
            <strong>Status:</strong>
          </Typography>

          <Chip
            label={meeting.status}
            color="success"
            sx={{ mt: 1 }}
          />

          <Typography sx={{ mt: 3 }}>
            <strong>Participants:</strong>{" "}
            {meeting.participants?.length}
          </Typography>

          <Typography sx={{ mt: 2 }}>
            <strong>Created On:</strong>{" "}
            {new Date(meeting.createdAt).toLocaleDateString()}
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 4 }}
          >

            <Button
              variant="contained"
              onClick={() =>
                navigate(`/edit-meeting/${meeting._id}`)
              }
            >
              Edit
            </Button>

            <Button
              color="error"
              variant="contained"
            >
              Delete
            </Button>

            <Button
              variant="outlined"
              onClick={() =>
                navigate(-1)
              }
            >
              Back
            </Button>

          </Stack>

        </CardContent>

      </Card>

    </Box>

  );

}