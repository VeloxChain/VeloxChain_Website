import React, { Component } from "react";
import TransactionComponent from "../../components/Transaction/TransactionComponent";

class TransactionContainer extends Component {
  render() {
    return (
      <TransactionComponent {...this.props}/>
    );
  }
}

export default TransactionContainer;
