import {
  Card,
  Typography,
  Box,
  Chip,
  Button,
} from "@mui/material";

export default function RecentMeetings({ meetings = [] }) {
  return (
    <Card
      sx={{
        mt: 3,
        borderRadius: "24px",
        p: 3,
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
        📋 Recent Meetings
      </Typography>

      {meetings.length === 0 ? (
        <Typography color="text.secondary">
          No meetings found.
        </Typography>
      ) : (
        meetings.slice(0, 5).map((meeting) => (
          <Box
            key={meeting._id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              p: 2,
              borderRadius: 3,
              background: "#f8f9fd",
            }}
          >
            <Box>
              <Typography fontWeight="bold">
                {meeting.meetingTitle}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Code: {meeting.meetingCode}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Chip
                label={meeting.status}
                color="success"
                size="small"
              />

              <Button
                variant="contained"
                size="small"
                sx={{ textTransform: "none" }}
              >
                Details
              </Button>
            </Box>
          </Box>
        ))
      )}
    </Card>
  );
}