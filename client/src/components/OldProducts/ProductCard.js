import React from "react";
import { Link } from "react-router-dom";
import { PRODUCT_URL } from "./Products";

export function ProductCard(props) {
  let {
    id,
    productName,
    productImage,
    productUrl,
    productPrice,
    sellerName,
    onAddToCardClick,
  } = props;

  productImage = productImage ? productImage : "img/product-not-found.png";

  const onAddToCardClicked = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // console.log("adding to cart ", event, props);
    onAddToCardClick();
  };

  return (
    <div className="col-12 col-sm-6 col-lg-4">
      <div className="single-product-area mb-50">
        <Link to={`${PRODUCT_URL}/${id}`}>
          {/* Product Image */}
          <div className="product-img border">
            <img src={productImage} alt="" />
            <div className="product-meta d-flex">
              <button
                id="add-to-cart-mini"
                className="btn alazea-btn"
                onClick={onAddToCardClicked}
              >
                Add to Cart
              </button>
            </div>
          </div>
          {/* Product Info */}
          <div className="product-info mt-15 text-center">
            <h6>{productName}</h6>
            <p className="mb-0">{sellerName}</p>
            <p className="mb-0">{productPrice} AUD</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
