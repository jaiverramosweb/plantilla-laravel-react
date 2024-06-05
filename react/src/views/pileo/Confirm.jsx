import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import tiendaApi from '../../services/tienda-api';
import ProgressBar from './components/ProgressBar';
import axiosClient from '../../axios-client';
import PayUForm from './components/PayUForm';
import { Modals } from '../../components/Modals';
import { PayPalButton } from './components/PayPalButton';


export const PileoConfirm = () => {

  const { id } = useParams()

    const [info, setInfo] = useState(null);
    const [infoPay, setInfoPay] = useState(null);
    const [address, setAddress] = useState('')
    const [document, setDocument] = useState('')
    const [phone, setPhone] = useState('')
    const [open, setOpen] = useState(false);
    

    useEffect(() => {
        getInfoOrden()
    }, [])

    const handleAddress = (event) => {
        setAddress(event.currentTarget.value);
    };

    const handleDocument = (event) => {
        setDocument(event.currentTarget.value);
    };

    const handlePhone = (event) => {
        setPhone(event.currentTarget.value);
    };

    const getInfoOrden = () => {
        axiosClient.get(`/get-info-orden/${id}`).then(({data}) => {
            console.log(data)
            setInfo(data.pedido)
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
    <>
        {
            info &&  (

                <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
                    <div className="flex justify-start item-start space-y-2 flex-col">
                        <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Orden #{info.codigo}</h1>
                        {/* <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">21st Mart 2021 at 10:34 PM</p> */}
                    </div>
                    <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">

                        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">

                            <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full shadow-md">
                                <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Pedido Pileo</p>

                                <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">

                                    <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                                        <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{ info.plan.name }</h3>
                                        <div className="flex justify-start items-start flex-col space-y-2">
                                            <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Núcleos: </span>{info.plan.vcpu}</p>
                                            <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Memoria: </span>{info.plan.memory}</p>
                                            <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Almacenamiento: </span> {info.plan.storage}</p>
                                        </div>
                                        </div>
                                        <div className="flex justify-between space-x-8 items-start w-full">
                                            {/* <p className="text-base dark:text-white xl:text-lg leading-6">$36.00 <span className="text-red-300 line-through"> $45.00</span></p> */}
                                            {/* <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">01</p> */}
                                            <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">{ formatCurrency(info.pagar) }</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        
                            <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">

                                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6 shadow-md">
                                    <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Valor a pagar</h3>
                                    <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">

                                        {/* <div className="flex justify-between w-full">
                                            <p className="text-base dark:text-white leading-4 text-gray-800">Total a pagar</p>
                                            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">$56.00</p>
                                        </div> */}

                                        {/* <div className="flex justify-between items-center w-full">
                                            <p className="text-base dark:text-white leading-4 text-gray-800">Discount <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">STUDENT</span></p>
                                            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">-$28.00 (50%)</p>
                                        </div> */}
                                        {/* <div className="flex justify-between items-center w-full">
                                            <p className="text-base dark:text-white leading-4 text-gray-800">Shipping</p>
                                            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">$8.00</p>
                                        </div> */}
                                    </div>
                                    <div className="flex justify-between items-center w-full">
                                        <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                                        <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">{ formatCurrency(info.pagar) }</p>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6 shadow-md">
                                    <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Metodos de pago</h3>

                                    <div className="w-full flex justify-center items-center">
                                        <PayUForm 
                                            pago={info.pagar} 
                                            address={address} 
                                            document={document} 
                                            phone={phone}
                                        />
                                    </div>
                                    <div className="w-full flex justify-center items-center">
                                        <button onClick={() => setOpen(true)} className="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">Paypal</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col shadow-md">
                            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Informacion necesaria del cliente</h3>
                            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">

                                <div className="flex flex-col justify-start items-start flex-shrink-0">
                                    <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">               
                                        <div className="flex justify-start items-start flex-col space-y-2">
                                            <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">David Kent</p>
                                        </div>
                                    </div>

                                </div>

                                <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">

                                    <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                                        <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                            <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Direccion</p>
                                            <input
                                                value={address}
                                                onChange={handleAddress}
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            />
                                        </div>

                                        <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                            <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Numero de documento</p>
                                            <input
                                                value={document}
                                                onChange={handleDocument}
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            />
                                        </div>

                                        <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                            <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Telefono</p>
                                            <input
                                                value={phone}
                                                onChange={handlePhone}
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            />
                                        </div>
                                        
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>



                    {/* Modal Paypal */}
                    <Modals open={open} onClose={() => setOpen(false)}>
                        <div className='mt-8'>
                            <PayPalButton orderId={info.id} amount={info.pagar} />
                        </div>
                    </Modals>
                </div>

            )
        }
    </>
  )
}
