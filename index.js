const http = require("http");
const WebSocketServer = require("websocket").server;

const server = http.createServer((req, res) => {
  res.end("Hello World!");
});

const websocket = new WebSocketServer({
  httpServer: server,
});

websocket.on("request", (request) => {
  const connection = request.accept(null, request.origin);

  connection.on("open", (e) => console.log("Client connected"));

  connection.on("message", (message) => {
    console.log(`Received message ${message.utf8Data}`);
  });

  connection.on("close", (reasonCode, description) => {
    console.log("Client disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});

function sendevery5seconds() {
  setTimeout(() => {
    websocket.broadcast("Hello World!");
    sendevery5seconds();
  }, 5000);
}

sendevery5seconds();
