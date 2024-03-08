import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

export const Singnup = () => {

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmartionRef = useRef();

  const [errors, setErrors] = useState(null)

  const { setUser, setToken } = useStateContext()

  const onSubmit = (e) => {
    e.preventDefault()
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmartionRef.current.value
    }

    axiosClient.post('/singnup', payload).then( ({data}) => {
      setUser(data.user)
      setToken(data.token)
    }).catch(err => {
      const response = err.response
      if(response.status === 422){
        setErrors(response.data.errors)
      }
    })
  }


  return (
    <div className='login-signup-form animated fadeInDown'>
      <div className="form">
        <h1 className='title'>Singnup for free</h1>

        {
          errors && <div className='alert'>
            { Object.keys(errors).map( key => (
              <p key={key} >{ errors[key][0] }</p>
            ) ) }
          </div>
        }

        <form onSubmit={onSubmit}>
          <input ref={nameRef} type="text" placeholder='Full Name' />
          <input ref={emailRef} type="email" placeholder='Email Address' />
          <input ref={passwordRef} type="password" placeholder='Password' />
          <input ref={passwordConfirmartionRef} type="password" placeholder='Password Confirmation' />
          <button className='btn btn-block'>Singnup</button>
          <p className='message'>
            Already Registered ? <Link to="/login">Sing in</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
