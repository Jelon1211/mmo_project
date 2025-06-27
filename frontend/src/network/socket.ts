export class WebSocketClient {
  private static instance: WebSocketClient;
  private socket: WebSocket;
  public isConnected: boolean = false;

  private constructor(url: string) {
    this.socket = new WebSocket(url);
    this.init();
  }

  public static getInstance(): WebSocketClient {
    if (!WebSocketClient.instance) {
      WebSocketClient.instance = new WebSocketClient("ws://localhost:3000");
    }

    return WebSocketClient.instance;
  }

  private init(): void {
    this.socket.onopen = () => {
      this.onOpenConnection();
      this.isConnected = true;
    };

    this.socket.onmessage = () => {
      this.onMessage();
    };

    this.socket.onclose = () => {
      this.onCloseConnection();
      this.isConnected = false;
    };

    this.socket.onerror = () => {
      this.onError();
    };
  }

  private onOpenConnection(): void {
    console.log("✅ Połączono z WebSocket");
  }

  private onMessage(): void {
    console.log("Message!");
  }

  private onCloseConnection(): void {
    console.log("❌ Połączenie zakończone");
  }

  private onError(): void {
    console.log("⚠️ Błąd WebSocket");
  }
}
