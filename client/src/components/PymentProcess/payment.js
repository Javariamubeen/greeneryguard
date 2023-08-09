import React, { useEffect } from 'react'
import { StripeProvider, Elements } from 'react-stripe-elements'
import PaymentForm from './paymentForm'
import { OmitProps } from 'antd/lib/transfer/renderListBody'
import BreadCrumbNCover from "../../BreadCrumbNCover";

const Checkout = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
        <BreadCrumbNCover pageName="CheckOut" />
       
        <div className="container">
        <StripeProvider apiKey="pk_test_51H6Xh6Ld2RIXzrQc1kt3RNr1jU22dKAwjpMZlf5QbBkIfFRpxtA1vQRSZ3amhniezMWtiMndEFOUr7vqlWloescP003LEcTipb">
            <Elements>
                <PaymentForm history={props.history} />
            </Elements>
        </StripeProvider>
        </div>
        </div>
    )
}

export default Checkout;
