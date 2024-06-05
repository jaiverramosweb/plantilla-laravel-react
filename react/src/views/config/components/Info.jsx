import React, { useEffect, useState } from 'react'
import { Modals } from '../../../components/Modals';
import axiosClient from '../../../axios-client';
import Swal from "sweetalert2";

export const Info = () => {

    useEffect(() => {
        get()
    }, [])
    
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [valor, setValor] = useState("");
    const [configuraciones, setconfiguraciones] = useState([]);
    
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    const handleName = (event) => {
        setName(event.currentTarget.value);
    };
    const handleValor = (event) => {
        setValor(event.currentTarget.value);
    };

    const get = () => {
        setLoading(true)
        axiosClient.get('/configuracion').then(({data}) => {
            setconfiguraciones(data.data)
            setLoading(false)
        }).catch( e => {
            console.log(e)
        })
    }

    const create = () => {
        setId(0)
        setName('')
        setValor('')
        setOpen(true)
    }

    const save = () => {
        axiosClient.post('/configuracion', {
            name,
            valor
        }).then(({data}) => {
            setName('')
            setValor('')
            get() 
            setOpen(false)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Guardado con exito",
                showConfirmButton: false,
                timer: 1500
            });
              
        }).catch( e => {
            console.log(e)
        })
    } 

    const edit = (item) =>{
        setId(item.id)
        setName(item.name)
        setValor(item.valor)
        setOpen(true)
    }

    const update = () => {
        axiosClient.put(`/configuracion/${id}`, {
            name,
            valor
        }).then(({data}) => {
            setName('')
            setValor('')
            get() 
            setOpen(false)
        }).catch( e => {
            console.log(e)
        })
    }

    const deleteItem = (id) =>{
        Swal.fire({
            title: "Estas seguro?",
            text: "Este recurso sera eliminado!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosClient.delete(`/configuracion/${id}`).then(res => {
                    Swal.fire({
                      title: "Eliminado!",
                      text: "El recurso fue eliminado.",
                      icon: "success"
                    });
                })
            }
          });
        console.log(id)
    }

  return (
    <>
        <div className="top flex justify-between items-center px-5 h-16 bg-purple-600 text-white text-2xl">
            <div id="title-1">
                Configuraciones
            </div>

            {/* <button onClick={() => create()} className='btn-add'>Agregar</button> */}
            {/* <button onClick={() => setOpen(true)} className='rounded bg-green-700 p-2 border-solid border-2 border-green-300 text-xl'>Agregar</button> */}

        </div>

        <div className="w-full px-5 py-3 max-h-screen overflow-y-auto">
            <div id="view-1">
                <div className='card animated fadeInDown'>

                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Valor</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                    
                        {
                            loading && (<tbody>
                                <tr>
                                    <td colSpan={4} className='text-center'>
                                        Loading...
                                    </td>
                                </tr>
                            </tbody>)
                        }

                        {
                            !loading && (
                                <tbody>
                                {
                                configuraciones.map((config, index) => (
                                    <tr key={config.id}>
                                        <td>{index + 1}</td>
                                        <td>{config.name}</td>
                                        <td>{config.valor}</td>
                                        <td>
                                            {/* <Link to={`/users/${config.id}`} className='btn-edit'>Edit</Link> */}
                                            <button onClick={() => edit(config)} className='btn-edit'>Editar</button>
                                            &nbsp;
                                            <button onClick={e => deleteItem(config.id)} className='btn-delete'>Eliminar</button>
                                        </td>
                                    </tr>
                                ))
                                }
                                </tbody>
                            )
                        }
                    </table>

                </div>
            </div>

        </div>


        <Modals open={open} onClose={() => setOpen(false)}>
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
                <h3 className="mb-3 w-full text-lg font-semibold">
                    Registrar configuración
                </h3>

                <div className="md:col-span-5 mt-4">
                    <label htmlFor="name">Nombre</label>
                    <input
                        value={name}
                        onChange={handleName}
                        type="text"
                        name="name"
                        id="name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                </div>

                <div className="md:col-span-5 mt-2">
                    <label htmlFor="name">Valor</label>
                    <input
                        value={valor}
                        onChange={handleValor}
                        type="text"
                        name="name"
                        id="name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                </div>



                <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end w-full">
                        {
                            id == 0 
                                ?(
                                    <button
                                        onClick={save}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded disabled:opacity-75"
                                    >
                                    Crear
                                    </button>
                                )
                                :(
                                    <button
                                        onClick={update}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded disabled:opacity-75"
                                    >
                                    Editar
                                    </button>
                                )
                        }
  
                    </div>
                </div>

            </div>
        </Modals>
    
    </>
  )
}
