import React, { Component } from "react";
import { Card } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import PropsType from "prop-types";
import Cookies from "universal-cookie";

import styles from "../Dashboard/DashboardComponent.style";
import PreOrderList from "./PreOrderListComponent";
import Chart1 from "../../assets/images/Bar Chart.png";
import Chart2 from "../../assets/images/Bar Chart-1.png";
import Chart3 from "../../assets/images/Bar Chart-2.png";

const cookies = new Cookies();

class PreOrderComponent extends Component {
  render() {
    return (
      <div>
        <h2 style={styles.title}>Pre-order</h2>
        <div className="row">
          <div className="col-sm-4">
            <Card style={styles.card}>
              <div className="row">
                <div className="col-sm-6">
                  <h3 style={styles.numberSub}>{this.props.overviewIndex.reOrder.week}</h3>
                  <h4 style={styles.description}>Week</h4>
                </div>
                <div className="col-sm-6 text-right">
                  <img src={Chart1} style={styles.iconToday} />
                </div>
              </div>
            </Card>
          </div>
          <div className="col-sm-4">
            <Card style={styles.card}>
              <div className="row">
                <div className="col-sm-6">
                  <h3 style={styles.numberCon}>{this.props.overviewIndex.reOrder.month}</h3>
                  <h4 style={styles.description}>Month</h4>
                </div>
                <div className="col-sm-6 text-right">
                  <img src={Chart2} style={styles.iconToday} />
                </div>
              </div>
            </Card>
          </div>
          <div className="col-sm-4">
            <Card style={styles.card}>
              <div className="row">
                <div className="col-sm-6">
                  <h3 style={styles.numberRe}>{this.props.overviewIndex.reOrder.year}</h3>
                  <h4 style={styles.description}>Year</h4>
                </div>
                <div className="col-sm-6 text-right">
                  <img src={Chart3} style={styles.iconToday} />
                </div>
              </div>
            </Card>
          </div>
        </div>

        <Card style={styles.card}>
          <div>
            <RaisedButton
              label="Import Data from Type Form"
              primary={true}
              onClick={() => {cookies.set("from_page", "2", { path: "/" }); this.props.fetchDataFromTypeForm();}}
              style={styles.buttonImport}
            />
            <RaisedButton
              label="Export excel"
              primary={true}
              onClick={() => {this.props.exportExcel();}}
              style={styles.buttonExcel}
            />
          </div>
          <PreOrderList {...this.props} />
        </Card>
      </div>
    );
  }
}

PreOrderComponent.propTypes = {
  overviewIndex: PropsType.object.isRequired,
  fetchDataFromTypeForm: PropsType.func.isRequired,
  exportExcel: PropsType.func.isRequired,
};

export default PreOrderComponent;