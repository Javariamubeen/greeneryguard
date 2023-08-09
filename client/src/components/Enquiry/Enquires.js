import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Table} from 'antd';
import {GetEnquiry, deleteEnquiry} from "./service";
import { Button } from 'antd';
import { Link } from 'react-router-dom'
import './table.less'
//import { Loading } from '../../../shared/modules/Loading/index';
import { confirmAlert } from 'react-confirm-alert'; // Import
import moment from 'moment'
import 'antd/dist/antd.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import BreadCrumbNCover from "../../BreadCrumbNCover";
const { Content, Sider } = Layout;

const Enquiries = () => {
    const columns = [
        // {
        //     title: 'From Id',
        //     dataIndex: 'fromId',
        //     key: 'fromId',
        //     // render: text => <a>{text}</a>,
        // },
        // {
        //     title: 'Seller Id',
        //     dataIndex: 'sellerId',
        //     key: 'sellerId',
        // },
        {
            title: 'Date',
            key: 'createdAt',
            render: (text, record) => (
                <span>
                    {moment(record.createdAt).format("DD/MM/YYYY")}
                </span>
            ),
        },
        {
            title: 'Customer Name',
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
            title: 'Enquiry',
            dataIndex: 'description',
            key: 'description'
        },

        // {
        //     title: '',
        //     key: 'action',
        //     render: (text, record) => (
        //         <span>
        //             <Link to={`/editEnquiry/${record.id}`}className="btn btn-info btn-sm ml-5">Edit</Link>
        //             <a onClick={() => deleteRecord(record)}className="btn btn-danger btn-sm" style={{color:"white",marginLeft:"20px"}}>Delete</a>
        //         </span>
        //     ),
        // },
    ];
    const [state, setState] = useState({
        isLoading: false,
    });
    const [enquiries, setEnquiries] = useState([]);
    useEffect(() => {
        async function fetchData() {
            setState({ ...state, isLoading: true });
            const sellerId = JSON.parse(localStorage.getItem("ID"))
            const { data } = await GetEnquiry(sellerId);
            console.log("data", data);
            setEnquiries(data);
            debugger
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
        await deleteEnquiry(id);
        const { data } = await GetEnquiry();
        setEnquiries(data);
        setState({ ...state, isLoading: false });
    }

    return (
        <div>
            <BreadCrumbNCover pageName="Enquiries" />

            <div className="container">

                {/* <Header /> */}
                <Layout style={{ padding: '24px 24px 24px' }}>

                    {/*<Link to={'/addEnquiry'}><Button style={{ float: "right", margin: "10px", zIndex: "4" }} type="primary">Add*/}
                    {/*    Enquiry</Button></Link>*/}
                    <div className={'shadow my-1 bg-white rounded'}
                    >
                        {/* {state.isLoading ? <Loading /> : <Table columns={columns} dataSource={products} />} */}

                        <Table columns={columns} dataSource={enquiries}/>

                    </div>
                </Layout>
            </div>
        </div>
    )
};


export default Enquiries;
export const ENQUIRY_URL = "/enquiries";
