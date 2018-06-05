import React, { Component } from "react";
import PropsType from "prop-types";

import DashboardToday from "./DashboardTodayComponent";
import DashboardTotal from "./DashboardTotalComponent";
import DashboardList from "./DashboardListComponent";

class DashboardComponent extends Component {
  render() {
    return (
      <div>
        <DashboardToday overviewIndex={this.props.overviewIndex}/>
        <DashboardTotal overviewIndex={this.props.overviewIndex}/>
        <DashboardList {...this.props} callAPIUpdateContribution={this.props.callAPIUpdateContribution} callAPIKYCConfirmation={this.props.callAPIKYCConfirmation}/>
      </div>
    );
  }
}

DashboardComponent.propTypes = {
  overviewIndex: PropsType.object.isRequired,
  callAPIKYCConfirmation: PropsType.func.isRequired,
  callAPIUpdateContribution: PropsType.func.isRequired,
};

export default DashboardComponent;