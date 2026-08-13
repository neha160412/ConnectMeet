import { useState, useContext } from "react";
import { Box, Paper } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

import LoginLeftPanel from "../components/LoginLeftPanel";
import LoginForm from "../components/LoginForm";

export default function Login() {

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = await loginUser(formData);

      login(data.user, data.token);

      toast.success("Login Successful");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Login Failed"
      );

    }

  };

  return (
    <>
      <ToastContainer />

      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg,#eef4ff,#dbe9ff)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
        }}
      >

        <Paper
          elevation={10}
          sx={{
            width: "100%",
            maxWidth: 1350,
            minHeight: 760,
            display: "flex",
            borderRadius: 5,
            overflow: "hidden",
          }}
        >

          <LoginLeftPanel />

          <LoginForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />

        </Paper>

      </Box>

    </>
  );
}