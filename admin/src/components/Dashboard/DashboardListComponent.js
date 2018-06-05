import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import {
  List,
  Datagrid,
  TextField
} from "admin-on-rest";

import KYCConfirmation from "../Contributor/KYCConfirmation";
import styles from "./DashboardComponent.style";

const TextFieldCustomForName = ({ firstName, middleName, lastName, record = {} }) => <span>{`${record[firstName] || ""} ${record[middleName] || ""} ${record[lastName] || ""}`}</span>;
TextFieldCustomForName.propTypes = {
  addLabel: PropTypes.bool,
  label: PropTypes.string,
  record: PropTypes.object,
  firstName: PropTypes.string.isRequired,
  middleName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};
TextFieldCustomForName.defaultProps = {
  addLabel: true,
};

const TextFieldCustomForKYCStatus = ({ source, record = {} }) => <span>{record[source] == 1 ? "passed" : "fail" }</span>;
TextFieldCustomForKYCStatus.propTypes = {
  addLabel: PropTypes.bool,
  label: PropTypes.string,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
};
TextFieldCustomForKYCStatus.defaultProps = {
  addLabel: true,
};

const TextFieldCustomForDate = ({ source, record = {} }) => <span>{moment(record[source]).format("YYYY-MM-DD")}</span>;
TextFieldCustomForDate.propTypes = {
  addLabel: PropTypes.bool,
  label: PropTypes.string,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
};
TextFieldCustomForDate.defaultProps = {
  addLabel: true,
};

const ButtonViewCustom = ({ record = {}, handleOpenDialog }) => <FlatButton label="view" primary={true} onClick={() => handleOpenDialog(record)}/>;
ButtonViewCustom.propTypes = {
  record: PropTypes.object,
  handleOpenDialog: PropTypes.func.isRequired,
};

class DashboardList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openDialog: false,
      currentContributor: {}
    };
  }

  handleCloseDialog = () => {
    this.setState({
      openDialog: false
    });
  }

  handleOpenDialog = (currentContributor) => {
    this.setState({
      openDialog: true,
      currentContributor
    });
  }

  render() {
    return (
      <div>
        <Dialog
          title="KYC Confirmation"
          titleStyle={styles.titleStyle}
          open={this.state.openDialog}
          onRequestClose={this.handleCloseDialog}
        >
          <KYCConfirmation callAPIUpdateContribution={this.props.callAPIUpdateContribution} callAPIKYCConfirmation={this.props.callAPIKYCConfirmation} currentContributor={this.state.currentContributor} handleCloseDialog={this.handleCloseDialog}/>
        </Dialog>
        <List title="Whitelist" {...this.props}>
          <Datagrid>
            <TextField source="id" />
            <TextFieldCustomForName firstName="first_name" middleName="middle_name"  lastName="last_name" label="NAME"/>
            <TextField source="email" />
            <TextField source="nationality" />
            <TextField source="amount_contribute" label="Expected amount (eth)"/>
            <TextFieldCustomForKYCStatus source="is_confirmed_by_kyc" label="KYC STATUS"/>
            <TextFieldCustomForDate source="created_at" label="Date"/>
            <ButtonViewCustom handleOpenDialog={this.handleOpenDialog} label=""/>
          </Datagrid>
        </List>
      </div>
    );
  }
}

DashboardList.propTypes = {
  callAPIKYCConfirmation: PropTypes.func.isRequired,
  callAPIUpdateContribution: PropTypes.func.isRequired,
};

export default DashboardList;