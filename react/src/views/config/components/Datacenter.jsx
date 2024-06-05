import React, { useEffect, useState } from 'react'
import { Modals } from '../../../components/Modals';
import axiosClient from '../../../axios-client';
import Swal from "sweetalert2";

export const Datacenter = () => {

    useEffect(() => {
        get()
    }, [])

    const [id, setId] = useState(0);
    const [proveedorsId, setProveedorsId] = useState(0);
    const [locationId, setLocationId] = useState(0);
    const [name, setName] = useState("");
    const [flag, setFlag] = useState("");
    const [image, setImage] = useState("");
    const [code, setCode] = useState("");

    const [locations, setLocations] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [datacenters, setDatacenters] = useState([]);

    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    const handleName = (event) => {
        setName(event.currentTarget.value);
    };

    const handleCode = (event) => {
        setCode(event.currentTarget.value);
    };

    const handleFlag = (event) => {
        const file = event.target.files[0];
        setImage("")

        setFlag(event.target.files[0]);
        setTimeout(() => {            
            setFlag(event.target.files[0]);
        }, 1000);

    };    

    const selectProveedor = (id) => {
        setProveedorsId(id)
    };

    const selectLocation = (id) => {
        setLocationId(id)
    };



    const get = () => {
        setLoading(true)
        axiosClient.get('/datacenter').then(({data}) => {
            setDatacenters(data.data)
            setLoading(false)
        }).catch( e => {
            console.log(e)
        })
    }

    const getLocation = () => {
        axiosClient.get('/location').then(({data}) => {
            setLocations(data.data)
        }).catch( e => {
            console.log(e)
        })
    }

    const getProveedor = () => {
        axiosClient.get('/proveedor').then(({data}) => {
            setProveedores(data.data)
        }).catch( e => {
            console.log(e)
        })
    }

    const create = () => {
        setId(0)
        setProveedorsId(0)
        setLocationId(0)
        setName('')
        setFlag("")
        setCode('')

        getLocation()
        getProveedor()
        setOpen(true)
    }

    const save = () => {

        let formu = new FormData()

        formu.append('proveedors_id', proveedorsId)
        formu.append('locations_id', locationId)
        formu.append('name', name)
        formu.append('code', code)
        formu.append('flag', flag)

        axiosClient.post('/datacenter', formu).then(({data}) => {

            setProveedorsId(0)
            setLocationId(0)
            setName('')
            setFlag('')
            setCode('')

            setOpen(false)
            
            get() 

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

        getLocation()
        getProveedor()

        const baseURL = import.meta.env.VITE_APP_BASE_URL

        setId(item.id)
        setProveedorsId(item.proveedors_id)
        setLocationId(item.locations_id)
        setName(item.name)
        setImage(item.flag)
        setCode(item.code)
        setOpen(true)

        let img = `${baseURL}${item.flag}`
        setImage(img)
    }

    const update = () => {

        let formu = new FormData()

        formu.append('id', id)
        formu.append('proveedors_id', proveedorsId)
        formu.append('locations_id', locationId)
        formu.append('name', name)
        formu.append('code', code)
        formu.append('flag', flag)

        axiosClient.post(`/datacenter-update`, formu).then(({data}) => {
            setProveedorsId(0)
            setLocationId(0)
            setId(0)
            setName('')
            setFlag('')
            setCode('')
            get() 
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
                axiosClient.delete(`/datacenter/${id}`).then(res => {
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
                Datacenters
            </div>

            <button onClick={() => create()} className='btn-add'>Agregar</button>

        </div>

        <div className="w-full px-5 py-3 max-h-screen overflow-y-auto">
            <div id="view-1">
                <div className='card animated fadeInDown'>

                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Proveedor</th>
                                <th>Ubicación</th>
                                <th>Nombre</th>
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
                                datacenters.map((datacenter, index) => (
                                    <tr key={datacenter.id}>
                                        <td>{index + 1}</td>
                                        <td>{datacenter.provider.name}</td>
                                        <td>{datacenter.location.name}</td>
                                        <td>{datacenter.name}</td>
                                        <td>
                                            <button onClick={() => edit(datacenter)} className='btn-edit'>Editar</button>
                                            &nbsp;
                                            <button onClick={e => deleteItem(datacenter.id)} className='btn-delete'>Eliminar</button>
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
                
                <h3 className="mb-3 w-full text-lg font-semibold col-span-5">
                    Registrar Datacenter
                </h3>

                {/* <div className='grid grid-cols-1 gap-4'> */}

                    <div className="mt-4">
                        <label htmlFor="name">Seleccione el proveedor</label>

                        <select 
                            id="country" 
                            value={proveedorsId}
                            name="country" 
                            onChange={(e) => selectProveedor(e.target.value)}
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        >
                            <option className='text-xs' value={''}>Seleccione...</option>
                            {
                                proveedores.map((prov, i) => (
                                    <option key={prov.id} value={prov.id}>{ prov.name }</option>
                                ))
                            }
                        </select>

                    </div>

                    <div className="mt-4">
                        <label htmlFor="name">Seleccione la Ubicación</label>

                        <select 
                            id="country" 
                            value={locationId}
                            name="country" 
                            onChange={(e) => selectLocation(e.target.value)}
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        >
                            <option className='text-xs' value={''}>Seleccione...</option>
                            {
                                locations.map((ubi, i) => (
                                    <option key={ubi.id} value={ubi.id}>{ ubi.name }</option>
                                ))
                            }
                        </select>

                    </div>

                    {/* <div className="md:col-span-3 mt-4">
                        <label htmlFor="name">Seleccione un plan</label>

                        <select 
                            id="country" 
                            value={plan}
                            name="country" 
                            onChange={(e) => selectPlan(e.target.value)}
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        >
                            <option className='text-xs' value={''}>Seleccione...</option>
                            <option className='text-xs' value={'SILVER'}>SILVER</option>
                            <option className='text-xs' value={'GOLD INTEL'}>GOLD INTEL</option>
                            <option className='text-xs' value={'GOLD AMD'}>GOLD AMD</option>
                        </select>

                    </div> */}

                    <div className="md:col-span-4 mt-4">
                        <label htmlFor="name">Nombre </label>
                        <input
                            value={name}
                            onChange={handleName}
                            type="text"
                            name="name"
                            id="name"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                    </div>

                    <div className="md:col-span-4 mt-4">
                        <label htmlFor="name">Codigo </label>
                        <input
                            value={code}
                            onChange={handleCode}
                            type="text"
                            name="name"
                            id="name"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                    </div>

                    <div className="md:col-span-4 mt-4">
                        <label htmlFor="name">Imagen de la bandera </label>
                        <input
                            // value={flag}
                            onChange={handleFlag}
                            // ref={flag}
                            type="file"
                            name="flag"
                            id="flag"
                            className="h-15 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                    </div>
                {/* </div> */}


                {
                    flag && (
                        <div className="md:col-span-5 mt-4 grid text-center items-center justify-center">
                            <img src={URL.createObjectURL(flag)} alt="" className='w-24 h-20 aspect-square' />
                        </div>
                    )
                }

                {
                    image && (
                        <div className="md:col-span-5 mt-4 grid text-center items-center justify-center">
                            <img src={ image } alt="" className='w-24 h-20 aspect-square' />
                        </div>
                    )
                }



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
