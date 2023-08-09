import React, { useState, useEffect } from "react";
import { Form, Icon, Input, Button, Checkbox } from 'antd/lib';
import { Breadcrumb, Layout, Menu, Table, Tag } from 'antd';
//import SideMenu from '../../SideMenu/SideMenu';
import toastr from 'toastr';

import {GetCategories} from '../OldProducts/service';

//import { Loading } from '../../../shared/modules/Loading/index';
import { Link } from "react-router-dom";
import axios from "axios";
 import './style.css';
import { addProduct, UpdateProduct, GetProductById } from "./service";
import { API_URL, ImageUrl } from '../../apis/request';

//import AdminLayout from '../../../shared/layouts/admin';
import 'antd/dist/antd.css';
import BreadCrumbNCover from "../../BreadCrumbNCover";
// import { updateMyProfile } from "../Profile/service";
const { Content, Sider } = Layout;
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
        categories: []
    });

    const [product, setProduct] = useState({
        id: "",
        title: "",
        price: 0,
        seller_price: 0,
        description: "",
        summary: "",
        businessId: ""
    });

    const [files, setFiles] = useState([]);
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        async function loadData() {
            const businessId= JSON.parse(localStorage.getItem("ID"));
            const categories = await GetCategories();
            if (id != undefined) {
                setState({ ...state, Title: 'Update', isLoading: true });
                const { data } = await GetProductById(id);
                setProduct({...data, businessId: businessId});
                setState({ ...state, categories: categories.data, Title: 'Update', images: data.productImages, isLoading: false });
            }
            else {
                setState({ ...state, categories: categories.data});
                setProduct({...product, businessId: businessId});
            }
        }
        loadData();
    }, []);

    // useEffect(() => {
    //     async function fetchData() {
    //         const { data } = await GetCategories();
    //         setState({...state, categories: data});
    //     }
    //     fetchData();
    // },[]);


    const { getFieldDecorator } = props.form;
    async function add(_data) {
        setState({ ...state, isLoading: true });
        try {
            if (files.data) {
                let form_data = new FormData();
                for (let key in _data) {
                    form_data.append(key, _data[key]);
                }
                files.data.map(file => form_data.append("productImages", file));
                const config = {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                };

                const res = await axios.post(
                    `${API_URL}products`,
                    form_data,
                    config
                );
            }
            else {
                const { data } = await addProduct(_data);

            }
            toastr.success("Product added successfully", "");
            props.history.push('/productlist');
        }
        catch (err) {
            toastr.error("Some error occoured", "");
        }
        setState({ ...state, isLoading: false });
    }

    async function update(_data) {
        setState({ ...state, isLoading: true });
        try {
            if (files.data) {
                let form_data = new FormData();
                for (let key in _data) {
                    form_data.append(key, _data[key]);
                }
                files.data.map(file => form_data.append("productImages", file));
                const config = {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                };

                const res = await axios.put(
                    `${API_URL}products/update`,
                    form_data,
                    config
                );
            }
            else {
                const res = await UpdateProduct(_data);
            }
            toastr.success("Product updated successfully", "");
            props.history.push('/productlist');
        }
        catch (err) {
            toastr.error("Some error occoured", "");
        }
        setState({ ...state, isLoading: false });
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            console.log("vlurd", values)
            if (!err) {
                values.productImages = state.images;
                values.deleteImages = state.deleteImages;
                if (id != undefined) {
                    values._id = id;
                    update(values)
                }
                else {
                    add(values);
                }
            }
        });
    };

    function onChangeHandler(e) {

        e.preventDefault();
        let tempFiles = Array.from(e.target.files);
        let _files = files.data || [];
        let _urls = urls.data || [];
        let i = 0;
        for (let file in tempFiles) {
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[i]);
            reader.onload = () => {
                _urls.push(reader.result);
                setUrls({ data: _urls });
            };
            _files.push(e.target.files[i]);

            i++;
        }
        setFiles({ data: _files });
        // setFiles(Array.from(e.target.files));
        e.target.value = "";
    }

    function handleRemoveAfter(url) {

        const images = state.images.filter(_url => _url !== url);
        const deleteImages = state.deleteImages;
        deleteImages.push(url);
        setState({ ...state, images, deleteImages });
    }
    function handleRemoveImage(url) {

        let _urls = urls.data;
        let index = _urls.indexOf(url);
        _urls = _urls.filter(_url => _url != url);

        setUrls({ data: _urls });

        let _files = files.data;
        let file = _files[index];

        _files = _files.filter(_file => _file != file);
        setFiles({ data: _files });
    }
