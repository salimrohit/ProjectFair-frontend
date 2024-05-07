import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import loginpic from '../assets/login.gif'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { loginApi, registerAPI } from '../services/allApi'
import 'react-toastify/dist/ReactToastify.css';
import { logoutResponseContext } from '../context/ContextShare'




function Auth({ register }) {

    const {authorToken, setAuthorToken} = useContext(logoutResponseContext)


    const navigate = useNavigate()
    //state to store data
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: ""
    })
    console.log(userData);

    const RegisterForm = register ? true : false

    //function to register a user

    const handleRegister = async (e) => {
        //inorder to prevent data loss
        e.preventDefault()
        const { username, email, password } = userData

        if (!username || !email || !password) {
            toast.info('PLease fill the form completely')
        }
        else {
            //api call 
            const result = await registerAPI(userData)
            console.log(result);
            if (result.status == 200) {
                toast.success('Registration successful')
                setUserData({
                    username: "",
                    email: "",
                    password: ""
                })
                navigate('/login')

            }
            else {
                toast.error(result.response.data)
            }
        }
    }

    //function to login 

    const handleLogin = async (e) => {
        e.preventDefault()

        const { email, password } = userData

        if (!email || !password) {
            toast.info('Please fill the form completely')
        }

        else {
            const result = await loginApi(userData)
            console.log(result);
            if (result.status == 200) {
                //adding data to session storage
                sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token",result.data.token)
                toast.success('Login Successful')
                setAuthorToken(true)
                setUserData({
                    username: "",
                    email: "",
                    password: ""
                })
                setTimeout(() => {
                    navigate('/')

                }, 2000);
            }
        }
    }



    return (
        <>
            <div className='w-100 d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                <div className="w-57 container">
                    <Link to={'/'} style={{ textDecoration: 'none' }} ><h5> <FontAwesomeIcon icon={faArrowLeft} className='me-2' />Back to Home</h5></Link>
                    <div className="bg-success p-5 rounded shadow">
                        <div className="row">
                            <div className="col-md-6">
                                <img src={loginpic} alt="" />
                            </div>
                            <div className="col-md-6 d-flex justify-content-center align-items-center flex-column">
                                <h2> <FontAwesomeIcon icon={faStackOverflow} className='me-3' />Project Fair</h2>
                                <h5 className='mt-3'>
                                    {RegisterForm ? 'Sign up to your Account' : 'Sign in to your Account'
                                    }
                                </h5>
                                <form className='p-5 w-100'>
                                    {RegisterForm &&
                                        <input type="text" placeholder='Enter Username'
                                            value={userData.username}
                                            onChange={(e) => setUserData({
                                                ...userData, username: e.target.value
                                            })} className='form-control' />}
                                    <input type="text" placeholder='Enter Email ID'
                                        value={userData.email}
                                        onChange={(e) => setUserData({ ...userData, email: e.target.value })} className='form-control mt-2' />
                                    <input type="text" placeholder='Enter Password'
                                        value={userData.password}
                                        onChange={(e) => setUserData({
                                            ...userData, password: e.target.value
                                        })} className='form-control mt-2' />

                                    {RegisterForm ?
                                        <div>
                                            <button onClick={handleRegister} className='btn btn-warning mt-3 text-dark w-100 fs-6' style={{ fontWeight: '500' }}>Register</button>
                                            <p className='mt-2'> Already a User? Click here to <Link to={'/login'} style={{ textDecoration: 'none', color: 'red' }}>Login</Link></p>
                                        </div> :
                                        <div>
                                            <button onClick={handleLogin} className='btn btn-warning mt-3 text-dark w-100 fs-6' style={{ fontWeight: '500' }}>Login</button>
                                            <p className='mt-2'>New User? Click here to <Link to={'/register'} style={{ textDecoration: 'none', color: 'red' }}>Register</Link></p>
                                        </div>
                                    }



                                </form>
                            </div>
                        </div>
                    </div>

                </div>



            </div>
            <ToastContainer theme='colored' position='top-center' autoClose={2000} />
        </>
    )
}

export default Auth
