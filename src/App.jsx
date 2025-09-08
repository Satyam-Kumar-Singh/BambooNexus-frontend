import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import DataFlow from "./components/DataFlow";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dataflow" element={<DataFlow />} />
      </Routes>
    </Router>
  );
}

export default App;
