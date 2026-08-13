import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { forgotPassword } from "../services/authService";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const data = await forgotPassword(email);

      toast.success(
        data.message || "Reset link sent to your email"
      );

      setEmail("");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to send reset link"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg,#eef4ff,#dbe9ff)",
          p: 3,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            width: "100%",
            maxWidth: 450,
            p: 5,
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            textAlign="center"
            mb={2}
          >
            🎥 ConnectMeet
          </Typography>

          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            mb={1}
          >
            Forgot Password?
          </Typography>

          <Typography
            color="text.secondary"
            textAlign="center"
            mb={4}
          >
            Enter your registered email and we'll send you
            a password reset link.
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
              sx={{
                borderRadius: 3,
                py: 1.5,
                textTransform: "none",
              }}
            >
              {loading
                ? "Sending..."
                : "Send Reset Link"}
            </Button>
          </form>

          <Button
            fullWidth
            sx={{
              mt: 2,
              textTransform: "none",
            }}
            onClick={() => navigate("/")}
          >
            ← Back to Login
          </Button>
        </Paper>
      </Box>
    </>
  );
}