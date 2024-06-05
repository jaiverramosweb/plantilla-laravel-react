import React, { useEffect, useState } from 'react'
import { Info } from './components/Info'
import { Proveedor } from './components/Proveedor'
import { Location } from './components/Location'
import { Datacenter } from './components/Datacenter'
import { Isos } from './components/Isos'
import { Planes } from './components/Planes'

export const ConfigPage = () => {

    useEffect(() => {
        showView(1)
    }, [])
    
    const [activeView, setActiveView] = useState(1);

    const showView = (id) => {
        setActiveView(id);
    };

  return (
    <div className="container  mx-auto px-5 mt-5">
      <h1 className="text-2xl">Configuración y registro de pileos</h1>
      <div className="flex flex-col">
        <p className="mt-5 text-justify">
          En este apartado de crear y confgura todo lo relacionado con los pileos
        </p>

      </div>

      <hr className="my-5" />

      <div className="w-full flex justify-center my-6 py-1">
            
                <div className="w-full flex flex-col md:flex-row rounded overflow-hidden shadow-xl">

                    <div className="w-full md:w-1/4 h-auto">
                        <div className="top flex items-center px-5 h-16 bg-purple-900 text-white">
                            <div className="ml-3 flex flex-col text-xl">
                                Pileos
                            </div>
                        </div>
                        <div className="bg-purple-400 w-full h-full sm:flex md:block">
                            <button onClick={() => showView(1)} className={`w-full flex justify-between items-center px-5 py-2 hover:bg-purple-500 cursor-pointer focus:outline-none ${activeView === 1 && 'bg-purple-600 border-l-4 pl-4 border-purple-800'}`}>
                                <span className='text-white'><i className="fa fa-inbox w-6 "></i>Configuraciones</span>
                            </button>
                            <button onClick={() => showView(2)} className={`w-full flex justify-between items-center px-5 py-2 hover:bg-purple-500 cursor-pointer focus:outline-none ${activeView === 2 && 'bg-purple-600 border-l-4 pl-4 border-purple-800'}`}>
                                <span className='text-white'><i className="fa fa-envelope w-6"></i>Proveedores</span>
                            </button>
                            <button onClick={() => showView(3)} className={`w-full flex justify-between items-center px-5 py-2 hover:bg-purple-500 cursor-pointer focus:outline-none ${activeView === 3 && 'bg-purple-600 border-l-4 pl-4 border-purple-800'}`}>
                                <span className='text-white' ><i className="fa fa-bookmark w-6"></i>Ubicaciones</span>
                            </button>
                            <button onClick={() => showView(4)} className={`w-full flex justify-between items-center px-5 py-2 hover:bg-purple-500 cursor-pointer focus:outline-none ${activeView === 4 && 'bg-purple-600 border-l-4 pl-4 border-purple-800'}`}>
                                <span className='text-white' ><i className="fa fa-trash w-6"></i>Datacenters</span>
                            </button>
                            <button onClick={() => showView(5)} className={`w-full flex justify-between items-center px-5 py-2 hover:bg-purple-500 cursor-pointer focus:outline-none ${activeView === 5 && 'bg-purple-600 border-l-4 pl-4 border-purple-800'}`}>
                                <span className='text-white' ><i className="fa fa-trash w-6"></i>Isos</span>
                            </button>
                            <button onClick={() => showView(6)} className={`w-full flex justify-between items-center px-5 py-2 hover:bg-purple-500 cursor-pointer focus:outline-none ${activeView === 6 && 'bg-purple-600 border-l-4 pl-4 border-purple-800'}`}>
                                <span className='text-white' ><i className="fa fa-trash w-6"></i>Planes</span>
                            </button>
                        </div>
                    </div>

                    <div className="w-full md:w-3/4">

                        {
                            activeView == 1
                            ? <Info />
                            : activeView == 2
                            ? <Proveedor />
                            : activeView == 3
                            ? <Location />
                            : activeView == 4
                            ? <Datacenter />
                            : activeView == 5
                            ? <Isos />
                            : activeView == 6
                            ? <Planes />
                            : ''
                        }

                    </div>
                </div>
           
        </div>


    </div>
  )
}
