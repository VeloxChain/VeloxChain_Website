import React, { Component } from "react";
import { connect } from "react-redux";
import { showNotification, refreshView } from "admin-on-rest";
import PropsType from "prop-types";

import { callAPIUpdate } from "../../service/ApiService";
import { getOverviewIndex } from "../../actions/AppAction";
import PreSaleComponent from "../../components/PreSale/PreSaleComponent";

class PreSaleContainer extends Component {
  componentDidMount() {
    getOverviewIndex(this.props.dispatch);
  }

  handleCallAPIUpdate = (preSale)=> {
    callAPIUpdate(preSale, this.props.dispatch).then(response => {
      if(response.code == 200) {
        this.props.showNotification("Updated!");
        this.props.refreshView();
        return;
      }
      this.props.showNotification("Fail Update");
    });
  }

  render() {
    return (
      <PreSaleComponent
        fetchDataFromTypeForm={()=>{}}
        {...this.props}
        overviewIndex={this.props.overviewIndex}
        callAPIUpdate={this.handleCallAPIUpdate}
      />
    );
  }
}

PreSaleContainer.propTypes = {
  dispatch: PropsType.func.isRequired,
  overviewIndex: PropsType.object.isRequired,
  showNotification: PropsType.func.isRequired,
  refreshView: PropsType.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(PreSaleContainer);