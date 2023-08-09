import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu, Table, Tag } from 'antd';
import { GetProducts, deleteProduct } from "./service";
import { Button } from 'antd';
import { Link } from 'react-router-dom'
import './table.less'
import toastr from 'toastr';
//import { Loading } from '../../../shared/modules/Loading/index';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'antd/dist/antd.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import BreadCrumbNCover from "../../BreadCrumbNCover";
import Header from "../../Header";
const { Content, Sider } = Layout;

const Products = () => {
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            // render: text => <a>{text}</a>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Free Version',
            dataIndex: 'freeVersion',
            key: 'freeVersion',
            render: isFree => isFree ? 'Yes' : 'No'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Link to={`/editproduct/${record.id}`}className="btn btn-info btn-sm ml-5">Edit</Link>
                    <a onClick={() => deleteRecord(record)}className="btn btn-danger btn-sm ml-1" style={{color:"white"}}>Delete</a>
                </span>
            ),
        },
    ];
    const [state, setState] = useState({
        isLoading: false,
    });
    const [products, setProducts] = useState([]);
    useEffect(() => {
        async function fetchData() {
            setState({ ...state, isLoading: true });
            const USER = JSON.parse(localStorage.getItem("ID"))
            const sellerId = USER
            const userRole=JSON.parse(localStorage.getItem("USER")).role
            debugger
            if(userRole == "admin"){
                const { data } = await GetProducts();
                setProducts(data);
            }
            else{
                const { data } = await GetProducts(sellerId);
                setProducts(data);
            }
            setState({ ...state, isLoading: false });
        }
        fetchData();
    }, []);

    async function deleteRecord({ id }) {
        confirmAlert({
          title: 'Confirm',
          message: 'Are you sure you want to delete !',
          buttons: [
            {
              label: 'Yes',
              onClick: ()=>deleteFunction({id})
            },
            {
              label: 'No',
            //   onClick: () => alert('Click No')
            }
          ]
        });
      };

    async function deleteFunction( {id }) {
        setState({ ...state, isLoading: true });
        const res = await deleteProduct(id);
        debugger;
        if (res.status == 203) {
            toastr.warning("This product can't be deleted because order(s) exist against this product");
        }
        else {
            toastr.success("Product has been deleted successfully");
            const { data } = await GetProducts();
            setProducts(data);
        }
        setState({ ...state, isLoading: false });
    }

    return (
        <div>
        <BreadCrumbNCover pageName="Products List" />
       
        <div className="container">
       
            {/* <Header /> */}
            <Layout style={{ padding: '0 24px 24px' }}>
                {/*<Breadcrumb style={{ margin: '16px 0' }}>*/}
                {/*    <Breadcrumb.Item>Admin</Breadcrumb.Item>*/}
                {/*    <Breadcrumb.Item>Products</Breadcrumb.Item>*/}
                {/*    <Breadcrumb.Item>List</Breadcrumb.Item>*/}
                {/*</Breadcrumb>*/}

                    <Link to={'/addproduct'}><button
                        className="alazea-btn"
                        style={{ float: "right", margin: "10px", zIndex: "4" }}>Add
                        Product</button></Link>
                <div className={'shadow my-1 bg-white rounded'}
                >
                    {/* {state.isLoading ? <Loading /> : <Table columns={columns} dataSource={products} />} */}

                    <Table columns={columns} dataSource={products} />

                </div>
            </Layout>
        </div>
        </div>
    )
};
export default Products;
export const PRODUCT_URL = "/products";
