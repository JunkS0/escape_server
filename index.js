const WebSocket = require('ws');
const http = require('http');

// Render는 포트를 환경 변수로 제공하므로 process.env.PORT를 써야 합니다.
const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("3D Escape Multiplayer Server is Running!");
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    // 받은 메시지를 보낸 사람을 제외한 모든 클라이언트에게 전달
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
      }
    });
  });
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
