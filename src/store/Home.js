import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Home = () => {
    const [brands, setBrands] = useState();
    useEffect(() => {
        fetch('http://192.168.1.15/jjm/API/public/api/Brands').then((res) => res.json()).then((data) => {
            setBrands(data);
        });
    }, []);
    return (<>
        {/* Discord Hero */}
        <div className="DiscordHero surface-0 text-700 text-center p-18 py-48 bg-[url('/img/hero.png')] hover:bg-[url('/img/hero-on.png')] bg-fixed bg-cover bg-center bg-no-repeat">
            <div className="text-900 font-bold text-5xl mb-3 text-white">Join Our Community</div>
            <div className="text-700 text-2xl mb-5"></div>
            <Button label="Join Now" icon="pi pi-discord" className="bg-blue-400 text-white font-bold px-5 py-3 
            p-button-raised rounded-full space-x-4 dark:hover:bg-purple-900 hover:bg-purple-300" />
            <br />
        </div>
        {/* Statics */}
        <div className="bg-white dark:bg-black sm:py-32 ">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 dark:text-white">
                <h2 className="text-5xl py-4 mb-2 font-semibold leading-7 text-indigo-600 text-center">Our Features</h2>
                <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3 dark:text-white">
                    <div className="border-dashed border-4 border-slate-800 py-6 px-20 shadow-2xl rounded-md mx-auto flex max-w-xs flex-col gap-y-4 hover:bg-slate-800 hover:text-white group">
                        <dt className="font-mono leading-7 text-gray-600 dark:text-white group-hover:text-white">Successful Sale</dt>
                        <dd className="order-first text-3xl font-semibold dark:text-white tracking-tight text-gray-900 dark:group-hover:text-white sm:text-7xl">2k</dd>
                    </div>
                    <div className="border-dashed border-4 border-slate-800 py-6 px-20 shadow-2xl rounded-md mx-auto flex max-w-xs flex-col gap-y-4 hover:bg-slate-800 hover:text-white group">
                        <dt className="font-mono leading-7 text-gray-600 dark:text-white group-hover:text-white">Car Avaliable</dt>
                        <dd className="order-first text-3xl font-semibold dark:text-white  tracking-tight text-gray-900 dark:group-hover:text-white sm:text-7xl">200</dd>
                    </div>
                    <div className="border-dashed border-4 border-slate-800 py-6 px-20 shadow-2xl rounded-md mx-auto flex max-w-xs flex-col gap-y-4 hover:bg-slate-800 hover:text-white group">
                        <dt className="font-mono leading-7 text-gray-600 dark:text-white group-hover:text-white">Brand Avaliable</dt>
                        <dd className="order-first text-3xl font-semibold dark:text-white tracking-tight text-gray-900 dark:group-hover:text-white sm:text-7xl">12</dd>
                    </div>
                </dl>
            </div>
        </div>
        {/* Feature */}
        <div className="bg-gray-100 dark:bg-black py-24 sm:py-26 divide-y divide-dashed hover:divide-solid">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-3xl py-4 font-semibold leading-7 text-indigo-600"> Features</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight dark:text-white text-gray-900 sm:text-3xl">Everything you need to customize your game</p>
                    <p className="mt-6 text-md leading-8 text-gray-600 dark:text-gray-400">
                        Explore our extensive range of high-quality FiveM cars to enhance your server. Transform your gameplay with stunning, customizable vehicles. Start creating your perfect game today!
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        <div className="relative pl-16">
                            <dt className="text-base font-semibold leading-7 dark:text-white text-gray-900">
                                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                    <i className='pi pi-car text-white'></i>
                                </div>
                                High Quality
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                                Elevate your FiveM server with our meticulously crafted, high-quality cars. Enjoy superior performance and stunning visuals.
                                <br />
                                <Link to="/store" className='bg-indigo-600 rounded-md px-2 flex items-center mt-2 gap-3 p-1 text-white'>
                                    Shop Now
                                    <i className='pi pi-arrow-right'></i>
                                </Link>
                            </dd>
                        </div>
                        <div className="relative pl-16">
                            <dt className="text-base font-semibold leading-7 dark:text-white text-gray-900">
                                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                    <i className='pi pi-receipt text-white'></i>
                                </div>
                                Payment
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                                Secure your purchases hassle-free with our streamlined payment process. Enjoy peace of mind knowing your transactions are protected and efficient.
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
        <div className='text-center flex sm:flex-row flex-col justify-between gap-2 dark:text-gray-400 p-6 font-sans font-bold px-5 '>
            <p >Copyright © 2024 JJM Mods - All Rights Reserved.</p>
            <p className='sm:me-14'>Additional Support In Discord</p>
        </div>
    </>);
}

export default Home;