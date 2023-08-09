import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu, Table, Tag } from 'antd';
import {GetCategories,deleteCategory} from "./service";
import { Button } from 'antd';
import { Link } from 'react-router-dom'
import './table.less'
import toastr from 'toastr';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'antd/dist/antd.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import BreadCrumbNCover from "../../BreadCrumbNCover";
import Header from "../../Header";

const Users = () => {
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Link to={`/editCategory/${record.id}`} className="btn btn-info btn-sm ml-5">Edit</Link>
                    <a aria-disabled onClick={() => deleteRecord(record)} className="btn btn-danger btn-sm ml-1" style={{color:"white"}}>Delete</a>
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
            const { data } = await GetCategories();
            setProducts(data);
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
        await deleteCategory(id);
        const { data } = await GetCategories();
        setProducts(data);
        setState({ ...state, isLoading: false });
    }

    return (
        <div>
        <BreadCrumbNCover pageName="Categories List" />
       
        <div className="container">
       
            {/* <Header /> */}
            <Layout style={{ padding: '24px 24px 24px' }}>
                {/*<Breadcrumb style={{ margin: '16px 0' }}>*/}
                {/*    <Breadcrumb.Item>Admin</Breadcrumb.Item>*/}
                {/*    <Breadcrumb.Item>Categories</Breadcrumb.Item>*/}
                {/*    <Breadcrumb.Item>List</Breadcrumb.Item>*/}
                {/*</Breadcrumb>*/}

                    <Link to={'/addCategory'}><button style={{ float: "right"}} class="alazea-btn">Add
                        Category</button></Link>
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
export default Users;
