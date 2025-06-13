import { WebSocketServer } from "ws";
import { randomUUID } from "crypto";
import { GameLoop } from "./engine/GameLoop";

const wss = new WebSocketServer({ port: 3000 });
const players = new Map(); // playerId => { x, y, color, ws }

// Kolory graczy do wyboru
const COLORS = ["blue", "red", "green", "orange", "purple"];

console.log("🎮 Serwer wystartował na porcie 3000");

wss.on("connection", (ws) => {
  const id = randomUUID();
  const x = Math.floor(Math.random() * 32);
  const y = Math.floor(Math.random() * 32);
  const color = COLORS[players.size % COLORS.length];

  players.set(id, { x, y, color, ws });

  console.log(`🧍 Gracz ${id} połączony na (${x},${y})`);

  ws.send(
    JSON.stringify({
      type: "welcome",
      id,
    })
  );

  ws.on("close", () => {
    console.log(`❌ Gracz ${id} rozłączony`);
    players.delete(id);
  });

  ws.on("message", (msg) => {
    console.log(`📨 ${id}: ${msg}`);
  });
});

const loop = new GameLoop(2000, () => {
  const allPlayers = [];

  for (const [id, player] of players) {
    allPlayers.push({
      id,
      x: player.x,
      y: player.y,
      color: player.color,
    });
  }

  const payload = JSON.stringify({
    type: "state",
    players: allPlayers,
  });

  for (const player of players.values()) {
    if (player.ws.readyState === 1) {
      player.ws.send(payload);
    }
  }
});

loop.start();
