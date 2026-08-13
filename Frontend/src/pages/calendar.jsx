import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function Calendar() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        📅 Meeting Calendar
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar />
              </LocalizationProvider>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 4, p: 2 }}>
            <Typography variant="h6" mb={2}>
              Today's Schedule
            </Typography>

            <Typography>• Placement Discussion - 10:00 AM</Typography>
            <Typography>• Team Sync - 2:00 PM</Typography>
            <Typography>• Interview Prep - 6:00 PM</Typography>

            <Button
              variant="contained"
              sx={{ mt: 3 }}
            >
              Create Meeting
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}