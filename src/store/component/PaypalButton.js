import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ car }) => {
    const initialOptions = {
        clientId: "Acl4VCIgVWEzFRsyzPfn_JQXXzAueAtM9l5u5HRntB2z1OxQw0326TwpxlTeCbMkPyAr50HcvDQxex2D",
        intent: "capture",
        currency: "USD",
    };

    const createOrder = () => {
        return fetch('http://localhost/jjm/API/public/api/create-paypal-order', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: car.model,
                price: car.price
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }
                return data.id;  // Return the order ID to PayPal Buttons
            })
            .catch(error => {
                console.error("Error creating PayPal order:", error);
                throw error;
            });
    };

    const onApprove = (data, actions) => {
        return fetch('http://localhost/jjm/API/public/api/capture-paypal-order', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: data.orderID  // Pass the order ID as the token
            }),
        })
            .then(res => res.json())
            .then(details => {
                if (details.error) {
                    throw new Error(details.error);
                }
                alert('Transaction funds captured from ' + details.payer.name.given_name);
            })
            .catch(error => {
                console.error("Error capturing PayPal order:", error);
            });
    };
    return (

        <>
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                    style={{
                        shape: "pill",
                        layout: "horizontal",
                        color: "gold",
                        label: "paypal",
                        tagline: false
                    }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                />
            </PayPalScriptProvider>
        </>
    );
};

export default PayPalButton;
