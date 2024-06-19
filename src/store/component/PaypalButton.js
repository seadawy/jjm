import React from 'react';

const PayPalButton = () => {
    /*  { amount, description }    const handlePayPalClick = () => {
            const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=YOUR_PAYPAL_EMAIL&item_name=${description}&amount=${amount}&currency_code=USD`;
            window.open(paypalUrl, '_blank');
             onClick={handlePayPalClick}

            }; */

    return (
        <button
            className="bg-yellow-500 text-black font-bold 
            py-3 px-4 rounded-full hover:bg-yellow-600 dark:text-gray-800"
        >
            Pay with PayPal
            <i className='pi pi-paypal ms-2'></i>
        </button>
    );
};

export default PayPalButton;
