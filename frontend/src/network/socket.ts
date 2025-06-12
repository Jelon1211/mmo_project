export function connectToServer(
  log: (msg: string) => void,
  onStateUpdate: (players: { x: number; y: number; color: string }[]) => void
) {
  const ws = new WebSocket("ws://localhost:3000");

  ws.onopen = () => {
    log("✅ Połączono z WebSocket");
  };

  ws.onmessage = (event) => {
    try {
      const msg = JSON.parse(event.data);

      if (msg.type === "welcome") {
        log(`🎉 Twój ID: ${msg.id}`);
      }

      if (msg.type === "state") {
        onStateUpdate(msg.players);
      }
    } catch (e) {
      console.error("Błąd parsowania wiadomości:", e);
    }
  };

  ws.onclose = () => log("❌ Połączenie zakończone");
  ws.onerror = (err) => {
    log("⚠️ Błąd WebSocket");
    console.error(err);
  };
}
