import {
  Card,
  Typography,
  Box,
  Button,
  Chip,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function UpcomingMeetings({ meetings = [] }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        borderRadius: "24px",
        p: 3,
        height: "100%",
        background: "rgba(255,255,255,.65)",
        backdropFilter: "blur(18px)",
        boxShadow: "0 12px 30px rgba(0,0,0,.08)",
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={3}
      >
        ⏰ Upcoming Meetings
      </Typography>

      {meetings.length === 0 ? (
        <Typography color="text.secondary">
          No upcoming meetings
        </Typography>
      ) : (
        meetings.slice(0, 4).map((meeting) => (
          <Box
            key={meeting._id}
            sx={{
              mb: 2,
              p: 2,
              borderRadius: 3,
              background: "#f5f7fb",
            }}
          >
            <Typography fontWeight="bold">
              {meeting.meetingTitle}
            </Typography>

            <Chip
              label={meeting.status}
              size="small"
              color="primary"
              sx={{ mt: 1 }}
            />

            <Button
              variant="contained"
              sx={{
                mt: 2,
                ml: 1,
                borderRadius: 3,
                textTransform: "none",
              }}
              onClick={() =>
                navigate(`/meeting-room/${meeting.meetingCode}`)
              }
            >
              Join
            </Button>
          </Box>
        ))
      )}
    </Card>
  );
}