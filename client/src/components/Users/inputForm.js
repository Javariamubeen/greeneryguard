import React, { useState, useEffect } from "react";
import {Form, Icon, Input, Button, Checkbox, Select} from 'antd/lib';
import { Breadcrumb, Layout, Menu, Table, Tag } from 'antd';
//import SideMenu from '../../SideMenu/SideMenu';
import toastr from 'toastr';
//import { Loading } from '../../../shared/modules/Loading/index';
import { Link } from "react-router-dom";
import axios from "axios";
 import './style.css';
import { addUser, updateUser, GetUserById } from "./service";
import { API_URL, ImageUrl } from '../../apis/request';

//import AdminLayout from '../../../shared/layouts/admin';
import 'antd/dist/antd.css';
import BreadCrumbNCover from "../../BreadCrumbNCover";
import {Register,updateUserAPI} from "../auth/service";
import {Formik} from "formik";
import * as Yup from "yup";
// import { updateMyProfile } from "../Profile/service";
const { Content, Sider } = Layout;
const FormItem = Form.Item;

const validationSchema = Yup.object({
    first_name: Yup.string()
        .matches(/^[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890]+$/, 'First Name can only contain alphabets and numbers')
        .required("First Name is required!"),
    last_name: Yup.string()
        .matches(/^[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890]+$/, 'Last Name can only contain alphabets and numbers')
        .required("Last Name is required!"),
    business_name: Yup.string()
        .matches(/^[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890]+$/, 'Business Name can only contain alphabets and numbers'),
    // .required("Business Name is required!"),
    // BusinessAddress: Yup.string().required("Business Address is required!"),
    abn: Yup.string()
        .matches(/^[1234567890]+$/, 'ABN can only contain numbers')
        .min(11, "ABN must contain 11 characters")
        .max(11, "Max limit 11 characters"),
    // .required("ABN is required!"),
    // username: Yup.string().required("Username is required!"),
    email: Yup.string().required("Email is required!"),
    business_address: Yup.string(),
    password: Yup.string().required("Password is required!"),
    primary_role: Yup.string().required('Role is required!'),
    phone_number: Yup.number()
        // .required('Phone Number is required!')
        .min(10, "Phone Number must contain 10 characters")
});

