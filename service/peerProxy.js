// service/peerProxy.js
const { WebSocketServer, WebSocket } = require('ws');

function peerProxy(httpServer) {
  // Attach a WebSocket server to the existing HTTP server
  const socketServer = new WebSocketServer({ server: httpServer });

  socketServer.on('connection', (socket) => {
    socket.isAlive = true;

    // Forward messages to everyone except the sender
    socket.on('message', (data) => {
      socketServer.clients.forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });

    // Mark connection as alive when we get a pong
    socket.on('pong', () => {
      socket.isAlive = true;
    });
  });

  // Periodically ping each client to ensure it is still alive
  setInterval(() => {
    socketServer.clients.forEach((client) => {
      if (client.isAlive === false) {
        return client.terminate();
      }

      client.isAlive = false;
      client.ping();
    });
  }, 10000);
}

module.exports = { peerProxy };
