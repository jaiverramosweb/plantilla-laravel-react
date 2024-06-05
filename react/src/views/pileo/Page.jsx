import React, { useState } from 'react';
import {  Button, Modal } from "flowbite-react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { Modals } from '../../components/Modals';
import axiosClient from '../../axios-client';
import { useEffect } from 'react';

import PayUForm from './components/PayUForm';


const ListaPlanes = [
    {
        name: 'SILVER',
    },
    {
        name: 'GOLD INTEL',
    },
    {
        name: 'GOLD AMD',
    }
]

export const PileoPage = () => {

    const [selected, setSelected] = useState('Todos')
    const [selectedList, setSelectedList] = useState('SILVER')
    const [locations, setLocations] = useState([]);
    const [infoClient, setInfoClient] = useState();

    
    const [datacentersSelect, setDatacentersSelect] = useState([]);
    const [datacenterCreateSelected, setDatacenterCreateSelected] = useState([]);
    const [isos, setIsos] = useState([]);
    const [datacenters, setDatacenters] = useState([]);
    const [planes, setPlanes] = useState([]);
    const [listPlanes, setListPlanes] = useState([]);
    const [sshList, setSshList] = useState([]);
    
    
    const [sshData, setSshData] = useState('');
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    
    const [region, setRegion] = useState(false);
    const [selectedIso, setSelectedIso] = useState(false);
    
    const [nameSSH, setNameSSH] = useState("");
    const [textSSH, setTextSSH] = useState("");
    
    const [ipRang, seIpRang] = useState("");
    const [nameVpc, setNameVpc] = useState("");
    const [descriptionVpc, setDescriptionVpc] = useState("");
    
    
    const [registerVpc, setRegisterVpc] = useState(0);
    
    const [idRegion, setIdRegion] = useState(0);
    const [isSsh, setIsSsh] = useState(0);
    const [trm, setTrm] = useState(0);

    const [pagar, setPagar] = useState(0);
    const [planSelect, setPlanSelect] = useState({});
    
    const [selectedRegion, setSelectedRegion] = useState('Todos');    
    const [selectedCodePlan, setSelectedCodePlan] = useState('');
    const [selectedImgIso, setSelectedImgIso] = useState('');
    const [selectedVpcId, setSelectedVpcId] = useState("");
    const [selectedSshId, setSelectedSshId] = useState("");
    const [selectedSsh, setSelectedSsh] = useState({});
    const [namePileo, setNamePileo] = useState("");
    


    useEffect(() => {
      getLocation()
      getDatacenter()
      getConfig()
      infoCliente()
    }, [])
    
    const infoCliente = () => {
      axiosClient.get('/user-info').then(({data}) => {
        setInfoClient(data)
      })
    }

    const getLocation = () => {
      axiosClient.get('/location').then(({data}) => {
        setLocations(data.data)
      }).catch( e => {
          console.log(e)
      })
    }

    const getDatacenter = () => {
      axiosClient.get('/datacenter').then(({data}) => {

        const baseURL = import.meta.env.VITE_APP_BASE_URL

        let info = data.data.map(element => {
          return {
            ...element,
            flag: `${baseURL}${element.flag}` 
          }
        });
        
        setDatacentersSelect(info)
        setDatacenters(info)
      }).catch( e => {
          console.log(e)
      })
    }

    const getConfig = () => {
      axiosClient.get(`/configuracion`).then(({data}) => {
        // console.log(data.data[0].valor)
        setTrm(data.data[0].valor)
      })
    }

    const handleTextSSH = (event) => {
        setTextSSH(event.currentTarget.value);
    };
    
    const handleNameSSH = (event) => {
        setNameSSH(event.currentTarget.value);
    };

    const handleIpRang = (event) => {
      seIpRang(event.currentTarget.value);
    };
    const handleNameVpc = (event) => {
      setNameVpc(event.currentTarget.value);
    };
    const handleDescriptionVpc = (event) => {
      setDescriptionVpc(event.currentTarget.value);
    };
    
    const handleNamePileo = (event) => {
      setNamePileo(event.currentTarget.value);
    };

    const selectLocation = ( item ) => {
        setSelected(item)
        if(item != 'Todos'){
            let data = datacenters.filter(data => data.location.name == item)
            setDatacentersSelect(data)
        } else {
            setDatacentersSelect(datacenters)
        }
    }

    const selectListPlan = ( item ) => {
      setSelectedList(item)
      let items = listPlanes.filter(d => d.plan == item)
        setPlanes(items)

  }

    const selectedR = (reg) => {
        setSelectedRegion(reg.code)
        setIdRegion(reg.id)

        getVpcs(reg.code)       
    }

    const getVpcs = (code) => (
      axiosClient.get(`/vpcs/${code}`).then(({data}) => {
        if(data.data.length > 0){
          setRegisterVpc(1)
          setDatacenterCreateSelected(data.data)
        } else { 
          setRegisterVpc(2)
        }
      })
    )

    const crearVpc = () => {      
      setRegisterVpc(2)
    }

    const saveVpc = () => {
      axiosClient.post('/vpcs', {
        region: selectedRegion,
        name: nameVpc,
        description: descriptionVpc,
        ip_range: ipRang
      }).then(({data}) => {
        // console.log(data)
        getVpcs(selectedRegion)
      })
    }

    const selectedDCenter = (vpcId) => {
      setSelectedVpcId(vpcId)
      axiosClient.get('/isos').then(({data}) => {
        const baseURL = import.meta.env.VITE_APP_BASE_URL

        let info = data.data.map(element => {
          return {
            ...element,
            img: `${baseURL}${element.img}` 
          }
        });

        setIsos(info)
        setRegion(true)
      }).catch( e => {
          console.log(e)
      })
    }

    const selectIso = ( version ) => {
      setSelectedImgIso(version)

      axiosClient.get(`/plan/${idRegion}`).then(({data}) => {
          setListPlanes(data)
          let items = data.filter(d => d.plan == 'SILVER')
          setPlanes(items)

          setSelectedIso(true)

      }).catch( e => {
          console.log(e)
      })

      axiosClient.get('/sshes').then(({data}) => {
        setSshList(data)
        if(data.length > 0){
          setIsSsh(1)
        }else{
          setIsSsh(2)
        }
      })
    }

    const selectedPlan = (plan) => {
      setSelectedCodePlan(plan.code)
      const valor = (plan.price + plan.backing_abjustment) * trm
      setPagar(valor)
      setPlanSelect(plan)
    }

    const calcularValor = (valor, extra) => {
      return (valor + extra) * trm
    }

    const saveSSH = () => {
      axiosClient.post('/sshes', {
        nameSSH,
        textSSH
      }).then(({data}) => {
        console.log(data)
        // if(data.length > 0){
        //   setIsSsh(1)
        // }else{
        //   setIsSsh(2)
        // }
      })
    }

    const handleSelectSsh = (sshId) => {
      setSelectedSshId(sshId.ssh_id)
      setSelectedSsh(sshId)
    }

    const simuPagar = () => {
      axiosClient.post('/crear-pepido-pileo', {
        producto_id: planSelect.id,
        pagar,
        name: namePileo,
        region: selectedRegion,
        size: selectedCodePlan,
        image: selectedImgIso,
        ssh_keys: [selectedSsh.ssh_id, selectedSsh.fingerprint],
        vpc_uuid: selectedVpcId,

      }).then(({data}) => {
        console.log(data)
        location.href =`/pileo/confirm/${data.id}`;
        
      })
    }

    const formatCurrency = (number) => {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
      }).format(number);
    };

  return (
    <div className="flex flex-col min-h-screen">

        {/* ubicacion  */}

        <div className='grid mb-4'>
            <h1 className='grid-cols-12 text-2xl'>Elegir la ubicación</h1>
        </div>

        <div className="border-b border-b-gray-200">
            <ul className="-mb-px flex items-center gap-4 text-sm font-medium">
                <li className="flex-1">
                    <a
                    href="#"
                    onClick={() => selectLocation('Todos')}
                    className={ selected == 'Todos' ? 'relative flex items-center justify-center gap-2 px-1 py-3 text-blue-700 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-blue-700 hover:text-blue-700' : `flex items-center justify-center gap-2 px-1 py-3 text-gray-500 hover:text-blue-700`
                }
                    >
                      Todos </a>
                </li>
                {
                    locations.map(( ubi, index ) => (
                        <li className="flex-1" key={index} >
                            <a
                            href="#"
                            onClick={() => selectLocation(ubi.name)}
                            className={ selected == ubi.name ? 'relative flex items-center justify-center gap-2 px-1 py-3 text-blue-700 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-blue-700 hover:text-blue-700' : `flex items-center justify-center gap-2 px-1 py-3 text-gray-500 hover:text-blue-700`
                        }
                            >
                             {ubi.name} </a>
                        </li>
                    ))
                }

            </ul>

        </div>

        {/* DATACENTER  */}

        <div className='grid grid-cols-2 md:grid-cols-4 mt-2'>

            {
                datacentersSelect.map((data, index) => (
                    <div 
                        className=" flex justify-center items-center m-2 cursor-pointer animated fadeInDown" 
                        key={index} 
                        onClick={() => selectedR(data)}
                    >
                        <div className={
                            data.code == selectedRegion ?
                                "w-full rounded-lg bg-white shadow-sm p-5 border border-green-700 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0"
                                :
                                "w-full rounded-lg bg-white shadow p-5 border flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0"
                            
                            }>
                        
                            <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
                                <div className="flex rounded-md">
                                    <img src={data.flag} alt=""  className='w-10 h-10'/>
                                </div>
                                <div className="text-center sm:text-left">
                                    <h1 className="text-gray-700 font-bold tracking-wider">{ data.name } </h1>
                                </div>
                            </div>

                            <div>
                                {/* <button className="bg-blue-500 py-2 px-4 text-white font-bold rounded-md hover:bg-blue-600">Elegir</button> */}
                                {
                                    data.code == selectedRegion && (
                                        <IoCheckmarkCircle size={30} className='text-green-700' />
                                    )
                                }

                            </div>
                        </div>
                    </div>
                ))
            }

        </div>

        {/* NUEVO DATACENTER  */}

        {
          registerVpc == 2 ?
          (
            <div className='grid  grid-cols-1 md:grid-cols-1'>
                <div className="mt-6">
                    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6"> 
                        <p className="font-medium text-lg">
                            Crear configurar el rango de IP privado
                        </p>
                        <div className="md:col-span-5 mt-4">
                            <label htmlFor="name">Prefijo de rango de direcciones</label>
                            <input
                                value={ipRang}
                                onChange={handleIpRang}
                                type="text"
                                name="name"
                                id="name"
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            />
                        </div>

                        <div className="md:col-span-5 mt-4">
                            <label htmlFor="name">Nombre</label>
                            <input
                                value={nameVpc}
                                onChange={handleNameVpc}
                                type="text"
                                name="name"
                                id="name"
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            />
                        </div>

                        <div className="md:col-span-5">
                            <label htmlFor="name">Descripción</label>
                            <textarea
                                className="h-15 border mt-1 rounded px-4 w-full bg-gray-50"
                                name="descriptionVpc"
                                value={descriptionVpc}
                                onChange={handleDescriptionVpc}
                                cols={10}
                                rows={10}
                            ></textarea>
                        </div>

                        <div className="md:col-span-5 text-right">
                          <div className="inline-flex items-end">
                              <button
                              onClick={() => saveVpc()}
                              type="submit"
                              className="bg-gradient-to-tr from-indigo-600 to-purple-800 text-white font-bold py-2 px-4 rounded hover:shadow-lg hover:shadow-orange-500/40"
                              >
                              Guardar
                              </button>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
          )

          : registerVpc == 1 ? (
            <div className='grid  grid-cols-1 md:grid-cols-1'>
                <div className="mt-6">
                    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6"> 
                        <p className="font-medium text-lg">
                            Seleccione una creada o crea una nueva
                        </p>

                        <div className="md:col-span-5 text-right mb-4">
                          <div className="inline-flex items-end">
                              <button
                              onClick={() => crearVpc()}
                              type="submit"
                              className="bg-gradient-to-tr from-indigo-600 to-purple-800 text-white font-bold py-2 px-4 rounded hover:shadow-lg hover:shadow-orange-500/40"
                              >
                              Crear
                              </button>
                          </div>
                        </div>

                        {
                          datacenterCreateSelected.map((data, index) => (
                            <div 
                                className=" flex justify-center items-center m-2 cursor-pointer bg-white animated fadeInDown" 
                                key={index} 
                                onClick={() => selectedDCenter(data.vpc_id)}
                            >
                                <div className={
                                    data.vpc_id == selectedVpcId ?
                                        "w-full rounded-lg shadow-sm p-5 border border-green-700 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0"
                                        :
                                        "w-full rounded-lg shadow p-5 border flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0"
                                    
                                    }>
                                
                                    <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
                                        <div className="text-center sm:text-left">
                                            <h1 className="text-gray-700 font-bold tracking-wider">{ data.name } </h1>
                                        </div>
                                    </div>

                                    <div>
                                        {/* <button className="bg-blue-500 py-2 px-4 text-white font-bold rounded-md hover:bg-blue-600">Elegir</button> */}
                                        {
                                            data.vpc_id == selectedVpcId && (
                                                <IoCheckmarkCircle size={30} className='text-green-700' />
                                            )
                                        }

                                    </div>
                                </div>
                            </div>
                          ))
                        }

                        

                    </div>
                </div>
            </div>
          )

          : ''
        }

        {/* IMAGENES  */}

        {
          region && 
          <>          
            <div className='grid mb-4 mt-6'>
                <h1 className='grid-cols-12 text-2xl'>Elegir la imagen</h1>
            </div>

            <div className='grid  grid-cols-2 md:grid-cols-5'>
                {
                    isos.map((iso, index) => (
                        <div key={index} className="flex items-center justify-center m-2 bg-gradient-to-br">
                            <div className="bg-white w-56 h-60 font-semibold text-center items-center justify-center rounded-xl border shadow-lg p-10 max-w-xs">

                                <div  className='grid text-center items-center justify-center'>

                                    <img src={iso.img} alt=""  className='w-24 h-20 aspect-square'/>

                                    <h1 className="text-lg text-gray-700"> {iso.name} </h1>
                                </div>


                                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />

                                <div className="sm:col-span-3">
                                    <div className="mt-2">
                                        <select 
                                          id="country" 
                                          name="country" 
                                          onChange={(e) => selectIso(e.target.value)}
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                          <option className='text-xs' value={''}>Seleccione...</option>
                                          {
                                              iso.version.map((is, i) => (
                                                  <option key={i} value={is.code}>{ is.name }</option>
                                              ))
                                          }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>
          </>
        }


        {/* Precios  */}

        {
          selectedIso && 
          <>
          
            <div className='grid mb-4 mt-6'>
                <h1 className='grid-cols-12 text-2xl text-gradient-to-tr from-indigo-600 to-purple-800'>Precios</h1>
            </div>

            <div className="border-b border-b-gray-200">
                <ul className="-mb-px flex items-center gap-4 text-sm font-medium">
                    {
                        ListaPlanes.map(( ubi, index ) => (
                            <li className="flex-1" key={index} >
                                <a
                                href="#"
                                onClick={() => selectListPlan(ubi.name)}
                                className={ selectedList == ubi.name ? 'relative flex items-center justify-center gap-2 px-1 py-3 text-blue-700 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-blue-700 hover:text-blue-700' : `flex items-center justify-center gap-2 px-1 py-3 text-gray-500 hover:text-blue-700`
                            }
                                >
                                {ubi.name} </a>
                            </li>
                        ))
                    }

                </ul>

                <div className='mt-4 bg-white p-3 rounded-md shadow-lg'>
                  <div className="flex justify-between bg-gradient-to-tr from-indigo-600 to-purple-800 rounded-md py-2 px-4 text-white font-bold text-md">
                    <div>
                      <span>Nombre</span>
                    </div>
                    <div>
                      <span>Núcleos</span>
                    </div>
                    <div>
                      <span>Memoria</span>
                    </div>
                    <div>
                      <span>Almacenamiento</span>
                    </div>
                    <div>
                      <span>Precio</span>
                    </div>
                  </div>

                  <div>

                    {
                      planes.map(plan => (
                        <div key={plan.id} 
                          onClick={() => selectedPlan(plan)}
                          className={ selectedCodePlan == plan.code ? "flex text-center justify-between border-t text-sm font-normal mt-4 space-x-4 bg-purple-500 text-white py-2 rounded-md" : "flex text-center justify-between border-t text-sm font-normal mt-4 space-x-4 hover:bg-purple-500 hover:text-white hover:py-2 cursor-pointer hover:px-4 hover:rounded-md transition duration-700"}
                          // className={ selectedList == ubi.name ? 'relative flex items-center justify-center gap-2 px-1 py-3 text-blue-700 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-blue-700 hover:text-blue-700' : `flex items-center justify-center gap-2 px-1 py-3 text-gray-500 hover:text-blue-700`
                        >
                          <div className="px-2 flex mt-2">
                            <span> { plan.name } </span>
                          </div>
                          <div className='mt-2'>
                            <span> { plan.vcpu }</span>
                          </div>
                          <div className="px-2 mt-2">
                            <span>{ plan.memory }</span>
                          </div>
                          <div className="px-2 mt-2">
                            <span>{ plan.storage }</span>
                          </div>
                          <div className="px-2">
                          <b>{ formatCurrency(calcularValor( plan.price, plan.backing_abjustment ))} /mes</b> <br />
                          {/* <span>$0.0045/hora</span> */}
                          </div>
                        </div>  
                      ))
                    }


                  </div>
                </div>



            </div>



            {/* SSH  */}

            {
              isSsh == 2 ? (
                <div className='grid  grid-cols-1 md:grid-cols-1'>
                    <div className="mt-6">
                      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                          {/* SSH  */}


                            <div className="text-gray-600 lg:col-span-3">
                              <p className="font-medium text-lg">
                                Agregar una clave SSH pública
                              </p>
                              <p>
                                Las claves SSH son un método más seguro para iniciar
                                sesión en un servidor SSH, porque no son vulnerables a
                                los ataques comunes de piratería de contraseñas por
                                fuerza bruta.
                              </p>
                              <div>
                                <div className="mt-3 w-full mb-2 select-none rounded-l-lg border-l-4 border-purple-400 bg-purple-100 p-4 font-medium hover:border-purple-500 flex justify-between">
                                  <p>
                                    Podemos guiarlo en la configuración de su primera
                                    clave SSH
                                  </p>

                                  <div
                                    onClick={() => setOpen(true)}
                                    data-ripple-light="true"
                                    className="middle cursor-pointer none center rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-800 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                  >
                                    Click Aqui para crearlo
                                  </div>
                                </div>
                              </div>
                            </div>


                          <Modals open={open} onClose={() => setOpen(false)}>
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-6">
                              <div className="text-gray-600 lg:col-span-2">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                  <div className="md:col-span-5">
                                    <h3 className="mb-3 text-lg font-semibold">
                                      Agregar clave SSH pública
                                    </h3>
                                    <p className="mb-3 text-xs">
                                      Copie su clave SSH pública y péguela en el espacio
                                      a continuación. Para obtener instrucciones sobre
                                      cómo, siga los pasos a la derecha.
                                    </p>
                                  </div>

                                  <div className="md:col-span-5">
                                    <label htmlFor="name">SSH Key contenido</label>
                                    <textarea
                                      className="h-15 border mt-1 rounded px-4 w-full bg-gray-50"
                                      name="textssh"
                                      value={textSSH}
                                      onChange={handleTextSSH}
                                      cols={10}
                                      rows={10}
                                    ></textarea>
                                  </div>

                                  <div className="md:col-span-5">
                                    <label htmlFor="name">Nombre</label>
                                    <input
                                      value={nameSSH}
                                      onChange={handleNameSSH}
                                      type="text"
                                      name="name"
                                      id="name"
                                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    />
                                  </div>

                                  <div className="md:col-span-5 text-right">
                                    <div className="inline-flex items-end w-full">
                                      <button
                                        onClick={saveSSH}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded disabled:opacity-75"
                                      >
                                        Crear KEY SSH
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="lg:col-span-2">
                                <p className="font-medium text-lg">
                                  Información para crear el pileos
                                </p>
                                <p>
                                  Dale a tus Pileos un nombre identificativo por el
                                  que los recordarás.
                                </p>
                              </div>
                            </div>
                          </Modals>

                        </div>
                      </div>
                    </div>
                </div>
              )
              : isSsh == 1 ? (
                  <div className='grid  grid-cols-1 md:grid-cols-1'>
                    <div className="mt-6">
                      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                          {/* SSH  */}
                          <div className="text-gray-600 lg:col-span-3">
                              <p className="font-medium text-lg">
                                Elige tus claves SSH
                              </p>
                              {sshList.map((data) => (
                                <div 
                                    className=" flex justify-center items-center m-2 cursor-pointer bg-white animated fadeInDown" 
                                    key={data.id} 
                                    onClick={() => handleSelectSsh(data)}
                                >
                                    <div className={
                                        data.ssh_id == selectedSshId ?
                                        "w-full rounded-lg shadow-sm p-5 border border-green-700 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0"
                                        :
                                        "w-full rounded-lg shadow p-5 border flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0"
                                        
                                    }>
                                    
                                        <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
                                            <div className="text-center sm:text-left">
                                                <h1 className="text-gray-700 font-bold tracking-wider"> { data.name } </h1>
                                            </div>
                                        </div>

                                        <div>
                                            {
                                                data.ssh_id == selectedSshId && (
                                                    <IoCheckmarkCircle size={30} className='text-green-700' />
                                                )
                                            }

                                        </div>
                                    </div>
                                </div>
                              ))}

                                

                              <div
                                onClick={() => setOpen(true)}
                                data-ripple-light="true"
                                className="mt-6 middle w-40 text-center cursor-pointer none center rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                              >
                                Nuevo SSH
                              </div>
                            </div>

                            <Modals open={open} onClose={() => setOpen(false)}>
                              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-6">
                                <div className="text-gray-600 lg:col-span-2">
                                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                    <div className="md:col-span-5">
                                      <h3 className="mb-3 text-lg font-semibold">
                                        Agregar clave SSH pública
                                      </h3>
                                      <p className="mb-3 text-xs">
                                        Copie su clave SSH pública y péguela en el espacio
                                        a continuación. Para obtener instrucciones sobre
                                        cómo, siga los pasos a la derecha.
                                      </p>
                                    </div>

                                    <div className="md:col-span-5">
                                      <label htmlFor="name">SSH Key contenido</label>
                                      <textarea
                                        className="h-15 border mt-1 rounded px-4 w-full bg-gray-50"
                                        name="textssh"
                                        value={textSSH}
                                        onChange={handleTextSSH}
                                        cols={10}
                                        rows={10}
                                      ></textarea>
                                    </div>

                                    <div className="md:col-span-5">
                                      <label htmlFor="name">Nombre</label>
                                      <input
                                        value={nameSSH}
                                        onChange={handleNameSSH}
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                      />
                                    </div>

                                    <div className="md:col-span-5 text-right">
                                      <div className="inline-flex items-end w-full">
                                        <button
                                          // onClick={saveSSH}
                                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded disabled:opacity-75"
                                        >
                                          Crear KEY SSH
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="lg:col-span-2">
                                  <p className="font-medium text-lg">
                                    Información para crear el pileos
                                  </p>
                                  <p>
                                    Dale a tus Pileos un nombre identificativo por el
                                    que los recordarás.
                                  </p>
                                </div>
                              </div>
                            </Modals>
                        </div>
                      </div>
                    </div>
                  </div>
              )
              : ''
            }


            

            {/* CREAR PILEO  */}
            <div className='grid  grid-cols-1 md:grid-cols-1'>
                <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                      
                        <div className="text-gray-600">
                          <p className="font-medium text-lg">
                              Información para crear el pileos
                          </p>
                          <p>
                              Dale a tus Pileos un nombre identificativo por el que
                              los recordarás.
                          </p>
                        </div>

                        <div className="lg:col-span-2">
                          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                              <div className="md:col-span-5">
                              <label htmlFor="name">Nombre</label>
                              <input
                                  type="text"
                                  value={namePileo}
                                  onChange={handleNamePileo}
                                  name="name"
                                  id="name"
                                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              />
                              </div>

                              <div className="md:col-span-5 text-right">
                                <div className="inline-flex items-end">
                                    <button
                                    // onClick={() => setOpen2(true)}
                                    onClick={simuPagar}
                                    type="submit"
                                    className="bg-gradient-to-tr from-indigo-600 to-purple-800 text-white font-bold py-2 px-4 rounded hover:shadow-lg hover:shadow-orange-500/40"
                                    >
                                    Pagar
                                    </button>
                                </div>
                              </div>
                          </div>                            
                        </div>


                    </div>
                </div>
            </div>
            
          </>
        }



      <footer className="w-full text-center border-t border-grey p-4 bg-dark-purple">
        <p className="font-bold font-sans text-white">Total a Pagar {formatCurrency(pagar)}</p>
      </footer>


    </div>
  )
}
