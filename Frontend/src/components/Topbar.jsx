import {
  Search,
  NotificationsNone,
  AccountCircle,
} from "@mui/icons-material";

import {
  Box,
  Avatar,
  IconButton,
  TextField,
  Typography,
  InputAdornment,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Topbar({ search, setSearch }) {

    const navigate = useNavigate();

    const { user, logout } = useContext(AuthContext);

  

  return (

    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 4,
      }}
    >

      {/* Search */}

      <TextField
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search meetings..."
        sx={{
          width: 380,
          background: "white",
          borderRadius: "30px",

          "& fieldset": {
            border: "none",
          },
        }}

        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      {/* Right Section */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >

        <IconButton
          sx={{
            bgcolor: "white",
            boxShadow: 2,
          }}
        >
          <NotificationsNone />
        </IconButton>

        <Avatar
          sx={{
            bgcolor: "#1976d2",
          }}
        >
          <AccountCircle />
        </Avatar>

        <Box>

          <Typography fontWeight="bold">
            {user?.fullName}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Meeting Host
          </Typography>

        </Box>

        <Button
  variant="contained"
  color="error"
  sx={{
    borderRadius: 3,
    textTransform: "none",
  }}
  onClick={() => {
    logout();
    navigate("/");
  }}
>
  Logout
</Button>

      </Box>

    </Box>

  );

}