import React, { Component } from "react";
import { connect } from "react-redux";
import { showNotification, refreshView } from "admin-on-rest";
import PropsType from "prop-types";
import _ from "lodash";

import { getOverviewIndex } from "../../actions/AppAction";
import PreOrderComponent from "../../components/PreOrder/PreOrderComponent";
import {importDataForPreOrder} from "../../service/ApiService";
import {fetchDataFromTypeForm, getAccessToken} from "../../service/TypeFormService";
import appConfig from "../../configs/App.config";

class PreOrderContainer extends Component {
  componentDidMount() {
    getOverviewIndex(this.props.dispatch);

    var url = new URL(window.location.href.replace("#/", ""));
    var code = url.searchParams.get("code");
    if(!_.isEmpty(code)) {
      getAccessToken(code).then(data => {
        if(!_.isEmpty(data.access_token)) {
          importDataForPreOrder("GJmaK7QrBwZtna4ptkaf1uE1b7UdbjqABLmhqQizeE3z", appConfig.type_form_pre_order_form_id, this.props.dispatch).then((data) => {
            if(_.isEmpty(data)) {
              return;
            }
            this.props.showNotification(`${_.isEmpty(data.data.total) ? 0: data.data.total} record is imported`);
            this.props.refreshView();
          });
        }
      });
    }
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
      <PreOrderComponent exportExcel={this.exportExcel} fetchDataFromTypeForm={fetchDataFromTypeForm} {...this.props} overviewIndex={this.props.overviewIndex}/>
    );
  }
}

PreOrderContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(PreOrderContainer);