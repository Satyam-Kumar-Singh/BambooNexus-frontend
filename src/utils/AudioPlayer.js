export function createAudioPlayer() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let playTime = audioCtx.currentTime;

  async function playChunk(base64Chunk) {
    try {
      const arrayBuffer = base64ToArrayBuffer(base64Chunk);

      // PCM16 → Float32
      const pcm16 = new Int16Array(arrayBuffer);
      const float32 = new Float32Array(pcm16.length);
      for (let i = 0; i < pcm16.length; i++) {
        float32[i] = pcm16[i] / 32768;
      }

      // Put it into an AudioBuffer
      const audioBuffer = audioCtx.createBuffer(
        1,                          // mono
        float32.length,
        16000                       // Gemini sends 16kHz PCM
      );
      audioBuffer.copyToChannel(float32, 0);

      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);

      // Queue chunks back-to-back (avoid overlaps/gaps)
      source.start(playTime);
      playTime += audioBuffer.duration;
    } catch (err) {
      console.error("Error playing chunk:", err);
    }
  }

  return { playChunk };
}