import React, { useEffect, useState } from 'react'
import { Modals } from '../../../components/Modals';
import axiosClient from '../../../axios-client';
import Select from 'react-select'
import Swal from "sweetalert2";

export const Planes = () => {

    useEffect(() => {
        get()
        getDatacenter()
    }, [])

    
    const [planes, setPlanes] = useState([]);
    const [formDatacenters, setFormDatacenters] = useState([]);
    const [formPlan, setFormPlan] = useState([
        {
            value: 'SILVER',
            label: 'SILVER'
        },
        {
            value: 'GOLD INTEL',
            label: 'GOLD INTEL'
        },
        {
            value: 'GOLD AMD',
            label: 'GOLD AMD'
        },
    ]);
    
    const [id, setId] = useState(0);
    const [selectedData, setSelectedData] = useState([]);
    const [plan, setPlan] = useState("");
    const [name, setName] = useState("");
    const [tecnology, setTecnology] = useState("");
    const [code, setCode] = useState("");
    const [vcpu, setVcpu] = useState("");
    const [memory, setMomery] = useState("");
    const [storage, setStorage] = useState("");
    const [price, setPrice] = useState(0);
    const [transfer, setTransfer] = useState("");
    const [backupDay, setBackupDay] = useState(0.0);
    const [backupWeek, setBackupWeek] = useState(0.0);
    const [backingAbjustment, setBackingAbjustment] = useState(0.0);

    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    const handleName = (event) => {
        setName(event.currentTarget.value);
    };

    const handleTecnology = (event) => {
        setTecnology(event.currentTarget.value);
    };

    const handleCode = (event) => {
        setCode(event.currentTarget.value);
    };

    const handleVcpu = (event) => {
        setVcpu(event.currentTarget.value);
    };

    const handleMemory = (event) => {
        setMomery(event.currentTarget.value);
    };

    const handleStorage = (event) => {
        setStorage(event.currentTarget.value);
    };

    const handleTransfer= (event) => {
        setTransfer(event.currentTarget.value);
    };

    const handlePrice= (event) => {
        setPrice(event.currentTarget.value);
    };

    const handleBackupDay= (event) => {
        setBackupDay(event.currentTarget.value);
    };

    const handleBackupWeek= (event) => {
        setBackupWeek(event.currentTarget.value);
    };

    const handleBackingAbjustment= (event) => {
        setBackingAbjustment(event.currentTarget.value);
    };

    const getDatacenter = () => {
        setLoading(true)
        axiosClient.get('/datacenter').then(({data}) => {
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

    const get = () => {
        setLoading(true)
        axiosClient.get('/plan').then(({data}) => {
            setPlanes(data.data)
            setLoading(false)
        }).catch( e => {
            console.log(e)
        })
    }

    const create = () => {
        setId(0)
        setName('')
        setSelectedData([])
        setPlan('')
        setCode('')
        setVcpu('')
        setMomery('')
        setStorage('')
        setTransfer('')
        setBackupDay(0.0)
        setBackupWeek(0.0)
        setBackingAbjustment(0.0)
        setOpen(true)
    }

    const save = () => {
        const datacenters = JSON.stringify(selectedData)

        axiosClient.post('/plan', {
            datacenters,
            plan: plan['value'],
            name,
            tecnology,
            code,
            vcpu,
            memory,
            storage,
            transfer,
            price,
            backup_day: backupDay,
            backup_week: backupWeek,
            backing_abjustment: backingAbjustment
        }).then(({data}) => {
            // console.log(data)
            setName('')
            setSelectedData([])
            setPlan('')
            setCode('')
            setVcpu('')
            setMomery('')
            setStorage('')
            setTransfer('')
            setPrice(0)
            setBackupDay(0.0)
            setBackupWeek(0.0)
            setBackingAbjustment(0.0)
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

        const center = item.datacenter.map(d => {
            return {
                value: d.datacenter_id,
                label: d.dataCenterName + ' - ' + d.dataCenterCode
            }
        })
        setSelectedData(center)

        setId(item.id)
        setName(item.name)

        setPlan({
            value: item.plan,
            label: item.plan
        })

        setCode(item.code)
        setTecnology(item.tecnology)
        setVcpu(item.vcpu)
        setMomery(item.memory)
        setStorage(item.storage)
        setTransfer(item.transfer)
        setPrice(item.price)
        setBackupDay(item.backup_day)
        setBackupWeek(item.backup_week)
        setBackingAbjustment(item.backing_abjustment)
        setOpen(true)
    }

    const update = () => {

        const datacenters = JSON.stringify(selectedData)

        axiosClient.put(`/plan/${id}`, {
            datacenters,
            plan: plan['value'],
            name,
            tecnology,
            code,
            vcpu,
            memory,
            storage,
            transfer,
            price,
            backup_day: backupDay,
            backup_week: backupWeek,
            backing_abjustment: backingAbjustment
        }).then(({data}) => {
            setId(0)
            setName('')
            setSelectedData([])
            setPlan('')
            setCode('')
            setVcpu('')
            setMomery('')
            setStorage('')
            setTransfer('')
            setBackupDay(0.0)
            setBackupWeek(0.0)
            setBackingAbjustment(0.0)
            get() 
            setOpen(false)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Actualizado con exito",
                showConfirmButton: false,
                timer: 1500
            });

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
                axiosClient.delete(`/plan/${id}`).then(res => {
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
                Planes
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
                                <th>Tecnologia</th>
                                <th>Nombre</th>
                                <th>Memoria </th>
                                <th>Almacenamiento</th>
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
                                planes.map((plan, index) => (
                                    <tr key={plan.id}>
                                        <td>{index + 1}</td>
                                        <td>{plan.tecnology}</td>
                                        <td>{plan.name}</td>
                                        <td>{plan.memory}</td>
                                        <td>{plan.storage}</td>
                                        <td>
                                            {/* <Link to={`/users/${provee.id}`} className='btn-edit'>Edit</Link> */}
                                            <button onClick={() => edit(plan)} className='btn-edit'>Editar</button>
                                            &nbsp;
                                            <button onClick={e => deleteItem(plan.id)} className='btn-delete'>Eliminar</button>
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
                    Registrar Plan
                </h3>

                <div className="md:col-span-6 mt-4">
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

                <div className="md:col-span-6 mt-4">
                    <label htmlFor="name">Seleccione el plan</label>

                    <Select 
                        // isMulti
                        isSearchable
                        placeholder='Seleccione...'
                        options={formPlan}
                        value={plan}
                        onChange={(item) => setPlan(item)}
                    />

                </div>

                <div className="md:col-span-2 mt-4">
                    <label htmlFor="name">Tecnología</label>
                    <input
                        value={tecnology}
                        onChange={handleTecnology}
                        type="text"
                        name="tecnology"
                        id="tecnology"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                </div>

                <div className="md:col-span-2 mt-4">
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
                    <label htmlFor="name">Codigo</label>
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
                    <label htmlFor="name">vCpu</label>
                    <input
                        value={vcpu}
                        onChange={handleVcpu}
                        type="text"
                        name="vcpu"
                        id="vcpu"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                </div>

                <div className="md:col-span-2 mt-4">
                    <label htmlFor="name">Memoria</label>
                    <input
                        value={memory}
                        onChange={handleMemory}
                        type="text"
                        name="memory"
                        id="memory"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                </div>

                <div className="md:col-span-2 mt-4">
                    <label htmlFor="name">Almacenamiento</label>
                    <input
                        value={storage}
                        onChange={handleStorage}
                        type="text"
                        name="storage"
                        id="storage"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                </div>

                <div className="md:col-span-2 mt-4">
                    <label htmlFor="name">Transferencia</label>
                    <input
                        value={transfer}
                        onChange={handleTransfer}
                        type="text"
                        name="transfer"
                        id="transfer"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                </div>

                <div className="md:col-span-2 mt-4">
                    <label htmlFor="name">Precio</label>
                    <input
                        value={price}
                        onChange={handlePrice}
                        type="number"
                        name="price"
                        id="price"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                </div>

                <div className="md:col-span-2 mt-4">
                    <label htmlFor="name">Backup Diario precio</label>
                    <input
                        value={backupDay}
                        onChange={handleBackupDay}
                        type="number"
                        name="backupDay"
                        id="backupDay"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                </div>

                <div className="md:col-span-2 mt-4">
                    <label htmlFor="name">Backup semanal precio</label>
                    <input
                        value={backupWeek}
                        onChange={handleBackupWeek}
                        type="number"
                        name="backupWeek"
                        id="backupWeek"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                </div>

                <div className="md:col-span-2 mt-4">
                    <label htmlFor="name">Ajuste Bancario</label>
                    <input
                        value={backingAbjustment}
                        onChange={handleBackingAbjustment}
                        type="number"
                        name="backingAbjustment"
                        id="backingAbjustment"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                </div>


                <div className="md:col-span-6 text-right">
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
