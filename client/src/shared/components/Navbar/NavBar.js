import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {PERMISSIONS} from '../../modules/Enums/PermissionEnums';
import {AuthContext} from "../Context/AuthContext/AuthContext";

const NavBar = () => {
    const permissions = localStorage.getItem("PERMISSIONS");
    return (
        <div className="alazea-main-menu">
            <div className="classy-nav-container breakpoint-off">
                <div className="container">
                    {/* <!-- Menu --> */}
                    <nav
                        className="classy-navbar justify-content-between"
                        id="alazeaNav">
                        {/* <!-- Nav Brand --> */}
                        <a href="index.html" className="nav-brand">
                            <img id="header-logo" src="img/core-img/Logo03.png" style={{
                                width: "220px"
                            }} alt=""/>
                        </a>
                        {/* <!-- Navbar Toggler --> */}
                        <div className="classy-navbar-toggler">
                <span className="navbarToggler">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
                        </div>
                        {/* <!-- Menu --> */}
                        <div className="classy-menu"></div>
                        {/* <!-- Close Button --> */}
                        <div className="classycloseIcon">
                            <div className="cross-wrap">
                                <span className="top"></span>
                                <span className="bottom"></span>
                            </div>
                        </div>
                        {/* <!-- Navbar Start --> */}
                        <div className="classynav">
                            <div>
                                <ul>
                                    <li>
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li>
                                        <Link to="/about">About</Link>
                                    </li>
                                    <li>
                                        <Link to={"/shop"}>Shop</Link>
                                    </li>
                                    <li>
                                        <Link to="/research">Research</Link>
                                    </li>
                                    <li>
                                        <Link to="/contact">Contact</Link>
                                    </li>
                                    {
                                        permissions && permissions.length ?
                                            <li className="dropdown">
                                                <Link to='#' data-toggle="dropdown">Portal</Link>
                                                <div className="dropdown-menu">
                                                    <ul>
                                                        {
                                                            permissions.includes(PERMISSIONS.PRODUCTS) ?
                                                                <li className="dropdown-item"><Link
                                                                    to='/productList'>Products</Link></li> : ''
                                                        }
                                                        {
                                                            permissions.includes(PERMISSIONS.USERS) ?
                                                                <li className="dropdown-item"><Link
                                                                    to='/userList'>Users</Link>
                                                                </li> : ''
                                                        }
                                                        {
                                                            permissions.includes(PERMISSIONS.CATEGORIES) ?
                                                                <li className="dropdown-item"><Link
                                                                    to='/categoryList'>Categories</Link></li> : ''
                                                        }
                                                        {
                                                            permissions.includes(PERMISSIONS.ORDERS) ?
                                                                <li className="dropdown-item"><Link
                                                                    to='/orders'>Orders</Link>
                                                                </li> : ''
                                                        }
                                                        {
                                                            permissions.includes(PERMISSIONS.LIST_ENQUIRIES) ?
                                                                <li className="dropdown-item"><Link
                                                                    to='/enquiryList'>Enquiries</Link>
                                                                </li> : ''
                                                        }

                                                    </ul>
                                                </div>
                                            </li> : ''
                                    }
                                </ul>
                            </div>
                        </div>
                        {/* <!-- Navbar End --> */}
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
