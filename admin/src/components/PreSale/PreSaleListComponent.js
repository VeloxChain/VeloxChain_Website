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
    <TextInput label="Search" source="search" alwaysOn />
  </Filter>
);

class PreSaleList extends Component {
  render() {
    return (
      <div>
        <List title="Pre-sale Log" {...this.props} filters={<PostFilter />}>
          <Datagrid>
            <TextField source="id" styles={{width: "10%"}}/>
            <TextField source="full_name"/>
            <TextField source="email"/>
            <TextField source="citizenship" label="Citizenship"/>
            <TextField source="desired_allocation" label="Desired Allocation" />
            <TextFieldCustomForDate source="created_at" label="Date"/>
          </Datagrid>
        </List>
      </div>
    );
  }
}

export default PreSaleList;