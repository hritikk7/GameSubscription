const http = require("http");
const socketIo = require("socket.io");
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const teamRoutes = require("./routes/teamRoutes");
const matchRoutes = require("./routes/matchRoutes");
const playerRoutes = require("./routes/playerRoutes");
const scoreRoutes = require("./routes/scoreRoutes");
const verifyToken = require("./middlewares/auth/authMiddleWare");
const connectDb = require("./db/db");
const port = process.env.PORT || 5000;
const { setSocketIoInstance } = require("./controllers/socketController");

connectDb();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Origin",
    "X-Requested-With",
    "Accept",
    "x-client-key",
    "x-client-token",
    "x-client-secret",
    "Authorization",
  ],
};

//Initialized express app
const app = express();

// Cors
app.use(cors(corsOptions));

//Middlewares
app.use(express.json());

//test Route
app.get("/", (req, res) => {
  res.send("working");
});

// Create HTTP server
const server = http.createServer(app);

// Create Socket.IO server and attach it to HTTP server
const io = socketIo(server, { cors: corsOptions });

io.on("connection", (socket) => {
  console.log("New client connected");

  // Listening for joinRoom event to join a room
  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`Client joined room: ${room}`);
  });
  //subscribe //teamiD as room
  socket.on("subscribe", (room) => {
    socket.join(room);
    console.log(`Client joined room: ${room}`);
  });

  // Listening for leaveRoom event to leave a room
  socket.on("leaveRoom", (room) => {
    socket.leave(room);
    console.log(`Client left room: ${room}`);
  });

  // Listening for sendMessage event to send a message to a specific room
  socket.on("sendMessage", ({ room, message }) => {
    io.to(room).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

setSocketIoInstance(io);

//apis
app.use("/api/user", userRoutes);
app.use("/api/teams", verifyToken, teamRoutes);
app.use("/api/match", verifyToken, matchRoutes);
app.use("/api/player", verifyToken, playerRoutes);
app.use("/api/score", verifyToken, scoreRoutes);

server.listen(port, () => {
  console.log("Listening on port:", port);
});
