import React, { useEffect, useRef, useState } from "react";
import "./Cox2a.css";

export const Cox2a = () => {

    const [data, setData] = useState([]);
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const intervalRef = useRef(null);
    const [speed, setSpeed] = useState(500);


    // Load JSON on mount
    useEffect(() => {
        fetch("/cyclor_tack_segment_leg2_battery_scaled.json")
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
        }, speed); // Change to desired speed
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
    
      const {
        timestamp,
        cyclor_1_heart_rate,
        collective_body_battery,
        cyclors,
      } = data[index];
    

    return (
    <div className="cox-container">
      <div className="cox-main">
        <div className="cox-panel">
          <div className="cox-content">
            <div className="cox-slots">
                <div className="cyc-grid">
                    <div className="cyc-card cyc1" style={{backgroundColor: cyclors.cyclor_1.gray < 7 ? "#8b0000" : ""}}>
                    <div className="cyc-label">CYC 1</div>
                    <div className="cyc-value">{Math.floor(cyclors.cyclor_1.power)}</div>
                    <div className="cyc-bar">
                        <div className="bar-gray1" style={{ width: `${cyclors.cyclor_1.gray}%` }} />
                        <div className="bar-yellow1" style={{ width: `${cyclors.cyclor_1.yellow}%` }} />
                        <div className="bar-red1" style={{ width: `${cyclors.cyclor_1.red}%` }} />
                        <div className="bar-marker" style={{ left: `${cyclors.cyclor_1.gray}%` }} />
                    </div>
                    </div>

                    <div className="cyc-card cyc2" style={{backgroundColor: cyclors.cyclor_2.gray < 15 ? "#8b0000" : ""}}>
                    <div className="cyc-label">CYC 2</div>
                    <div className="cyc-value">{Math.floor(cyclors.cyclor_2.power)}</div>
                    <div className="cyc-bar">
                        <div className="bar-gray1" style={{ width: `${cyclors.cyclor_2.gray}%` }} />
                        <div className="bar-yellow1" style={{ width: `${cyclors.cyclor_2.yellow}%` }} />
                        <div className="bar-red1" style={{ width: `${cyclors.cyclor_2.red}%` }} />
                        <div className="bar-marker" style={{ left: `${cyclors.cyclor_2.gray}%` }} />
                    </div>
                    </div>

                    <div className="cyc-card cyc3" style={{backgroundColor: cyclors.cyclor_3.gray < 11 ? "#8b0000" : ""}}>
                    <div className="cyc-label">CYC 3</div>
                    <div className="cyc-value">{Math.floor(cyclors.cyclor_3.power)}</div>
                    <div className="cyc-bar">
                        <div className="bar-gray1" style={{ width: `${cyclors.cyclor_3.gray}%` }} />
                        <div className="bar-yellow1" style={{ width: `${cyclors.cyclor_3.yellow}%` }} />
                        <div className="bar-red1" style={{ width: `${cyclors.cyclor_3.red}%` }} />
                        <div className="bar-marker" style={{ left: `${cyclors.cyclor_3.gray}%` }} />
                    </div>
                    </div>

                    <div className="cyc-card cyc4" style={{backgroundColor: cyclors.cyclor_4.gray < 19 ? "#8b0000" : ""}}>
                    <div className="cyc-label">CYC 4</div>
                    <div className="cyc-value">{Math.floor(cyclors.cyclor_4.power)}</div>
                    <div className="cyc-bar">
                        <div className="bar-gray1" style={{ width: `${cyclors.cyclor_4.gray}%` }} />
                        <div className="bar-yellow1" style={{ width: `${cyclors.cyclor_4.yellow}%` }} />
                        <div className="bar-red1" style={{ width: `${cyclors.cyclor_4.red}%` }} />
                        <div className="bar-marker" style={{ left: `${cyclors.cyclor_4.gray}%` }} />
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
              <div className="status-value">{Math.floor(collective_body_battery)}%</div>
            </div>

            <div className="big-bar rotated">
                <div className="bar-white" style={{ width: `${collective_body_battery}%` }}/>
            </div>

            <div className="gear-box">
              <div className="gear-label">GEAR</div>
              <div className="gear-value">{cyclors.cyclor_1.gear}</div>
            </div>

            <div className="hr-box">
              <div className="hr-label">HR</div>
              <div className="hr-value">{Math.floor(cyclor_1_heart_rate)}</div>
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
        ⏱️ <strong>{timestamp}s</strong> 
      </div>
      <div className="control-speed">
      <label htmlFor="speed">⏩ Speed: </label>
      <select
        id="speed"
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
      >
        <option value={1000}>1x (Slow)</option>
        <option value={500}>2x (Normal)</option>
        <option value={250}>4x (Fast)</option>
        <option value={100}>10x (Very Fast)</option>
      </select>
    </div>
    </div>
    </div>
  );
};