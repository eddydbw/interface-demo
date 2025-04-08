import React from 'react';
import './figma-styles.css';

const Label = ({ size = 'sm', children }) => (
  <div className={`text-white label-${size}`}>{children}</div>
);

const Value = ({ size = 'md', children }) => (
  <div className={`text-white value-${size}`}>{children}</div>
);

const Header = ({ children }) => (
  <div className="text-white header-bold">{children}</div>
);

const BarGraph = () => (
  <div className="bar-graph">
    <div className="bar red-dark" />
    <div className="bar red" />
    <div className="bar pink" />
    <div className="bar yellow" />
    <div className="bar green" />
  </div>
);

const CyclorPanel = ({ title }) => (
  <div className="cyclor-panel">
    <Header>{title}</Header>
    <div className="cyclor-content">
      <BarGraph />
      <div className="cyclor-values">
        <div className="value-block">
          <Label size="sm">current</Label>
          <Value size="md">300</Value>
        </div>
        <div className="value-block">
          <Label size="sm">target</Label>
          <Value size="md">250</Value>
        </div>
      </div>
    </div>
  </div>
);

const MetricBox = ({ label, value }) => (
  <div className="metric-box">
    <Label size="lg">{label}</Label>
    <Value size="lg">{value}</Value>
  </div>
);

const AccMetric = ({ label, value }) => (
  <div className="acc-metric">
    <Label size="md">{label}</Label>
    <Value size="md">{value}</Value>
  </div>
);

const TotalWatts = ({ value }) => (
  <div className="total-watts">
    <Label size="md">Total Watts</Label>
    <Value size="xl">{value}</Value>
  </div>
);

const CurrentTarget = ({current, target}) => (
    <div className="cyclor-values">
        <div className="value-block">
            <Label size="sm">current</Label>
            <Value size="md">{current}</Value>
        </div>
        <div className="value-block">
            <Label size="sm">target</Label>
            <Value size="md">{target}</Value>
        </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="dashboard">
      <MetricBox label="HR" value="160" />
      <MetricBox label="GEAR" value="2" />
      <CurrentTarget current="250" target="300" />

      <CyclorPanel title="CYCLOR 1" />
      <CyclorPanel title="CYCLOR 2" />
      <CyclorPanel title="CYCLOR 3" />
      <CyclorPanel title="CYCLOR 4" />

      <div className="acc-section">
        <AccMetric label="ACC SYS" value="400" />
        <AccMetric label="ACC RAKE" value="400" />
      </div>

      <TotalWatts value="1700" />
    </div>
  );
};

export default Dashboard;
