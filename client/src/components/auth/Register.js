import React, {useContext, useState} from 'react';
import {Form, Icon, Select} from 'antd/lib/index';
import {Link} from 'react-router-dom';
import toastr from 'toastr';
import {Register} from "./service";
import {AuthContext} from "../../shared/components/Context/AuthContext/AuthContext";
import BreadCrumbNCover from "../../BreadCrumbNCover";
import {Formik} from "formik";
import * as Yup from 'yup';
// import "../../components/style.less";

const validationSchema = Yup.object({
    first_name: Yup.string()
        .matches(/^[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890]+$/, 'First Name can only contain alphabets and numbers')
        .required("First Name is required!"),
    last_name: Yup.string()
        .matches(/^[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890]+$/, 'Last Name can only contain alphabets and numbers')
        .required("Last Name is required!"),
    BusinessName: Yup.string()
        .matches(/^[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890]+$/, 'Business Name can only contain alphabets and numbers'),
        // .required("Business Name is required!"),
    // BusinessAddress: Yup.string().required("Business Address is required!"),
    ABN: Yup.string()
        .matches(/^[1234567890]+$/, 'ABN can only contain numbers')
        .min(11, "ABN must contain 11 characters")
        .max(11, "Max limit 11 characters"),
        // .required("ABN is required!"),
    // username: Yup.string().required("Username is required!"),
    email: Yup.string().required("Email is required!"),
    password: Yup.string().required("Password is required!"),
    primary_role: Yup.string().required('Role is required!'),
    phone_number: Yup.number()
        // .required('Phone Number is required!')
        .min(10, "Phone Number must contain 10 characters")
});

const Option = Select.Option;
const FormItem = Form.Item;

const NormalRegisterForm = (props) => {
    const authContext = useContext(AuthContext);

    async function RegisterUser(body) {
        setState({...state, isLoading: true});
        try {
            const {data} = await Register(body);
            //authContext.authenticateUser(data.access_token);

            props.history.push('/login');
            toastr.success("User registered successfully", "");

        } catch (err) {
            if (err.message == "1")
                toastr.error("User name is already taken", "");
            else
                toastr.error("Email is already taken", "");
        }
        setState({...state, isLoading: false});
    }

    const [state, setState] = useState({
        isLoading: false,
        showElement: false,
    });

    function handleSubmit(e) {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                RegisterUser(values);
            }
        });
    }

    const {getFieldDecorator} = props.form;
    return (
        <div>
            <BreadCrumbNCover pageName="SignUp"/>
            <div className="container col-md-4 mx:auto">
                <div style={{marginTop: "2rem", marginBottom: "2rem"}} className="row">
                    <Formik
                        initialValues={{
                            first_name: "",
                            last_name: "",
                            phone_number: "",
                            BusinessName: "",
                            BusinessAddress: "",
                            ABN: "",
                            username: "",
                            email: "",
                            password: "",
                            primary_role: 'buyer'
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            RegisterUser(values);
                        }}
                    >
                        {({handleSubmit,touched, setFieldValue, handleChange, isSubmitting, values, errors}) => {
                            const handleMakeChange = (e) => {
                                setFieldValue('primary_role', e.target.value)
                            }
                            return (
                                <form onSubmit={handleSubmit} style={{width: '100%'}}>

                                    <div className={`form-group`}>
                                        <input className={`form-control`} name="first_name"
                                               prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                               onChange={handleChange}
                                               value={values.first_name} placeholder="First Name"/>
                                        {errors.first_name && touched.first_name && <span className="text-danger">{errors.first_name}</span>}
                                    </div>
                                    <div className={`form-group`}>
                                        <input className={`form-control`} onChange={handleChange} name="last_name"
                                               value={values.lastName}
                                               prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                               placeholder="Last Name"/>
                                        {errors.last_name && touched.last_name && <span className="text-danger">{errors.last_name}</span>}
                                    </div>
                                    {
                                        values.primary_role==='buyer' ?
                                            <div className={`form-group`}>
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
                                            <div className={`form-group`}>
                                                <input className={`form-control`} onChange={handleChange}
                                                       name="BusinessName"
                                                       value={values.BusinessName}
                                                       prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                                       placeholder="Business Name"/>
                                                {errors.BusinessName && touched.BusinessName && <span className="text-danger">{errors.BusinessName}</span>}
                                            </div> : ""
                                    }
                                    {
                                        values.primary_role!=='buyer' ?
                                            <div className={`form-group`}>
                                                <input className={`form-control`} onChange={handleChange}
                                                       name="BusinessAddress"
                                                       value={values.BusinessAddress}
                                                       prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                                       placeholder="Business Address"/>
                                                {errors.BusinessAddress && touched.BusinessAddress && <span className="text-danger">{errors.BusinessAddress}</span>}
                                            </div> : ""
                                    }
                                    {
                                        values.primary_role!=='buyer' ?
                                            <div className={`form-group`}>
                                                <input className={`form-control`} onChange={handleChange} name="ABN" maxLength={11}
                                                       value={values.ABN}
                                                       prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                                       placeholder="ABN"/>
                                                {errors.ABN && touched.ABN && <span className="text-danger">{errors.ABN}</span>}
                                            </div> : ""
                                    }
                                    {
                                        values.primary_role!=='buyer' ?
                                            <div className={`form-group`}>
                                                <input className={`form-control`} onChange={handleChange}
                                                       name="username"
                                                       value={values.username}
                                                       prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                                       placeholder="User Name"/>
                                                {errors.username && touched.username && <span className="text-danger">{errors.username}</span>}
                                            </div> : ""
                                    }
                                    <div className={`form-group`}>
                                        <input className={`form-control`} onChange={handleChange} name="email"
                                               value={values.email} prefix={<Icon type="mail" style={{fontSize: 13}}/>}
                                               type="email"
                                               placeholder="Email"/>
                                        {errors.email && touched.email && <span className="text-danger">{errors.email}</span>}
                                    </div>
                                    <div className={`form-group`}>
                                        <input className={`form-control`}
                                               type='password'
                                               onChange={handleChange}
                                               name="password"
                                               value={values.password}
                                               prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                               placeholder="Password"/>
                                        {errors.password && touched.password && <span className="text-danger">{errors.password}</span>}
                                    </div>
                                    <div className={`form-group`}>
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
                                    <div className={`form-group`}>
                                        <button type="submit" className="login-form-button btn-block"
                                                style={{backgroundColor: "#70C745  ", color: "white", height: "40px",padding:'0px 20px'}}>
                                            Sign Up
                                        </button>
                                        <p className={`text-center mx-auto mb-1`}>or</p>
                                        <Link to="login" className="ant-btn login-form-button ant-btn-primary btn-block alazea-btn"
                                              style={{backgroundColor: "#70C745 ", color: "white", height: "40px",padding:'5px'}}>Log
                                            In</Link>
                                    </div>
                                </form>
                            )
                        }
                        }
                    </Formik>
                </div>
            </div>
        </div>

    );
}

const RegisterForm = Form.create()(NormalRegisterForm);

export default (RegisterForm);
