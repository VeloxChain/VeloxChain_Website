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

class WhitelistListComponent extends Component {
  
  render() {
    return (
      <div>
        <List title="Whitelist Log" {...this.props} filters={<PostFilter />}>
          <Datagrid>
            <TextField source="id" styles={{width: "10%"}}/>
            <TextField source="email"/>
            <TextFieldCustomForDate source="created_at" label="Date"/>
          </Datagrid>
        </List>
      </div>
    );
  }
}

export default WhitelistListComponent;