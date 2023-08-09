import React from "react";
import { Link } from "react-router-dom";
import { PRODUCT_URL } from "./Products";
import {PERMISSIONS} from "../../shared/modules/Enums/StorageEnums";
import {PERMISSIONS as USER_PERMISSIONS} from '../../shared/modules/Enums/PermissionEnums';

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
const permissions=localStorage.getItem(PERMISSIONS)
  return (
    <div className="col-12 col-sm-6 col-lg-4">
      <div className="single-product-area mb-50">
        <Link to={`/product/details/${id}`}>
          {/* Product Image */}
          <div className="product-img border">
            <img src={productImage} alt="" />
            <div className="product-meta d-block">
              <button
                id="add-to-cart-mini"
                className="alazea-btn "
                onClick={onAddToCardClicked}
              >
                Add to Cart
              </button>
              {
                permissions && permissions.length && permissions.includes(USER_PERMISSIONS.ADD_ENQUIRY) ?
                    <Link style={{marginTop:"10px"}} className="alazea-btn" to={`/addEnquiry/${id}`}>Enquiry</Link> : ''
              }
            </div>
          </div>
          {/* Product Info */}
          <div className="product-info mt-15 text-center">
            <h6>{productName}</h6>
            <p className="mb-0">{sellerName}</p>
            <p className="mb-0">${productPrice}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
