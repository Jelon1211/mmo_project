export function drawGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  tileSize: number
) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "red";
  ctx.lineWidth = 1;

  const cols = width / tileSize;
  const rows = height / tileSize;

  for (let x = 0; x <= cols; x++) {
    ctx.beginPath();
    ctx.moveTo(x * tileSize, 0);
    ctx.lineTo(x * tileSize, height);
    ctx.stroke();
  }

  for (let y = 0; y <= rows; y++) {
    ctx.beginPath();
    ctx.moveTo(0, y * tileSize);
    ctx.lineTo(width, y * tileSize);
    ctx.stroke();
  }
}
