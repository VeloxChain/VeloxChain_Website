import React, { Component } from "react";
import { showNotification, refreshView } from "admin-on-rest";
import {connect} from "react-redux";
import PropsType from "prop-types";
import _ from "lodash";

import ContributorComponent from "../../components/Contributor/ContributorComponent";
import {callAPIKYCConfirmation, callAPIUpdateContribution, importDataForContribute} from "../../service/ApiService";
import { fetchDataFromTypeForm, getAccessToken } from "../../service/TypeFormService";
import appConfig from "../../configs/App.config";

class ContributorContainer extends Component {
  componentDidMount() {
    var url = new URL(window.location.href.replace("#/", ""));
    var code = url.searchParams.get("code");
    if(!_.isEmpty(code)) {
      getAccessToken(code).then(data => {
        if(!_.isEmpty(data.access_token)) {
          importDataForContribute("GJmaK7QrBwZtna4ptkaf1uE1b7UdbjqABLmhqQizeE3z", appConfig.type_form_form_id, this.props.dispatch).then((data) => {
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

  exportExcel = () => {
    const request = new Request("/admin/contributor/excel", {
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

  sendEmailToConfirm = () => {
    const request = new Request("/admin/send_all_email_to_all", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }),
    });
    fetch(request).then(response => {
      return response.json();
    }).then((data) => {
      if(data.data.result) {
        this.props.showNotification(`${data.data.result} emails is sent`);
      }else {
        this.props.showNotification("0 email is sent");
      }
    });
  }

  render() {
    return (
      <ContributorComponent sendEmailToConfirm={this.sendEmailToConfirm} exportExcel={this.exportExcel} fetchDataFromTypeForm={fetchDataFromTypeForm} callAPIUpdateContribution={this.handleCallAPIUpdateContribution} callAPIKYCConfirmation={this.handleCallAPIKYCConfirmation} {...this.props}/>
    );
  }
}

ContributorContainer.propTypes = {
  refreshView: PropsType.func.isRequired,
  location: PropsType.object.isRequired,
  showNotification: PropsType.func.isRequired,
  dispatch: PropsType.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    refreshView: () => dispatch(refreshView()),
    showNotification: message => dispatch(showNotification(message)),
  };
};

export default connect(null, mapDispatchToProps)(ContributorContainer);

