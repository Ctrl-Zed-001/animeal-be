import { useState, useEffect } from 'react'
import { BiHide, BiShow } from 'react-icons/bi'
import { AiFillCode } from 'react-icons/ai'
import { AiOutlineLoading } from 'react-icons/ai'

const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault();
        props.login(username, password)
    }

    return (
        <div className="login-screen flex items-center">
            <div className="random-image-box w-9/12">
                <img src="https://picsum.photos/900/900" alt="" className="w-full object-cover h-screen" />
            </div>
            <div className="shadow p-8 w-3/12 h-screen">
                <img src="/images/logo.webp" alt="" className="h-16" />

                <h1 className='mt-4 text-lg font-semibold'>Welcome to StoreBase</h1>
                <p className='text-sm text-gray-400'>signin to continue</p>

                <form className='mt-10' onSubmit={handleSubmit}>

                    <div className="inputgroup">
                        <label htmlFor="username">Username</label>
                        <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder='Enter Username' className='mt-2 border border-gary-600 rounded w-full p-2' />
                    </div>

                    <div className="inputgroup mt-6">
                        <label htmlFor="password">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter Password' className='mt-2 border border-gary-600 rounded w-full p-2' />
                    </div>

                    <button type="submit" className='mt-6 bg-theme p-2 rounded w-full'>
                        Login
                    </button>

                </form>

                <p className="text-center text-sm text-gray-400 mt-52 flex items-center justify-center">
                    <AiFillCode className='text-black mr-2' />  Crafted by Brandity Studio.
                </p>
            </div>
        </div >
    )
}
export default Login