import React, {useContext, useState} from 'react';
import {Button, Checkbox, Form, Icon, Input} from 'antd/lib/index';
import {Link, withRouter, useHistory} from 'react-router-dom'
//import "../../components/style.less";
import {PERMISSIONS} from '../../shared/modules/Enums/PermissionEnums';
import {Login} from "./service";
import {AuthContext} from "../../shared/components/Context/AuthContext/AuthContext";
import {Loading} from '../../shared/modules/Loading/index';
import toastr from 'toastr';
import BreadCrumbNCover from "../../BreadCrumbNCover";
import './styles.css';

const FormItem = Form.Item;

const NormalLoginForm = (props) => {
    const history = useHistory();
    const authContext = useContext(AuthContext);
    const [state, setState] = useState({
        isLoading: false,
    });
    var checkout = localStorage.getItem('checkout');
    if (authContext.checkIsRememberMe() && authContext.checkAuthentication()) {
        if (checkout != undefined) {
            localStorage.removeItem('checkout')
            props.history.push("/checkout");
        } else {
            let permissions = JSON.parse(localStorage.getItem("PERMISSIONS"));
            let permission = permissions[0];
            let user = JSON.parse(localStorage.getItem("USER"));
            //if (user.role == "admin")
            props.history.push(`/`);

            // else
            //     props.history.push('/');
        }
    }

    async function LoginUser(body) {
        setState({...state, isLoading: true});
        try {
            const {data} = await Login(body);
            debugger;
            console.log("data", data);
            debugger;
            authContext.authenticateUser(data.access_token, data.permissions, body.remember, data._id, data.user);
            // props.history.push("/");
            // window.location.href = "/";
        } catch (err) {
            toastr.error("Email or password is incorrect", "");
        }
        setState({...state, isLoading: false});

    }

    function handleSubmit(e) {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {

                LoginUser(values);
            } else {
                toastr.error("Email or password is incorrect", "");
            }
        });
    };
    const {getFieldDecorator} = props.form;
    return (
        <div>
            {
                state.isLoading ? <Loading/> :
                    <div>
                        <BreadCrumbNCover pageName="Login"/>
                        <div className="container col-md-4 mx:auto">
                            <div style={{marginTop: "2rem", marginBottom: "2rem"}} className="row">
                                <Form onSubmit={(e) => handleSubmit(e)} style={{width: "100%"}}>
                                    <FormItem>
                                        {getFieldDecorator('email', {
                                            rules: [{required: true, message: 'Email is required!'}],
                                        })(
                                            <Input className="form-control"
                                                   placeholder="Email"/>
                                        )}
                                    </FormItem>
                                    <FormItem className='input-password'>
                                        {getFieldDecorator('password', {
                                            rules: [{required: true, message: 'Password is required!'}],
                                        })(
                                            <Input type="password" className={"form-control"}
                                                            placeholder="Password"/>
                                        )}
                                    </FormItem>
                                    <FormItem style={{marginTop:"-10px", marginBottom:0}}>
                                    <Link to="/forgetPassword" className="login-form-forgot"
                                          style={{float: 'right'}}>Forgot
                                        password?</Link>
                                    </FormItem>
                                    <FormItem>
                                        <button type="button" type="submit" className='alazea-btn'>
                                            Log In
                                        </button>
                                        <span style={{paddingLeft: "10px", paddingRight: "10px"}}>or</span> <button
                                        type="button"
                                        className='alazea-btn' onClick={() => history.push('/register')}>Signup</button>
                                    </FormItem>
                                </Form>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
}

const LoginForm = Form.create()(NormalLoginForm);

export default withRouter((LoginForm));
