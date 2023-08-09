import React, {useState} from "react";
import {Button, Form} from 'antd/lib';
import {Layout} from 'antd';
// import SideMenu from '../../SideMenu/SideMenu';
import toastr from 'toastr';
// import { Loading } from '../../../shared/modules/Loading/index';
import {changePassword} from './service';
import Password from "antd/lib/input/Password";

const {Content, Sider} = Layout;
const FormItem = Form.Item;

const InputForm = (props) => {
    const [state, setState] = useState({
        isLoading: false,
    });
    const {getFieldDecorator} = props.form;

    async function Update(data) {
        try {
            data.userId = JSON.parse(localStorage.getItem("ID"));
            const res = await changePassword(data);
            console.log("res", res);
            toastr.success("Password updated successfuly", "");
        } catch (err) {
            toastr.error("Old Password is incorrect", "");
        }
    }

    function handleSubmitSection(e) {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {

                if (values.newPassword && values.confirmPassword &&
                    values.newPassword === values.confirmPassword) {
                    // alert('password mtched');
                    Update(values);
                } else {
                    toastr.error('Password must match');
                }
            }
        });
    };
    return (
        <Form id="form3" onSubmit={(e) => handleSubmitSection(e)} style={{margin: 'auto'}}>
            <div className=" card">
                <div className="container-fluid" style={{width: "80%", marginTop: "20px"}}>
                    <h6 className="">Change Password</h6>
                    <div className="row">
                        <div className="col-md-12">
                            <label><b>Password</b></label>
                            <FormItem>
                                {getFieldDecorator('currentPassword', {
                                    rules: [{required: true, message: 'Password is Required!'}],
                                    initialValue: ""
                                })(
                                    <input className="form-control"
                                        placeholder="Current Password"
                                        type="password"

                                    />
                                )}
                            </FormItem>
                        </div>
                        <div className="col-md-12">
                            <label><b>New Password</b></label>
                            <FormItem>
                                {getFieldDecorator('newPassword', {
                                    rules: [{required: true, message: 'Required'},
                                        // {pattern:"^\S{6,}$",message:"field values must match"},
                                        {
                                            required: true,
                                            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                                            message: "New Password"
                                        }],
                                    initialValue: ""
                                })(
                                    <input type="password" className="form-control"
                                        placeholder="New Password"
                                    />
                                )}
                            </FormItem>
                        </div>
                        <div className="col-md-12">
                            <label><b>Confirm Password</b></label>
                            <FormItem>
                                {getFieldDecorator('confirmPassword', {
                                    rules: [{required: true, message: 'Confirm Your Password'},
                                        // {pattern:"^\S{6,}$",message:"field values must match"},
                                    ],
                                    initialValue: ""
                                })(
                                    <input className="form-control"
                                        placeholder="Confirm Password"
                                        type="password"
                                    />
                                )}
                            </FormItem>
                        </div>
                        <div className='text-right col-md-12'>
                            <FormItem>
                                <button type="submit" className="alazea-btn">
                                    Save
                                </button>
                            </FormItem>
                        </div>
                    </div>
                </div>

            </div>
        </Form>
    );
};

const Form1 = Form.create()(InputForm);
export default Form1;
