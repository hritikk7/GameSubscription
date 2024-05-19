const http = require("http"); // Import http
const socketIo = require("socket.io");
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const teamRoutes = require("./routes/teamRoutes");
const verifyToken = require("./middlewares/auth/authMiddleWare");
const connectDb = require("./db/db");
const port = process.env.PORT || 5000; // Use logical OR instead of bitwise OR

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

const app = express();
// Cors
app.use(cors(corsOptions));

app.use(express.json());
app.get("/", (req, res) => {
  res.send("working");
});

// Create HTTP server
const server = http.createServer(app);

// Create Socket.IO server and attach it to HTTP server
const io = socketIo(server, { cors: corsOptions });

io.on("connection", (socket) => {
  console.log("New client connected ");
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
  socket.on("subscribeToTeam", (teamId) => {
    socket.join(teamId);
    console.log(`Client subscribed to team: ${teamId}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
app.use("/api/user", userRoutes);
app.use("/api/teams", verifyToken, teamRoutes);

server.listen(port, () => {
  console.log("Listening on port:", port);
});
