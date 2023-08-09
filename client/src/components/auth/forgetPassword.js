import React, { Component, useContext, useState } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd/lib/index';
import { withRouter, Link } from 'react-router-dom'
import "./styles.css";
import { forgetPassword } from "./service";
import toastr from 'toastr';
import { Loading } from '../../shared/modules/Loading/index';
import BreadCrumbNCover from "../../BreadCrumbNCover";
const FormItem = Form.Item;

const NormalForgetPasswordForm = (props) => {
    const [state, setState] = useState({
        isLoading: false,
    });
    async function forgetPass(body) {
        try {
            setState({ ...state, isLoading: true });
            const { data } = await forgetPassword(body);
            toastr.success("Recovery email sent", "");
        } catch (err) {
            console.log("error forgot password", err);
            toastr.error("Email is incorrect", "");
        }
        setState({ ...state, isLoading: false });
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                forgetPass({ email: values.email });
            }
        });
    };
    const { getFieldDecorator } = props.form;
    return (

        <div className="login-holder">
            <BreadCrumbNCover pageName="Forgot Password" />
            <div className="wrap container">
                <div className="login-frame">
                    <div className="logo-col col">
                        {/*<Link to={"/"} className="logo-holder">*/}
                        {/*    <img src='/images/logo2.png' alt="Zo" className="img-fluid" style={{ width: '200px' }} />*/}
                        {/*</Link>*/}
                    </div>
                    <div className="form-col col">

                        {state.isLoading ? <Loading /> :
                            <div>
                                <span className="ico login-ico d-flex text-center">
                                    <h3 style={{ color: 'white' }}>Forgot Password</h3>
                                </span>
                                <Form onSubmit={(e) => handleSubmit(e)} style={{ maxWidth: '300px' }}>
                                    <FormItem>
                                        {getFieldDecorator('email', {
                                            rules: [{ required: true, message: 'Email is required!' }],
                                        })(
                                            <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="Email" />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            Submit
                                </Button>
                                    </FormItem>
                                </Form>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

const ForgetPassword = Form.create()(NormalForgetPasswordForm);

export default withRouter((ForgetPassword));
