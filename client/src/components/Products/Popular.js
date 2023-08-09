import React, { Component } from "react";
import { ProductCard } from "./ProductCard";
import ApiService from "../../service/Api";
import { PRODUCT_URL } from "./Products"

export class PopularProducts extends Component {
  state = {
    loading: true,
    popularProducts: []
  }

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
   // let result = await ApiService.Products.getPopularProducts();

    this.setState({
      loading: false,
    //  popularProducts: result.data
    });
  }

  render() {
    if (this.state.loading === true) {
      return <div className="row">
        <div className="col-12 text-center">
          <span>Loading...</span>
        </div>
      </div>;
    }
    return (
      <div className="row">
        {/* <!-- Single Product Area --> */}
        {this.state.popularProducts.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            productName={item.title}
            productImage={item.imageLargeUrl}
            productPrice={item.sellingPrice}
            sellerName={item.businessProfile.name}
          />
        ))}
        <div className="col-12 text-center">
          <a href={PRODUCT_URL} className="btn alazea-btn">View All</a>
        </div>
      </div>
    );
  }
}
