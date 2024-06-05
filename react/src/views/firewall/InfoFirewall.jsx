import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosClient from '../../axios-client'
import Swal from "sweetalert2";

export const InfoFirewall = () => {
    const { id } = useParams()

    const [firewal, setFirewal] = useState()

    useEffect(() => {
        getFirewal()
    }, [])
    

    const getFirewal = () => {
        axiosClient.get(`/firewall/${id}`).then(({ data }) => {
            // console.log(data)
            const info = {
                ...data,
                inbound_rules: JSON.parse(data.inbound_rules),
                outbound_rules: JSON.parse(data.outbound_rules)
            }
            // console.log(info)
            setFirewal(info)
        })
    }

    const deleteFirewall = async (id) => {
        Swal.fire({
          title: "Esta seguro de eliminarlo?",
          text: "Si lo elimina sera borrado de tu cuenta!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Eliminar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            axiosClient.delete(`/firewall/${id}`).then(({data}) => {
                console.log(data);
                Swal.fire({
                    title: "Eliminado con exito!",
                    text: "Registro eliminado.",
                    icon: "success",
                });

                setTimeout(() => {                    
                    location.href =`/firewalls`;
                }, 500);

            })
          }
        });
      };
  return (
    <div>
        <div className="container mx-auto my-5 p-5">
        <h1 className="text-3xl">{firewal?.name}</h1>

        <div className="mt-4 ml-4 border p-5 rounded-sm bg-white shadow w-full">
            <p className="mb-4">
            Pileo Adignado: <span className="text-xl">{firewal?.pileo_name}</span>{" "}
            </p>
            <div className="flex">
            <p>Eliminar Firewall: </p>{" "}
            <span
                className="hover:text-red-500 ml-4 cursor-pointer text-red-300"
                onClick={() => deleteFirewall(firewal.firewall_id)}
            >
                Eliminar
            </span>
            </div>
        </div>

        <div className="mt-4 ml-4 border p-5 rounded-sm bg-white shadow w-full">
            <h3 className="mb-4">Entrada</h3>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                <th
                    scope="col"
                    className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                    <button className="flex items-center gap-x-3 focus:outline-none">
                    <span>Protocolo</span>
                    </button>
                </th>

                <th
                    scope="col"
                    className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                    Puerto
                </th>

                <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                    Fuentes
                </th>
                </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                {firewal?.inbound_rules.length !== undefined ? (
                firewal?.inbound_rules.map((data, indice) => (
                    <tr key={indice}>
                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                        <h2 className="font-medium text-gray-800 dark:text-white ">
                            {data.protocol}
                        </h2>
                        </div>
                    </td>
                    <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                        <h2 className="font-medium text-gray-800 dark:text-white ">
                        {data.ports}
                        </h2>
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex">
                        <p className="text-gray-500 dark:text-gray-400 mr-2">
                            {data.sources.addresses.join(", ")}
                        </p>
                        </div>
                    </td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan={3} className="text-center">
                    <h2>Cargadon Información de Parametros de Entrada</h2>
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>

        <div className="mt-4 ml-4 border p-5 rounded-sm bg-white shadow w-full">
            <h3 className="mb-4">Salida</h3>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                <th
                    scope="col"
                    className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                    <button className="flex items-center gap-x-3 focus:outline-none">
                    <span>Protocolo</span>
                    </button>
                </th>

                <th
                    scope="col"
                    className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                    Puerto
                </th>

                <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                    Fuentes
                </th>
                </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                {firewal?.outbound_rules.length !== undefined ? (
                firewal?.outbound_rules.map((data, indice) => (
                    <tr key={indice}>
                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                        <h2 className="font-medium text-gray-800 dark:text-white ">
                            {data.protocol}
                        </h2>
                        </div>
                    </td>
                    <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                        <h2 className="font-medium text-gray-800 dark:text-white ">
                        {data.ports}
                        </h2>
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex">
                        <p className="text-gray-500 dark:text-gray-400 mr-2">
                            {data.destinations.addresses.join(", ")}
                        </p>
                        </div>
                    </td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan={3} className="text-center">
                    <h2>Cargadon Información de Parametros de Salida</h2>
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
        </div>
        
    </div>
  )
}
