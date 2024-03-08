import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client';
import { Sidebar } from './Sidebar';
import { DropDownProfile } from './DropDownProfile';

export const DefaultLayout = () => {

    const {user, token, notification, setUser} = useStateContext()

    const [openProfile, setOpenProfile] = useState(false)

    if(!token){
        return <Navigate to="/login" />
    }

    useEffect(() => {
        axiosClient.get('/user').then(({data}) => {
            setUser(data)
        })
    }, [])
    

  return (
    <div id='defaultLayout'>

        <Sidebar />

        <div className='content'>
            <header>
                <div></div>
                <div>
                    <span onClick={() => setOpenProfile(!openProfile)} className='cursor-pointer hover:text-dark-purple'>
                        {user.name}
                    </span>
                    {
                        openProfile &&  <DropDownProfile />
                    }
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </div>

        {notification && (
            <div className='notification'>
                { notification }
            </div>
        )}
    </div>
  )
}
