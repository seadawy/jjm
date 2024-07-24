import { useState } from 'react';
import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { ProgressSpinner } from 'primereact/progressspinner';
import StoreBrandFilter from './component/StoreBrandFilter';
import CarsGraid from '../shared/CarsGraidComponent';
import Paginator from './component/Paginator';
import useFetchCarsHook from '../shared/useFetchCarsHook';

const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
];

export default function Store({ pathParent = "/Store/Car/" }) {
    const initialPage = '/api/Cars';
    const {
        cars,
        isLoading,
        numberOfItems,
        paginateLinks,
        fetchSearch,
        fetchPaginate,
        fetchFilter,
    } = useFetchCarsHook(initialPage);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    return (
        <div>
            {/* Mobile filter dialog */}
            <Transition show={mobileFiltersOpen}>
                <Dialog className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                    <TransitionChild
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </TransitionChild>

                    <div className="fixed inset-0 z-40 flex">
                        <TransitionChild
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto dark:bg-slate-800 bg-white py-4 pb-12 shadow-xl">
                                <div className="flex items-center justify-between px-4">
                                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h2>
                                    <button
                                        type="button"
                                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md dark:bg-slate-500 dark:text-white bg-white p-2 text-gray-400"
                                        onClick={() => setMobileFiltersOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <i className="pi pi-times h-6 w-6" aria-hidden="true" ></i>
                                    </button>
                                </div>

                                {/* Filters */}
                                <form className="mt-4 border-gray-100 mx-2">
                                    <StoreBrandFilter fetchFilter={fetchFilter}></StoreBrandFilter>
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
                <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
                    <h1 className="text-lg sm:text-4xl font-bold tracking-tight text-gray-900 flex items-center dark:text-white">
                        Avaliable Cars <span className="text-sm bg-red-500 rounded-full px-2 mx-3 text-white">{numberOfItems}</span>
                    </h1>
                    <div className="flex items-center">
                        <button
                            type="button"
                            className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                            onClick={() => setMobileFiltersOpen(true)}
                        >
                            <span className="sr-only">Filters</span>
                            <i className="pi pi-filter h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>

                <section aria-labelledby="products-heading" className="pb-24 pt-6">
                    <h2 id="products-heading" className="sr-only">
                        Products
                    </h2>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                        {/* Filters */}
                        <form className="hidden lg:block">
                            <StoreBrandFilter fetchFilter={fetchFilter}></StoreBrandFilter>
                        </form>
                        {/* Product grid */}
                        <div className="lg:col-span-3">
                            <div className="shadow-md bg-gray-200 rounded dark:bg-slate-700 sticky top-3 z-10 p-4">
                                <input type="text"
                                    className="pl-10 pr-4 py-2 w-full border rounded focus:outline-none focus:ring-2
                                        dark:bg-slate-600 dark:text-white dark:placeholder:text-white  focus:ring-purple-200"
                                    placeholder="Search"
                                    onChange={(e) => {
                                        fetchSearch(e.target.value);
                                    }} />
                                <div className="absolute inset-y-0 left-0 pl-8 dark:text-white flex items-center pointer-events-none">
                                    <i className='pi pi-search'></i>
                                </div>
                            </div>
                            <center>
                                {isLoading ?
                                    <ProgressSpinner style={{ width: '50px', height: '50px', marginTop: '17px' }} strokeWidth="8" animationDuration=".7s" />
                                    : (<CarsGraid cars={cars} path={pathParent}></CarsGraid>)
                                }
                                <br />
                                {!isLoading && !!(cars.length) && <Paginator links={paginateLinks} pageChange={fetchPaginate}></Paginator>}
                                {!isLoading && !(cars.length) ? (<div className='w-auto flex-col text-7xl dark:text-gray-400'>
                                    <i className='pi pi-search mb-7'></i>
                                    <h1 className='m-0'>No Search Result</h1>
                                </div>) : ''}
                            </center>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
