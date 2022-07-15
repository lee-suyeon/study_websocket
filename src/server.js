import express from 'express';
import http from 'http';
import WebSocket from 'ws';

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

// http 서버에 접근
const server = http.createServer(app);
// http서버위에 websocket 서버 생성
const wss = new WebSocket.Server({ server });

const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  console.log("✅ Connected to Browser");
  socket.on("close", () => console.log("Disconnected from the Browser ❌"));
  socket.on("message", message => {
    sockets.forEach(aSocket => aSocket.send(message.toString()));
  });
});

server.listen(3000, handleListen);