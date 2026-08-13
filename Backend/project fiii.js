const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const authRoutes=require("./routes/authRoutes");

app.use("/api/auth",authRoutes);

// Default Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to ConnectMeet API 🚀"
  });
});

module.exports = app;