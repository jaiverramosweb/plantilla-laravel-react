import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoArrowBack, IoApertureSharp, IoChevronDownSharp, IoAnalytics } from "react-icons/io5";
import { BiSolidDashboard } from "react-icons/bi";
import { FaUsers, FaProjectDiagram } from "react-icons/fa";

export const Sidebar = () => {
    const [open, setOpen] = useState(true)
    const [openMovile, setMopenMovile] = useState(false)
    const [submenuOpen, setSubmenuOpen] = useState(false)

    const Menus = [
        {
            title: 'Dashboard',
            path: '/dashboard',
            icon: <BiSolidDashboard />
        },
        {
            title: 'Users',
            path: '/users',
            icon: <FaUsers />
        },
        { title: 'Media', spacing: true },
        {
            title: 'Projects',
            submenu: true,
            icon: <FaProjectDiagram />,
            submenuItems: [
                {
                    title: 'Submenu 1',
                    path: '/'
                },
                {
                    title: 'Submenu 2',
                    path: '/'
                },
                {
                    title: 'Submenu 3',
                    path: '/'
                },
            ]
        },
        {
            title: 'Analytics',
            path: '/',
            icon: <IoAnalytics />
        },
    ]

  return (
    <div className={`bg-dark-purple h-screen p-1 pt-8 relative duration-300 ${open ? 'md:w-64' : 'md:w-16'} ${openMovile ? 'w-64' : 'w-1 p-1'}`}>
        
        < IoArrowBack onClick={() => setOpen(!open)} className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${!open && 'rotate-180'}`}/>

        < IoArrowBack onClick={() => setMopenMovile(!openMovile)} className={ `md:invisible bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${!openMovile && 'rotate-180'}`}/>


        <div className={`md:inline-flex md:visible ${!openMovile && 'invisible'}`}>
            <IoApertureSharp className={`bg-green-500 text-4xl rounded cursor-pointer block float-left duration-700 ${open && 'rotate-[360deg]'}`}/>
            
            <h1 className={`text-white text-2xl font-medium ml-2 duration-300 ${!open && 'scale-0'}`}>{open && 'Sistem Admin'}</h1>
        </div>

        <ul className={`md:pt-4 md:visible ${!openMovile && 'invisible'}`}>
 
            {Menus.map((menu, index) => (
                <>
                <li key={index} className={`text-gray-300 flex items-center gap-x-4 p-2 hover:bg-light-white rounded-sm ${menu.spacing ? 'mt-9' : 'mt-2'}`}>

                        <Link to={menu.path} className='text-2xl block float-left mr-3'>
                            {menu.icon}
                        </Link>
                        <Link to={menu.path}  className={`text-base flex-1 ${!open && 'invisible'}`}>{ menu.title }</Link>

                        {menu.submenu && (
                            <IoChevronDownSharp className={`duration-500 ${submenuOpen && 'rotate-180'}`} onClick={() => setSubmenuOpen(!submenuOpen)} />
                        )}
                </li>
                {
                    menu.submenuItems && submenuOpen && open && (
                        <ul>
                            {menu.submenuItems.map((item, index) => (
                                <li key={index} className='text-gray-300 flex items-center gap-x-4 p-2 hover:bg-light-white rounded-sm px-5'>
                                    <Link to={item.path}>
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )
                }
                </>
            ))}

        </ul>
        
    </div>
  )
}
