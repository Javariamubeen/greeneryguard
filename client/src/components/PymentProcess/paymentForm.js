import React, { useState, useContext, useEffect } from "react";
import { Breadcrumb, Input, Select, Radio } from 'antd';
import { Form, Icon, Button, Checkbox } from 'antd/lib';
import { StripeProvider, Elements } from 'react-stripe-elements'
import { Link } from 'react-router-dom';
import Cart from '../../shared/components/Cart/cart';
import {
    CardNumberElement,
    CardElement,
    CardExpiryElement,
    CardCVCElement,
    injectStripe
} from 'react-stripe-elements'
import axios from 'axios';
import { Loading } from '../../shared/modules/Loading/index';
import './style.css';
import './styles.css';
import './CheckoutForm.scss'
import { createCustomer, getShippingInfo, saveShipping } from './service';
const Option = Select.Option;
const FormItem = Form.Item;
const Payment = (props) => {
    //console.log("Stripe", stripe);
    const { getFieldDecorator } = props.form;
    const [receiptUrl, setReceiptUrl] = useState('');
    const [shipping, setShipping] = useState({
         email: '' ,
            firstName: '',
            lastName: '',
            address: '',
            appartment: '',
            country: '',
            state: '',
            zipCode: '',
        shippingMethod: '',
        customer: '',
        userId: '',
    });
    const [loading,setLoading]=useState({isLoading:false});

    useEffect(() => {
        async function fetchData() {
            //setState({ ...state, isLoading: true });
            setLoading({...loading,isLoading:true});
            const { data } = await getShippingInfo();
            console.log(data);
            if (data != null) {
                setShipping(data);
            }
            setLoading({...loading,isLoading:false});
            //setState({ ...state, isLoading: false });
        }
        fetchData();
    }, []);

    async function save(body) {
        setLoading({...loading,isLoading:true});
        const res = await saveShipping(body);
        if (res.status == 200) {
            props.history.push('/billingaddress');
        }
        setLoading({...loading,isLoading:false});
    }

    async function CreateCustomer() {
        const { token } = await props.stripe.createToken();
        const { data } = await createCustomer({
            source: token.id,
            email: shipping.email,
        });
        const body=shipping;
        body.customer= data.customer.id;
        await save(body);
    }
    async function handleSubmit(e) {
        e.preventDefault(props.stripe);
        props.form.validateFields((err, values) => {
            if (!err) {
                CreateCustomer();
            }
        });
    };
    if (receiptUrl) {
        return (
            <div className="success">
                <h2>Payment Successful!</h2>
                <a href={receiptUrl}>View Receipt</a>
                <Link to="/">Home</Link>
            </div>
        )
    }
    return (
        <div className="container">
            <br></br>
            <div className="row">
                <div className="col-md-7" style={{ paddingRight: "100px" }}>
                    <div className="">
                        <br></br>
                        <div>
                        {loading.isLoading ? <Loading /> :
                            <Form id="form" onSubmit={(e) => handleSubmit(e)} style={{ margin: 'auto' }}>

                                <div className="card" >
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <p className="card-text" style={{ float: "left" }}>Contact <span style={{ marginLeft: "25px" }}>{shipping.email}</span></p>
                                            <Link to="/checkout" style={{ float: "right" }}>
                                                <span style={{ float: "right" }}>Change</span>
                                            </Link>
                                        </li>
                                        <li className="list-group-item">
                                            <p className="card-text" style={{ float: "left" }}>Ship to <span style={{ marginLeft: "25px" }}>{`${shipping.address} ${shipping.state} ${shipping.zipCode} ${shipping.country}`}</span></p>
                                            <Link to="/checkout" style={{ float: "right" }}>
                                                <p className="card-text" style={{ float: "right" }}>Change</p>
                                            </Link></li>
                                        <li className="list-group-item">
                                            <p className="card-text" style={{ float: "left" }}>Method <span style={{ marginLeft: "25px" }}>{`${shipping.shippingMethod} `}</span></p>
                                            <Link to="/shipping" style={{ float: "right" }}>
                                                <p className="card-text" style={{ float: "right" }}>Change </p>
                                            </Link>
                                        </li>

                                    </ul>
                                </div>
                                <br></br>
                                <h6>Payment</h6>
                                <p>All transactions are secure and encrypted.</p>
                                <div className="card">
                                    <div className="card-header">
                                        <Radio.Group value={1}>
                                            <Radio value={1}>  Credit Card</Radio>
                                        </Radio.Group>

                                    </div>
                                    <div className="card-body">
                                        <div className="row checkout-form">
                                            <div className="col-md-12">
                                                <FormItem>
                                                    {getFieldDecorator('cardNumber', {
                                                        rules: [{ required: true, message: 'Required' }],
                                                        initialValue: ''
                                                    })(
                                                        <CardNumberElement className="form-control" />
                                                    )}
                                                </FormItem>
                                            </div>
                                            {/*<div className="col-md-12">*/}
                                            {/*    <FormItem>*/}
                                            {/*        {getFieldDecorator('nameOnCard', {*/}
                                            {/*            rules: [{ required: true, message: 'Required' }],*/}
                                            {/*            initialValue: ''*/}
                                            {/*        })(*/}
                                            {/*            <input*/}
                                            {/*                placeholder="Name on card" />*/}
                                            {/*        )}*/}
                                            {/*    </FormItem>*/}
                                            {/*</div>*/}
                                            <div className="col-md-6">
                                                <FormItem>
                                                    {getFieldDecorator('expire', {
                                                        rules: [{ required: true, message: 'Required' }],
                                                        initialValue: ''
                                                    })(
                                                        <CardExpiryElement className="form-control" />
                                                    )}
                                                </FormItem>
                                            </div>
                                            <div className="col-md-6">
                                                <FormItem>
                                                    {getFieldDecorator('securityCode', {
                                                        rules: [{ required: true, message: 'Required' }],
                                                        initialValue: ''
                                                    })(
                                                        <CardCVCElement className="form-control" />
                                                    )}
                                                </FormItem>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <br></br>
                                <div className="row">
                                    <div className="col-md-6" >
                                        <Link to="/checkout">
                                            <FormItem>
                                                <button style={{ float: "left" }} className="alazea-btn">
                                                    Return to information
                                            </button>
                                            </FormItem>
                                        </Link>
                                    </div>
                                    <div className="col-md-6">
                                        <FormItem>
                                            <button type="submit" style={{ float: "right" }} className="alazea-btn">
                                                Next
                                        </button>
                                        </FormItem>
                                    </div>
                                </div>

                            </Form>
}
                        </div>
                    </div>

                </div>
                <div className="col-md-5" style={{ backgroundColor: "#F5F5F5" }}>
                    <div className="container">
                        <Cart></Cart>
                    </div>
                </div>
            </div>
        </div>
    )
}
const Form1 = Form.create()(Payment);
export default injectStripe(Form1);
