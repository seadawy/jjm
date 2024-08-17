import { useContext, useState, useEffect } from "react";
import { AppContext } from "../AppContext";

const BrandManage = () => {
    const { token } = useContext(AppContext);

    const [newBrand, setNewBrand] = useState('');
    const [brands, setBrands] = useState([]);
    const [success, setSuccess] = useState(false);
    const [faild, setFaild] = useState();

    useEffect(() => {
        fetch('https://api.jjmmods.store/api/brands').then(res => res.json()).then((data) => {
            if (data.error) {
                throw new Error(data.error);
            } else {
                setBrands(data);
            }
        }).catch(err => setFaild(err));
    }, [success, faild]);

    /* Notification */
    useEffect(() => {
        setTimeout(() => {
            setSuccess(false);
        }, 5000);
    }, [success]);

    useEffect(() => {
        setTimeout(() => {
            setFaild(null);
        }, 5000);
    }, [faild]);

    const formSubmitHandeling = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('brand', newBrand)
        fetch('https://api.jjmmods.store/api/brands', {
            method: "post",
            headers: {
                "authorization": `Bearer ${token}`,
            },
            body: data
        }).then(res => res.json()).then((data) => {
            if (data.error) {
                throw new Error(data.error);
            } else {
                setSuccess(true);
            }
        }).catch(err => setFaild(err));
    }

    return (
        <>
            <h2 className="dark:text-white text-5xl font-bold mb-7">Brand Management</h2>
            <hr className="mb-10" />
            <form onSubmit={(e) => formSubmitHandeling(e)} className="flex flex-col items-end mb-5">
                <div className="w-full flex flex-col">
                    <label htmlFor="model" className="dark:text-white font-bold text-2xl">New Brand</label>
                    <input type="text" name="model" id="model" className="rounded py-3 shadow-md mt-1" value={newBrand} onChange={(e) => setNewBrand(e.target.value)} />
                </div>
                {success && <div className="bg-green-200 w-full border-4 border-green-700 mt-5 p-5">
                    <li className="text-green-900 font-bold text-lg">Brand added successfully</li>
                    <li className="text-green-900 font-bold text-lg">Auto Close in 5s</li>
                </div>}
                {faild && <div className="bg-red-200 w-full border-4 border-red-700 mt-5 p-5">
                    <li className="text-red-900 font-bold text-lg">Something went wrong</li>
                    <li className="text-red-900 font-bold text-lg">{faild.toString()}</li>
                    <li className="text-red-900 font-bold text-lg">Auto Close in 5s</li>
                </div>}
                <button type="submit" className="bg-indigo-600 w-fit px-12 py-3 mt-5 rounded shadow text-white text-2xl">
                    Save Brand
                </button>
            </form>
            <div className="overflow-x-auto rounded-md shadow-md">
                <table className="min-w-full bg-white dark:bg-slate-700 dark:text-white rounded shadow-sm rounded-lg">
                    <thead className="bg-gray-100  text-gray-600 uppercase rounded-t-lg text-sm leading-normal">
                        <tr className="rounded-t-lg">
                            <th className="py-3 px-6 text-left">#</th>
                            <th className="py-3 px-6 text-left">Brand Name</th>
                            <th className="py-3 px-6 text-left">Created At</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {brands.map((brand, index) => (
                            <tr key={brand.id} className="border-b dark:border-black dark:text-white
                        border-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800">
                                <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
                                <td className="py-3 px-6 text-left">{brand.brand}</td>
                                <td className="py-3 px-6 text-left">{new Date(brand.created_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default BrandManage;
