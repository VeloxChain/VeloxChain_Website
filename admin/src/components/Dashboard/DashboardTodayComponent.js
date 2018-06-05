import React, { Component } from "react";
import { Card } from "material-ui/Card";
import PropsType from "prop-types";

import styles from "./DashboardComponent.style";

class DashboardToday extends Component {
  render() {
    return (
      <div>
        <h2 style={styles.title}>Today</h2>
        <div className="row">
          <div className="col-sm-4">
            <Card style={styles.card}>
              <div style={styles.contentToday}>
                <div style={styles.flex}>
                  <i className="fa fa-plus-circle" style={styles.iconToday} />
                </div>
                <div>
                  <h3 style={styles.numberSub}>{this.props.overviewIndex.whitelist.today}</h3>
                  <h4 style={styles.up}>
                    <i className="fa fa-long-arrow-up" style={styles.iconCount} />
                    <span style={styles.fontNumber}>14%</span>
                  </h4>
                  <h4 style={styles.description}>Subscription</h4>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-sm-4">
            <Card style={styles.card}>
              <div style={styles.contentToday}>
                <div style={styles.flex}>
                  <i className="fa fa-handshake-o" style={styles.iconToday} />
                </div>
                <div>
                  <h3 style={styles.numberCon}>{this.props.overviewIndex.contributor.today}</h3>
                  <h4 style={styles.down}>
                    <i className="fa fa-long-arrow-down" style={styles.iconCount} />
                    <span style={styles.fontNumber}>4%</span>
                  </h4>
                  <h4 style={styles.description}>Whitelist</h4>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-sm-4">
            <Card style={styles.card}>
              <div style={styles.contentToday}>
                <div style={styles.flex}>
                  <i className="fa fa-shopping-cart" style={styles.iconToday} />
                </div>
                <div>
                  <h3 style={styles.numberRe}>{this.props.overviewIndex.reOrder.today}</h3>
                  <h4 style={styles.down}>
                    <i className="fa fa-long-arrow-down" style={styles.iconCount} />
                    <span style={styles.fontNumber}>39%</span>
                  </h4>
                  <h4 style={styles.description}>Pre-order</h4>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

DashboardToday.propTypes = {
  overviewIndex: PropsType.object.isRequired
};

export default DashboardToday;