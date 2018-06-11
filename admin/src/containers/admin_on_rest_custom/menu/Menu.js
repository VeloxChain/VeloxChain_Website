import React from "react";
import { connect } from "react-redux";
import { getResources } from "admin-on-rest";
import PropTypes from "prop-types";
import styles from "./Menu.style";
import logo from "../../../assets/images/iconBike.png";
import { Link } from "react-router-dom";
import MenuItem from "material-ui/MenuItem";
import presale from "../../../assets/images/newspaper.png";
import whitelist from "../../../assets/images/whitelist.png";

const Menu = ({onMenuTap, logout }) => (
  <div style={styles.menu}>
    <div className="text-center">
      <a href="/">
        <img src={logo} style={styles.logo} alt="Bikecoin" />
      </a>
    </div>
    <MenuItem
      containerElement={<Link to="/whitelist" />}
      primaryText="whitelist"
      leftIcon={<img src={whitelist} style={styles.icon} alt="Bikecoin" />}
      onClick={onMenuTap}
      style={styles.item}
    />
    <MenuItem
      containerElement={<Link to="/pre-sale" />}
      primaryText="Pre-sale"
      leftIcon={<img src={presale} style={styles.icon} alt="Bikecoin" />}
      onClick={onMenuTap}
      style={styles.item}
    />
    {logout}
  </div>
);

Menu.propTypes = {
  onMenuTap: PropTypes.func.isRequired,
  logout: PropTypes.object,
};

const mapStateToProps = state => ({
  resources: getResources(state),
});
export default connect(mapStateToProps)(Menu);