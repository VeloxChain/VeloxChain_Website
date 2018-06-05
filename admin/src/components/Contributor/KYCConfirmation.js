import React, { Component } from "react";
import TextFieldForm from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import PropTypes from "prop-types";
import _ from "lodash";

import styles from "./ContributorComponent.style";
import avatar from "../../assets/images/avatar.png";
import coin from "../../assets/images/coin.png";

class KYCConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentContributor: {
        amount_contribute: 0,
        created_at: "",
        deleted_at: null,
        email: "",
        eth_address: "",
        first_name: "",
        id: 1,
        identification_link: "",
        identification_type: 1,
        is_confirmed_by_kyc:false,
        last_name:"",
        middle_name:"",
        nationality:"",
        selfie_with_ID_roof:"",
        updated_at:"",
      }
    };
  }

  componentDidMount() {
    if(!_.isEmpty(this.props.currentContributor)) {
      this.setState({
        currentContributor: this.props.currentContributor
      });
    }
  }

  onchangeCurrentContributorData = (newData) => {
    this.setState({
      currentContributor: {
        ...this.state.currentContributor,
        ...newData
      }
    });
  }

  render() {
    return (
      <div>
        <div style={styles.contentPopup}>
          <div style={styles.wrapp}>
            {
              _.isEmpty(this.state.currentContributor.selfie_with_ID_roof) ?
                <img src={avatar} style={styles.avatar} alt="Ulabs" />
                :
                <img style={styles.avatar} src={this.state.currentContributor.selfie_with_ID_roof} alt="Ulabs" />
            }
            <div style={styles.block}>
              <span style={styles.number}>{this.state.currentContributor.amount_contribute}</span>
              <img src={coin} style={styles.coin} alt="Ulabs" />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div style={styles.text}>
                <TextFieldForm
                  disabled={true}
                  floatingLabelText="Name"
                  name="name"
                  value={`${this.state.currentContributor.first_name || ""} ${this.state.currentContributor.middle_name || ""} ${this.state.currentContributor.last_name || ""}`}
                  fullWidth
                />
                <i className="fa fa-user" style={styles.icon} />
              </div>
            </div>
            <div className="col-sm-6">
              <div style={styles.text}>
                <TextFieldForm
                  floatingLabelText="Email"
                  name="email"
                  value={this.state.currentContributor.email}
                  onChange={e => this.onchangeCurrentContributorData({email: e.target.value})}
                  fullWidth
                />
                <i className="fa fa-envelope" style={styles.icon} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div style={styles.text}>
                <TextFieldForm
                  floatingLabelText="Location"
                  name="location"
                  value={this.state.currentContributor.nationality}
                  onChange={e => this.onchangeCurrentContributorData({nationality: e.target.value})}
                  fullWidth
                />
                <i className="fa fa-globe" style={styles.icon} />
              </div>
            </div>
            <div className="col-sm-6">
              
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div style={styles.text}>
                <TextFieldForm
                  floatingLabelText="ETH Address"
                  name="token"
                  value={this.state.currentContributor.eth_address}
                  onChange={e => this.onchangeCurrentContributorData({eth_address: e.target.value})}
                  fullWidth
                />
                <i className="fa fa-bullseye" style={styles.icon} />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div style={styles.file}>
                <span style={styles.textFile}>Selfie with ID Proof</span>
                <a target="_blank" href={this.state.currentContributor.selfie_with_ID_roof} style={styles.inputFile} />
                <i className="fa fa-cloud-upload" style={styles.iconUpload} />
              </div>
            </div>
            <div className="col-sm-6">
              <div style={styles.file}>
                <span style={styles.textFile}>ID Proof - Front and Back</span>
                <a target="_blank" href={this.state.currentContributor.identification_link} style={styles.inputFile} />
                <i className="fa fa-cloud-upload" style={styles.iconUpload} />
              </div>
            </div>
          </div>
        </div>
        <br/>
        <br/>
        <div style={styles.actions}>
          {
            this.state.currentContributor.is_confirmed_by_kyc == 1 ?
              <RaisedButton
                label="KYC Confirmed"
                disabled={true}
                primary={true}
                buttonStyle={styles.button_disable}
                style={styles.marginButton}
              />:
              <RaisedButton
                label="KYC Confirmation"
                primary={true}
                onClick={() => {this.props.handleCloseDialog(); this.props.callAPIKYCConfirmation(this.state.currentContributor.id);}}
                buttonStyle={styles.button}
                style={styles.marginButton}
              />
          }
          <RaisedButton
            label="Update"
            primary={true}
            onClick={() => {this.props.handleCloseDialog(); this.props.callAPIUpdateContribution(this.state.currentContributor);}}
            buttonStyle={styles.button}
            style={styles.marginButton}
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

KYCConfirmation.propTypes = {
  handleCloseDialog: PropTypes.func.isRequired,
  callAPIKYCConfirmation: PropTypes.func.isRequired,
  callAPIUpdateContribution: PropTypes.func.isRequired,
  currentContributor: PropTypes.object.isRequired,
};

export default KYCConfirmation;