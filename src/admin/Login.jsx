import { useContext, useEffect, useState } from 'react';
import NavbarComponent from '../shared/NavbarComponent';
import { AppContext } from '../AppContext';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const { setToken, setAdmin, tokenState, adminState } = useContext(AppContext);
    const history = useHistory();
    const [dataForm, setDataForm] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState();
    useEffect(() => {
        if (tokenState && adminState) {
            history.replace('/Admin/Dashboard', {
                state: {
                    message: 'Welcome Back',
                },
            });
        }
    }, [tokenState, adminState])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataForm)
            });
            const data = await response.json();
            if (data.error) {
                setError(data.error);
            } else {
                setToken(data.token);
                setAdmin(data.user);
            }
        } catch (error) {
            console.log('Something went wrong while fetching: ' + error);
        }
    };

    return (
        <>
            <header>
                <NavbarComponent />
            </header>
            <main className='h-screen heroLogin w-screen flex fixed justify-center'>
                <div className='sm:w-fit w-full mt-40 h-fit mx-4 p-4 sm:mx-auto sm:p-14  sm:border rounded-md sm:bg-[#9c9c939a] dark:sm:bg-[#6f6c6cb1] sm:shadow-2xl'>
                    <form className='flex flex-col gap-2 justify-center' onSubmit={handleSubmit}>
                        <center>
                            <img src="/jjmlogo.png" className='my-5' width="150" alt="logo" />
                        </center>
                        <p className='text-red-400'>{error}</p>
                        <input className='form-input pe-20 rounded shadow' type="text" placeholder="email"
                            value={dataForm.email} onChange={(e) => setDataForm({ ...dataForm, email: e.target.value })} />
                        <input className='form-input pe-20 rounded shadow' type="password" placeholder="password"
                            value={dataForm.password} onChange={(e) => setDataForm({ ...dataForm, password: e.target.value })} />
                        <div className='mb-3 mt-1 flex items-center gap-2 ms-1'>
                            <input type="checkbox" className='p-2 rounded focus-visible:bg-violet-600 focus-within:bg-violet-700 checked:bg-violet-800' id='remember' />
                            <label className='text-white sm:text-cyan-950 font-sans' htmlFor="remember">Remember me</label>
                        </div>
                        <button className='border bg-violet-600 hover:bg-violet-800 shadow 
                        font-sans font-bold px-8 text-white py-2 rounded' type='submit'>
                            Login
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}

export default Login;
