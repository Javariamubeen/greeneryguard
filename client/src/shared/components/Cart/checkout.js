import React, { useState, useContext } from "react";
import Context from './../../Context';
import { CART } from "../../shared/modules/Enums/cartEnums";
import { fetchSingleFileSrc } from "../../containers/Products/product.helper";
// import finances from "../../components/Homepage/images/finances.png";
import './styles.less'
const Checkout = () => {
    const [collapsed, setCollapsed] = useState(true);
    const { state, dispatch } = useContext(Context);
    function addQuantity(_id) {
        dispatch({ type: CART.ADD_QUANTITY, _id })
    }
    function subtractQuantity(_id) {
        dispatch({ type: CART.SUBTRACT_QUANTITY, _id })
    }
    function removeProduct(_id) {
        dispatch({ type: CART.REMOVE_FROM_CART, _id })
    }
    return (
        //     <div className="checkout-section">
        //         <div className="container">

        //             <div className="checkout-holder">
        //                 <h2>ZO ORGANIZED</h2>
        //                 <ul className="breadcrumbs">

        //                 </ul>
        //             </div>

        //             <div className="cart-section">
        //                 <div className="container">
        //                     <div className="cart-holder">
        //                     <ul className="cart-list">
        //             <li className="total">
        //               <span className="total-price">Total</span>
        //             </li>              
        //           </ul>
        //                     {
        //                       state.addedItems.map((item) => (
        //                         <ul className="cart-list">
        //                         <li>
        //                           <figure>
        //                           <img src={fetchSingleFileSrc(item)} alt="zo" className="img-fluid" />
        //                         </figure>
        //                         </li>
        //                         <li>
        //                           <span className="name">Finance Binder</span>
        //                           <a href="#">Remove</a>
        //                         </li>
        //                         <li>
        //                           <span className="product-price">${item.price}</span>
        //                         </li>
        //                         <li>
        //                           <input type="number"></input>
        //                         </li>
        //                         <li className="total">
        //                           <span className="total-price">${(item.price * item.quantity).toFixed(2)}</span>
        //                         </li> 
        //                       </ul>

        //                 ))}

        //                         <ul className="cart-list totol-list">
        //                             <li>
        //                                 <span className="subtotal">SUBTOTAL</span>
        //                             </li>
        //                             <li className="total">
        //                       <span className="total-price">${state.total.toFixed(2)}}</span>
        //                             </li>
        //                         </ul>

        //                     </div>
        //                 </div>
        //             </div>

        //         </div>
        //     </div>

        <div className="checkout-section">
            <div className="container">

                <div className="checkout-holder">
                    <h2>ZO ORGANIZED</h2>
                    <ul className="breadcrumbs">

                    </ul>
                </div>

                <div className="cart-section ">
                    <div className="container">
                        <div className="cart-holder">
                            <div className="cart-legnth">
                                {
                                    state.addedItems.map((item) => (
                                        <ul className="cart-list">
                                            <li>
                                                <figure>
                                                    <img src={fetchSingleFileSrc(item)} alt="zo" className="img-fluid" />
                                                </figure>
                                            </li>
                                            <li>
                                                <span className="name">{item.title}</span>
                                            </li>

                                            <li>
                                                <input type="text"></input>
                                            </li>
                                            <li className="total">
                                                <span className="total-price">${(item.price * item.quantity).toFixed(2)}</span>
                                            </li>
                                        </ul>
                                    ))}
                            </div>


                            <div className="cart-form-holder d-flex">
                                <input type="text" placeholder="Gift card or discount code"></input>
                                <button className="btn btn-apply"> Apply</button>
                            </div>
                            <div className="cart-form-holder mt-0 border-t-0">
                                <ul className="cart-list totol-list">
                                    <li>
                                        <span className="subtotal">Subtotal</span>
                                    </li>
                                    <li className="total">
                                        <span className="total-price">${state.total.toFixed(2)}</span>
                                    </li>
                                </ul>

                                <ul className="cart-list totol-list">
                                    <li>
                                        <span className="subtotal">Shoping</span>
                                    </li>
                                    <li className="total">
                                        <span className="total-price">calculate at next step</span>
                                    </li>
                                </ul>
                            </div>

                            <ul className="cart-list totol-list">
                                <li>
                                    <span className="subtotal">Total</span>
                                </li>
                                <li className="total">
                                    <span className="total-price">${state.total.toFixed(2)}</span>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}
export default Checkout;
