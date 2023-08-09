import React, {useState, useContext, useEffect} from "react";
import "./styles.css";
import { Rate } from 'antd';
import { NavLink } from 'react-router-dom';
import { fetchSingleFileSrc } from "../../shared/Products/product.helper";
import { CART } from "../../shared/modules/Enums/cartEnums";
import context from './../../Context';
import {PERMISSIONS as USER_PERMISSIONS} from '../../shared/modules/Enums/PermissionEnums';
import {PERMISSIONS} from "../../shared/modules/Enums/StorageEnums";
import {Link} from 'react-router-dom';

const ProductCards = ({ item }) => {
    const { state, dispatch } = useContext(context);
    const [permissions, setPermissions] = useState(
        []
    );
    useEffect(() => {
        async function fetchData() {
            const userPermissions = localStorage.getItem(PERMISSIONS) ? JSON.parse(localStorage.getItem(PERMISSIONS)) : []
            setPermissions(userPermissions);
        }
        fetchData();
    }, []);
    function addToCart(id, quantity) {
        debugger;
        dispatch({ type: CART.ADD_TO_CART, id, quantity })
    }
    const [compState, setCompState] = useState({
        quantity: 1
    });
    const onQuantityChangeHandler = (e) => {
        let quantity = e.target.value;
        if (quantity < 0) {
            quantity = 0;
        }
        setCompState({ ...compState, quantity: quantity });
    }
    const decreaseQuantityHandler = () => {
        let quantity = compState.quantity;
        if (quantity > 1) {
            quantity--;
        }
        setCompState({ ...compState, quantity: quantity });
    }
    const increaseQuantityHandler = () => {
        let quantity = compState.quantity;
        quantity++;
        setCompState({ ...compState, quantity: quantity });
    }

    return (
        <div className="card-frame">
            <div className="card-holder">
               <div className='col-frame'>
               <figure>
                   <Link to={`/product/details/${item.id}`}>
                    <img
                        src={fetchSingleFileSrc(item)}
                        alt="zo"
                        //className="card-img-top"
                        style={{ height: "165px" }}
                    />
                   </Link>
                </figure>

                <div className="text-block">
                    <Link to={`/product/details/${item.id}`}><h3>{item && item.title}</h3></Link>
                    <div className="price-holder">
                        <span className="rating description">
                            {/*<Rate disabled defaultValue={5} />*/}
                            {item && item.description}
                        </span>
                        <div className="price">${item && item.price}</div>
                    </div>
                    <ul className="check-list d-none">
                        <li>
                            <span className="input-holder">
                                <input checked={item && item.freeVersion} type="radio" readOnly />
                                <label htmlFor="rad1"></label>
                            </span>
                            <div className="txt-holder">
                                <span className="title">Free asdfasdfasdfasdf Version</span>
                                <span className="price">FREE</span>
                            </div>
                        </li>
                        <li>
                            <span className="input-holder">
                                <input checked={item && !item.freeVersion} type="radio" readOnly />
                                <label htmlFor="rad2"></label>
                            </span>
                            <div className="txt-holder">
                                <span className="title">Premium Version</span>
                                <span className="price">${item && item.price}</span>
                            </div>
                        </li>
                    </ul>
                    <div className="counter-holder">
                        <span className="minus" onClick={decreaseQuantityHandler}>-</span>
                        <input type="text" value={compState.quantity} onChange={onQuantityChangeHandler}></input>
                        <span className="plus" onClick={increaseQuantityHandler}>+</span>
                    </div>
                    <a className="btn btn-card" onClick={() => addToCart(item.id, compState.quantity)}>Add to cart</a>
                    {
                        permissions && permissions.length && permissions.includes(USER_PERMISSIONS.ADD_ENQUIRY) ?
                           <Link className="btn btn-card" to={`/addEnquiry/${item.businessId}`}>Enquiry</Link> : ''
                    }
                    {/*<NavLink className="btn btn-view" style={{fontSize:'15px'}} to={`/product/${item && item.id}`}>*/}
                    {/*    View full product*/}
                    {/*</NavLink>*/}
                </div>
                </div>
            </div>
        </div>

    );
};

export default ProductCards;
