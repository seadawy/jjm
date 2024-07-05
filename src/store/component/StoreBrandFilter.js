import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react'
import { ProgressSpinner } from 'primereact/progressspinner';
import { useEffect, useState } from 'react';
const StoreBrandFilter = ({ fetchFilter }) => {
    const [values, setValues] = useState([]);
    useEffect(() => {
        fetch('http://192.168.1.15/jjm/API/public/api/Brands')
            .then(response => response.json())
            .then(data => {
                setValues(data);
            })
            .catch(error => console.error('Error fetching brands:', error));
    }, [])
    return (
        <Disclosure as="div" className="shadow-md rounded-md bg-gray-100 dark:bg-slate-700 border-gray-200 px-4 py-6 sticky top-3" defaultOpen={true}>
            {({ open }) => (
                <>
                    <h3 className="-mx-2 -my-3 flow-root">
                        <DisclosureButton className="flex w-full dark:text-white items-center justify-between px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900 dark:text-white">Brands</span>
                            <span className="ml-6 flex items-center dark:text-white">
                                {open ? (
                                    <i className="pi pi-minus h-5 w-5" aria-hidden="true" ></i>
                                ) : (
                                    <i className="pi pi-plus h-5 w-5" aria-hidden="true" ></i>
                                )}
                            </span>
                        </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                        <div className="space-y-6">
                            <center>  {!values.length && <ProgressSpinner style={{ width: '25px', height: '25px', marginTop: '5px' }} strokeWidth="10" animationDuration=".5s" />}</center>
                            {!!values.length && values.map((option, optionIdx) => (
                                <div key={option.id} className="flex items-center">
                                    <input
                                        id={`filter-mobile-${option.id}-${optionIdx}`}
                                        name={`${option.id}[]`}
                                        defaultValue={option.id}
                                        type="checkbox"
                                        onChange={() => { fetchFilter(option.id) }}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                        htmlFor={`filter-mobile-${option.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500 dark:text-gray-200"
                                    >
                                        {option.brand} ({option.cars_count})
                                    </label>
                                </div>
                            ))}
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    );
}
export default StoreBrandFilter;