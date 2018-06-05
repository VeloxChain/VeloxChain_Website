import React, { Component } from "react";
import {
  List,
  Datagrid,
  TextField
} from "admin-on-rest";

class TransactionList extends Component {

  render() {
    return (
      <div>
        <List title="Transactions Log" {...this.props}>
          <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="body" />
          </Datagrid>
        </List>
      </div>
    );
  }
}

export default TransactionList;