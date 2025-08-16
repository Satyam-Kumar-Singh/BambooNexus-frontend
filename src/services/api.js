import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Backend URL

export async function createSession() {
  const res = await axios.post(`${API_BASE_URL}/api/live/session`);
  return res.data.sessionId;
}
