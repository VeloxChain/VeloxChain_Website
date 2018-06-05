import React, { Component } from "react";
import {
  List,
  Datagrid,
  TextField,
  Filter,
  TextInput
} from "admin-on-rest";

import PropTypes from "prop-types";
import moment from "moment";

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

const PostFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="email" alwaysOn />
  </Filter>
);

class PreOrderList extends Component {
  render() {
    return (
      <div>
        <List title="Pre-orders Log" {...this.props} filters={<PostFilter />}>
          <Datagrid>
            <TextField source="id" styles={{width: "10%"}}/>
            <TextField source="email"/>
            <TextField source="storage_size"/>
            <TextField source="number_recommend" label="RATE"/>
            <TextField source="coins_address" label="ETH ADDRESS"/>
            <TextFieldCustomForDate source="created_at" label="Date"/>
          </Datagrid>
        </List>
      </div>
    );
  }
}

export default PreOrderList;