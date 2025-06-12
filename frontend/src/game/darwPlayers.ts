export function drawPlayers(
  ctx: CanvasRenderingContext2D,
  players: { x: number; y: number; color: string }[],
  tileSize: number
) {
  for (const { x, y, color } of players) {
    const centerX = x * tileSize + tileSize / 2;
    const centerY = y * tileSize + tileSize / 2;
    const radius = tileSize / 4;

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
