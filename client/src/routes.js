import React, {Suspense, useContext} from "react";
import {Route, Switch} from "react-router";
import {Redirect} from "react-router-dom";
import {Loading} from "./shared/modules/Loading";
import {AuthContext} from "./shared/components/Context/AuthContext/AuthContext";
import {PERMISSIONS} from "./shared/modules/Enums/PermissionEnums";
import Home from "./Home";
import Research from "./Research";
import ContactPage from "./components/Contact/ContactPage";
import About from "./About";
import Products, {PRODUCT_URL} from "./components/Products/Products"
import Users from "./components/Users/Users";
import Enquiries from "./components/Enquiry/Enquires";
import Categories from "./components/Categories/Categories";
import Profile from './components/Profile';

import Cart from './shared/components/Cart';
import ThankYou from './shared/components/Thankyou/ThankYou';
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AddProduct from "./components/Products/inputForm";
import AddUser from "./components/Users/inputForm";
import AddEnquiry from "./components/Enquiry/inputForm";
import ProductDetails from './components/Products/details';
import OrderProductDetails from './components/Products/OrderProductDetails';
import AddCategory from "./components/Categories/inputForm";
import ProductList from './shared/Products';
import Billingaddress from './components/PymentProcess/billingAddress';
import CheckOut from './components/PymentProcess/checkOut';
import Shipping from './components/PymentProcess/shipping';
import Payment from './components/PymentProcess/payment';
import Order from './components/Orders/container';
import OrderDetail from './components/OrderDetail/container';
import ProductsView from './shared/Products/product';
import ShopView from './components/OldProducts/Shop';
import NormalForgetPasswordForm from './components/auth/forgetPassword';
import ReactPayPal from "./components/PymentProcess/ReactPayPal";

import ThePage from './shared/components/Cart';

export const Routes = () => {

    const context = useContext(AuthContext);
    const ProtectedRoute = ({component: Component, ...rest}) => {
        return (
            <Route
                {...rest}
                render={(matchProps) =>
                    context.authenticateRoute(rest.permission) ? (
                        <div>
                            <Component {...matchProps} />
                        </div>
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {from: matchProps.location},
                            }}/>
                    )}/>
        )
    };
    return (

        <Suspense fallback={<Loading/>}>
            <Switch>
                <Route
                    key={"/login"}
                    path={"/login"}
                    exact={true}
                    component={Login}
                />
                <Route path='/thePage' component={ThePage}/>
                <Route path="/contact" component={ContactPage}/>
                <ProtectedRoute
                    permission={PERMISSIONS.SHOP} path={PRODUCT_URL} component={ProductList}/>
                <Route path="/about" component={About}/>
                <Route path="/research" component={Research}/>
                <Route exact path="/" component={Home}/>
                <Route path="/thankyou" component={ThankYou}/>
                <Route path="/productsview" component={ProductsView}/>
                <Route path="/cart" component={Cart}/>
                <Route exact path="/register" component={Register}/>
                <ProtectedRoute
                    permission={PERMISSIONS.PRODUCTS} path="/editproduct/:id" component={AddProduct}/>
                <Route
                    path="/product/details/:id" component={ProductDetails}/>
                <Route
                    path="/orderProduct/details/:id" component={OrderProductDetails}/>
                <ProtectedRoute
                    permission={PERMISSIONS.PRODUCTS} exact path="/addproduct" component={AddProduct}/>
                <ProtectedRoute
                    permission={PERMISSIONS.PRODUCTS} exact path="/productlist" component={Products}/>
                <ProtectedRoute
                    permission={PERMISSIONS.CATEGORIES} path="/editCategory/:id" component={AddCategory}/>
                <ProtectedRoute
                    permission={PERMISSIONS.CATEGORIES} exact path="/addCategory" component={AddCategory}/>
                <ProtectedRoute
                    permission={PERMISSIONS.CATEGORIES} exact path="/Categorylist" component={Categories}/>
                <ProtectedRoute
                    permission={PERMISSIONS.USERS} path="/editUser/:id" component={AddUser}/>
                <ProtectedRoute
                    permission={PERMISSIONS.USERS} exact path="/addUser" component={AddUser}/>
                <ProtectedRoute
                    permission={PERMISSIONS.USERS} exact path="/userList" component={Users}/>
                <ProtectedRoute
                    permission={PERMISSIONS.ADD_ENQUIRY} path="/addEnquiry/:businessId" component={AddEnquiry}/>
                <ProtectedRoute
                    permission={PERMISSIONS.LIST_ENQUIRIES} exact path="/enquiryList" component={Enquiries}/>
                <Route exact path="/checkout" component={CheckOut}/>
                <Route exact path="/paypal" component={ReactPayPal}/>
                <Route exact path="/payment" component={Payment}/>
                <Route exact path="/billingaddress" component={Billingaddress}/>
                <ProtectedRoute
                    permission={PERMISSIONS.ORDERS} exact path="/orders" component={Order}/>
                <ProtectedRoute
                    permission={PERMISSIONS.ORDERDETAIL} exact path="/orderdetail/:id/:customerId?"
                    component={OrderDetail}/>
                <Route exact path="/shipping" component={Shipping}/>
                <Route exact path="/profile" component={Profile}/>
                <Route exact path="/shop" component={ShopView}/>
                <Route
                    key={"/forgetPassword"}
                    path={"/forgetPassword"}
                    exact={true}
                    component={NormalForgetPasswordForm}
                />

            </Switch>
        </Suspense>
    );
};
