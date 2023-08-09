import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import React, { Component } from "react";
import ProductDetails from "./ProductDetails";
import Shop from "./Shop";

function Products() {
    // The `path` lets us build <Route> paths that are
    // relative to the parent route, while the `url` lets
    // us build relative links.
    let { path, url } = useRouteMatch();
   
    console.log("path ", path,url)
    return (
        <Switch>
          <Route exact path={path}>
            <Shop/>
          </Route>
          <Route path={`${path}/:id`} children={<ProductDetails/>} >
          
          </Route>
        </Switch>
    );
  }

export default Products;
//export const PRODUCT_URL = "/products";
