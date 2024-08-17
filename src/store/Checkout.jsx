import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom/cjs/react-router-dom.min';
const Checkout = () => {
    const { orderID } = useParams();
    const [email, setEmail] = useState();
    const [status, setStatus] = useState();
    const [message, setMessage] = useState();
    useEffect(() => {
        fetch(`https://api.jjmmods.store/api/orders/${orderID}`).then(res => res.json()).then(data => {
            setEmail(data.customer_email);
            switch (data.status) {
                case "COMPLETED":
                    setMessage("Congrats! The payment process was successful");
                    setStatus(true)
                    break;
                case "CREATED":
                    setMessage("Unfortunately ! the payment is failed");
                    setStatus(false)
                default:
                    break;
            };
        }).catch(err => {
            console.log(err);
        });
    }, []);
    return (
        <>
            <div
                className="flex flex-col items-center h-screen overflow-hidden
                bg-gradient-to-r from-green-200 dark:from-green-800 dark:to-purple-800 to-purple-300">
                <div className="flex items-center justify-center mt-14">
                    {status ?
                        <i className="pi pi-check-circle text-green-600 text-[200px]"></i> :
                        <i className="pi pi-times text-red-600 text-[200px]"></i>
                    }
                </div>
                <h1 className="text-4xl font-bold dark:text-white text-gray-800 my-4 mt-12">
                    {message ?? ""}
                </h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">We are sending the invoice and download link to</p>
                <div className="bg-gray-100 border dark:bg-slate-900 shadow-lg dark:border-gray-800 border-gray-300 rounded-md px-4 py-2 mt-2">
                    <span className="text-blue-600 font-mono">{email ?? ""}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300  mt-6">⛔ Please check spam mail⛔</p>
                <Link to="/Store" className="flex justify-center items-center gap-3 bg-indigo-600 px-3 py-2.5 text-white rounded shadow mt-5">
                    <i className='pi pi-arrow-left'></i>
                    back to store
                </Link>
            </div>
        </>
    );
}

export default Checkout;