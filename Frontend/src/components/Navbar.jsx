import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        background: "#ffffff",
        color: "#222",
      }}
    >
      <Toolbar>

        <MeetingRoomIcon
          sx={{
            color: "#1976d2",
            mr: 1
          }}
        />

        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            color: "#1976d2"
          }}
        >
          ConnectMeet
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2
          }}
        >

          <AccountCircleIcon
            sx={{ color: "#555" }}
          />

          <Typography fontWeight="500">
            {user?.fullName}
          </Typography>

          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>

        </Box>

      </Toolbar>
    </AppBar>
  );
}