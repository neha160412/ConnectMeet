import {
  Dashboard,
  VideoCall,
  CalendarMonth,
  Groups,
  Analytics,
  Settings,
  Logout,
} from "@mui/icons-material";

import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";



import { useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();
  const menus = [
  {
    name: "Dashboard",
    icon: <Dashboard />,
    path: "/dashboard",
  },
  {
    name: "Meetings",
    icon: <VideoCall />,
    path: "/my-meetings",
  },
  
  {
name:"Calendar",
icon:<CalendarMonth/>,
path:"/calendar",
},

{
name:"Teams",
icon:<Groups/>,
path:"/teams",
},

{
name:"Analytics",
icon:<Analytics/>,
path:"/analytics",
},

{
name:"Settings",
icon:<Settings/>,
path:"/settings",
},
];

  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        background: "rgba(255,255,255,.55)",
        backdropFilter: "blur(18px)",
        borderRight: "1px solid rgba(255,255,255,.35)",
        p: 3,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        color="primary"
        mb={5}
      >
        🎥 ConnectMeet
      </Typography>

      <List>
        {menus.map((item) => (
          <ListItemButton
  key={item.name}
  onClick={() => navigate(item.path)}
            sx={{
              mb: 1,
              borderRadius: 3,
              "&:hover": {
                background: "#1976d2",
                color: "white",
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>

            <ListItemText primary={item.name} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

     <ListItemButton
  onClick={() => navigate("/")}
>
  <ListItemIcon>
    <Logout />
  </ListItemIcon>

  <ListItemText primary="Logout" />
</ListItemButton>
    </Box>
  );
}