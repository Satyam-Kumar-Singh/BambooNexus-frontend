// import { createAudioPlayer } from "../utils/AudioPlayer";
import PCMPlayer from "../utils/PcmPlayer";
let ws;

export function connectWS(sessionId, onMessage, onOpen, onClose, onError) {
  ws = new WebSocket(`ws://localhost:5000/ws/client?sid=${sessionId}`);
  const player = new PCMPlayer(24000);

  ws.onopen = () => {
    console.log("[WS] Connected with SID:", sessionId);
    if (onOpen) onOpen();
  };

  ws.onmessage = (event) => {
    try {
      const msg = JSON.parse(event.data);
      console.log(msg);

      if (msg.type === "audio-chunk") {
        player.enqueue(msg.data);
      }
    } catch (err) {
      console.error("[WS] Invalid message:", event.data);
    }
    if (onMessage) onMessage(event);
  };

  ws.onclose = () => console.log("[WS] Closed");
  ws.onerror = (err) => console.error("[WS] Error:", err);

  return ws;
}

export function sendAudioChunk(base64Audio) {
  if (ws?.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "audio-chunk", audio: base64Audio }));
  }
}

export function endAudioStream() {
  if (ws?.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "end-audio" }));
  }
}

export function closeWS() {
  if (ws) ws.close();
}

