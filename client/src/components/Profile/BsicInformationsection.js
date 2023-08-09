import React, {useState, useEffect} from "react";
import {Form, Icon, Input, Button, Checkbox, TextArea} from 'antd/lib';
import toastr from 'toastr';
// import { Loading } from '../../../shared/modules/Loading/index';
import {updateUserAPI} from './service';

const FormItem = Form.Item;

const InputForm = (props) => {
    const {getFieldDecorator} = props.form;

    async function Update(data) {
        try {
            await updateUserAPI(data, props.data.id);
            toastr.success("Profile updated successfully");
        } catch (err) {

        }
    }

    function handleSubmitSection1(e) {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                Update(values);
            }
        });
    };
    const {data} = props;
    return (
        <section>
            <Form id="form2" onSubmit={(e) => handleSubmitSection1(e)} style={{margin: 'auto'}}>
                <div className="card">
                    <div className="container-fluid" style={{width: "80%", marginTop: "20px"}}>
                        <h6 className="">Personal Information</h6>
                        <div className="row">
                            <div className="col-md-12">
                                <label><b>Email</b></label>
                                <FormItem>
                                    {getFieldDecorator('email', {
                                        rules: [{required: true, message: 'Required'}],
                                        initialValue: data.email || ''
                                    })(
                                        <Input className="form-control"
                                               placeholder="Email"
                                               readOnly/>
                                    )}
                                </FormItem>
                            </div>
                            <div className="col-md-6">
                                <label><b>First Name</b></label>
                                <FormItem>
                                    {getFieldDecorator('first_name', {
                                        rules: [{required: true, message: 'Required'},
                                            {
                                                pattern: /^[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890]+$/,
                                                message: 'First Name can only contain alphabets and numbers',
                                            }],
                                        initialValue: data.first_name || ''
                                    })(
                                        <Input className="form-control"
                                               placeholder="First name"/>
                                    )}
                                </FormItem>
                            </div>
                            <div className="col-md-6">
                                <label><b>Last Name</b></label>
                                <FormItem>
                                    {getFieldDecorator('last_name', {
                                        rules: [{required: true, message: 'Required'},
                                            {
                                                pattern: /^[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890]+$/,
                                                message: 'Last Name can only contain alphabets and numbers',
                                            }
                                        ],
                                        initialValue: data.last_name || ''
                                    })(
                                        <Input className="form-control"
                                               placeholder="Last name"/>
                                    )}
                                </FormItem>
                            </div>

                            {
                                data.primary_role == 'seller' ?
                                    <div className="col-12">
                                        <div className="row">
                                        <div className="col-md-6">
                                            <label><b>ABN</b></label>
                                            <FormItem>
                                                {getFieldDecorator('abn', {
                                                    rules: [{required: false, message: 'Required'}
                                                    ,
                                                        {
                                                            pattern: /^[1234567890]+$/,
                                                            message: 'ABN can only contain numbers',
                                                        }],
                                                    initialValue: data.abn || ''
                                                })(
                                                    <Input className="form-control"
                                                           placeholder="ABN"/>
                                                )}
                                            </FormItem>
                                        </div>
                                        <div className="col-md-6">
                                            <label><b>Business Name</b></label>
                                            <FormItem>
                                                {getFieldDecorator('business_name', {
                                                    rules: [{required: false, message: 'Required'},
                                                        {
                                                          pattern: /^[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890]+$/,
                                                            message: 'Business Name can only contain alphabets and numbers',
                                                        }],
                                                    initialValue: data.business_name || ''
                                                })(
                                                    <Input className="form-control"
                                                           placeholder="Business Name"/>
                                                )}
                                            </FormItem>
                                        </div>

                                        <div className="col-md-6">
                                            <label><b>Business Address</b></label>
                                            <FormItem>
                                                {getFieldDecorator('business_address', {
                                                    rules: [{required: false, message: 'Required'}],
                                                    initialValue: data.business_address || ''
                                                })(
                                                    <Input className="form-control"
                                                           placeholder="Business Address"/>
                                                )}
                                            </FormItem>
                                        </div>
                                        </div>
                                    </div>
                                    : ''
                            }


                            <div className="col-md-12">
                                <label><b>Phone Number</b></label>
                                <FormItem>
                                    {getFieldDecorator('phone_number', {
                                        rules: [{required: true, message: 'Required'},
                                            {
                                                pattern: /^[1234567890]+$/,
                                                message: 'Phone Number must only contain numbers',
                                            },
                                            {
                                                min: 10,
                                                message: 'Phone Number must contain minimum 10 characters'
                                            }],
                                        initialValue: data.phone_number || ''
                                    })(
                                        <input type="number" maxLength={10} className="form-control"
                                                        placeholder="Phone Number"
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
        </section>
    );
};

const Form1 = Form.create()(InputForm);
export default Form1;
