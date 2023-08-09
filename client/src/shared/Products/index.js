import React, { useState, useEffect } from "react";
import Product from './product';
import Pagination from "react-js-pagination";
import { Breadcrumb, Input, Select } from 'antd';
import BreadCrumbNCover from "../../BreadCrumbNCover";

const Option = Select.Option;
const ProductsContainer = props => {
    console.log("Product Index");
    const [activePage,setActivePage]=useState({
        activePage: 1,
        itemsPerPage:10,
    });
    function handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        setActivePage({...activePage,activePage: pageNumber});
      }

      
    function handleChange(value) {
        //console.log(`active page is ${pageNumber}`);
        setActivePage({...activePage,itemsPerPage: value});
      }

      console.log("Product Index");
    return (
        <div>
        <BreadCrumbNCover pageName="Shop" />
       
        <div className="container">
                <Product pageNo={activePage.activePage} pageSize={activePage.itemsPerPage}></Product>
                <div className="row w-100">
                    <div className="col-xl-8 col-lg-8">
                <Pagination
                    activePage={activePage.activePage}
                    itemsCountPerPage={activePage.itemsPerPage}
                    totalItemsCount={450}
                    pageRangeDisplayed={5}
                    itemClass="page-item"
                    linkClass="page-link"
                    onChange={handlePageChange}
                    />
                    </div>
                    <div className="col-xl-4 col-lg-4">
                        <label style={{marginRight:'10px'}}>Items Per Page </label>
                    <Select
                                                    placeholder="State"
                                                defaultValue={activePage.itemsPerPage}
                                                //style={{width:"20%"}}
                                                onChange={handleChange}
                                                >
                                                    <Option key="10">10</Option>
                                                    <Option key="20">20</Option>
                                                    <Option key="30">30</Option>
                                                </Select>
                    </div>
                    </div>
                    </div>
                    </div>
    );
};

export default ProductsContainer;
