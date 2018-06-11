import React, { Component } from "react";
import { Card } from "material-ui/Card";

import styles from "../PreSale/PreSaleComponent.styles";
import WhitelistList from "./WhitelistListComponent";

class WhitelistComponent extends Component {
  render() {
    return (
      <div>
        <Card style={styles.card}>
          <WhitelistList
            {...this.props}
          />
        </Card>
      </div>
    );
  }
}

export default WhitelistComponent;