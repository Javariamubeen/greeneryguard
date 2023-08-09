import React, { useState, useEffect } from "react";
import { Breadcrumb, Input, Select, Radio } from 'antd';
import { Form, Icon, Button, Checkbox } from 'antd/lib';
import { Link } from 'react-router-dom';
import Cart from '../../shared/components/Cart/cart';
import './style.css';
import { Loading } from '../../shared/modules/Loading/index';
import { getShippingInfo, saveShipping, getOrderList } from './service';
import BreadCrumbNCover from "../../BreadCrumbNCover";
const Option = Select.Option;
const FormItem = Form.Item;
const Shipping = (props) => {

    const { getFieldDecorator } = props.form;

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
            setLoading({...loading,isLoading:true});

            const { data } = await getShippingInfo();
            //const res = await getOrderList();
            if (data != null) {
                setShipping(data);
            }
            setLoading({...loading,isLoading:false});
        }
        fetchData();
    }, []);


    async function save(body) {
        setLoading({...loading,isLoading:true});
        const res = await saveShipping(body);
        if (res.status == 200) {
            if (shipping.customer != "") {
                props.history.push('/billingaddress');
            }
            else {
                props.history.push('/payment');
            }
        }
        setLoading({...loading,isLoading:false});
    }


    async function handleSubmit(e) {
        e.preventDefault();

        props.form.validateFields((err, values) => {
            if (!err) {
                // const body = {
                //     contactInformation: shipping.contactInformation,
                //     shippingAddress: shipping.shippingAddress,
                //     shippingMethod: values.shippingMethod,
                //     customer: shipping.customer,
                //     userId: shipping.userId,
                // }
                const body = shipping;
                body.shippingMethod=values.shippingMethod;
                save(body)
            }
        });
    };

    return (
        <div>
        <BreadCrumbNCover pageName="Shipping" />
       
            <div className="container">
                <br></br>
                <div className="row">
                    <div className="col-md-6" style={{ paddingRight: "100px" }}>
                        <div className="">
                            {/*<Breadcrumb separator=">">*/}
                            {/*    <Breadcrumb.Item style={{ color: 'black' }}>Cart</Breadcrumb.Item>*/}
                            {/*    <Breadcrumb.Item style={{ color: 'black' }}>Information</Breadcrumb.Item>*/}
                            {/*    <Breadcrumb.Item style={{ color: 'blue' }}>Shipping</Breadcrumb.Item>*/}
                            {/*    <Breadcrumb.Item>Payment</Breadcrumb.Item>*/}
                            {/*</Breadcrumb>*/}
                            <br></br>
                            <div>
                            {/* {loading.isLoading ? <Loading /> : */}
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
                                        </ul>
                                    </div>
                                    <br/>
                                    <h6>Shipping Method</h6>
                                    <br/>
                                    <div className="card" >
                                        {getFieldDecorator('shippingMethod', {
                                            rules: [{ required: true, message: 'Required' }],
                                            initialValue: shipping.shippingMethod
                                        })(<Radio.Group >
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">
                                                    <Radio value='Flat Rate'>Flat Rate
                                        </Radio>
                                                    <span style={{ float: "right" }}><b>Free</b></span>
                                                </li>

                                                <li className="list-group-item">
                                                    <Radio value='Free Shipping'>Free Shipping
                                        </Radio>
                                                    <span style={{ float: "right" }}><b>Free</b></span>
                                                </li>
                                            </ul>
                                        </Radio.Group>)}
                                    </div>
                                    <br></br>
                                    <div className="row">
                                        <div className="col-md-6" >
                                            <Link to="/checkout">
                                                <FormItem>
                                                    <button type="button" style={{ float: "left" }} className="alazea-btn">
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
{/* } */}
                            </div>
                        </div>

                    </div>
                    <div className="col-md-6" style={{ backgroundColor: "#F5F5F5" }}>
                        <div className="container">
                            <Cart></Cart>
                        </div>
                    </div>
                </div>
            </div>
</div>
    )
}
const Form1 = Form.create()(Shipping);
export default Form1;