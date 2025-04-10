import React, { useEffect, useRef, useState } from "react";
import "./Cox3.css";

export const Cox3 = () => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    fetch("/cyclor_adjusted_bars.json")
      .then((res) => res.json())
      .then(setData);
  }, []);

  const play = () => {
    if (!data.length || intervalRef.current) return;
    setIsPlaying(true);
    intervalRef.current = setInterval(() => {
      setIndex((prev) => {
        if (prev < data.length - 1) return prev + 1;
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsPlaying(false);
        return prev;
      });
    }, 500);
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

  const renderCyclorBar = (cyclorKey, values) => (
    <div className="cyc-card" key={cyclorKey}>
      <div className="cyc-label">{cyclorKey.toUpperCase().replace("_", " ")}</div>
      <div className="cyc-value">{Math.round(values.gray + values.yellow)}</div>
      <div className="cyc-bar">
        <div className="bar-gray1" style={{ width: `${values.gray}%` }} />
        <div className="bar-yellow1" style={{ width: `${values.yellow}%` }} />
        <div className="bar-red1" style={{ width: `${values.red}%` }} />
        <div className="bar-marker" style={{ left: `${values.gray}%` }} />
      </div>
    </div>
  );

  return (
    <div className="cox-container">
      <div className="cox-main">
        <div className="cox-panel">
          <div className="cox-content">
            <div className="cyc-grid">
              {Object.entries(cyclors).map(([key, values]) =>
                renderCyclorBar(key, values)
              )}
            </div>

            <div className="status-box body-battery">
              <div className="status-label">BODY BATTERY</div>
              <div className="status-value">{Math.round(collective_body_battery)}%</div>
            </div>

            <div className="big-bar">
              <div
                className="bar-white"
                style={{ width: `${collective_body_battery}%` }}
              />
            </div>

            <div className="gear-box">
              <div className="gear-label">GEAR</div>
              <div className="gear-value">2</div>
            </div>

            <div className="hr-box">
              <div className="hr-label">HR</div>
              <div className="hr-value">{Math.round(cyclor_1_heart_rate)}</div>
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
          ⏱️ <strong>{timestamp}s</strong> &nbsp;|&nbsp; ❤️ <strong>{Math.round(cyclor_1_heart_rate)} bpm</strong>
        </div>
      </div>
    </div>
  );
};
