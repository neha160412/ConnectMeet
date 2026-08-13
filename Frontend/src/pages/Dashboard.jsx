import { useContext, useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

import { CalendarMonth, Groups, VideoCall, Today } from "@mui/icons-material";

import { AuthContext } from "../context/AuthContext";
import { getMyMeetings } from "../services/meetingService";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatsCard from "../components/StatsCard";
import CalendarWidget from "../components/CalendarWidget";
import UpcomingMeetings from "../components/UpcomingMeetings";
import RecentMeetings from "../components/RecentMeetings";

export default function Dashboard() {

  const { user, token } = useContext(AuthContext);

  const [meetings, setMeetings] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const res = await getMyMeetings(token);
      setMeetings(res.meetings);
    } catch (err) {
      console.log(err);
    }
  };

  return (

    <Box
      sx={{
        display: "flex",
        background:
          "linear-gradient(135deg,#edf4ff,#dfeeff)",
        minHeight: "100vh",
      }}
    >

      <Sidebar />

      <Box
        sx={{
          flex: 1,
          p: 4,
        }}
      >

      <Topbar
  search={search}
  setSearch={setSearch}
/>

        <Typography
          variant="h4"
          fontWeight="bold"
          mb={1}
        >
          👋 Welcome Back, {user?.fullName}
        </Typography>

        <Typography
          color="text.secondary"
          mb={4}
        >
          Manage your meetings easily with ConnectMeet.
        </Typography>

        {/* Statistics */}

        <Grid container spacing={3}>

          <Grid item xs={12} md={3}>
            <StatsCard
              title="Total Meetings"
              value={meetings.length}
              icon={<CalendarMonth />}
              color="#1976d2"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <StatsCard
              title="Joined"
              value={
                meetings.filter(
                  (m) => m.participants?.length > 0
                ).length
              }
              icon={<Groups />}
              color="#43a047"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <StatsCard
              title="Active"
              value={
                meetings.filter(
                  (m) => m.status === "active"
                ).length
              }
              icon={<VideoCall />}
              color="#fb8c00"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <StatsCard
              title="Today"
              value={meetings.length}
              icon={<Today />}
              color="#8e24aa"
            />
          </Grid>

        </Grid>

        {/* Calendar + Upcoming */}

        <Grid
          container
          spacing={3}
          sx={{ mt: 2 }}
        >

          <Grid item xs={12} md={5}>
            <CalendarWidget />
          </Grid>

          <Grid item xs={12} md={7}>
            <UpcomingMeetings
              meetings={meetings.filter((meeting) =>
  meeting.meetingTitle
    .toLowerCase()
    .includes(search.toLowerCase())
)}
            />
          </Grid>

        </Grid>

        <RecentMeetings
          meetings={meetings.filter((meeting) =>
  meeting.meetingTitle
    .toLowerCase()
    .includes(search.toLowerCase())
)}
        />

      </Box>

    </Box>

  );
}