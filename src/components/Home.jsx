import React, { useState } from "react";
import "./style/Home.css";
import revoltLogo from "../assets/revolt_logo.svg";
import talkToRevImg from "../assets/Rev.gif";
import MicButton from "./MicButton";

function Home() {
  const [isOn, setIsOn] = useState(false);


  return (
    <div className={`app-container ${isOn ? "night-mode" : ""}`}>
      {/* Header */}
      <div className="header">
        <img src={revoltLogo} alt="Logo" className="header-image" />
        <label className="switch">
          <input
            type="checkbox"
            checked={isOn}
            onChange={() => setIsOn(!isOn)}
          />
          <span className="slider"></span>
        </label>
      </div>

      {/* Center Body */}
      <div className="center-body">
        <div className="title-row">
          <img src={talkToRevImg} alt="Talk to Rev" className="talk-to-rev-image" />
          <h1 className="talk-to-rev-text">Talk to Rev</h1>
        </div>

        <MicButton />
      </div>
    </div>
  );
}

export default Home;
