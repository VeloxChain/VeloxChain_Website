import React, { Component } from "react";
import { connect } from "react-redux";
import PropsType from "prop-types";
import { showNotification, refreshView } from "admin-on-rest";
import Cookies from "universal-cookie";
import _ from "lodash";

import DashboardComponent from "../../components/Dashboard/DashboardComponent";
import { getOverviewIndex } from "../../actions/AppAction";
import { callAPIKYCConfirmation, callAPIUpdateContribution } from "../../service/ApiService";

const cookies = new Cookies();

class DashboardContainer extends Component {
  componentDidMount() {
    this.props.getOverviewIndex();

    if(!_.isEmpty(cookies.get("from_page")) ) {
      let fromPage = cookies.get("from_page");
      cookies.set("from_page", "0", { path: "/" });
      if (fromPage == 1) {
        window.location.href = "#/contributors";
      }
      if (fromPage == 2) {
        window.location.href = "#/pre-order";
      }
    }
  }

  handleCallAPIKYCConfirmation = (contributionID)=> {
    callAPIKYCConfirmation(contributionID, this.props.dispatch).then(response => {
      if(response.code == 200) {
        this.props.showNotification("KYC Confirmed!");
        this.props.refreshView();
        return;
      }
      this.props.showNotification("KYC Confirmed is fail");
    });
  }

  handleCallAPIUpdateContribution = (contribution)=> {
    callAPIUpdateContribution(contribution, this.props.dispatch).then(response => {
      if(response.code == 200) {
        this.props.showNotification("Updated!");
        this.props.refreshView();
        return;
      }
      this.props.showNotification("Fail Update");
    });
  }

  render() {
    return (
      <DashboardComponent callAPIUpdateContribution={this.handleCallAPIUpdateContribution} callAPIKYCConfirmation={this.handleCallAPIKYCConfirmation} {...this.props} overviewIndex={this.props.overviewIndex}/>
    );
  }
}

DashboardContainer.propTypes = {
  getOverviewIndex: PropsType.func.isRequired,
  refreshView: PropsType.func.isRequired,
  showNotification: PropsType.func.isRequired,
  dispatch: PropsType.func.isRequired,
  overviewIndex: PropsType.object.isRequired,
};

const mapStateToProps = state => {
  return {
    overviewIndex: state.AppReducer.overviewIndex,
  };};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    refreshView: () => dispatch(refreshView()),
    showNotification: message => dispatch(showNotification(message)),
    getOverviewIndex: () => getOverviewIndex(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
