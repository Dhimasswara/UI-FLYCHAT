import LayoutAuth from '../../components/TemplateAuth/LayoutAuth'
import FormAuth from '../../components/Form/FormAuth'
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';
import { useUserLoginMutation } from '../../features/auth/authApi';
import { setCredentials } from '../../app/reducer/authSlice';
import Swal from 'sweetalert2'


const Login = () => {
 
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userLogin, {isLoading, isError, isSuccess, error}] = useUserLoginMutation()
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const directPath = () => {
    return navigate('/')
  }

  const loginHandler = async (e) => {
    e.preventDefault();
    const res = await userLogin(data);
    const {token, refreshToken, ...user} = res.data
    dispatch(setCredentials({ user: user, token: res?.data?.token }));
  };

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        title: 'Login Successfull',
        icon: 'success',
      });
      directPath();
    }
  }, [isSuccess]);



  
  return (
    <LayoutAuth title={'Login'}>
      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {error?.data?.message}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      <form onSubmit={loginHandler}>
        <FormAuth title={'Email'} type={'email'} name={'email'} placeholder={'input your email'} value={data.email} onchange={changeHandler}></FormAuth>
        <FormAuth title={'Password'} type={'password'} name={'password'} placeholder={'input your password'} value={data.password} onchange={changeHandler}></FormAuth>
        <div className="d-grid mb-2 mt-3 text-light mb-5">
          <button className={`btn btn-dark mt-4`} type="submit">
            Login
          </button>
        </div>
        <span className='mt-5 text-center d-flex justify-content-center'>
            Dont have an account ? <Link to="/register" className='ms-2 text-danger no-underline'>Register.</Link>
        </span>
      </form>
        <ToastContainer/>
    </LayoutAuth>
  )
}

export default Login