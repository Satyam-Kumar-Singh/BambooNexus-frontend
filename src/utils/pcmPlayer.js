// pcmPlayer.js
export default class PCMPlayer {
  constructor(sampleRate = 24000) {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate });
    this.queue = [];
    this.isPlaying = false;
  }

  enqueue(base64) {
    const raw = atob(base64);
    const buffer = new ArrayBuffer(raw.length);
    const view = new Uint8Array(buffer);

    for (let i = 0; i < raw.length; i++) {
      view[i] = raw.charCodeAt(i);
    }

    const dataView = new DataView(buffer);
    const float32Array = new Float32Array(view.length / 2);
    for (let i = 0; i < float32Array.length; i++) {
      float32Array[i] = dataView.getInt16(i * 2, true) / 32768;
    }

    this.queue.push(float32Array);
    if (!this.isPlaying) {
      this._processQueue();
    }
  }

  _processQueue() {
    if (this.queue.length === 0) {
      this.isPlaying = false;
      return;
    }

    this.isPlaying = true;
    const chunk = this.queue.shift();

    const audioBuffer = this.audioCtx.createBuffer(1, chunk.length, this.audioCtx.sampleRate);
    audioBuffer.copyToChannel(chunk, 0);

    const source = this.audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.audioCtx.destination);

    source.onended = () => this._processQueue();
    source.start();
  }
}
