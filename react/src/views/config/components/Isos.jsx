import React, { useEffect, useState } from 'react'
import { Modals } from '../../../components/Modals';
import Select from 'react-select'
import Swal from "sweetalert2";
import axiosClient from '../../../axios-client';

export const Isos = () => {

    useEffect(() => {
        get()
        getDatacenter()
    }, [])
   

    const [datacenterId, setDatacenterId] = useState(0);

    const [id, setId] = useState(0);
    const [selectedData, setSelectedData] = useState([]);
    const [name, setName] = useState("");
    const [versions, setVersions] = useState([]);
    const [img, setImg] = useState("");

    const [imgUrl, setImgUrl] = useState("");
    
    
    const [version, setVersion] = useState("");
    const [code, setCode] = useState("");
    const [locations, setLocations] = useState([]);
    const [datacenters, setDatacenters] = useState([]);
    const [formDatacenters, setFormDatacenters] = useState([]);


    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    const handleVersion = (event) => {
        setVersion(event.currentTarget.value);
    };

    const handleCode = (event) => {
        setCode(event.currentTarget.value);
    };

    const handleName = (event) => {
        setName(event.currentTarget.value);
    };

    const selectDatacenter = (id) => {
        setDatacenterId(id)
    };

    const handleImg = (event) => {

        setImgUrl('')

        setImg(event.target.files[0]);
        setTimeout(() => {            
            setImg(event.target.files[0]);
        }, 1000);

    };  

    const addVersion = () => {
        
        const newVersion = {
            version,
            code
        }
        setVersions([...versions, newVersion])
        setVersion('')
        setCode('')
    }

    const deleteVersion = (data) => {
        let dataR = versions.filter((item) => item.version !== data);
        setVersions(dataR);
      };

    const get = () => {
        setLoading(true)
        axiosClient.get('/isos').then(({data}) => {

            console.log(data.data)

            setLocations(data.data)
            setLoading(false)
        }).catch( e => {
            console.log(e)
        })
    }

    const getDatacenter = () => {
        setLoading(true)
        axiosClient.get('/datacenter').then(({data}) => {
            setDatacenters(data.data)
            const center = data.data.map(d => {
                return {
                    value: d.id,
                    label: d.name + ' - ' + d.code
                }
            })
            setFormDatacenters(center)
            setLoading(false)
        }).catch( e => {
            console.log(e)
        })
    }

    const create = () => {
        setId(0)
        setName('')
        setSelectedData([])
        setVersions([])
        setImgUrl('')
        setImg('')
        setOpen(true)
    }

    const save = () => {
        let formu = new FormData()
        formu.append('selectedData', JSON.stringify(selectedData) )
        formu.append('name', name)
        formu.append('versions', JSON.stringify(versions) )
        formu.append('img', img)

        axiosClient.post('/isos', formu).then(({data}) => {
            setName('')
            setImg('')
            setImgUrl('')
            setSelectedData([])
            setVersions([])

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

        setImg('')

        const baseURL = import.meta.env.VITE_APP_BASE_URL

        setId(item.id)

        const center = item.datacenter.map(d => {
            return {
                value: d.datacenter_id,
                label: d.dataCenterName + ' - ' + d.dataCenterCode
            }
        })
        setSelectedData(center)

        const versions = item.version.map(ver => {
            return {
                version: ver.name,
                code: ver.code
            }
        })
        setVersions(versions)

        setName(item.name)

        let img = `${baseURL}${item.img}`

        setImgUrl(img)
        setOpen(true)
    }

    const update = () => {
        let formu = new FormData()
        formu.append('id', id)
        formu.append('selectedData', JSON.stringify(selectedData) )
        formu.append('name', name)
        formu.append('versions', JSON.stringify(versions) )
        formu.append('img', img)

        axiosClient.post(`/isos-update`, formu).then(({data}) => {
            console.log(data)
            setId('')
            setName('')
            setSelectedData([])
            setVersions([])
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
                axiosClient.delete(`/isos/${id}`).then(res => {
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
                Imagenes Isos
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
                                locations.map((location, index) => (
                                    <tr key={location.id}>
                                        <td>{index + 1}</td>
                                        <td>{location.name}</td>
                                        <td>
                                            <button onClick={() => edit(location)} className='btn-edit'>Editar</button>
                                            &nbsp;
                                            <button onClick={e => deleteItem(location.id)} className='btn-delete'>Eliminar</button>
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
                    Registrar Isos
                </h3>

                <div className="md:col-span-5 mt-4">
                    <label htmlFor="name">Seleccione el datacenter</label>

                    <Select 
                        isMulti
                        isSearchable
                        placeholder='Seleccione...'
                        options={formDatacenters}
                        value={selectedData}
                        onChange={(item) => setSelectedData(item)}
                    />

                </div>

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

                <div className="md:col-span-2 mt-4">
                    <label htmlFor="name">Agregar versiones</label>
                    <input
                        value={version}
                        onChange={handleVersion}
                        type="text"
                        name="version"
                        id="version"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                </div>

                <div className="md:col-span-1 mt-4">
                    <label htmlFor="name">Agregar codigo</label>
                    <input
                        value={code}
                        onChange={handleCode}
                        type="text"
                        name="code"
                        id="code"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                </div>

                <div className="md:col-span-2 mt-4">
                    <button onClick={addVersion} className='btn-add mt-6'>Agregar</button>
                </div>

                {
                    versions && versions.map((versi, i) => ( 
                        <div key={i} className="md:col-span-5 mt-1 mb-1 justify-between">
                            <div className="flex align-middle flex-row justify-between">
                            <div className="p-2">
                                <p className="text-md text-blac">{versi.version} - {versi.code}</p>
                            </div>
                            <button
                                onClick={() => deleteVersion(versi.version)}
                                className="border w-10 rounded-md text-red-500 border-red-500"
                            >
                                X
                            </button>
                            </div>
                            <hr className="mt-2 mb-2" />
                        </div>
                        
                    ))

                }


                <div className="md:col-span-4 mt-4">
                    <label htmlFor="name">Subir imagen </label>
                    <input
                        onChange={handleImg}
                        type="file"
                        name="img"
                        id="img"
                        className="h-15 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                </div>

                {
                    img && (
                        <div className="md:col-span-5 mt-4 grid text-center items-center justify-center">
                            <img src={URL.createObjectURL(img)} alt="" className='w-24 h-20 aspect-square' />
                        </div>
                    )
                }

                {
                    imgUrl && (
                        <div className="md:col-span-5 mt-4 grid text-center items-center justify-center">
                            <img src={ imgUrl } alt="" className='w-24 h-20 aspect-square' />
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
