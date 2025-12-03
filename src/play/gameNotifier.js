// Types of trivia events we care about
const GameEvent = {
  System: 'system',
  Start: 'gameStart',
  Correct: 'answerCorrect',
  Wrong: 'answerWrong',
  End: 'gameEnd',
};

class EventMessage {
  constructor(from, type, value) {
    this.from = from;
    this.type = type;
    this.value = value;
  }
}

class GameEventNotifier {
  events = [];
  handlers = [];

  constructor() {
    let port = window.location.port;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);

    this.socket.onopen = () => {
      this.receiveEvent(new EventMessage('Trivia', GameEvent.System, { msg: 'connected' }));
    };

    this.socket.onclose = () => {
      this.receiveEvent(new EventMessage('Trivia', GameEvent.System, { msg: 'disconnected' }));
    };

    this.socket.onmessage = async (msg) => {
      try {
        const event = JSON.parse(await msg.data.text());
        this.receiveEvent(event);
      } catch {
        // Ignore malformed messages
      }
    };
  }

  broadcastEvent(from, type, value) {
    const event = new EventMessage(from, type, value);
    this.socket.send(JSON.stringify(event));
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers = this.handlers.filter((h) => h !== handler);
  }

  receiveEvent(event) {
    this.events.push(event);

    this.handlers.forEach((handler) => {
      handler(event);
    });
  }
}

const GameNotifier = new GameEventNotifier();

export { GameEvent, GameNotifier };
