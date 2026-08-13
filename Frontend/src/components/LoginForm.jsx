import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import {
  Link,
  useNavigate,
} from "react-router-dom";

export default function LoginForm({
  handleSubmit,
  handleChange,
  showPassword,
  setShowPassword,
}) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "45%" },
        p: 7,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h3" fontWeight="bold">
        Welcome Back 👋
      </Typography>

      <Typography sx={{ mt: 2, mb: 5 }}>
        Login to continue using ConnectMeet.
      </Typography>

      <form onSubmit={handleSubmit}>

        {/* Email */}

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          name="email"
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />

        {/* Password */}

        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),

            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Forgot Password */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 1,
            mb: 2,
          }}
        >
          <Button
            variant="text"
            onClick={() => navigate("/forgot-password")}
            sx={{
              textTransform: "none",
              fontSize: "14px",
            }}
          >
            Forgot Password?
          </Button>
        </Box>

        {/* Login */}

        <Button
          fullWidth
          variant="contained"
          type="submit"
          sx={{
            mt: 4,
            py: 1.7,
            borderRadius: 3,
            fontWeight: "bold",
          }}
        >
          Login
        </Button>

      </form>

      {/* Register */}

      <Typography
        align="center"
        sx={{ mt: 4 }}
      >
        Don't have an account?

        <Link
          to="/register"
          style={{
            marginLeft: 5,
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Register
        </Link>
      </Typography>

    </Box>
  );
}