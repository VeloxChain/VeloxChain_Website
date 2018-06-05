import React from "react";
import { connect } from "react-redux";
import { getResources } from "admin-on-rest";
import PropTypes from "prop-types";
import styles from "./Menu.style";
import logo from "../../../assets/images/favicon.png";
import ulabs from "../../../assets/images/ULABS.svg";
import { Link } from "react-router-dom";
import MenuItem from "material-ui/MenuItem";
import overview from "../../../assets/images/overview.png";
import preorder from "../../../assets/images/preorder.png";
import contributor from "../../../assets/images/contributor.png";

const Menu = ({onMenuTap, logout }) => (
  <div style={styles.menu}>
    <div className="text-center">
      <a href="/">
        <img src={logo} style={styles.logo} />
      </a>
      <img src={ulabs} style={styles.ulabs} />
    </div>
    <MenuItem
      containerElement={<Link to="/overview_contributors" />}
      primaryText="Overview"
      leftIcon={<img src={overview} style={styles.icon} />}
      onClick={onMenuTap}
      style={styles.item}
    />
    <MenuItem
      containerElement={<Link to="/contributors" />}
      primaryText="Whitelist"
      leftIcon={<img src={contributor} style={styles.icon} />}
      onClick={onMenuTap}
      style={styles.item}
    />
    <MenuItem
      containerElement={<Link to="/pre-order" />}
      primaryText="Pre-orders"
      leftIcon={<img src={preorder} style={styles.icon} />}
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