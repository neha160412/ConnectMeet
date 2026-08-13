import { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";

import Navbar from "../components/Navbar";
import MeetingCard from "../components/MeetingCard";

import { AuthContext } from "../context/AuthContext";
import { getMyMeetings } from "../services/meetingService";

export default function MyMeetings() {

  const { token } = useContext(AuthContext);

  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {

    try {

      const res = await getMyMeetings(token);

      setMeetings(res.meetings);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  return (
    <>
      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",
          background: "#f5f7fb",
          p: 4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          📋 My Meetings
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          View and manage all your meetings.
        </Typography>

        {
          loading ?

          (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 5
              }}
            >
              <CircularProgress />
            </Box>
          )

          :

          meetings.length === 0 ?

          (
            <Typography align="center">
              No meetings found.
            </Typography>
          )

          :

          (
            <Grid container spacing={3}>

              {
                meetings.map((meeting) => (

                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    key={meeting._id}
                  >
                    <MeetingCard
                      meeting={meeting}
                    />
                  </Grid>

                ))
              }

            </Grid>
          )

        }

      </Box>
    </>
  );

}