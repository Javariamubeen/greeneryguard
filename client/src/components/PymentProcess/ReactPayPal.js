import React, {useContext} from "react";
import BreadCrumbNCover from "../../BreadCrumbNCover";
import Context from '../../Context';
import { CART } from "../../shared/modules/Enums/cartEnums";
import {Link} from 'react-router-dom';

export default function ReactPayPal() {
    const { state, dispatch } = useContext(Context);
    const [paid, setPaid] = React.useState(false);
    const [error, setError] = React.useState(null);
    const paypalRef = React.useRef();
    function removeProduct(id) {
        dispatch({ type: CART.REMOVE_FROM_CART, id })
    }
    // To show PayPal buttons once the component loads
    React.useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Your description",
                                amount: {
                                    currency_code: "USD",
                                    value: state.total.toFixed(2)
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    state.addedItems.forEach(element => {
                        removeProduct(element.id);
                    });
                    localStorage.removeItem("ZOREACT_CART");
                    setPaid(true);
                    console.log(order);
                },
                onError: (err) => {
                    //   setError(err),
                    console.error(err);
                },
            })
            .render(paypalRef.current);
    }, []);

    // If the payment has been made
    if (paid) {
        return (
            <div>
            <div className="text-center">
                <BreadCrumbNCover pageName="Payment"/>
                <div>
                    <h1 className="display-4">
                        Payment successful
                    </h1>
                    <Link className="alazea-btn" to={'/'}>Goto Home</Link>
                </div>
            </div>
        </div>
        )
    }

    // If any error occurs
    if (error) {
        return (
        <div>
            <div className="text-center">
                <BreadCrumbNCover pageName="Payment"/>
                <div>Error Occurred in processing payment.! Please try again.</div>;
            </div>
        </div>
        )
    }

    // Default Render
    return (
        <div>
            <div className="text-center">
            <BreadCrumbNCover pageName="paypal" />
            <h4>Total Amount ${state.total.toFixed(2)}</h4>
            <div ref={paypalRef} />
            </div>
        </div>
    );
}

