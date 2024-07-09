import { Button } from 'primereact/button';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Home = () => {
    return (<>
        {/* Discord Hero */}
        <div className="DiscordHero surface-0 text-700 text-center p-18 py-48 bg-[url('/img/hero.png')] hover:bg-[url('/img/hero-on.png')] bg-left bg-fixed bg-no-repeat">
            <div className="text-blue-600 font-bold mb-3"><i className="pi pi-discord"></i>&nbsp; POWERED BY JJM</div>
            <div className="text-900 font-bold text-5xl mb-3 text-white">Join Our Community</div>
            <div className="text-700 text-2xl mb-5"></div>
            <Button label="Join Now" icon="pi pi-discord" className="bg-blue-400 text-white font-bold px-5 py-3 
            p-button-raised rounded-full space-x-4 dark:hover:bg-purple-900 hover:bg-purple-300" />
            <br />
        </div>
        {/* Statics */}
        <div className="bg-white dark:bg-black sm:py-9 ">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 dark:text-white">
                <h2 className="text-6xl py-4 my-12 font-semibold leading-7 text-indigo-600 text-center" style={{ textShadow: "1px 1px 1px white" }}>Achivement</h2>
                <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3 dark:text-white">
                    <div className="border-4 border-indigo-800 py-6 px-16 shadow-xl rounded-md mx-auto flex max-w-xs flex-col gap-y-4  hover:bg-indigo-700 dark:hover:bg-slate-800 hover:text-white group">
                        <dt className="text-base leading-7 text-gray-600 dark:text-white group-hover:text-white">Successful Sale</dt>
                        <dd className="order-first text-3xl font-bold dark:text-white tracking-tight text-gray-900 group-hover:text-white dark:group-hover:text-white sm:text-5xl">20k</dd>
                    </div>
                    <div className="border-4 border-indigo-800 w-56 py-6 px-18 shadow-xl rounded-md mx-auto flex max-w-xs flex-col gap-y-4 hover:bg-indigo-700 dark:hover:bg-slate-800 hover:text-white group">
                        <dt className="text-base leading-7 text-gray-600 dark:text-white group-hover:text-white">Car Avaliable</dt>
                        <dd className="order-first text-3xl font-bold dark:text-white  tracking-tight text-gray-900 group-hover:text-white dark:group-hover:text-white sm:text-5xl">200</dd>
                    </div>
                    <div className="border-4 border-indigo-800 py-6 px-16 shadow-xl rounded-md mx-auto flex max-w-xs flex-col gap-y-4 hover:bg-indigo-700 dark:hover:bg-slate-800 hover:text-white group">
                        <dt className="text-base leading-7 text-gray-600 dark:text-white group-hover:text-white">Brand Avaliable</dt>
                        <dd className="order-first text-3xl font-bold dark:text-white tracking-tight text-gray-900 group-hover:text-white dark:group-hover:text-white sm:text-5xl">20</dd>
                    </div>
                </dl>
            </div>
        </div>
        {/* Feature */}
        <div className="bg-gray-100 dark:bg-black py-24 sm:py-20 divide-y divide-dashed hover:divide-solid">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-6xl py-4 font-semibold leading-7 text-indigo-600" style={{ textShadow: "1px 1px 1px white" }}>Features</h2>
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
                                <Link to="/store" className='bg-indigo-600 rounded-md px-5 shadow flex font-bold items-center mt-2 gap-3 p-1 text-white'>
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
            <p className='sm:me-14'>Additional Support In <a href='https://discord.com/invite/7XkQjJY8pG' className='border-b-2 hover:text-indigo-800 dark:hover:text-white text-indigo-400 border-indigo-500' target='_blank' >Discord</a>
                </p>
        </div>
    </>);
}

export default Home;