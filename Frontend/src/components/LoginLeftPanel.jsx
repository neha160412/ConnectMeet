import { Box, Typography, Paper } from "@mui/material";
import loginIllustration from "../assets/login-illustration.svg";
import { Videocam } from "@mui/icons-material";

export default function LoginLeftPanel() {
  return (
    <Box
      sx={{
        width: "55%",
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(135deg,#1565c0,#42a5f5)",
        color: "white",
        p: 6,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating Circles */}

      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -80,
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: "rgba(255,255,255,.08)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: -70,
          left: -70,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "rgba(255,255,255,.08)",
        }}
      />

      {/* Logo */}

      <Box
  sx={{
    display: "flex",
    alignItems: "center",
    gap: 1,
  }}
>
  <Videocam
    sx={{
      fontSize: 40,
      color: "#fff",
    }}
  />

  <Typography variant="h4" fontWeight="bold">
    ConnectMeet
  </Typography>
</Box>

      {/* Heading */}

      <Box>

        <Typography
  variant="h3"
  fontWeight="bold"
  lineHeight={1.2}
>
  Meet{" "}
  <span style={{ color: "#aee2ff" }}>
    Smarter.
  </span>

  <br />

  Collaborate{" "}
  <span style={{ color: "#aee2ff" }}>
    Better.
  </span>
</Typography>


        <Typography
  sx={{
    mt: 3,
    fontSize: 18,
    lineHeight: 1.7,
    opacity: 0.9,
    maxWidth: 470,
  }}
>
  Create secure meetings, invite participants,
  collaborate in real-time and stay connected
  from anywhere in the world.
</Typography>

      </Box>

      {/* Illustration */}

      <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    mt: 1,
    mb: 2,
  }}
>
        <img
          src={loginIllustration}
          alt="Meeting"
          style={{
            width: "100%",
            maxWidth: 500,
          }}
        />
      </Box>

      {/* Features */}

      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        {[
          ["🔒", "Secure"],
          ["👥", "Collaborate"],
          ["⚡", "Reliable"],
        ].map((item) => (
          <Paper
            key={item[1]}
            sx={{
              flex: 1,
              p: 2,
              borderRadius: 3,
              background: "rgba(255,255,255,.15)",
              color: "white",
              textAlign: "center",
            }}
          >
            <Typography fontSize={30}>
              {item[0]}
            </Typography>

            <Typography fontWeight="bold">
              {item[1]}
            </Typography>

          </Paper>
        ))}
      </Box>

    </Box>
  );
}