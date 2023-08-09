import React, {useEffect, useState} from 'react';
import BreadCrumbNCover from "../../BreadCrumbNCover";
import {Breadcrumb, Layout} from "antd";
import ChangePassword from './changePassword';
import BasicProfile from './BsicInformationsection';
import {getCustomer} from "../OrderDetail/service";

const Profile=()=>{
    const [state, setState] = useState({
        isLoading: false,
        customer: null
    });
    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem("ID"))
        async function fetchData() {
            const customerInfo = await getCustomer(userId);
            setState({...state, customer: customerInfo.data});
        }
        fetchData();
    }, []);

    console.log("customer", state.customer)
    return <div>
        <BreadCrumbNCover pageName="Profile" />
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
                            {/*<h3 className="text-center " style={{ textTransform: 'capitalize' }}>{`Profile`}  </h3>*/}
                            <div className="row">
                                <div className="col-md-6">
                                    {
                                        state.customer ?
                                            <BasicProfile
                                                data={state.customer}/> : ''
                                    }
                                </div>
                                <div className="col-md-6">
                                    <ChangePassword/>
                                </div>
                            </div>
                            {/* } */}
                        </div>


                    </content>
                </Layout>
            </div>
        </Layout>
    </div>
};
export default Profile;
