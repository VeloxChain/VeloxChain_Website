import React, { Component } from "react";
import {
  List,
  Datagrid,
  TextField,
  Filter,
  TextInput
} from "admin-on-rest";
import FlatButton from "material-ui/FlatButton";
import styles from "./PreSaleComponent.styles";

import Dialog from "material-ui/Dialog";
import PropTypes from "prop-types";
import moment from "moment";

import PreSaleComponentDetail from "./PreSaleComponentDetail";

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

const PostFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="search" alwaysOn />
  </Filter>
);

class PreSaleList extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      openDialog: false,
      currentPreSale: {}
    };
  }

  handleCloseDialog = () => {
    this.setState({
      openDialog: false
    });
  }

  handleOpenDialog = (currentPreSale) => {
    this.setState({
      openDialog: true,
      currentPreSale
    });
  }

  render() {
    return (
      <div>
        <Dialog
          title="PreSale Confirmation"
          titleStyle={styles.titleStyle}
          open={this.state.openDialog}
          onRequestClose={this.handleCloseDialog}
        >
          <PreSaleComponentDetail handleCloseDialog={this.handleCloseDialog} currentPreSale={this.state.currentPreSale} />
        </Dialog>

        <List title="Pre-sale Log" {...this.props} filters={<PostFilter />}>
          <Datagrid>
            <TextField source="id" styles={{width: "10%"}}/>
            <TextField source="full_name"/>
            <TextField source="email"/>
            <TextField source="citizenship" label="Citizenship"/>
            <TextField source="desired_allocation" label="Desired Allocation" />
            <TextFieldCustomForDate source="created_at" label="Date"/>
            <ButtonViewCustom handleOpenDialog={this.handleOpenDialog} label=""/>
          </Datagrid>
        </List>
      </div>
    );
  }
}

export default PreSaleList;