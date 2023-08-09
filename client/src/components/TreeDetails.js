import React, { Component } from "react";

export default class TreeDetails extends Component {
  static defaultProps = {
    productName: null,
    productImage:
      "https://www.microboss.com.au/media/catalog/product/placeholder/default/not-available.png",
    productPrice: null,
    sellerName: null,
    description: null,
  };
  constructor(props) {
    super(props);
    console.log("props", props);
  }

  render() {
    //const description = JSON.parse(this.props.description);
    console.log("desc", this.props.description);
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="product_details_tab clearfix">
              {/* <!-- Tabs --> */}
              <ul
                className="nav nav-tabs"
                role="tablist"
                id="product-details-tab"
              >
                <li className="nav-item">
                  <a
                    href="#description"
                    className="nav-link active"
                    data-toggle="tab"
                    role="tab"
                  >
                    Description
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#addi-info"
                    className="nav-link"
                    data-toggle="tab"
                    role="tab"
                  >
                    Seller Information
                  </a>
                </li>
              </ul>
              {/* <!-- Tab Content --> */}
              <div className="tab-content">
                <div
                  role="tabpanel"
                  className="tab-pane fade show active"
                  id="description"
                >
                  <div className="description_area">
                    <p>{this.props.description}</p>
                  </div>
                </div>
                <div role="tabpanel" className="tab-pane fade" id="addi-info">
                  <div className="additional_info_area">
                    <p>Seller name: {this.props.businessProfile.name}</p>
                    <p>Address: {this.props.businessProfile.address}</p>
                    <p>Email: {this.props.businessProfile.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
