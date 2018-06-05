import React, { Component } from "react";
import { jsonServerRestClient, Admin, Resource, fetchUtils } from "admin-on-rest";

import PreSaleContainer from "./containers/PreSale/PreSaleContainer";
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
        <Resource name="pre-sale" options={{ label: "Pre-sale" }} list={PreSaleContainer} />
      </Admin>
    );
  }
}

export default App;

