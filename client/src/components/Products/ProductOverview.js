import React, {Component, useContext, useState} from "react";
import { fetchSingleFileSrc } from "../../shared/Products/product.helper";
import { CART } from "../../shared/modules/Enums/cartEnums";
import context from "../../Context";

 const ProductOverview = (props) => {
   const { state, dispatch } = useContext(context);
   const [quantity, setQuantity] = useState(1);
   function addToCart(id, quantity) {
     dispatch({ type: CART.ADD_TO_CART, id, quantity })
   }

   const increaseQuantity = (e) => {
     e.preventDefault();
     setQuantity(quantity+1);
   }

   const decreaseQuantity = (e) => {
     e.preventDefault();
     if (quantity > 2) {
       setQuantity(quantity - 1);
     }
   }

    const product = props.product;
    return (
      <div>
        <section className="single_product_details_area mb-50">
          <div className="produts-details--content mb-50">
            <div className="container">
              <div className="row justify-content-between">
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="single-product-area mb-50">
                    {/* Product Image */}
                    <div className="product-img">
                      <img src={fetchSingleFileSrc(product)} width="90%" alt="" />
                      <div className="product-meta d-flex">
                        
                      </div>
                    </div>
                  </div>
                </div>
                {props.showQuantityInput}
                {/* <!-- Product Info --> */}
                <div className="col-12 col-md-6">
                  <div className="single_product_desc">
                    <h4 className="title">{product.title}</h4>
                    <h4 className="price">${product.sellingPrice}</h4>
                    <div className="short_overview">
                      <p>{product.description}</p>
                    </div>

                    <div className={`${props.showQuantityInput ? 'cart--area d-flex flex-wrap align-items-center' : 'd-none'}`}>
                      {/* <!-- Add to Cart Form --> */}
                      <form
                        className="cart clearfix d-flex align-items-center"
                        method="post"
                      >

                        <div class="quantity">
                          <span class="qty-minus" onClick={decreaseQuantity}><i class="fa fa-minus" aria-hidden="true"></i></span>
                          <input type="number" class="qty-text" id="qty" step="1" min="1" max="12" name="quantity" value={quantity} />
                            <span class="qty-plus" onClick={increaseQuantity} onclick="var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty )) effect.value++;return false;"><i class="fa fa-plus" aria-hidden="true"></i></span>
                        </div>

                        <button
                          name="addtocart"
                          value="5"
                          type="button"
                          className="alazea-btn"
                          onClick={() => addToCart(product.id, quantity)}
                        >
                          Add to cart
                        </button>
                      </form>
                    </div>
                    <div className="products--meta">
                      <p>
                        <span>Name:</span> <span>{product.title}</span>
                      </p>
                      <p>
                        <span>Price:</span> <span>${product.sellingPrice}</span>
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

ProductOverview.defaultProps = {
  showQuantityInput: true
}

export default ProductOverview
