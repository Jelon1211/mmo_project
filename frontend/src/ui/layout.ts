import { drawPlayers } from "../game/darwPlayers";
import { drawGrid } from "../game/drawGrid";
import { connectToServer } from "../network/socket";
import { WebSocketClient } from "../network/socket__";

export function setupUI() {
  const webSocketInstance: WebSocketClient = WebSocketClient.getInstance();
  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.innerHTML = `
    <h1>Gra Canvas – wielu graczy</h1>
    <button id="startBtn">Start</button>
    <div id="log"></div>
    <canvas id="canvas"></canvas>
  `;

  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;
  canvas.width = 32 * 32;
  canvas.height = 32 * 32;

  const log = (msg: string) => {
    console.log(msg);
  };

  document.getElementById("startBtn")?.addEventListener("click", () => {
    drawGrid(ctx, canvas.width, canvas.height, 32);

    connectToServer(log, (players) => {
      // Czyścimy canvas i rysujemy od nowa
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid(ctx, canvas.width, canvas.height, 32);
      drawPlayers(ctx, players, 32);
    });
  });
}
