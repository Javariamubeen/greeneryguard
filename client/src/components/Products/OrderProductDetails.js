import React, {useEffect, useState} from 'react';
import {Layout} from 'antd';
import {GetProductById} from './service';
import BreadCrumbNCover from "../../BreadCrumbNCover";
import {fetchSingleFileSrc} from "../../shared/Products/product.helper";
import ProductOverview from "./ProductOverview";
import {Container} from "react-bootstrap";

const ProductDetails = (props) => {
    const [state, setState] = useState({
        product: null
    });
    const {id} = props.match.params;
    useEffect(() => {
        async function fetchData() {
            const {data} = await GetProductById(id);
            setState({...state, product: data});
        }

        fetchData();
    }, []);

    const {product} = state;
    return (
        <div>
            <BreadCrumbNCover pageName="Product Details"/>
            <Layout style={{padding:"24px"}}>
                <Container>
                {
                    product ?
                        <ProductOverview showQuantityInput={false} product={product} />
                        : ''
                }
                </Container>
            </Layout>
        </div>
    )
}

export default ProductDetails;
