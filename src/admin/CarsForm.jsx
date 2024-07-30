import { useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AppContext } from "../AppContext";

const CarForm = () => {
    // token 
    const { token } = useContext(AppContext);

    const [model, setModel] = useState('');
    const [price, setPrice] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [files, setFiles] = useState([]);
    const [link, setLink] = useState('');

    const onDrop = useCallback((acceptedFiles) => {
        setFiles(prevFiles => [
            ...prevFiles,
            ...acceptedFiles
        ]);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const [brands, setBrands] = useState();
    useEffect(() => {
        fetch(`/api/brands`).then(res => res.json()).then(data => setBrands(data)).catch(err => console.error(err));
    }, [])

    const fileDelHandeling = (index) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    }
    const formSubmitHandeling = (e) => {
        e.preventDefault();
        const dataForm = new FormData();
        dataForm.append("model", model);
        dataForm.append("price", price);
        dataForm.append("brand_id", selectedBrand);
        dataForm.append("link", link);
        files.forEach((file, index) => {
            dataForm.append(`files[${index}]`, file);
        });
        console.log(token);
        fetch(`/api/cars`, {
            method: "post",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': "application/json"
            },
            body: dataForm
        }).then(res => res.json()).then((data) => {
            console.log(data);
        }).catch(err => console.log(err, "during saving car"));
    }
    return (
        <>
            <form onSubmit={(e) => formSubmitHandeling(e)}>
                <div className="flex gap-6">
                    <div className="w-8/12 flex flex-col">
                        <label htmlFor="model" className="dark:text-white font-bold text-2xl">Model</label>
                        <input type="text" name="model" id="model" className="rounded py-3 shadow-md mt-1" value={model} onChange={(e) => setModel(e.target.value)} />
                    </div>
                    <div className="w-4/12 flex flex-col">
                        <label htmlFor="price" className="dark:text-white font-bold text-2xl">Price</label>
                        <input type="number" name="price" id="price" placeholder="$$$" className="rounded py-3  shadow-md mt-1" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                </div>
                <div className="flex flex-col w-full mt-6">
                    <label htmlFor="brand" className="dark:text-white font-bold text-2xl">Brand</label>
                    <select name="brand" id="brand" value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} className="rounded py-3 shadow-md mt-1">
                        <option value="">Select Brand</option>
                        {brands && brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>{brand.brand}</option>
                        ))}
                    </select>
                </div>
                <div className={`border-8 border-dashed flex justify-center mt-8 rounded flex-col ${isDragActive ? "border-indigo-600" : "dark:border-white border-gray-400"}`}>
                    <div {...getRootProps()} className="p-16 outline-none ">
                        <input {...getInputProps()} />
                        <p className="text-center text-gray-500"><i className="pi pi-images text-8xl mb-5"></i></p>
                        {
                            isDragActive ?
                                <p className="text-gray-400 text-center font-semibold text-2xl">Drop the files here ...</p> :
                                <p className="text-gray-400 text-center font-semibold text-2xl">Drag drop some files here, or click to select files</p>
                        }
                    </div>
                </div>
                <br />
                <div className="dark:bg-slate-600 p-3 flex flex-row overflow-hidden gap-4 flex-wrap items-center rounded">
                    {
                        files.length ? files.map((file, index) => (
                            <div key={index} className="relative">
                                <button type="button" className="bg-red-500 px-2 py-1 rounded-full absolute -top-1 -right-3" onClick={() => fileDelHandeling(index)}><i className="text-white pi pi-trash"></i></button>
                                <img src={URL.createObjectURL(file)} className="w-36 h-28 rounded-md" alt="hello" />
                            </div>
                        )) : (<p className="dark:text-white font-semibold text-lg">No files Selected</p>)
                    }
                </div>
                <div className="flex flex-col w-full mt-6">
                    <label htmlFor="link" className="dark:text-white font-bold text-2xl">Download Link</label>
                    <input name="link" id="link" value={link} onChange={(e) => setLink(e.target.value)} className="rounded py-3 shadow-md mt-1" />
                </div>

                <button type="submit" className="bg-indigo-700 px-12 py-3 mt-5 float-end rounded shadow text-white text-2xl">
                    Save Car
                </button>
            </form>
        </>
    );
}

export default CarForm;