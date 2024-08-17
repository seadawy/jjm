import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useHistory } from "react-router-dom";

const PayPalButton = ({ car }) => {
    const history = useHistory();
    const [loading, setLoading] = useState(false); // Loader state

    const initialOptions = {
        clientId: "Acl4VCIgVWEzFRsyzPfn_JQXXzAueAtM9l5u5HRntB2z1OxQw0326TwpxlTeCbMkPyAr50HcvDQxex2D",
        intent: "capture",
        currency: "USD",
    };

    const createOrder = async () => {
        try {
            setLoading(true); // Start loading
            const res = await fetch('https://api.jjmmods.store/api/create-paypal-order', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    carId: car.id,
                    model: car.model,
                    price: car.price
                }),
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            return data.id;
        } catch (error) {
            console.error("Error creating PayPal order:", error);
            setLoading(false); // Stop loading in case of error
            throw error;
        }
    };

    const onApprove = async (data, actions) => {
        try {
            const res = await fetch('https://api.jjmmods.store/api/capture-paypal-order', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    token: data.orderID
                }),
            });
            const data2 = await res.json();
            if (data2.error) {
                throw new Error(data2.error);
            }
            history.replace(`/checkout/${data2.message.id}`);
        } catch (error) {
            console.error("Error capturing PayPal order:", error);
        } finally {
            setLoading(false); // Stop loading after process is done
        }
    };

    const onCancel = (data) => {
        setLoading(false); // Stop loading if cancelled
        alert('Payment cancelled');
        console.log('Payment was cancelled!', data);
    };

    const onError = (err) => {
        setLoading(false); // Stop loading if there's an error
        alert('An error occurred during the transaction');
        console.log('Error:', err);
    };

    return (
        <>
            {loading && <div className="loader">Processing your payment...</div>} {/* Loader */}
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
                    onCancel={onCancel}
                    onError={onError}
                />
            </PayPalScriptProvider>
        </>
    );
};

export default PayPalButton;
