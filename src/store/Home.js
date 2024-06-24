import { Button } from 'primereact/button';
import BrandComponent from './component/BrandComponent'

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Home = () => {
    const [brands, setBrands] = useState();
    useEffect(() => {
        fetch('http://192.168.1.7/jjm/API/public/api/Brands').then((res) => res.json()).then((data) => {
            setBrands(data);
        });
    }, []);
    return (<>
        {/* Discord Hero */}
        <div className="DiscordHero surface-0 text-700 text-center p-18 py-48 bg-[url('/img/hero.png')] hover:bg-[url('/img/hero-on.png')] bg-left bg-no-repeat">
            <div className="text-blue-600 font-bold mb-3"><i className="pi pi-discord"></i>&nbsp; POWERED BY JJM</div>
            <div className="text-900 font-bold text-5xl mb-3 text-white">Join Our Community</div>
            <div className="text-700 text-2xl mb-5"></div>
            <Button label="Join Now" icon="pi pi-discord" className="bg-blue-400 text-white font-bold px-5 py-3 
            p-button-raised rounded-full space-x-4 dark:hover:bg-purple-900 hover:bg-purple-300" />
            <br />
        </div>
        <hr />
        {/* Statics */}
        <div class="bg-white sm:py-9">
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
                <dl class="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                    <div class="border-4 border-slate-800 py-6 px-12 shadow-2xl rounded-md mx-auto flex max-w-xs flex-col gap-y-4 hover:bg-slate-800 hover:text-white group">
                        <dt class="text-base leading-7 text-gray-600 group-hover:text-white">Successful Sale</dt>
                        <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:group-hover:text-white sm:text-5xl">2k</dd>
                    </div>
                    <div class="border-4 border-slate-800 w-52 py-6 px-12 shadow-2xl rounded-md mx-auto flex max-w-xs flex-col gap-y-4 hover:bg-slate-800 hover:text-white group">
                        <dt class="text-base leading-7 text-gray-600 group-hover:text-white">Car Avaliable</dt>
                        <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:group-hover:text-white sm:text-5xl">200</dd>
                    </div>
                    <div class="border-4 border-slate-800 py-6 px-12 shadow-2xl rounded-md mx-auto flex max-w-xs flex-col gap-y-4 hover:bg-slate-800 hover:text-white group">
                        <dt class="text-base leading-7 text-gray-600 group-hover:text-white">Brand Avaliable</dt>
                        <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:group-hover:text-white sm:text-5xl">12</dd>
                    </div>
                </dl>
            </div>
        </div>
        <hr />
        {/* Feature */}
        <div class="bg-white dark:bg-slate-800 py-24 sm:py-26">
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
                <div class="mx-auto max-w-2xl lg:text-center">
                    <h2 class="text-3xl py-4 font-semibold leading-7 text-indigo-600">Our Features</h2>
                    <p class="mt-2 text-3xl font-bold tracking-tight dark:text-white text-gray-900 sm:text-3xl">Everything you need to customize your game</p>
                    <p class="mt-6 text-md leading-8 text-gray-600 dark:text-gray-400">
                        Explore our extensive range of high-quality FiveM cars to enhance your server. Transform your gameplay with stunning, customizable vehicles. Start creating your perfect game today!
                    </p>
                </div>
                <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        <div class="relative pl-16">
                            <dt class="text-base font-semibold leading-7 dark:text-white text-gray-900">
                                <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                    <i className='pi pi-car text-white'></i>
                                </div>
                                High Quality
                            </dt>
                            <dd class="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                                Elevate your FiveM server with our meticulously crafted, high-quality cars. Enjoy superior performance and stunning visuals.
                            </dd>
                        </div>
                        <div class="relative pl-16">
                            <dt class="text-base font-semibold leading-7 dark:text-white text-gray-900">
                                <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                    <i className='pi pi-receipt text-white'></i>
                                </div>
                                Payment
                            </dt>
                            <dd class="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                                Secure your purchases hassle-free with our streamlined payment process. Enjoy peace of mind knowing your transactions are protected and efficient.
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
        {/* Brands */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {brands && brands.map((brand) => (
                <Link to={`/Store/Brand/${brand.id}`}>
                    <BrandComponent
                        key={brand.id}
                        logo={brand.brand_img}
                        name={brand.brand}
                    />
                </Link>
            ))}
        </div>
    </>);
}

export default Home;