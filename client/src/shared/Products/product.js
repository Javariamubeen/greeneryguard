import React, { useState, useContext } from "react";
import {ProductCard} from '../../components/Products/ProductCard';
import { fetchSingleFileSrc } from "../../shared/Products/product.helper";
import { CART } from "../../shared/modules/Enums/cartEnums";
import context from './../../Context';

const Product = (props) => {
    const { state, dispatch } = useContext(context);
    const {data} = props;
    const offset=(props.pageNo-1)*props.pageSize;
    const limit=offset+props.pageSize;
    function addToCart(id, quantity) {
        dispatch({ type: CART.ADD_TO_CART, id, quantity })
    }

    return (
        <div className="container">
                <div className="row">
                    {
                        !data.length ? <h6>No data found</h6>
                            :
                            data.map((item, index) => (
                                <ProductCard
                                    key={item.id}
                                    id={item.id}
                                    productName={item.title}
                                    productImage={fetchSingleFileSrc(item)}
                                    productPrice={item.sellingPrice}
                                    sellerName={`${item.user.first_name} ${item.user.last_name}`}
                                    onAddToCardClick={() => addToCart(item.id, 1)}
                                />
                                )
                            )
                    }
                </div>
        </div>
    );
};

export default Product;
