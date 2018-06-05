import React, { Component } from "react";
import { jsonServerRestClient, Admin, Resource, fetchUtils } from "admin-on-rest";

import DashboardContainer from "./containers/Dashboard/DashboardContainer";
import ContributorContainer from "./containers/Contributor/ContributorContainer";
import PreOrderContainer from "./containers/PreOrder/PreOrderContainer";
import AuthClient from "./service/AuthClient";
import Menu from "./containers/admin_on_rest_custom/menu/Menu";
import Logout from "./containers/admin_on_rest_custom/logout/Logout";
import Layout from "./containers/admin_on_rest_custom/layout/Layout";
import CustomAdminReducer from "./reducers/CustomAdminReducer";

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ 
      Accept: "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    });
  }
  options.headers.set("access_token", localStorage.getItem("token"));
  return fetchUtils.fetchJson(url, options);
};


class App extends Component {
  render() {
    return (
      <Admin
        customReducers={CustomAdminReducer}
        appLayout={Layout}
        menu={Menu}
        logoutButton={Logout}
        // authClient={AuthClient}
        title="Ulabs"
        restClient={jsonServerRestClient("/admin", httpClient)}
      >
        <Resource options={{ label: "Overview" }} name="overview_contributors" list={DashboardContainer} />
        <Resource name="contributors" options={{ label: "Whiteist" }} list={ContributorContainer} />
        <Resource name="pre-order" options={{ label: "Pre-orders" }} list={PreOrderContainer} />
        {/* <Resource name="transactions" options={{ label: "Transactions" }} list={TransactionContainer} /> */}
      </Admin>
    );
  }
}

export default App;

