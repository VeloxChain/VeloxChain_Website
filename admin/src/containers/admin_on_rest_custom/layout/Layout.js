import React, { createElement, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import CircularProgress from "material-ui/CircularProgress";
import { AppBar } from "material-ui";
import { toggleSidebar } from "admin-on-rest";
import IconButton from "material-ui/IconButton";
import logo from "../../../assets/images/logo.svg";
import iconMenu from "../../../assets/images/Menu.png";

import {
  Menu,
  Notification,
  Sidebar,
  setSidebarVisibility,
} from "admin-on-rest";
import styles from "./Layout.style";

class Layout extends Component {
  componentDidMount() {
    this.props.setSidebarVisibility(true);
  }

  render() {
    const {
      children,
      dashboard,
      isLoading,
      logout,
      menu
    } = this.props;

    return (
      <MuiThemeProvider>
        <div style={styles.wrapper}>
          <div style={styles.main}>
            <div className="body" style={styles.body}>
              <div style={styles.content}>
                <AppBar
                  title={
                    <div className="text-center">
                      <img src={logo} style={styles.logoTopBar} alt="Ulabs" />
                    </div>
                  }
                  style={styles.appBar}
                  iconElementLeft={<IconButton onClick={() => {this.props.toggleSidebar();}}><img src={iconMenu} alt="Ulabs" /></IconButton>}
                />
                <div style={styles.children}>
                  {children}
                </div>
              </div>
              <Sidebar>
                {createElement(menu || Menu, {
                  logout,
                  hasDashboard: !!dashboard,
                })}
              </Sidebar>
            </div>
            <Notification />
            {isLoading && (
              <CircularProgress
                color="#fff"
                size={30}
                thickness={2}
                style={styles.loader}
              />
            )}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Layout.propTypes = {
  authClient: PropTypes.func,
  dashboard: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  isLoading: PropTypes.bool.isRequired,
  menu: PropTypes.func,
  resources: PropTypes.array,
  setSidebarVisibility: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  children: PropTypes.object,
  logout: PropTypes.object
};

const mapStateToProps = state => ({ isLoading: state.admin.loading > 0 });
export default connect(mapStateToProps, { setSidebarVisibility, toggleSidebar })(Layout);