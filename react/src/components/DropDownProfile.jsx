import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client';

export const DropDownProfile = () => {
    const navgate = useNavigate()

    const {user, setUser, setToken} = useStateContext()

    const onLogout = (e) => {
        e.preventDefault()
        axiosClient.post('/logout').then(() => {
            setUser({})
            setToken(null)
            navgate('/login')
        })
    }

  return (
    <div className='flex flex-col dropDownProfile'>
        <ul className='flex flex-col gap-4'>
            <li className='cursor-pointer hover:text-dark-purple'>Profile</li>
            <li className='cursor-pointer hover:text-dark-purple' onClick={onLogout}>Logout</li>
        </ul>
    </div>
  )
}
