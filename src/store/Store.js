import { useState, useEffect } from 'react'
import {
    Dialog,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
    TransitionChild,
} from '@headlessui/react'
import { ProgressSpinner } from 'primereact/progressspinner';
import StoreBrandFilter from './component/StoreBrandFilter'
import CarsGraid from './component/CarsGraid'
const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Store() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [numberOfItems, setNumberOfItems] = useState(0);
    const [Brands, setBrands] = useState([]);
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const fetchCars = (page) => {
        fetch(`http://192.168.1.7/jjm/API/public/api/Cars`)
            .then(res => {
                return res.json();
            }).then((data) => {
                const carsWithImages = data.map(car => ({
                    ...car,
                    images: JSON.parse(car.imgArray)
                }));
                setNumberOfItems(carsWithImages.length)
                setCars(carsWithImages);
                setIsLoading(false);

            }).catch((error) => { console.error('Error fetching cars:', error); })
    };
    useEffect(() => {
        fetchCars();
        fetch('http://192.168.1.7/jjm/API/public/api/Brands')
            .then(response => response.json())
            .then(data => {
                setBrands(data);
            })
            .catch(error => console.error('Error fetching brands:', error));
    }, [])
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
                            <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                <div className="flex items-center justify-between px-4">
                                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                    <button
                                        type="button"
                                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                        onClick={() => setMobileFiltersOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <i className="pi pi-times h-6 w-6" aria-hidden="true" ></i>
                                    </button>
                                </div>

                                {/* Filters */}
                                <form className="mt-4 border-t border-gray-200">
                                    <StoreBrandFilter type="Brands" values={Brands}></StoreBrandFilter>
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
                    <h1 className="text-lg sm:text-4xl font-bold tracking-tight text-gray-900 flex items-center dark:text-white">
                        Avaliable Cars <span className="text-sm bg-red-500 rounded-full px-2 mx-3 text-white">{numberOfItems}</span>
                    </h1>
                    <div className="flex items-center">
                        <Menu as="div" className="relative inline-block text-left z-20">
                            <div>
                                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 dark:text-gray-100 hover:text-gray-900">
                                    Sort
                                    <i
                                        className="pi pi-angle-down -mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    ></i>
                                </MenuButton>
                            </div>

                            <Transition
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white dark:bg-slate-700  shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <MenuItem key={option.name}>
                                                {({ focus }) => (
                                                    <a
                                                        href={option.href}
                                                        className={classNames(
                                                            option.current ? 'font-medium text-gray-900 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400',
                                                            focus ? 'bg-gray-100 dark:hover:text-gray-500' : '',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        {option.name}
                                                    </a>
                                                )}
                                            </MenuItem>
                                        ))}
                                    </div>
                                </MenuItems>
                            </Transition>
                        </Menu>

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
                            <StoreBrandFilter type="Brands" values={Brands}></StoreBrandFilter>
                        </form>

                        {/* Product grid */}
                        <div className="lg:col-span-3">
                            <div className="container">
                                <div class="bg-gray-100 rounded dark:bg-slate-700 sticky top-0 z-10 p-4">
                                    <input type="text"
                                        className="pl-10 pr-4 py-2 w-full border rounded focus:outline-none focus:ring-2
                                        dark:bg-slate-600 dark:text-white dark:placeholder:text-white  focus:ring-purple-200"
                                        placeholder="Search"
                                    />
                                    <div class="absolute inset-y-0 left-0 pl-8 dark:text-white flex items-center pointer-events-none">
                                        <i className='pi pi-search'></i>
                                    </div>
                                </div>
                                {isLoading ?
                                    <ProgressSpinner style={{ width: '50px', height: '50px',color:'red' ,fill:'red'}} strokeWidth="8" animationDuration=".5s" />
                                    :<CarsGraid cars={cars}></CarsGraid>}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}