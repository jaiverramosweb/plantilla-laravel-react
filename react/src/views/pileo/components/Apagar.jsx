import React, { useEffect, useState } from 'react'
import { IoCloudCircleSharp, IoTerminal, IoWarningOutline } from 'react-icons/io5';
import axiosClient from '../../../axios-client';

export const Apagar = ({ id }) => {

    const [type, setType] = useState('power_on');

    useEffect(() => {
        getActions()
    }, [])

    const getActions = () => {
        axiosClient.get(`/action-pileo/${id}`).then(({ data }) => {
            setType(data.action)
        })
    }

    const offPileo = (action) => {
        axiosClient.post(`/apagar-pileo/${id}`, {
            action
        }).then(({ data }) => {
            console.log(data)
            setType(action)
        })
    }

    const openTerminal = () => {
        window.open(
          `https://cloud.digitalocean.com/droplets/${id}/terminal/ui/`,
          "",
          "width=800, height=600"
        );
      };
    

  return (
    <>
        <div className="top flex justify-between items-center px-5 h-16 bg-purple-600 text-white text-2xl">
            <div id="title-1">
                Encender / Apagar
            </div>

            <span onClick={() => openTerminal()} className="ml-auto flex">
                <span className="bg-gray-500 py-1 px-2 w-28 rounded text-white text-sm cursor-pointer flex">
                    <IoTerminal  className='rounded bg-gray-500 text-white w-6 h-6 p-1' /> <span>Consola</span>
                </span>
            </span>
        </div>

        <div className="w-full px-5 py-3 max-h-screen overflow-y-auto">
            <div id="view-1">          
                
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span className="text-blue-500">
                    <IoCloudCircleSharp size={25} />
                </span>
                <span className="tracking-wide">Apagar Pileo</span>
                </div>
                <div className="text-gray-700">
                <div className="grid md:grid-cols-1 text-sm">
                    <div className="grid grid-cols-1">
                    <p>
                        Cuando apaga un Pileo desde el panel de control, primero
                        intentamos un apagado elegante. Si eso falla, forzamos el
                        apagado, lo que puede dañar los datos. Para garantizar la
                        integridad de los datos, recomendamos apagar desde la línea de
                        comando con el <span className="text-red-500">apagado.</span>
                    </p>
                    </div>
                    <div className="grid grid-cols-1 mt-3">
                    <h3>Cuando una pileo está apagada:</h3>
                    <p className="ml-4">
                        * Se conservan sus datos y dirección IP y se reservan su disco,
                        CPU y RAM.
                    </p>
                    <p className="ml-4">
                        * Continúa acumulando su asignación de transferencia de datos.
                    </p>
                    </div>

                    <div className="grid grid-cols-1 mt-5">
                    <span>
                        <span className="mr-5 text-yellow-500 flex text-xl">
                        <IoWarningOutline size={30} className="mr-2" /> Advertencia
                        </span>
                        <p>
                        Aún se le facturará por un Pileo desactivado. Para finalizar
                        la facturación, destruya el Pileo.
                        </p>
                    </span>
                    </div>

                    {type === "power_on" ? (
                    <button
                        onClick={() => offPileo('power_off')}
                        className="p-3 m-3 border rounded bg-red-500 text-white mt-5"
                    >
                        Apagar
                    </button>
                    ) : (
                    <button
                        onClick={() => offPileo('power_on')}
                        className="p-3 m-3 border rounded bg-green-500 text-white mt-5"
                    >
                        Encender
                    </button>
                    )}
                </div>
                </div>
  
            </div>
        </div>
    </>
  )
}
