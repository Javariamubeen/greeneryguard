import React, { Component, useContext, useEffect, useState } from 'react';
//import { Form, Icon, Input, Button, Checkbox } from 'antd/lib/index';
import { withRouter, Link } from 'react-router-dom'
import "../../components/style.less";
import 'antd/dist/antd.css';
import {
    Form,
    Input,
    Tooltip,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    Icon,
    AutoComplete,
} from 'antd';
import { reset, resetPassword } from "./service";
import toastr from 'toastr';
import { Loading } from '../../shared/modules/Loading/index';

const FormItem = Form.Item;
const NormalResetPasswordForm = (props) => {

    const [state, setState] = useState({
        isValid: false,
        isLoading: false,
        email: '',
    });
    useEffect(() => {
        async function loadData() {
            let url = props.location.pathname;
            let split = url.split("/");
            let token = split[2];


            setState({ ...state, isLoading: true });
            try {
                const { data } = await reset({ params: { resetPasswordToken: token } });
                setState({ ...state, isValid: true, isLoading: false, email: data.email });
            }
            catch (err) {
                setState({ ...state, isValid: false, isLoading: false });
                toastr.error("Password reset link is invalid or has expired", "");
            }
        }
        loadData();
    }, []);
    async function resetPass(body) {
        setState({ ...state, isLoading: true });
        try {
            const { data } = await resetPassword(body);
            toastr.success("Password reset successfully", "");
            props.history.push('/login');
        } catch (err) {
            err.status == 403 ? toastr.error("Password can not be old password", "") : toastr.error("Error Occured", "");
        }
        setState({ ...state, isLoading: false });
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                values.email = state.email;
                if (values.password && values.comfirmPassword && values.password === values.comfirmPassword) {
                    resetPass(values);
                } else {
                    toastr.error('Password must match');
                }


            }
        });
    };
    const { getFieldDecorator } = props.form;
    return (
        <div className="login-holder">
            <div className="wrap container">
                <div className="login-frame">
                    <div className="form-col-left col">
                        <Link to={"/"} className="logo-holder">
                            <img src='/images/logo2.png' alt="Zo" className="img-fluid" style={{ width: '200px' }} />
                        </Link>
                        <span className="sologan">Lessons. Tools. Organizing. Planning</span>
                    </div>
                    <div className="form-col-right col">
                        {state.isLoading ? <Loading /> : state.isValid ?
                            <>
                                <span className="ico login-ico d-flex text-center">
                                    <h3 style={{ color: 'white' }}>Reset Password</h3>
                                </span>
                                <Form onSubmit={(e) => handleSubmit(e)} style={{ maxWidth: '300px' }}>
                                    <FormItem>
                                        {getFieldDecorator('password', {
                                            rules: [{ required: true, message: 'Password is required!' }],
                                        })(
                                            <Input.Password prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                                                placeholder="Password" />
                                        )}
                                    </FormItem>
                                    <FormItem >
                                        {getFieldDecorator('comfirmPassword', {
                                            rules: [{ required: true, message: 'Password is required!' }],
                                        })(
                                            <Input.Password prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                                                placeholder="Confirm Password" />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            Submit
                            </Button>
                                    </FormItem>
                                </Form>
                            </>
                            : ''}

                    </div>
                </div>
            </div>
        </div>
    );
}

const ResetPassword = Form.create()(NormalResetPasswordForm);

export default withRouter((ResetPassword));





