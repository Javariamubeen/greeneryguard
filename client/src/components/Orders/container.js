import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu, Table, Tag } from 'antd';
import { getOrderList, UpdateOrder } from "./service";
import { Button, Select } from 'antd';
import { Link } from 'react-router-dom'
import './table.less'
import Moment from 'react-moment';
import toastr from 'toastr';
import BreadCrumbNCover from "../../BreadCrumbNCover";
const { Content, Sider } = Layout;
const Option = Select.Option;
import {USER, ID} from "../../shared/modules/Enums/StorageEnums";

const AdminProducts = () => {
    const role = JSON.parse(localStorage.getItem(USER)).role;
    const columns = [
        // {
        //     title: 'Total',
        //     dataIndex: 'price',
        //     key: 'price',
        //     // render: text => <a>{text}</a>,
        // },
        {
            title: 'Date',
            //dataIndex: 'orderDate',
            key: 'orderDate',
            render: (text, record) => (
                <span>
                    <Moment format="D MMM YYYY">
                        {record.orderDate}
                    </Moment>
                </span>
            ),
        },
        // {
        //     title: 'Sales Tax',
        //     dataIndex: 'salesTax',
        //     key: 'salesTax',
        //     // render: text => <a>{text}</a>,
        // },
        // {
        //     title: 'Shipping Price',
        //     dataIndex: 'shippingPrice',
        //     key: 'shippingPrice',
        //     // render: text => <a>{text}</a>,
        // },
        // {
        //     title: 'Grand Total',
        //     dataIndex: 'total',
        //     key: 'total',
        //     // render: text => <a>{text}</a>,
        // },
        // {
        //     title: 'No Of Products',
        //     dataIndex: 'totalProducts',
        //     key: 'totalProducts',
        //     // render: text => <a>{text}</a>,
        // },
        {
            title: 'Status',
            //dataIndex: 'orderDate',
            key: 'status',
            render: (text, record) => (
                <span>
                    {
                        role == "buyer" ? <label>{record.status}</label>
                            :
                            <Select
                                style={{ width: '100%' }}
                                placeholder="Status"
                                value={record.status}
                                //defaultValue={record.status}
                                onChange={(value) => handleChange(value, record)}
                            >
                                <Option key={1} value="Pending">Pending</Option>
                                <Option key={2} value="Shipped">Shipped</Option>
                                <Option key={3} value="Delivered">Delivered</Option>
                            </Select>
                    }
                </span>
            ),
        },

        // {
        //     title: 'Shipped On',
        //
        //     key: 'shipeDate',
        //     render: (text, record) => (
        //         <span>
        //             <Moment format="D MMM YYYY">
        //                 {record.shipeDate}
        //             </Moment>
        //         </span>
        //     ),
        // },
        {
            title: 'Customer',
            key: 'action',
            render: (text, record) => (
                <span>
                    {`${record.user && record.user.first_name} ${record.user && record.user.last_name}`}
                </span>
            ),
        },
        {
            title: 'Customer Email',
            key: 'action',
            render: (text, record) => (
                <span>
                    {`${record.user && record.user.email}`}
                </span>
            ),
        },

        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Link className="btn btn-primary btn-sm" to={`/orderdetail/${record.id}/${record.customerId}`}>View Detail</Link>
                </span>
            ),
        },
    ];
    const [state, setState] = useState({
        isLoading: false,
    });
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    async function fetchData() {
        const userId = JSON.parse(localStorage.getItem(ID));
        if ((JSON.parse(localStorage.getItem(USER))).role == "buyer") {
            let { data } = await getOrderList(userId);
            data = data.filter(element => element.ordersdetails.length > 0);
            setOrders(data);
        }
        else if ((JSON.parse(localStorage.getItem(USER))).role == "seller") {
            let {data} = await getOrderList();
            data = data
                .filter((element) =>
                    element.ordersdetails.some((subElement) => subElement.sellerId == userId));
            data = data.filter(element => element.ordersdetails.length > 0);
            setOrders(data);
        }
        else {
            let { data } = await getOrderList();
            data = data.filter(element => element.ordersdetails.length > 0);
            setOrders(data);
        }
    }

    function handleChange(value, record) {
        const body = {
            Id: record.id,
            status: value,
        };
        update(body);
    }
    async function update(body) {
        const { data } = await UpdateOrder(body)
        await fetchData();
    }

    return (
<div>
        <BreadCrumbNCover pageName="Orders"/>
       
        <div className="container">
            <Layout>
                <Layout style={{ padding: '24px 24px 24px' }}>
                    <div className={'shadow my-1 bg-white rounded'}>
                        {/* {state.isLoading ? <Loading /> :  */}
                        <Table columns={columns} dataSource={orders} />
                         {/* } */}
                    </div>
                </Layout>
            </Layout>
            </div>
            </div>
    )
};
export default AdminProducts;
