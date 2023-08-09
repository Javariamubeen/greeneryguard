import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu, Table, Tag } from 'antd';
import { GetUsers, deleteUsers } from "./service";
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

const Users = () => {
    const columns = [
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
            // render: text => <a>{text}</a>,
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Link to={`/editUser/${record.id}`}className="btn btn-info btn-sm ml-5">Edit</Link>
                    <a onClick={() => deleteRecord(record)}className="btn btn-danger btn-sm" style={{color:"white",marginLeft:"5px"}}>Delete</a>
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
            const { data } = await GetUsers();
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
        await deleteUsers(id);
        const { data } = await GetUsers();
        setProducts(data);
        setState({ ...state, isLoading: false });
    }

    return (
        <div>
        <BreadCrumbNCover pageName="Users List" />
       
        <div className="container">
       
            {/* <Header /> */}
            <Layout style={{ padding: '0 24px 24px' }}>
                {/*<Breadcrumb style={{ margin: '16px 0' }}>*/}
                {/*    <Breadcrumb.Item>Admin</Breadcrumb.Item>*/}
                {/*    <Breadcrumb.Item>Users</Breadcrumb.Item>*/}
                {/*    <Breadcrumb.Item>List</Breadcrumb.Item>*/}
                {/*</Breadcrumb>*/}

                    <Link to={'/addUser'}><button className="alazea-btn float-right">Add
                        User</button></Link>
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
export const PRODUCT_URL = "/products";
