import React, {useEffect, useState} from 'react';
import {Breadcrumb, Layout, Menu, Table, Tag} from 'antd';
import {getOrderDetailList, getCustomer} from "./service";
import {Button} from 'antd';
import {Link} from 'react-router-dom';
import './table.less';
import {API_URL, ImageUrl} from '../../apis/request';
import toastr from 'toastr';
import BreadCrumbNCover from "../../BreadCrumbNCover";

const {Content, Sider} = Layout;
import {USER} from "../../shared/modules/Enums/StorageEnums";

const AdminProducts = (props) => {

    let url = props.location.pathname;
    let split = url.split("/");
    let id = split[2];
    const {customerId} = props.match.params;
    const columns = [
        {
            title: 'Title',
            dataIndex: 'product.title',
            key: 'Title',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Unit Price',
            key: 'product.price',
            render: (text, record) => (
                <span>
                    {record.price / record.quantity}
                </span>
            ),
        },
        {
            title: 'Total',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Link className="btn btn-primary btn-sm" to={`/orderProduct/details/${record.prodductId}`}>View Product</Link>
                </span>
            ),
        },
    ];

    const [state, setState] = useState({
        isLoading: false,
        customer: null,
        role: JSON.parse(localStorage.getItem(USER)).role,
        sellerId: JSON.parse(localStorage.getItem("ID"))
    });
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        async function fetchData() {
            // setState({ ...state, isLoading: true });
            if (state.role == "seller") {
                const {data} = await getOrderDetailList(id, state.sellerId);
                setOrders(data);
            }
            else {
                const {data} = await getOrderDetailList(id);
                setOrders(data);
            }
            const customerInfo = await getCustomer(state.sellerId);
            setState({...state, customer: customerInfo.data});
            // setState({ ...state, isLoading: false });
        }

        fetchData();
    }, []);
    return (
        <div>
            <BreadCrumbNCover pageName="Orders"/>

            <div className="container">
                <Layout>
                    <Layout style={{padding: '24px 24px 24px'}}>
                        {
                            state.customer && orders.length ?
                                <div className="card">
                                    <div className="container mt-2 py-3">
                                        <h5>Customer Information:</h5>
                                        <div className="form-group">
                                            <label>First Name </label> <b> {state.customer.first_name}</b>
                                        </div>
                                        <div className="form-group">
                                            <label>Last Name </label> <b> {state.customer.last_name}</b>
                                        </div>
                                        <div className="form-group">
                                            <label>Email </label> <b> {state.customer.email}</b>
                                        </div>
                                        <div className="form-group">
                                            <label>Phone </label> <b> {state.customer.phone_number}</b>
                                        </div>
                                    </div>
                                </div>
                                : ''
                        }

                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            {/* {state.isLoading ? <Loading /> :  */}
                            <Table columns={columns} dataSource={orders} scroll={{y: 450}}/>
                            {/* } */}
                        </Content>
                    </Layout>
                </Layout>
            </div>
        </div>
    )
};
export default AdminProducts;
