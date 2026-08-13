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
} from "@mui/material";

export default function MeetingCard({ meeting }) {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

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
      toast.error("Delete Failed");
    }
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
        <Typography
          variant="h5"
          fontWeight="bold"
        >
          {meeting.meetingTitle}
        </Typography>

        <Typography sx={{ mt: 2 }}>
          <strong>Meeting Code:</strong>{" "}
          {meeting.meetingCode}
        </Typography>

        <Typography sx={{ mt: 1 }}>
          <strong>Status:</strong>
        </Typography>

        <Chip
          label={meeting.status}
          color={
            meeting.status === "active"
              ? "success"
              : "primary"
          }
          sx={{ mt: 1 }}
        />

        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 3 }}
        >
          <Button
            variant="contained"
            onClick={() =>
              navigate(`/meeting/${meeting._id}`)
            }
          >
            Details
          </Button>

          <Button
            variant="outlined"
            onClick={() =>
              navigate(`/edit-meeting/${meeting._id}`)
            }
          >
            Edit
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}