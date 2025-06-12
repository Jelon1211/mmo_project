import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Połącz z serwerem WebSocket</h1>
    <button id="connectBtn">Połącz</button>
    <div id="log"></div>
  </div>
`;

const log = (msg: string) => {
  console.log(msg);
  const logDiv = document.getElementById("log");
  if (logDiv) {
    const p = document.createElement("p");
    p.textContent = msg;
    logDiv.appendChild(p);
  }
};

document.getElementById("connectBtn")?.addEventListener("click", () => {
  const ws = new WebSocket("ws://localhost:3000");

  ws.onopen = () => {
    log("✅ Połączono z serwerem WebSocket");
    ws.send("Wiadomość testowa z klienta");
  };

  ws.onmessage = (event) => {
    // log(`📨 Odebrano: ${event.data}`);
  };

  ws.onclose = () => {
    log("❌ Rozłączono z serwerem WebSocket");
  };

  ws.onerror = (err) => {
    log("⚠️ Błąd połączenia WebSocket");
    console.error(err);
  };
});
