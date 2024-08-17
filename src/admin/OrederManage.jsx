import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";

function OrderManage() {
    const { token } = useContext(AppContext);
    const [orders, setOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;

    useEffect(() => {
        fetch("https://api.jjmmods.store/api/orders", {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setOrders(data);
            });
    }, [token]);

    const handleFilter = (order) => {
        return (
            (filterStatus === "" || order.status === filterStatus) &&
            (order.paypal_transaction_id.includes(searchTerm) ||
                order.customer_email.includes(searchTerm))
        );
    };

    // Pagination logic
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.filter(handleFilter).slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(orders.filter(handleFilter).length / ordersPerPage);

    return (
        <div className="container mx-auto p-4">
            <h2 className="dark:text-white text-5xl font-bold mb-7">Orders Management</h2>
            <hr className="mb-10" />
            <div className="flex items-center mb-4 justify-between">
                <input
                    type="text"
                    placeholder="Search by Transaction ID or Email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className=" rounded-md p-2 px-3 mr-4 w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className=" rounded-md p-2 px-5 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 pe-10"
                >
                    <option value="">All Statuses</option>
                    <option value="CREATED">Created</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="PENDING">Pending</option>
                    <option value="FAILED">Failed</option>
                </select>
            </div>
            <div className="overflow-x-auto rounded-md shadow-md">
                <table className="min-w-full bg-white dark:bg-slate-700 dark:text-white rounded shadow-sm rounded-t-lg">
                    <thead className="bg-gray-100  text-gray-600 uppercase rounded-t-lg text-sm leading-normal">
                        <tr className="rounded-t-lg">
                            <th className="py-3 px-6 text-left">Transaction ID</th>
                            <th className="py-3 px-6 text-left">Customer Email</th>
                            <th className="py-3 px-6 text-left">Model</th>
                            <th className="py-3 px-6 text-left">Status</th>
                            <th className="py-3 px-6 text-left">Created At</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {currentOrders.map((order) => (
                            <tr key={order.paypal_transaction_id} className="border-b dark:border-black dark:text-white
                             border-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800">
                                <td className="py-3 px-6 text-left whitespace-nowrap">{order.paypal_transaction_id}</td>
                                <td className="py-3 px-6 text-left">{order.customer_email}</td>
                                <td className="py-3 px-6 text-left text-ellipsis">{order.car_details.model}</td>
                                <td className="py-3 px-6 text-left">
                                    <span
                                        className={`py-1 px-3 rounded-full text-xs ${order.status === "CREATED" ? "bg-blue-200 text-blue-600" :
                                            order.status === "COMPLETED" ? "bg-green-200 text-green-600" :
                                                order.status === "PENDING" ? "bg-yellow-200 text-yellow-600" :
                                                    "bg-red-200 text-red-600"
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-left">{new Date(order.created_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="disabled:opacity-50 disabled:cursor-not-allowed bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-600"
                >
                    Previous
                </button>
                <span className="text-gray-600">Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="disabled:opacity-50 disabled:cursor-not-allowed bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-600"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default OrderManage;
