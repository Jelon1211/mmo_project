export class GameLoop {
  private interval: NodeJS.Timeout | null = null;
  private tickRate: number;
  private onTick: () => void;

  constructor(tickRateMs: number, onTick: () => void) {
    this.tickRate = tickRateMs;
    this.onTick = onTick;
  }

  start() {
    if (!this.interval) {
      this.interval = setInterval(this.onTick, this.tickRate);
      console.log("✅ Game loop started");
    }
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      console.log("🛑 Game loop stopped");
    }
  }

  isRunning() {
    return this.interval !== null;
  }
}
