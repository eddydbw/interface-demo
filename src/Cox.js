import React from "react";
import { Frame } from "./components/Frame";
import "./Cox.css";

export const Cox = () => {
  return (
    <div className="cox-outer-wrapper">
      <div className="cox-inner-wrapper">
        <div className="cox-panel">
          <Frame className="frame-hr" />
          <Frame className="frame-gear" text="GEAR" text1="2" />

          <div className="cyclor-wrapper">
            {[1, 3].map((num, idx) => (
              <div key={`cyclor-${num}`} className={`cyclor-box cyclor-${num}`}>
                <div className="cyclor-title">CYCLOR {num}</div>
                <div className="cyclor-content">
                  <div className="bar-wrapper">
                    {['#bb2103', '#d71303', '#e8283f', '#dee001', '#2ad702'].map((color, i) => (
                      <div
                        key={i}
                        className="bar"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  <div className="value-group">
                    <div className="value-block">
                      <div className="value-label">CURRENT</div>
                      <div className="value-number">300</div>
                    </div>
                    <div className="value-block">
                      <div className="value-label">TARGET</div>
                      <div className="value-number">260</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {[2, 4].map((num, idx) => (
              <div key={`cyclor-${num}`} className={`cyclor-box cyclor-${num} right`}>  
                <div className="cyclor-title">CYCLOR {num}</div>
                <div className="cyclor-content">
                  <div className="bar-wrapper">
                    {['#bb2103', '#d71303', '#e8283f', '#dee001', '#2ad702'].map((color, i) => (
                      <div
                        key={i}
                        className="bar"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  <div className="value-group">
                    <div className="value-block">
                      <div className="value-label">CURRENT</div>
                      <div className="value-number">300</div>
                    </div>
                    <div className="value-block">
                      <div className="value-label">TARGET</div>
                      <div className="value-number">250</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="cyclor-border" />
          </div>

          <div className="acc-container">
            {["ACC SYS", "ACC RAKE"].map((label, i) => (
              <div className="acc-box" key={i}>
                <div className="acc-title">{label}</div>
                <div className="acc-number">400</div>
                <div className="bar-group">
                  {['#bb2103', '#d71303', '#e8283f', '#dee001', '#2ad702'].map((color, i) => (
                    <div
                      key={i}
                      className="bar small"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="watts-box">
            <div className="watts-label">TOTAL WATTS</div>
            <div className="watts-value">1700</div>
          </div>
        </div>
      </div>
    </div>
  );
};
