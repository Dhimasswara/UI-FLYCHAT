import LayoutAuth from '../../components/TemplateAuth/LayoutAuth'
import FormAuth from '../../components/Form/FormAuth'
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';
import { useUserRegisterMutation } from '../../features/auth/authApi';
import { showLoading, failedLoading, successLoading } from '../../common/loadingHandler'

const Register = () => {

  const navigate = useNavigate()
  const [userRegister ,{isLoading, isSuccess, isError, error}] = useUserRegisterMutation()
  const [data, setData] = useState({
    fullname: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setData(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await userRegister(data)
  }
  
  const directPath = () => {
    return navigate('/login')
  }

  useEffect(() => {
    if (isLoading) {
      showLoading('Please Wait....')
    }

    if (isSuccess) {
      successLoading('Register Success, login chatting with your friends 😍')
      setData({
        fullname: '',
        email: '',
        password: ''
      })
      directPath();
    }

    if (isError) {
      failedLoading(error?.data?.message)
      setData(prev => {
        return {
          ...prev,
          password: ''
        }
      })
    }

  }, [isLoading, isSuccess, isError])


  return (
    <LayoutAuth title={'Register'}>
      <form onSubmit={handleSubmit}>
        <FormAuth title={'Name'} type={'text'} name={'fullname'} placeholder={'Name'} value={data.name} onchange={handleChange} ></FormAuth>
        <FormAuth title={'Email'} type={'email'} name={'email'} placeholder={'Email'} value={data.email} onchange={handleChange} ></FormAuth>
        <FormAuth title={'Password'} type={'password'} name={'password'} placeholder={'Password'} value={data.password}  onchange={handleChange} ></FormAuth>

        <div className="d-grid mb-2 mt-3 text-light mb-4">
          <button className={`btn btn-dark mt-4`} type="submit">
            Register
          </button>
        </div>
        <span className='d-flex justify-content-center'>
            Already have an account ? <Link to="/login" className='no-underline ms-2 text-danger'> Login.</Link>
        </span>
      </form>
        <ToastContainer/>
    </LayoutAuth>
  )
}

export default Register