console.log("categories", state.categories);
    console.log("setProduct" , product)
    return (
<div>
        <BreadCrumbNCover pageName="Product" />
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
                        <h3 className="text-center " style={{ textTransform: 'capitalize' }}>  </h3>
                        <div className="col-md-9 card shadow mx-auto">

                            <Form id="form2" onSubmit={(e) => handleSubmit(e)} style={{ width:"100%", margin: 'auto' }}>

                                <FormItem>
                                    {getFieldDecorator('businessId', {
                                        initialValue: product.businessId
                                    })(
                                        <Input
                                            className="d-none" />
                                    )}
                                </FormItem>
                                <div className="row">
                                <div className="form-group col-md-6">
                                <label><b>Title</b></label>
                                <FormItem>
                                    {getFieldDecorator('title', {
                                        rules: [{ required: true, message: 'Required' }],
                                        initialValue: product.title
                                    })(
                                        <Input className="form-control"
                                            />
                                    )}
                                </FormItem>
                                </div>

                                <div className="form-group col-md-6">
                                <label><b>Price</b></label>
                                <FormItem>
                                    {getFieldDecorator('price', {
                                        rules: [{ required: true, message: 'Required' }],
                                        initialValue: product.price
                                    })(
                                        <Input className="form-control"
                                            />
                                    )}
                                </FormItem>
                                </div>

                                <div className="form-group col-md-6">
                                <label><b>Selling Price</b></label>
                                <FormItem>
                                    {getFieldDecorator('sellingPrice', {
                                        rules: [{ required: true, message: 'Required' }],
                                        initialValue: product.sellingPrice
                                    })(
                                        <Input className="form-control"
                                            />
                                    )}
                                </FormItem>
                                </div>

                                <div className="form-group col-md-6">
                                <label><b>Category</b></label>
                                <FormItem>
                                    {getFieldDecorator('categoryId', {
                                        rules: [{required: true, message: 'Required'}],
                                        initialValue: product.categoryId
                                    })(
                                        <select className="form-control">
                                            <option value="">Select</option>
                                            {state.categories.map((item, index) => (
                                                <option value={item.id}>{item.title}</option>
                                            ))}
                                        </select>
                                    )}
                                </FormItem>
                                </div>
                                </div>
                                <label><b>Summary</b></label>
                                <FormItem>
                                    {getFieldDecorator('summary', {
                                        rules: [{required: true, message: 'Required'}],
                                        initialValue: product.summary
                                    })(
                                        <textarea id="form7" className="sm-textarea form-control" rows="3"></textarea>
                                    )}
                                </FormItem>
                                <label><b>Description</b></label>
                                <FormItem>
                                    {getFieldDecorator('description', {
                                        rules: [{ required: true, message: 'Required' }],
                                        initialValue: product.description
                                    })(
                                        <textarea id="form7" className="sm-textarea form-control" rows="3"></textarea>
                                    )}
                                </FormItem>

                                <div style={{ paddingBottom: '12px ' }}>
                                    <input
                                        className="d-none"
                                        type="file"
                                        name="file"
                                        id="fileUploader"
                                        multiple="multiple"
                                        onChange={onChangeHandler}
                                        accept="image/*"
                                    />
                                    <Button onClick={() => { document.getElementById('fileUploader').click() }}>Upload Image</Button>
                                    <div className="clearfix"></div>
                                    <div className="row">
                                        {state && state.images
                                            ? state.images.map(url => (
                                                <div className="col-md-3">
                                                    <div key={`${ImageUrl}${url}`} className="card-uploadedImage">

                                                        <a target="_blank" href={`${ImageUrl}${url}`}>
                                                            <img
                                                                src={`${ImageUrl}${url}`}
                                                            />
                                                        </a>
                                                        <i title="Remove"
                                                            className="text-danger fa fa-trash"
                                                            onClick={() => handleRemoveAfter(url)}
                                                        ></i>
                                                    </div>
                                                </div>

                                            ))
                                            : ''
                                        }
                                        {urls.data &&
                                            urls.data.map(url => (
                                                <div className="col-md-3">
                                                    <div key={url} className="card-uploadedImage col-md-3">
                                                        <img src={url} />
                                                        <i title="Remove"
                                                            className="text-danger fa fa-trash"
                                                            onClick={() => handleRemoveImage(url)}
                                                        ></i>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <FormItem>
                                            <button type="submit" className="alazea-btn">
                                                Save
                                        </button>
                                        </FormItem>
                                    </div>
                                </div>

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
