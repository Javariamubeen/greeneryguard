import React, { useState, useContext } from "react";
import Context from '../../../Context';
import { CART } from "../../modules/Enums/cartEnums";
import { fetchSingleFileSrc } from "../../Products/product.helper";
import { Link } from 'react-router-dom';

import './styles.css'
const Cart = () => {
    const [collapsed, setCollapsed] = useState(true);
    const { state, dispatch } = useContext(Context);
    function addQuantity(id) {
        dispatch({ type: CART.ADD_QUANTITY, id })
    }
    function subtractQuantity(id) {
        dispatch({ type: CART.SUBTRACT_QUANTITY, id })
    }
    function removeProduct(id) {
        dispatch({ type: CART.REMOVE_FROM_CART, id })
    }
    console.log("Added Items", state.addedItems);
    return (<div className="cart-section">
        <div className="container pt-3">
            <h6>Products</h6>
            <div className="cart-holder">
                <div className="table-responsive">
                    <div className="table-responsive">
                        <table className="table">
                            <tbody>
                            {
                                state.addedItems.map((item) => (
                                        <tr>
                                            <td className="border-0 allign-middle">
                                                <img src={fetchSingleFileSrc(item)} alt=""
                                                     width={70}
                                                     className="img-fluid rounded shadow-sm"/>
                                            </td>
                                            <th scope="row" className="border-0">
                                                <h5 className="mb-0"><a href="#"
                                                                        className="text-dark d-inline-block align-middle">{item.title}</a>
                                                </h5>
                                            </th>
                                            <td className="border-0 align-middle">
                                                <strong>${item.quantity}</strong></td>
                                            <td className="border-0 align-middle">
                                                <strong>${item.quantity * item.sellingPrice}</strong>
                                            </td>
                                        </tr>
                                    )
                                )
                            }
                            </tbody>
                            <tfoot>
                            <tr>
                                <td scope="col" className="border-0 bg-light">
                                    <div className="p-2 px-3 text-uppercase">Total</div>
                                </td>
                                <td scope="col" className="border-0 bg-light">
                                    <div className="py-2 text-uppercase"></div>
                                </td>
                                <td scope="col" className="border-0 bg-light">
                                    <div className="py-2 text-uppercase"></div>
                                </td>
                                <td scope="col" className="border-0 bg-light">
                                    <div
                                        className="py-2 text-uppercase">${state.total.toFixed(2)}</div>
                                </td>
                                <td scope="col" className="border-0 bg-light">
                                    <div className="py-2 text-uppercase"></div>
                                </td>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

            </div>

        </div>
    </div>)
};
export default Cart;
