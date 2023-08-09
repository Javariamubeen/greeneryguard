import React, {useContext, useEffect, useState} from "react";
import Context from './../../Context';
import {Radio, Select} from 'antd';
import {Form} from 'antd/lib';
import {Link} from 'react-router-dom';
import {CART} from "../../shared/modules/Enums/cartEnums";
import './style.css';
import {createOrder, postOrder} from './service';
import BreadCrumbNCover from "../../BreadCrumbNCover";

const Option = Select.Option;
const FormItem = Form.Item;
const BillingAddress = (props) => {

    const {getFieldDecorator} = props.form;

    const {state, dispatch} = useContext(Context);
    const [receiptUrl, setReceiptUrl] = useState('')

    function removeProduct(id) {
        debugger;
        dispatch({type: CART.REMOVE_FROM_CART, id})
    }

    const [loader, setLoader] = useState({
        isLoading: false,
    });
    const [paynow, setPaynow] = useState(false);
    useEffect(() => {
        function fetchData() {
            setReceiptUrl(localStorage.getItem('recp'));
        }

        fetchData();
    }, []);

    async function Order(data) {

        setLoader({...loader, isLoading: true});
        const OrderDetail = [];
        state.addedItems.forEach(element => {
            const obj =
                {
                    orderId: '',
                    prodductId: element ? element.id : null,
                    sellerId: element ? element.businessId : null,
                    orderNumber: '',
                    price: element ? element.price : 0,
                    quantity: element ? element.quantity : 0,
                    discount: 0,
                    total: element ? element.price : 0,
                }
            removeProduct(element.id)
            OrderDetail.push(obj);
        });
        const Order = {
            customerId: '',
            orderNumber: '',
            price: parseInt(state.total),
            shippingPrice: 0,
            salesTax: 0,
            total: parseInt(state.total),
        };
        const body = {
            Order: Order,
            OrderDetail: OrderDetail,
        }
        debugger;
        const getorder = await createOrder(body);
        const orderdata = {amount: parseInt(state.total)};
        const order = await postOrder(orderdata);
        localStorage.setItem('recp', order.data.charge.receipt_url);
        setReceiptUrl(order.data.charge.receipt_url);
        debugger;
        // setLoader({ ...loader, isLoading: false });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        props.form.validateFields((err, values) => {
            if (!err) {
                Order();
            }
        });
    };

    function onChange(e) {
        if (e.target.value == 2) {
            setPaynow(true);
            props.history.push('/payment');

            //localStorage.setItem('changeBillingAddress', 'changeBillingAddress');
        }
    };


    if (receiptUrl) {

        state.addedItems.forEach(element => {
            removeProduct(element.id)
        });

        return (
            <div>
                <BreadCrumbNCover pageName="CheckOut"/>
                <div className="container text-center mb-3">
                    <div className="success mb-3">
                        <h6 className="display-4">Your order has been successfully placed</h6>
                    </div>
                    <a className="alazea-btn mb-3" href={receiptUrl}>View Receipt</a>
                    <Link to="/" className="alazea-btn ml-2">Home</Link>
                </div>
            </div>
        )
    }
    return (
        <div>
            <BreadCrumbNCover pageName="Checkout"/>

            <div className="container">
                <br></br>
                <div className="row">
                    {/* {loader.isLoading ? <Loading /> :  */}
                    <div className="col-md-6" style={{paddingRight: "100px"}}>
                        <div className="">
                            <h6 style={{fontWeight: "300"}}>Billing Address</h6>
                            <p>Select the address that matches your card or payment method</p>
                            <br></br>
                            <div>
                                <Form id="form" onSubmit={(e) => handleSubmit(e)} style={{margin: 'auto'}}>
                                    <div className="card">
                                        {getFieldDecorator('shippingMethod', {
                                            rules: [{required: true, message: 'Required'}],
                                            initialValue: 1
                                        })(<Radio.Group onChange={onChange}>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">
                                                    <Radio value={1}>Same as shipping address
                                                    </Radio>
                                                </li>

                                                <li className="list-group-item">
                                                    <Radio value={2}>Use different billing address
                                                    </Radio>
                                                </li>
                                            </ul>
                                        </Radio.Group>)}
                                    </div>
                                    <br></br>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Link to="/shipping">
                                                <FormItem>
                                                    <button type="button" style={{float: "left"}}
                                                            className="alazea-btn">
                                                        Return to shipping
                                                    </button>
                                                </FormItem>
                                            </Link>
                                        </div>
                                        <div className="col-md-6">
                                            <FormItem>
                                                <button type="submit" disabled={paynow} style={{float: "right"}}
                                                        className="alazea-btn">
                                                    Pay now
                                                </button>
                                            </FormItem>
                                        </div>
                                    </div>

                                </Form>

                            </div>
                        </div>

                    </div>
                    {/* } */}
                </div>
            </div>
        </div>
    )
}
const Form1 = Form.create()(BillingAddress);
export default Form1;
