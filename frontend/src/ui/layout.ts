import { drawPlayers } from "../game/darwPlayers";
import { drawGrid } from "../game/drawGrid";
import { connectToServer } from "../network/socket";

export function setupUI() {
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

  const logDiv = document.getElementById("log")!;
  const log = (msg: string) => {
    console.log(msg);
    const p = document.createElement("p");
    p.textContent = msg;
    logDiv.appendChild(p);
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
