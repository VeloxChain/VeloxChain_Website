import React, { Component } from "react";
import { connect } from "react-redux";
import { showNotification, refreshView } from "admin-on-rest";
import PropsType from "prop-types";

import WhitelistComponent from "../../components/Whitelist/WhitelistComponent";

class WhitelistContainer extends Component {
  render() {
    return (
      <WhitelistComponent
        {...this.props}
      />
    );
  }
}

WhitelistContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(WhitelistContainer);