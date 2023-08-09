import React, {useState, useContext} from "react";
import Context from '../../../Context';
import {CART} from "../../modules/Enums/cartEnums";
import {fetchSingleFileSrc} from "../../Products/product.helper";
import {Link} from 'react-router-dom';
import BreadCrumbNCover from "../../../BreadCrumbNCover";
//import UserLayout from '../../shared/layouts/user';
import './styles.css'

const ViewCart = () => {
    const [collapsed, setCollapsed] = useState(true);
    const {state, dispatch} = useContext(Context);

    function addQuantity(id) {
        dispatch({type: CART.ADD_QUANTITY, id})
    }

    function subtractQuantity(id) {
        dispatch({type: CART.SUBTRACT_QUANTITY, id})
    }

    function removeProduct(id) {
        dispatch({type: CART.REMOVE_FROM_CART, id})
    }

    return (
        <div>
            <BreadCrumbNCover pageName="Cart"/>

            <div className="px-4 px-lg-0">
                <div className="container text-white py-5 text-center">
                    {/*<h1 className="display-4">Your order detail</h1>*/}

                    {/*<p className="lead mb-0">Please confirm your order with detail shipping address. </p>*/}

                    <div className="pb-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                                    {/* Shopping cart table */}
                                    <div className="table-responsive">
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th colspan="2" scope="col" className="border-0 bg-light">
                                                        <div className="p-2 px-3 text-uppercase">Product</div>
                                                    </th>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="py-2 text-uppercase">Price</div>
                                                    </th>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="py-2 text-uppercase">Quantity</div>
                                                    </th>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="py-2 text-uppercase">Total</div>
                                                    </th>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="py-2 text-uppercase">Remove</div>
                                                    </th>
                                                </tr>
                                                </thead>
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
                                                                    <h5 className="text-dark d-inline-block align-middle">{item.title}
                                                                    </h5>
                                                                </th>
                                                                <td className="border-0 align-middle">
                                                                    <strong>${item.sellingPrice}</strong></td>
                                                                <td className="border-0 align-middle"><strong> <span
                                                                    className='adjust-quantity' style={{cursor: 'pointer'}}
                                                                    onClick={() => subtractQuantity(item.id)}>-</span> {item.quantity}
                                                                    <span className='adjust-quantity'
                                                                          style={{cursor: 'pointer'}}
                                                                          onClick={() => addQuantity(item.id)}>+</span></strong>
                                                                </td>
                                                                <td className="border-0 align-middle">
                                                                    <strong>{item.quantity * item.sellingPrice}</strong>
                                                                </td>
                                                                <td className="border-0 align-middle"><i
                                                                    className="fa fa-trash"
                                                                    onClick={() => removeProduct(item.id)}/></td>
                                                            </tr>
                                                        )
                                                    )
                                                }
                                                </tbody>
                                                <tfoot>
                                                <tr>
                                                    <td scope="col" className="border-0 bg-light">
                                                        <div className="p-2 px-3 text-uppercase">Total Cart</div>
                                                    </td>
                                                    <td scope="col" className="border-0 bg-light">
                                                        <div className="py-2 text-uppercase"></div>
                                                    </td>
                                                    <td scope="col" className="border-0 bg-light">
                                                        <div className="py-2 text-uppercase"></div>
                                                    </td>
                                                    <td scope="col" className="border-0 bg-light">
                                                        <div
                                                            className="py-2 text-uppercase">{state.total.toFixed(2)}</div>
                                                    </td>
                                                    <td scope="col" className="border-0 bg-light">
                                                        <div className="py-2 text-uppercase"></div>
                                                    </td>
                                                    <td scope="col" className="border-0 bg-light">
                                                        <div className="py-2 text-uppercase"></div>
                                                    </td>
                                                </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>

                                    {
                                        state.addedItems.length > 0 ?
                                            <div className="">
                                                <Link to={'/checkout'} className="alazea-btn ">Pay with Stripe</Link>:''
                                                <span className={`pl-2`}>
                    <Link to={'/paypal'} className="alazea-btn">Pay with PayPal</Link>
                        </span>
                                            </div> :
                                            <div className="">
                                                <Link to={'/checkout'} className="alazea-btn disabled-link">Pay with Stripe</Link>:''
                                                <span className={`pl-2`}>
                    <Link to={'/paypal'} className="alazea-btn disabled-link">Pay with PayPal</Link>
                        </span>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
};
export default ViewCart;
