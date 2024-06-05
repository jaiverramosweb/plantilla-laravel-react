import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';

export const Login = () => {

  const emailRef = useRef();
  const passwordRef = useRef();

  const [errors, setErrors] = useState(null)

  const { setUser, setToken } = useStateContext()

  const onSubmit = (e) => {
    e.preventDefault()
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    setErrors(null)

    axiosClient.post('/login', payload).then( ({data}) => {
      setUser(data.user)
      setToken(data.token)
    }).catch(err => {
      const response = err.response
      if(response.status === 422){
        if(response.data.errors) {
          setErrors(response.data.errors)
        } else {
          setErrors({
            email: [response.data.message]
          })
        }
      }
    })
  }

  return (
    <div className="bg-[url('/img/imgPileo.avif')] w-screen h-screen bg-no-repeat bg-cover">
      <div className='login-signup-form animated fadeInDown'>
        <div className="form rounded-md opacity-95">
          <img src="" alt="" />
          <h1 className='title'>Incio de sesión</h1>

          {
            errors && <div className='alert'>
              { Object.keys(errors).map( key => (
                <p key={key} >{ errors[key][0] }</p>
              ) ) }
            </div>
          }

          <form onSubmit={onSubmit}>
            <input ref={emailRef} type="email" placeholder='Email' />
            <input ref={passwordRef} type="password" placeholder='Password' />
            <button className='btn btn-block'>Login</button>
            <p className='message'>
              No estas registrado ? <Link to="/singnup">Crear cuenta</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
