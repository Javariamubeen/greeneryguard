import React, {useEffect, useState} from "react";
import {Button, Form, Input} from 'antd/lib';
import {Layout} from 'antd';
import toastr from 'toastr';
//import { Loading } from '../../../shared/modules/Loading/index';
import './style.css';
import {addCategory, GetCategoryById, updateCategory} from "./service";
import 'antd/dist/antd.css';
import BreadCrumbNCover from "../../BreadCrumbNCover";
// import { updateMyProfile } from "../Profile/service";
const {Content, Sider} = Layout;
const FormItem = Form.Item;
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

    const [product, setProduct] = useState({});

    const [files, setFiles] = useState([]);
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        async function loadData() {
            if (id != undefined) {
                setState({...state, Title: 'Update', isLoading: true});
                const {data} = await GetCategoryById(id);

                setProduct(data);
                setState({...state, id: id, Title: 'Update', isLoading: false});
            }
        }

        loadData();
    }, []);
    const {getFieldDecorator} = props.form;

    async function AddCategory(body) {
        setState({...state, isLoading: true});
        try {
            const {data} = await addCategory(body);
            props.history.push('/categoryList');
            toastr.success("Category added successfully", "");

        } catch (err) {
            toastr.error(err);
        }
        setState({...state, isLoading: false});
    }
    async function updatecategory(body) {
        setState({...state, isLoading: true});
        try {
            const {data} = await updateCategory(body,id);
            props.history.push('/categoryList');
            toastr.success("Category updated successfully", "");

        } catch (err) {
            toastr.error(err);
        }
        setState({...state, isLoading: false});
    }

    async function handleSubmit(e) {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                if (id == undefined) {
                    AddCategory(values);
                }else{
                    updatecategory(values)
                }
            }
        });
    };


    return (
        <div>
            <BreadCrumbNCover pageName="Category"/>
            <Layout>
                <div className="container">
                    <Layout style={{padding: '0 24px 24px'}}>
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
                                <div className="col-md-4 mx-auto py-5 card shadow">
                                    <Form onSubmit={(e) => handleSubmit(e)} style={{width: '100%'}}>
                                        <FormItem>
                                            {getFieldDecorator('title', {
                                                rules: [{required: true, message: 'Title is required!'}],
                                                initialValue: product.title
                                            })(
                                                <Input className="form-control" placeholder="Category Title"/>
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            <button type="submit"
                                                    className="alazea-btn" >
                                                Save
                                            </button>
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
