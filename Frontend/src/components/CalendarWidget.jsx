import { Card, Typography } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function CalendarWidget() {
  return (
    <Card
      sx={{
        borderRadius: "24px",
        p: 2,
        background: "rgba(255,255,255,.65)",
        backdropFilter: "blur(18px)",
        boxShadow: "0 12px 30px rgba(0,0,0,.08)",
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={2}
      >
        📅 Calendar
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar />
      </LocalizationProvider>
    </Card>
  );
}