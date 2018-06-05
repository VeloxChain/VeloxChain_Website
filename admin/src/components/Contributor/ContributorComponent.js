import React, { Component } from "react";
import { Card } from "material-ui/Card";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";
import Cookies from "universal-cookie";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";


import styles from "./ContributorComponent.style";
import ContributorChart from "./ContributorChartComponent";
import ContributorList from "./ContributorListComponent";

const cookies = new Cookies();

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ContributorComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCloseAfterClickAgree = () => {
    this.props.sendEmailToConfirm();
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            <h3>Do you want to send email confirmation for all contributions?</h3>
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleCloseAfterClickAgree} variant="raised" color="secondary">
              <h5><strong>Agree</strong></h5>
            </Button>
            <Button onClick={this.handleClose} variant="raised">
              <h5><strong>Disagree</strong></h5>
            </Button>
          </DialogActions>
        </Dialog>
        <Card style={styles.card}>
          <h2 style={styles.title}>Whitelist Summary</h2>
          <ContributorChart />
        </Card>
        <Card style={styles.card}>
          <div style={{display: "flex", "justifyContent": "space-between"}}>
            <div>
              <RaisedButton
                label="Import Data from Type Form"
                primary={true}
                onClick={() => {cookies.set("from_page", "1", { path: "/" }); this.props.fetchDataFromTypeForm();}}
                style={styles.buttonImport}
              />
              <RaisedButton
                label="Export excel"
                primary={true}
                onClick={() => {this.props.exportExcel();}}
                style={styles.buttonExcel}
              />
            </div>
          </div>
          <ContributorList {...this.props} callAPIKYCConfirmation={this.props.callAPIKYCConfirmation} callAPIUpdateContribution={this.props.callAPIUpdateContribution}/>
        </Card>
      </div>
    );
  }
}

ContributorComponent.propTypes = {
  callAPIKYCConfirmation: PropTypes.func.isRequired,
  callAPIUpdateContribution: PropTypes.func.isRequired,
  fetchDataFromTypeForm: PropTypes.func.isRequired,
  exportExcel: PropTypes.func.isRequired,
  sendEmailToConfirm: PropTypes.func.isRequired,
};

export default ContributorComponent;