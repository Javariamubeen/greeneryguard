import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Crumbs from '../../shared/components/SubNavigations/crumbs';
import { GetProductById } from "./service";
import { fetchSingleFileSrc, fetchImagesSrcExceptFirstIndex } from "./product.helper";
import context from "../../Context";
import { CART } from "../../shared/modules/Enums/cartEnums";
import UserLayout from '../../shared/layouts/user';


const Description = (props) => {
    const { id } = props.match.params;
    const { state, dispatch } = useContext(context);
    const [product, setProduct] = useState({});
    useEffect(() => {
        async function fetchData() {
            const { data } = await GetProductById(id);
            setProduct(data);
        }
        fetchData();
    }, []);
    function addToCart(_id) {
        dispatch({ type: CART.ADD_TO_CART, _id })
    }
    return (
        <UserLayout>
        <div>
            <Crumbs path="Home/Products/ProductName" />
            <div className="product-description container">
                <div className="description-holder">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="big-img">
                                <figure>
                                    <img
                                        src={product && fetchSingleFileSrc(product)}
                                        alt="zo"
                                        className="img-fluid"
                                        style={{ height: "140px" }}
                                    />
                                </figure>
                            </div>
                            <div className="img-row">
                                {product && fetchImagesSrcExceptFirstIndex(product).map(src => (
                                    <div className="img-col">
                                        <figure>
                                            <img
                                                src={src}
                                                alt="zo"
                                                className="img-fluid"
                                                style={{ height: "140px" }}
                                            />
                                        </figure>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="content-block">
                                <h2>{product.title}</h2>
                                <div className="ratinng-row">
                                    <h5>Price: ${product.price}</h5>
                                </div>
                                <div className="txt">
                                    <p>{product.description}</p>
                                </div>
                                <ul className="check-list">
                                    <li>
                                        <span className="input-holder">
                                            <input checked={product.freeVersion} type="radio" id="rad150" name="rad" readOnly />
                                            <label htmlFor="rad150"></label>
                                        </span>
                                        <div className="txt-holder">
                                            <span className="title">Free Version</span>
                                            <span className="price">FREE</span>
                                        </div>
                                    </li>
                                    <li>
                                        <span className="input-holder">
                                            <input checked={!product.freeVersion} type="radio" id="rad250" name="rad" readOnly />
                                            <label htmlFor="rad250"></label>
                                        </span>
                                        <div className="txt-holder">
                                            <span className="title">Premium Version</span>
                                            <span className="price">${product.price}</span>
                                        </div>
                                    </li>
                                </ul>
                                <button onClick={() => addToCart(product._id)} className="btn btn-cart">Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </UserLayout>
    );
}

export default withRouter(Description);
