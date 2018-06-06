import React, { Component } from "react";
import TextFieldForm from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import PropTypes from "prop-types";
import _ from "lodash";

import styles from "./PreSaleComponent.styles";

class PreSaleComponentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPreSale: {
        full_name: "",
        email: "",
        is_investor: "",
        represent_type: "",
        desired_allocation: "",
        citizenship: "",
        sending_addr: "",
        note: "",
        created_at: "",
        updated_at: "",
        deleted_at: null
      }
    };
  }

  componentDidMount() {
    if(!_.isEmpty(this.props.currentPreSale)) {
      this.setState({
        currentPreSale: this.props.currentPreSale
      });
    }
  }

  onChangeCurrentPreSale = (newData) => {
    this.setState({
      currentPreSale: {
        ...this.state.currentPreSale,
        ...newData
      }
    });
  }

  render() {
    return (
      <div>
        <div style={styles.contentPopup}>
          <div className="row">
            <div className="col-sm-6">
              <div style={styles.text}>
                <TextFieldForm
                  floatingLabelText="Full Name"
                  name="full_name"
                  value={this.state.currentPreSale.full_name || ""}
                  onChange={e => this.onChangeCurrentPreSale({full_name: e.target.value})}
                  fullWidth
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div style={styles.text}>
                <TextFieldForm
                  floatingLabelText="Email"
                  name="email"
                  value={this.state.currentPreSale.email || ""}
                  onChange={e => this.onChangeCurrentPreSale({email: e.target.value})}
                  fullWidth
                />
              </div>
            </div>
          </div>
        </div>
        <div style={styles.actions}>
          <RaisedButton
            label="Cancel"
            primary={true}
            style={styles.buttonAction}
            onClick={this.props.handleCloseDialog}
          />
          <RaisedButton
            label="Update"
            primary={true}
            style={styles.buttonAction}
          />
        </div>
        <i
          className="fa fa-times"
          style={styles.close}
          onClick={this.props.handleCloseDialog}
        />
      </div>
    );
  }
}

PreSaleComponentDetail.propTypes = {
  handleCloseDialog: PropTypes.func.isRequired,
  currentPreSale: PropTypes.object.isRequired,
};

export default PreSaleComponentDetail;