import React, { Component } from "react";
import { connect } from "react-redux";
import { showNotification, refreshView } from "admin-on-rest";
import PropsType from "prop-types";
import _ from "lodash";

import { getOverviewIndex } from "../../actions/AppAction";
import PreSaleComponent from "../../components/PreSale/PreSaleComponent";
import {fetchDataFromTypeForm, getAccessToken} from "../../service/TypeFormService";
import appConfig from "../../configs/App.config";

class PreSaleContainer extends Component {
  componentDidMount() {
    getOverviewIndex(this.props.dispatch);
  }

  exportExcel = () => {
    const request = new Request("admin/preorder/excel", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }),
    });
    fetch(request).then(response => {
      return response.json();
    }).then((data) => {
      if(data.status == "success") {
        var link = document.createElement("a");
        link.href = data.data.filename;
        link.click();
      }
    });
  }

  render() {
    return (
      <PreSaleComponent exportExcel={this.exportExcel} fetchDataFromTypeForm={fetchDataFromTypeForm} {...this.props} overviewIndex={this.props.overviewIndex}/>
    );
  }
}

PreSaleContainer.propTypes = {
  dispatch: PropsType.func.isRequired,
  overviewIndex: PropsType.object.isRequired,
  showNotification: PropsType.func.isRequired,
  refreshView: PropsType.func.isRequired,
  exportExcel: PropsType.func.isRequired,
};

const mapStateToProps = state => ({
  overviewIndex: state.AppReducer.overviewIndex
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    refreshView: () => dispatch(refreshView()),
    showNotification: message => dispatch(showNotification(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PreSaleContainer);