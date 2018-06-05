import React, { Component } from "react";
import styles from "./ContributorComponent.style";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer
} from "recharts";
import PropTypes from "prop-types";

const data = [
  {name: "New", value: 400},
  {name: "Passed", value: 300},
  {name: "Waiting", value: 300},
  {name: "Fail", value: 200}
];

const COLORS = ["rgba(244, 67, 54, 0.7)", "rgba(255, 187, 40,0.7)", "rgba(0, 191, 165, 0.7)", "rgba(115, 17, 193, 0.87)"];

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

renderActiveShape.propTypes = {
  cx: PropTypes.number, 
  cy: PropTypes.number, 
  innerRadius: PropTypes.number, 
  outerRadius: PropTypes.number, 
  startAngle: PropTypes.number, 
  endAngle: PropTypes.number,
  fill: PropTypes.number, 
  payload: PropTypes.number
};

class TwoLevelPieChart extends Component{
  
  render () {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <PieChart width={800} height={400}>
          <Pie 
            activeShape={renderActiveShape} 
            data={data} 
            cx="40%"
            cy="50%"
            dataKey="value"
            innerRadius={80}
            outerRadius={120} 
            fill="#8884d8"
            animationDuration={500}
          >
            {
              data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} key={index} />)
            }
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

class ContributorChart extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-8">
          <TwoLevelPieChart />
        </div>
        <div className="col-sm-4">
          <div className="row">
            <div className="col-sm-6">
              <h4 style={styles.titleNew}>
                <span style={styles.colorNew}></span>
                <span>New</span>
              </h4>
            </div>
            <div className="col-sm-6">
              <h4 style={styles.count}>234</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <h4 style={styles.titleNew}>
                <span style={styles.colorPass}></span>
                <span>Passed</span>
              </h4>
            </div>
            <div className="col-sm-6">
              <h4 style={styles.count}>234</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <h4 style={styles.titleNew}>
                <span style={styles.colorWait}></span>
                <span>Waiting</span>
              </h4>
            </div>
            <div className="col-sm-6">
              <h4 style={styles.count}>234</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <h4 style={styles.titleNew}>
                <span style={styles.colorFail}></span>
                <span>Fail</span>
              </h4>
            </div>
            <div className="col-sm-6">
              <h4 style={styles.count}>234</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContributorChart;