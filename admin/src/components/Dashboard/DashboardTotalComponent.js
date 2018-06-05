import React, { Component } from "react";
import { Card } from "material-ui/Card";
import styles from "./DashboardComponent.style";
import PropsType from "prop-types";

import subscription from "../../assets/images/Bar Chart.png";
import contributor from "../../assets/images/Bar Chart-1.png";
import preorder from "../../assets/images/Bar Chart-2.png";

class DashboardTotal extends Component {
  render() {
    return (
      <div>
        <h2 style={styles.title}>Total</h2>
        <div className="row">
          <div className="col-sm-4">
            <Card style={styles.card}>
              <div className="row">
                <div className="col-sm-12">
                  <h4 style={styles.titleTotal}>Subscription</h4>
                </div>
                <div className="col-sm-6">
                  <h3 style={styles.count}>{this.props.overviewIndex.whitelist.total}</h3>
                </div>
                <div className="col-sm-6 text-right">
                  <img src={subscription} style={styles.iconToday} />
                </div>
              </div>
            </Card>
          </div>
          <div className="col-sm-4">
            <Card style={styles.card}>
              <div className="row">
                <div className="col-sm-12">
                  <h4 style={styles.titleTotal}>Whitelist</h4>
                </div>
                <div className="col-sm-6">
                  <h3 style={styles.count}>{this.props.overviewIndex.contributor.total}</h3>
                </div>
                <div className="col-sm-6 text-right">
                  <img src={contributor} style={styles.iconToday} />
                </div>
              </div>
            </Card>
          </div>
          <div className="col-sm-4">
            <Card style={styles.card}>
              <div className="row">
                <div className="col-sm-12">
                  <h4 style={styles.titleTotal}>Pre-order</h4>
                </div>
                <div className="col-sm-6">
                  <h3 style={styles.count}>{this.props.overviewIndex.reOrder.total}</h3>
                </div>
                <div className="col-sm-6 text-right">
                  <img src={preorder} style={styles.iconToday} />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

DashboardTotal.propTypes = {
  overviewIndex: PropsType.object.isRequired
};

export default DashboardTotal;