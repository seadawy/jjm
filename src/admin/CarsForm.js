import React, { useState, useEffect, useCallback } from "react";
import Dropzone from 'react-dropzone';

const CarsForm = () => {
    const labelcss = 'dark:text-white text-xl font-medium ms-1';
    const [brand, setBrand] = useState([]);
    const [model, setModel] = useState('');
    const [price, setPrice] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetch('http://192.168.1.15/jjm/API/public/api/Brands')
            .then((res) => res.json())
            .then((data) => {
                setBrand(data);
            })
            .catch((err) => { console.error(err); });
    }, []);

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            setFiles((old) => [
                ...old, {
                    name: file.name,
                    url: URL.createObjectURL(file),
                    file: file
                }
            ]);
        });
    }, []);

    const reset = () => {
        setFiles([]);
        setModel('');
        setPrice('');
        setSelectedBrand('');
    }

    const delImage = (idx) => {
        setFiles(files.filter((_, i) => i !== idx));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('model', model);
        formData.append('price', price);
        formData.append('brand', selectedBrand);
        files.forEach((file) => {
            formData.append('files[]', file.file);
        });

        try {
            const response = await fetch('http://192.168.1.15/jjm/API/public/api/Cars', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Car added successfully:', data);
                reset();
            } else {
                console.error('Error uploading data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <div className="mb-5 border-b-2 pb-2">
                <h2 className="dark:text-white text-5xl mb-3">Add Car</h2>
                <h3 className="text-gray-400">Admin/Cars/Add</h3>
            </div>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <div className="flex gap-5">
                    <div className="flex flex-col gap-2 w-4/5">
                        <label htmlFor="model" className={labelcss}>Model</label>
                        <input
                            type="text"
                            className="form-input rounded shadow"
                            id="model"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="price" className={labelcss}>Price</label>
                        <input
                            type="number"
                            className="form-input rounded shadow"
                            placeholder="$$$"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="brand" className={labelcss}>Brand</label>
                    <select
                        className="form-input rounded shadow"
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        required
                    >
                        <option disabled value="">Select Brand</option>
                        {brand && brand.map((brand) => (
                            <option value={brand.id} key={brand.id}>{brand.brand}</option>
                        ))}
                    </select>
                </div>
                <div className="col-span-full">
                    <label htmlFor="cover-photo" className={labelcss}>
                        Car Photos
                    </label>
                    <Dropzone onDrop={onDrop}>
                        {({ getRootProps, getInputProps }) => (
                            <div className="my-3 flex flex-col">
                                <label htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md bg-transparent font-semibold
                                    text-indigo-600 focus-within:outline-none focus-within:ring-2 bg-white
                                    p-2 hover:bg-slate-400 hover:text-white duration-75"
                                >
                                    <i className="pi pi-upload mx-3 font-black"></i>
                                    <span className="dark:text-purple-900">Browse and upload files</span>
                                    <input id="file-upload" name="file-upload" type="file" {...getInputProps()} className="sr-only hidden" multiple />
                                </label>
                                <div {...getRootProps()} className="mt-2 flex justify-center shadow-md rounded-lg border border-dashed
                                border-gray-900/25 dashed dark:border-white/50 px-6 py-10">
                                    <div className="text-center">
                                        <i className="mx-auto text-5xl text-gray-300 pi pi-image"></i>
                                        <p className="pl-1 dark:text-gray-400 text-center">drag and drop</p>
                                        <p className="text-xs leading-5 text-gray-600 dark:text-gray-400">PNG, JPG, WEBP up to 5MB</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Dropzone>
                    <div className="flex gap-3 flex-wrap dark:bg-slate-700 p-3 rounded shadow-md">
                        {files.length == 0 ? (<h1 className="text-center dark:text-white"> images required</h1>) : ""}
                        {files.map((img, index) => (
                            <div key={index} className="relative">
                                <button onClick={() => delImage(index)} type="button"
                                    className="bg-red-600 rounded right-0 hover:w-full hover:h-full transition-all duration-500 ease-in-out text-white px-1 absolute font-bold">
                                    <i className="pi pi-times"></i>
                                </button>
                                <img src={img.url} alt={img.name} className="rounded shadow" width="114" height="10" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex gap-5 mt-2 justify-end">
                    <input type="reset" onClick={reset} className="text-white bg-red-500 px-3 py-2 rounded shadow-md hover:bg-red-600" />
                    <input type="submit" className="text-white bg-indigo-600 px-5 py-2 rounded shadow-md hover:bg-indigo-500" />
                </div>
            </form >
        </>
    );
}

export default CarsForm;
