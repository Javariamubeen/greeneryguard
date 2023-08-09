import React, { useState, useEffect } from "react";
import {Form, Icon, Input, Button} from 'antd/lib';
import { Layout} from 'antd';
//import SideMenu from '../../SideMenu/SideMenu';
import toastr from 'toastr';
//import { Loading } from '../../../shared/modules/Loading/index';

 import './style.css';
import { addEnquiry, updateEnquiry, GetEnquiryById,Register, updateEnquiryAPI } from "./service";
import 'antd/dist/antd.css';
import BreadCrumbNCover from "../../BreadCrumbNCover";
// import {Register,updateEnquiryAPI} from "../auth/service";
// import { updateMyProfile } from "../Profile/service";
const { Content, Sider } = Layout;
const FormItem = Form.Item;
const InputForm = (props) => {
    let url = props.location.pathname;
    let split = url.split("/");
    let id = undefined;
    const [state, setState] = useState({
        Title: 'Add',
        isLoading: false,
        deleteImages: [],
        images: [],
    });

    const {businessId}=props.match.params;
    const fromId=JSON.parse(localStorage.getItem("ID"));

    const [enquiry, setEnquiry] = useState({
    });

    const [files, setFiles] = useState([]);
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        async function loadData() {
            if (id != undefined) {
                setState({ ...state, Title: 'Update', isLoading: true });
                const { data } = await GetEnquiryById(id);

                setEnquiry(data);
                setState({ ...state, id: id, Title: 'Update', isLoading: false });
            }
        }
        loadData();
    }, []);
    const { getFieldDecorator } = props.form;

    async function RegisterEnquiry(body) {

        // setState({ ...state, isLoading: true });
            try {
                await addEnquiry(body);
                //authContext.authenticateEnquiry(data.access_token);
                // props.history.push('/enquiryList');
                toastr.success("Enquiry registered successfully", "");
            }
            catch (err) {
                if (err.message == "1")
                    toastr.error("Enquiry name is already taken", "");
                else
                    toastr.error("Email is already taken", "");
            }
            debugger;
            setState({ ...state, isLoading: false });
    }
    async function updateEnquiry(body) {
        setState({ ...state, isLoading: true });
        try {
            const { data } = await updateEnquiryAPI(body,id);
            //authContext.authenticateEnquiry(data.access_token);
            props.history.push('/enquiryList');
            toastr.success("Enquiry updated successfully", "");

        }
        catch (err) {
            if (err.message == "1")
                toastr.error("Enquiry name is already taken", "");
            else
                toastr.error("Email is already taken", "");
        }
        setState({ ...state, isLoading: false });
    }

    async function handleSubmit(e) {

        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                const data = {
                    fromId: fromId,
                    sellerID: businessId,
                    description: values.description
                }
                RegisterEnquiry(data);
                // if (id == undefined) {
                //     RegisterEnquiry(data);
                // }else{
                //     updateEnquiry(data)
                // }
            }
        });
    };


    return (
<div>
        <BreadCrumbNCover pageName="Add Enquiry" />
        <Layout>
            <div className="container">
            <Layout style={{ padding: '0 24px 24px' }}>
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
                        <div className="col-md-12 mx-auto">
                            <Form onSubmit={(e) => handleSubmit(e)} style={{ width: '100%' }}>
                                <FormItem>
                                    {getFieldDecorator('description', {
                                        rules: [{ required: true, message: 'Description is required!' }],
                                        initialValue: enquiry.description
                                    })(
                                        <Input.TextArea
                                            autoSize={{ minRows: 5, maxRows: 60 }}
                                            prefix={<Icon type="list" style={{ fontSize: 13 }} />} placeholder="Description" />
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit" className="login-form-button" style={{backgroundColor:"#0E6251 ",color:"white", height:"40px"}} >
                                        Save
                                    </Button>
                                </FormItem>
                            </Form>
                         </div>
                        {/* } */}
                  </div>
                
                    
                    </content>
                    </Layout>
                    </div>
                   </Layout>
    </div>
           
    );
};

const Form1 = Form.create()(InputForm);
export default Form1;
