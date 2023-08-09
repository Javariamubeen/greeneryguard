import React, { Component } from "react";
import BreadCrumbNCover from "../../BreadCrumbNCover";
import ProductOverview from "./ProductOverview";
import TreeDetails from "../TreeDetails";
import ApiService from "../../service/Api";
import { withRouter } from "react-router-dom";

const pageName = "Product Details";

export class ProductDetails extends Component {
  constructor(props) {
    super(props);
  }
  

  render() {
    // console.log("render product details");

    if (this.state == null) return <div></div>;
    return (
      <div>
        <BreadCrumbNCover pageName={pageName} />
        <ProductOverview product={this.state.product} />
        <TreeDetails {...this.state.product} />
      </div>
    );
  }
}

export default withRouter(ProductDetails);
