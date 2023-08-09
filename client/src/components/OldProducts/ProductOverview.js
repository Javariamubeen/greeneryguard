import React, {Component} from "react";
import {connect } from 'react-redux'
// import {addItem} from '../../redux/actions/cartActions'
 class ProductOverview extends Component {


  // handleAddItem =  (e)=> {
  //   e.preventDefault();
  //   console.log(this.props.product, 'add item from ProductReview');
  //
  //   this.props.addItem(this.props.product);
  // }

  render() {
    // console.log("inside product overview", this.props)
    // console.log("product props", this.props.product)
    const product = this.props.product;
    console.log("props of this: ",this.props);
    return (
      <div className="my-3">
        <section className="single_product_details_area mb-50">
          <div className="produts-details--content mb-50">
            <div className="container">
              <div className="row justify-content-between">
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="single-product-area mb-50">
                    {/* Product Image */}
                    <div className="product-img">
                      <img src={product.imageLargeUrl} alt="" />
                      <div className="product-meta d-flex">
                        
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Product Info --> */}
                <div className="col-12 col-md-6">
                  <div className="single_product_desc">
                    <h4 className="title">{product.title}</h4>
                    <h4 className="price">{product.sellingPrice} AUD</h4>
                    <div className="short_overview">
                      <p>{product.description}</p>
                    </div>

                    <div className="cart--area d-flex flex-wrap align-items-center">
                      {/* <!-- Add to Cart Form --> */}
                      <form
                          className="cart clearfix d-flex align-items-center"
                          method="post"
                      >
                        {/*<button*/}
                        {/*    name="addtocart"*/}
                        {/*    value="5"*/}
                        {/*    className="alazea-btn ml-15"*/}
                        {/*    onClick={this.handleAddItem}*/}
                        {/*>*/}
                        {/*  Add to cart...*/}
                        {/*</button>*/}
                      </form>
                    </div>
                    <div className="products--meta">
                      <p>
                        <span>Name:</span> <span>{product.title}</span>
                      </p>
                      <p>
                        <span>Price:</span> <span>{product.sellingPrice}</span>
                      </p>
                      <p>
                        <span>Seller:</span> <span>{`${product.user.first_name} ${product.user.last_name}`}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default connect(null, {  })(ProductOverview)