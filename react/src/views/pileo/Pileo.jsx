import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IoArchiveOutline, IoBookOutline, IoCloudOfflineOutline, IoPower, IoShareSocialOutline, IoStatsChartOutline, IoTerminal } from "react-icons/io5";
import axiosClient from '../../axios-client';
import { Graficos } from './components/Graficos';
import { Apagar } from './components/Apagar';
import { Redes } from './components/Redes';
import { Backups } from './components/Backups';
import { History } from './components/History';
import { Destruir } from './components/Destruir';

export const Pileo = () => {
  const { id } = useParams()

  useEffect(() => {
    getInfoPileo()
  }, [])  

  const [activeView, setActiveView] = useState(1);
  const [infoPileo, setInfoPileo] = useState({});

  const getInfoPileo = () => {
    axiosClient.get(`/info-pileo/${id}`).then(({ data }) => {
        setInfoPileo(data.droplet)
    })
  }

  const openTerminal = () => {
    window.open(
      `https://cloud.digitalocean.com/droplets/${infoPileo.id}/terminal/ui/`,
      "",
      "width=800, height=600"
    );
  };

  const showView = (id) => {
    setActiveView(id);
  };


  return (
    <>
    {
        infoPileo && (
            <div className="container  mx-auto px-5 mt-5">
                <h1 className="text-2xl">Información del pileo</h1>
                <div className="flex flex-col">
                    <p className="mt-5 text-justify">
                    Puede ver toda la información necesaria de su Pileo
                    </p>
                </div>
                <hr className="my-5" />
                <div className='flex'>
                    <span className='w-1/4 md:w-1/2 text-sm text-gray-600 hover:text-gray-700 leading-6'> 
                        <span className='font-semibold'>ipv4:</span> 
                        { infoPileo.networks && infoPileo.networks["v4"][0].ip_address }
                    </span>
                    <span className='w-1/4 md:w-1/2 text-sm text-gray-600 hover:text-gray-700 leading-6'> 
                        <span className='font-semibold'>IP Privada:</span> 
                        { infoPileo.networks && infoPileo.networks["v4"][1].ip_address }
                    </span>

                    <span className='w-1/4 md:w-1/2 text-sm'>
                        <span onClick={() => openTerminal()} className="ml-auto flex">
                            <span className="bg-gray-500 py-1 px-2 w-28 rounded text-white text-sm cursor-pointer flex">
                                <IoTerminal  className='rounded bg-gray-500 text-white w-6 h-6 p-1' /> <span>Consola</span>
                            </span>
                        </span>
                    </span>
                </div>
                <hr className="my-5" />

                <div className="w-full flex justify-center my-6 py-1">
                    <div className="w-full flex flex-col md:flex-row rounded overflow-hidden shadow-xl">

                        <div className="w-full md:w-1/4 h-auto">
                            <div className="top flex items-center px-5 h-16 bg-purple-900 text-white">
                                <div className="ml-3 flex flex-col text-xl">
                                    { infoPileo.name }
                                </div>
                            </div>

                            <div className="bg-purple-400 w-full h-full sm:flex md:block">
                                <button onClick={() => showView(1)} className={`w-full text-white flex justify-between items-center px-5 py-2 hover:bg-purple-500 cursor-pointer focus:outline-none ${activeView === 1 && 'bg-purple-600 border-l-4 pl-4 border-purple-800'}`}>
                                    <span className='text-white'>
                                    Gráficas
                                    </span>
                                    <IoStatsChartOutline />
                                </button>

                                <button onClick={() => showView(2)} className={`w-full text-white flex justify-between items-center px-5 py-2 hover:bg-purple-500 cursor-pointer focus:outline-none ${activeView === 2 && 'bg-purple-600 border-l-4 pl-4 border-purple-800'}`}>
                                    <span className='text-white'>Encender / Apagar</span>
                                    <IoPower />
                                </button>

                                <button onClick={() => showView(3)} className={`w-full text-white flex justify-between items-center px-5 py-2 hover:bg-purple-500 cursor-pointer focus:outline-none ${activeView === 3 && 'bg-purple-600 border-l-4 pl-4 border-purple-800'}`}>
                                    <span className='text-white'>Redes</span>
                                    <IoShareSocialOutline />
                                </button>

                                <button onClick={() => showView(4)} className={`w-full text-white flex justify-between items-center px-5 py-2 hover:bg-purple-500 cursor-pointer focus:outline-none ${activeView === 4 && 'bg-purple-600 border-l-4 pl-4 border-purple-800'}`}>
                                    <span className='text-white'>Backups</span>
                                    <IoArchiveOutline />
                                </button>

                                <button onClick={() => showView(5)} className={`w-full text-white flex justify-between items-center px-5 py-2 hover:bg-purple-500 cursor-pointer focus:outline-none ${activeView === 5 && 'bg-purple-600 border-l-4 pl-4 border-purple-800'}`}>
                                    <span className='text-white'>Historial</span>
                                    <IoBookOutline />
                                </button>

                                <button onClick={() => showView(6)} className={`w-full text-white flex justify-between items-center px-5 py-2 hover:bg-purple-500 cursor-pointer focus:outline-none ${activeView === 6 && 'bg-purple-600 border-l-4 pl-4 border-purple-800'}`}>
                                    <span className='text-white'>Destruir</span>
                                    <IoCloudOfflineOutline />
                                </button>
                            </div>

                        </div>

                        {
                            infoPileo.id && (
                                <div className="w-full md:w-3/4">
                                    {
                                        activeView == 1
                                        ?  <Graficos id={infoPileo.id} />
                                        : activeView == 2
                                        ?   <Apagar id={infoPileo.id}/> 
                                        : activeView == 3
                                        ?   <Redes networks={infoPileo.networks} id={infoPileo.id}/> 
                                        : activeView == 4
                                        ?   <Backups id={infoPileo.id}/> 
                                        : activeView == 5
                                        ?   <History id={infoPileo.id}/> 
                                        :   <Destruir id={infoPileo.id}/>
                                    }
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>
        )
    }
    </>
  )
}
