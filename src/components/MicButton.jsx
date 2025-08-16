import React, { useState, useRef } from "react";
import { FaMicrophone } from "react-icons/fa"; // only mic now
import { createSession } from "../services/api";
import { connectWS, sendAudioChunk, endAudioStream, closeWS } from "../services/wsClient";
import { floatTo16BitPCM, arrayBufferToBase64 } from "../utils/audioUtils";
import "./style/MicButton.css";

function MicButton() {
  const [isRecording, setIsRecording] = useState(false);
  const audioContextRef = useRef(null);
  const processorRef = useRef(null);

  const toggleMic = async () => {
    if (!isRecording) {
      try {
        // 1. Get sessionId from backend API
        const sid = await createSession();

        // Step 2: Connect WebSocket
        connectWS(
          sid,
          (event) => {},
          async () => {
            // Step 3: Start mic streaming
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioContextRef.current = new AudioContext({ sampleRate: 16000 });
            const source = audioContextRef.current.createMediaStreamSource(stream);

            const processor = audioContextRef.current.createScriptProcessor(4096, 1, 1);
            processorRef.current = processor;

            source.connect(processor);
            processor.connect(audioContextRef.current.destination);

            processor.onaudioprocess = (e) => {
              const float32Data = e.inputBuffer.getChannelData(0);
              const int16Data = floatTo16BitPCM(float32Data);
              const base64Data = arrayBufferToBase64(int16Data);
              sendAudioChunk(base64Data);
            };
          }
        );

        setIsRecording(true);
      } catch (err) {
        console.error("Mic or WS setup failed:", err);
      }
    } else {
      // Stop mic + WS
      endAudioStream();
      closeWS();
      processorRef.current?.disconnect();
      audioContextRef.current?.close();
      setIsRecording(false);
    }
  };

  return (
    <button
      onClick={toggleMic}
      className={`mic-button ${isRecording ? "recording" : ""}`}
      aria-label={isRecording ? "Stop Recording" : "Start Recording"}
    >
      {isRecording ? (
        <span className="stop-icon"></span>  // ⬜️ white square
      ) : (
        <FaMicrophone />
      )}
    </button>
  );
}

export default MicButton;
