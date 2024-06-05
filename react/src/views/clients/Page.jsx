import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoCaretForward, IoEyeOutline } from "react-icons/io5";
import { IoArchiveOutline, IoBookOutline, IoCloudOfflineOutline, IoPower, IoShareSocialOutline, IoStatsChartOutline, IoTerminal } from "react-icons/io5";
import axiosClient from '../../axios-client'
import { Graficos } from '../pileo/components/Graficos';
import { Apagar } from '../pileo/components/Apagar';
import { Redes } from '../pileo/components/Redes';
import { Backups } from '../pileo/components/Backups';
import { Destruir } from '../pileo/components/Destruir';
import { History } from '../pileo/components/History';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const PageClient = () => {

  const [planes, setPlanes] = useState([])
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [modifig, setModifig] = useState(false)
  const [infoPileo, setInfoPileo] = useState(null);
  const [activeView, setActiveView] = useState(1);

  useEffect(() => {
    getPlanes()
  }, [])

  const getPlanes = () => {
    setLoading(true)
    axiosClient.get(`/get-planes`).then(({data}) => {
      // console.log(data)
      setPlanes(data)
      setLoading(false)
    }).catch(err => {
      setLoading(false)
      console.log(err)
    })
  }
  
  const mostrarInfo = (id, action) => {
    setModifig(action)

    if(action === true){
      console.log('entre')
      axiosClient.get(`/info-pileo/${id}`).then(({ data }) => {
        setInfoPileo(data.droplet)
      })
    } else {
      setInfoPileo(null)
    }
  }

  const showView = (id) => {
    setActiveView(id);
  };

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <h1 className="text-2xl mb-10">Pileos adquiridos</h1>

        <Link to="/pileo" className='btn-add'>Crear Plieo</Link>
      </div>

      <div className="flex">

        <div className={ modifig ?  'card animated fadeInDown w-1/4' : 'card animated fadeInDown w-full'}>
          <table>
            <thead>
              <tr>
                <th>Nombre Pileo</th>
                {
                  !modifig && (
                    <>
                      <th>Numero Orden</th>
                      <th>Estado</th>
                      <th>Fecha de inicio</th>
                      <th>Fecha de vencimiento</th>
                    </>

                  )
                }
                <th>Acciones</th>
              </tr>
            </thead>

            {
              loading && (<tbody>
              <tr>
                <td colSpan={6} className='text-center'>
                  Loading...
                </td>
              </tr>
            </tbody>)
            }

            {
              !loading && (
                <tbody>
              {
                planes.map(plan => (
                  <tr key={plan.id}>
                    <td>{plan.name}</td>
                    {
                      !modifig && (
                        <>
                          <td>{plan.codigo}</td>
                          <td>{plan.estado}</td>
                          <td>{plan.fecha_activa}</td> 
                          <td>{plan.fecha_vence}</td>
                        </>
                      )
                    }
                    {/* <td>
                      <Link to={`/pileo/${plan.pileo_id}`} >
                        <IoEyeOutline className='rounded bg-green-500 text-white w-6 h-6 p-1' />
                      </Link>
                      &nbsp;
                      <a onClick={e => onDelete(user)} className='btn-delete'>
                        <IoCaretForward />
                      </a>
                    </td> */}

                    <td>
                        {/* <Link to={`/pileo/${plan.pileo_id}`} className='btn-edit'>
                          Ver
                        </Link> */}
                        {
                          plan.estado == 'Activo' ? <button onClick={() => mostrarInfo(plan.pileo_id, !modifig)} className='btn-edit'>{ modifig ? 'Ocultar' : 'Mostrar' }</button> : <Link to={`/pileo/confirm/${plan.id}`} className='btn-add'>Pagar</Link> 
                        }
                        
                        &nbsp;
                        
                    </td>
                  </tr>
                ))
              }
            </tbody>
              )
            }
          </table>
        </div>

        <div className={ modifig ?  'card animated fadeInDown w-3/4 ml-2' : 'w-0'}>

        { !infoPileo && modifig && <LoadingSpinner />}

        {
          infoPileo && (
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
                          <span className='text-white'>Terminar</span>
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
          ) 
        }

         

        </div>
      </div>

    </div>
  )
}
