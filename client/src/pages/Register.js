import React,{useEffect, useState} from 'react'
import {Form,Input,message} from 'antd'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../componenets/Spinner'
const Register = () => {
    const navigate = useNavigate()
    const [loading, setloading] = useState(false)
    //form submit
    const submitForm =async(values)=>{
        try {
            setloading(true)
            await axios.post("/users/register", values);
            message.success("Registration successful")
            setloading(false)
            navigate('/login')
        } catch (error) {
            setloading(false)
            message.error("Somethig went wrong")
        }
    }


//prevent for login user

useEffect(()=>{
    debugger
    if(localStorage.getItem("user")){
        navigate("/")
    }
},[navigate])
  return (
    <>
<div className='register-page'>
    <div className='register-content'>
        {loading && <Spinner/>}
        <Form layout='vertical' onFinish={submitForm}>
            <h1>Register</h1>
            <Form.Item label='Name' name="name" className="form-item">
                <Input/>
            </Form.Item>
            <Form.Item label='Email' name="email" className="form-item">
                <Input type='email'/>
            </Form.Item>
            <Form.Item label='Password' name="password" className="form-item">
                <Input type='password'/>
            </Form.Item>
            <div className='d-flex'>
                <Link to={"/login"}>Already Register ? Click Here to Login</Link>
            </div>
            <button className='btn btn-primary'>Register</button>
        </Form>
    </div>
</div>


    </>
  )
}

export default Register