const InputForm = (props) => {
    let url = props.location.pathname;
    let split = url.split("/");
    let id = split[2];
    const [state, setState] = useState({
        Title: 'Add',
        isLoading: false,
        deleteImages: [],
        images: [],
    });

    const [product, setProduct] = useState({
    });

    const [files, setFiles] = useState([]);
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        async function loadData() {
            if (id != undefined) {
                setState({ ...state, Title: 'Update', isLoading: true });
                const { data } = await GetUserById(id);
                debugger
                setProduct(data);
                setState({ ...state, id: id, Title: 'Update', isLoading: false });
            }
        }
        loadData();
    }, []);
    const { getFieldDecorator } = props.form;

    async function RegisterUser(body) {
        setState({ ...state, isLoading: true });
        try {
            const { data } = await Register(body);
            //authContext.authenticateUser(data.access_token);
            props.history.push('/userList');
            toastr.success("User registered successfully", "");
        }
        catch (err) {
            if (err.message == "1")
                toastr.error("User name is already taken", "");
            else
                toastr.error("Email is already taken", "");
        }
        setState({ ...state, isLoading: false });
    }
    async function updateUser(body) {
        setState({ ...state, isLoading: true });
        try {
            const { data } = await updateUserAPI(body,id);
            //authContext.authenticateUser(data.access_token);
            props.history.push('/userList');
            toastr.success("User updated successfully", "");

        }
        catch (err) {
            if (err.message == "1")
                toastr.error("User name is already taken", "");
            else
                toastr.error("Email is already taken", "");
        }
        setState({ ...state, isLoading: false });
    }

    // async function handleSubmit(e) {
    //     e.preventDefault();
    //     props.form.validateFields((err, values) => {
    //         if (!err) {
    //             if (id == undefined) {
    //                 RegisterUser(values);
    //             }else{
    //                 updateUser(values)
    //             }
    //         }
    //     });
    // };
    console.log("product for eidt", product)

    return (
<div>
        <BreadCrumbNCover pageName="Update User" />
        <Layout>
            <content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}
            >
                <div className='pt-3'>
                    {/* {state.isLoading ? <Loading /> : */}
                    <div className="col-md-9 mx-auto card shadow py-5">
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            first_name: product.first_name,
                            last_name: product.last_name,
                            phone_number: product.phone_number,
                            BusinessName: product.business_name,
                            BusinessAddress: product.business_address,
                            ABN: product.abn,
                            username: product.username,
                            email: product.email,
                            password: product.password,
                            primary_role: product.primary_role || 'buyer'
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                                    if (id == undefined) {
                                        RegisterUser(values);
                                    }else{
                                        updateUser(values)
                                    }
                        }}
                    >
                        {({handleSubmit,touched, setFieldValue, handleChange, isSubmitting, values, errors}) => {
                            const handleMakeChange = (e) => {
                                setFieldValue('primary_role', e.target.value)
                            }
                            return (
                                <form onSubmit={handleSubmit} style={{width: '100%'}}>

                                    <div className="row">
                                    <div className={`form-group col-md-6`}>
                                        <input className={`form-control`} name="first_name"
                                               prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                               onChange={handleChange}
                                               value={values.first_name} placeholder="First Name"/>
                                        {errors.first_name && touched.first_name && <span className="text-danger">{errors.first_name}</span>}
                                    </div>
                                    <div className={`form-group col-md-6`}>
                                        <input className={`form-control`} onChange={handleChange} name="last_name"
                                               value={values.lastName}
                                               prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                               placeholder="Last Name"/>
                                        {errors.last_name && touched.last_name && <span className="text-danger">{errors.last_name}</span>}
                                    </div>
                                    {
                                        values.primary_role==='buyer' ?
                                            <div className={`form-group col-md-6`}>
                                                <input className={`form-control`}
                                                       maxLength={10}
                                                       onChange={handleChange}
                                                       name="phone_number"
                                                       value={values.phone_number}
                                                       prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                                       placeholder="Phone Number"/>
                                                {errors.phone_number && touched.phone_number && <span className="text-danger">{errors.phone_number}</span>}
                                            </div> : ""
                                    }
                                    {
                                        values.primary_role!=='buyer' ?
                                            <div className={`form-group col-md-6`}>
                                                <input className={`form-control`} onChange={handleChange}
                                                       name="business_name"
                                                       value={values.business_name}
                                                       prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                                       placeholder="Business Name"/>
                                                {errors.business_name && touched.business_name && <span className="text-danger">{errors.business_name}</span>}
                                            </div> : ""
                                    }
                                    {
                                        values.primary_role!=='buyer' ?
                                            <div className={`form-group col-md-6`}>
                                                <input className={`form-control`} onChange={handleChange}
                                                       name="business_address"
                                                       value={values.business_address}
                                                       prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                                       placeholder="Business Address"/>
                                                {errors.business_address && touched.business_address && <span className="text-danger">{errors.business_address}</span>}
                                            </div> : ""
                                    }
                                    {
                                        values.primary_role!=='buyer' ?
                                            <div className={`form-group col-md-6`}>
                                                <input className={`form-control`} onChange={handleChange} name="abn" maxLength={11}
                                                       value={values.abn}
                                                       prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                                       placeholder="ABN"/>
                                                {errors.abn && touched.abn && <span className="text-danger">{errors.abn}</span>}
                                            </div> : ""
                                    }
                                    {
                                        values.primary_role!=='buyer' ?
                                            <div className={`form-group col-md-6`}>
                                                <input className={`form-control`} onChange={handleChange}
                                                       name="username"
                                                       value={values.username}
                                                       prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                                       placeholder="User Name"/>
                                                {errors.username && touched.username && <span className="text-danger">{errors.username}</span>}
                                            </div> : ""
                                    }
                                    <div className={`form-group col-md-6`}>
                                        <input className={`form-control`} onChange={handleChange} name="email"
                                               value={values.email} prefix={<Icon type="mail" style={{fontSize: 13}}/>}
                                               type="email"
                                               placeholder="Email"/>
                                        {errors.email && touched.email && <span className="text-danger">{errors.email}</span>}
                                    </div>
                                    <div className={`form-group col-md-6`}>
                                        <input className={`form-control`}
                                               type='password'
                                               onChange={handleChange}
                                               name="password"
                                               value={values.password}
                                               prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                               placeholder="Password"/>
                                        {errors.password && touched.password && <span className="text-danger">{errors.password}</span>}
                                    </div>
                                    <div className={`form-group col-md-6`}>
                                        <select
                                            className={`form-control`}
                                            onChange={handleMakeChange}
                                            // style={{ width: '100%' }}
                                            placeholder="Role"
                                            name="primary_role"
                                            value={values.primary_role}
                                        >
                                            <option key="buyer" value="buyer">Buyer</option>
                                            <option key="seller" value="seller">Seller</option>
                                        </select>
                                    </div>
                                    <div className={`form-group col-md-6`}>
                                        <button type="submit" className="alazea-btn"  >
                                            Save
                                        </button>
                                    </div>
                                    </div>
                                </form>
                            )
                        }
                        }
                    </Formik>
                    </div>
                </div>
            </content>
                   </Layout>
    </div>
           
    );
};

const Form1 = Form.create()(InputForm);
export default Form1;
