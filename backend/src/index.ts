import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    console.log(`Otrzymano wiadomość od gracza: ${data}`);
  });

  ws.on("close", () => {
    console.log(`Gracz rozłączony`);
  });
});

setInterval(() => {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send("tesr");
    }
  });
}, 50);
