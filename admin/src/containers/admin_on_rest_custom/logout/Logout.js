import React from "react";
import { connect } from "react-redux";
import { userLogout } from "admin-on-rest";
import styles from "./Logout.style";
import logout from "../../../assets/images/logout.png";
import PropTypes from "prop-types";

const Logout = (props) => {
  const { userLogout } = props;
  return (
    <div onClick={userLogout} style={styles.logout}>
      <img src={logout} style={styles.icon} alt="Bikecoin" />
      <div style={styles.text}>Logout</div>
    </div>
  );
};

Logout.propTypes = {
  userLogout: PropTypes.func
};

export default connect(undefined, { userLogout })(Logout);
