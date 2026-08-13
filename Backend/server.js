require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  // Join meeting room
  socket.on("join-room", ({ roomId }) => {
    const room = io.sockets.adapter.rooms.get(roomId);
    const numberOfUsers = room ? room.size : 0;

    // Maximum 2 participants
    if (numberOfUsers >= 2) {
      socket.emit("room-full");
      return;
    }

    socket.join(roomId);

    const updatedRoom = io.sockets.adapter.rooms.get(roomId);
    const users = updatedRoom ? updatedRoom.size : 0;

    console.log(`👥 Room ${roomId} has ${users} user(s)`);

    if (users === 1) {
      socket.emit("room-joined", {
        role: "host",
      });
    }

    if (users === 2) {
      socket.emit("room-joined", {
        role: "participant",
      });

      socket.to(roomId).emit("user-joined");
    }
  });

  // WebRTC offer
  socket.on("offer", ({ roomId, offer }) => {
    socket.to(roomId).emit("offer", offer);
  });

  // WebRTC answer
  socket.on("answer", ({ roomId, answer }) => {
    socket.to(roomId).emit("answer", answer);
  });

  // ICE candidate
  socket.on("ice-candidate", ({ roomId, candidate }) => {
    socket.to(roomId).emit("ice-candidate", candidate);
  });

  // Leave meeting
  socket.on("leave-room", ({ roomId }) => {
    socket.leave(roomId);

    socket.to(roomId).emit("user-left");
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 ConnectMeet server running on port ${PORT}`);
});