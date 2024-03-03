import { Form, Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../componenets/Spinner'
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate()
    const [loading, setloading] = useState(false)
     //form submit
     const submitForm =async(values)=>{
        try {
            setloading(true)
            const {data}=await axios.post("/users/login",values)
            setloading(false)
            message.success("Login successful")
            localStorage.setItem('user',JSON.stringify({...data.user,password:""}))
            navigate('/')
        } catch (error) {
            setloading(false)
            message.error("Somethig went wrong")
        }
    };

// prevent from login user

    useEffect(()=>{
        debugger
        if(localStorage.getItem("user")){
            navigate("/")
        }
    },[navigate])


  return (
    <>
        <div className='login-page'>
    <div className='login-content'>
    {loading && <Spinner/>}
        <Form layout='vertical' onFinish={submitForm}>
            <h1>Login</h1>
            <Form.Item label='Email' name="email" className="form-item">
                <Input type='email'/>
            </Form.Item>
            <Form.Item label='Password' name="password" className="form-item">
                <Input type='password'/>
            </Form.Item>
            <div className='d-flex'>
                <Link to={"/register"}>Not a User ? Click Here to Register</Link>
            </div>
            <button className='btn btn-primary'>Login</button>
        </Form>
    </div>
</div>

    </>
  ) 
}

export default Login
