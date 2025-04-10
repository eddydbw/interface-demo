import React, { useEffect, useRef, useState } from "react";

import "./Cox2.css";

export const Cox2 = () => {
    
    const barData = {
        cyc1: { gray: 30, yellow: 50, red: 20 },
        cyc2: { gray: 40, yellow: 40, red: 20 },
        cyc3: { gray: 20, yellow: 30, red: 50 },
        cyc4: { gray: 40, yellow: 30, red: 30 },
      };
    
    var BB = parseInt(((barData.cyc1.gray + barData.cyc1.yellow) + (barData.cyc2.gray + barData.cyc2.yellow) + (barData.cyc3.gray + barData.cyc3.yellow) + (barData.cyc4.gray + barData.cyc4.yellow))/4)
    
    
    
    const [data, setData] = useState([]);
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const intervalRef = useRef(null);


    // Load JSON on mount
    useEffect(() => {
        fetch("/body_battery_bar_data.json")
          .then((res) => res.json())
          .then(setData);
      }, []);
    
      // Auto-play logic
      const play = () => {
        if (!data.length || intervalRef.current) return;
        setIsPlaying(true);
        intervalRef.current = setInterval(() => {
          setIndex((prev) => {
            if (prev < data.length - 1) {
              return prev + 1;
            } else {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
              setIsPlaying(false);
              return prev;
            }
          });
        }, 500); // Change to desired speed
      };
    
      const pause = () => {
        setIsPlaying(false);
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      };

      const restart = () => {
        pause();
        setIndex(0);
      };
    
    
      useEffect(() => {
        return () => clearInterval(intervalRef.current);
      }, []);
    
      if (!data.length) return <div>Loading...</div>;
    
      const { timestamp, heart_rate, gray, yellow, red } = data[index];

    return (
    <div className="cox-container">
      <div className="cox-main">
        <div className="cox-panel">
          <div className="cox-content">
            <div className="cox-slots">
                <div className="cyc-grid">
                    <div className="cyc-card cyc1">
                    <div className="cyc-label">CYC 1</div>
                    <div className="cyc-value">180</div>
                    <div className="cyc-bar">
                        <div className="bar-gray1" style={{ width: `${gray}%` }} />
                        <div className="bar-yellow1" style={{ width: `${yellow}%` }} />
                        <div className="bar-red1" style={{ width: `${red}%` }} />
                        <div className="bar-marker" style={{ left: `${gray}%` }} />
                    </div>
                    </div>

                    <div className="cyc-card cyc2">
                    <div className="cyc-label">CYC 2</div>
                    <div className="cyc-value">250</div>
                    <div className="cyc-bar">
                        <div className="bar-gray1" style={{ width: `${barData.cyc2.gray}%` }} />
                        <div className="bar-yellow1" style={{ width: `${barData.cyc2.yellow}%` }} />
                        <div className="bar-red1" style={{ width: `${barData.cyc2.red}%` }} />
                        <div className="bar-marker" style={{ left: `${barData.cyc2.gray}%` }} />
                    </div>
                    </div>

                    <div className="cyc-card cyc3">
                    <div className="cyc-label">CYC 3</div>
                    <div className="cyc-value">350</div>
                    <div className="cyc-bar">
                        <div className="bar-gray1" style={{ width: `${barData.cyc3.gray}%` }} />
                        <div className="bar-yellow1" style={{ width: `${barData.cyc3.yellow}%` }} />
                        <div className="bar-red1" style={{ width: `${barData.cyc3.red}%` }} />
                        <div className="bar-marker" style={{ left: `${barData.cyc3.gray}%` }} />
                    </div>
                    </div>

                    <div className="cyc-card cyc4">
                    <div className="cyc-label">CYC 4</div>
                    <div className="cyc-value">175</div>
                    <div className="cyc-bar">
                        <div className="bar-gray1" style={{ width: `${barData.cyc4.gray}%` }} />
                        <div className="bar-yellow1" style={{ width: `${barData.cyc4.yellow}%` }} />
                        <div className="bar-red1" style={{ width: `${barData.cyc4.red}%` }} />
                        <div className="bar-marker" style={{ left: `${barData.cyc4.gray}%` }} />
                    </div>
                    </div>
                </div>
            </div>

            <div className="frame-white-border" />

            <div className="bottom-border" />

            <div className="status-box acc-sys">
              <div className="status-label">ACC SYS</div>
              <div className="status-value">400</div>
              <div className="status-bar rotated">
                <div className="bar green1" />
                <div className="bar yellow1" />
                <div className="bar red-light1" />
                <div className="bar red-dark1" />
                <div className="bar red1" />
              </div>
            </div>

            <div className="status-box acc-rake">
              <div className="status-label">ACC RAKE</div>
              <div className="status-value">400</div>
              <div className="status-bar rotated">
                <div className="bar green1" />
                <div className="bar yellow1" />
                <div className="bar red-light1" />
                <div className="bar red-dark1" />
                <div className="bar red1" />
              </div>
            </div>

            <div className="status-box body-battery">
              <div className="status-label">BODY BATTERY</div>
              <div className="status-value">{BB}%</div>
            </div>

            <div className="big-bar rotated">
                <div className="bar-white" style={{ width: `${BB}%` }}/>
            </div>

            <div className="gear-box">
              <div className="gear-label">GEAR</div>
              <div className="gear-value">2</div>
            </div>

            <div className="hr-box">
              <div className="hr-label">HR</div>
              <div className="hr-value">{Math.floor(heart_rate)}</div>
            </div>
          </div>
        </div>

        <div className="traffic-lights">
          <div className="light blue" />
          <div className="light yellow" />
          <div className="light green" />
        </div>
      </div>
      <div className="control-panel">
      <div className="control-buttons">
        <button onClick={isPlaying ? pause : play}>
          {isPlaying ? "⏸ Pause" : "▶️ Play"}
        </button>
        <button onClick={restart}>🔄 Restart</button>
      </div>
      <div className="control-info">
        ⏱️ <strong>{timestamp}s</strong> &nbsp;|&nbsp; ❤️ <strong>{Math.round(heart_rate)} bpm</strong>
      </div>
    </div>
    </div>
  );
};