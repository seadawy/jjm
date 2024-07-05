import NavbarComponent from '../shared/NavbarComponent';
const Login = () => {
    return (
        <>
            <header>
                <NavbarComponent>
                </NavbarComponent>
            </header>
            <main className='h-screen heroLogin w-screen flex fixed justify-center'>
                <div className='sm:w-fit w-full h-fit mx-4 p-4 sm:mx-auto sm:p-14 sm:mt-8
                sm:border rounded-md sm:bg-[#9c9c939a] dark:sm:bg-[#6f6c6cb1] sm:shadow-2xl'>
                    <form action="" className='flex flex-col gap-2 justify-center'>
                        <center>
                            <img src="/jjmlogo.png" className='my-5' width="150" alt="logo" />
                        </center>
                        <input className='form-input pe-20 rounded shadow' type="text" placeholder="username" />
                        <input className='form-input pe-20 rounded shadow' type="text" placeholder="password" />
                        <div className='mb-3 mt-1 flex items-center gap-2 ms-1'>
                            <input type="checkbox" className='p-2 rounded focus-visible:bg-violet-600 focus-within:bg-violet-700 checked:bg-violet-800' id='remember' />
                            <label className='text-white sm:text-cyan-950 font-sans ' htmlFor="remember">remember me</label>
                        </div>
                        <button className='border bg-violet-600 hover:bg-violet-800 shadow font-sans font-bold px-8 text-white py-2 rounded'>
                            login
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}

export default Login;