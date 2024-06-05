import React, { useEffect, useState } from 'react'
import { Modals } from '../../../components/Modals';
import axiosClient from '../../../axios-client';
import { IoTerminal } from 'react-icons/io5';

export const Redes = ({ networks, id }) => {

    const [ipReservada, setIpReservada] = useState();
    const [ipReser, setIpReser] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(networks["v4"][2]) {
            setIpReservada(networks["v4"][2].ip_address)      
        }
    }, [networks])
    


    const reserveIp = () => {
        axiosClient.post(`/reservar-ip`, { droplet_id: id }).then(({data}) => {
            console.log(data)
            setIpReservada(data.reserved_ip.ip); 
        })
        setOpen(false);
      };

      const DeleteIp = () => {
        setIpReser(true);
        setOpen(true);
      };

      const reserveIpDelete = async () => {
        axiosClient.delete(`/reservar-ip/${ipReservada}`,).then(({data}) => {
            console.log(data)
            setIpReservada(''); 
            setIpReser(false);
            setOpen(false);
        })

        setIpReservada(undefined);
        setIpReser(false);
        setOpen(false);
      };

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
                Redes
            </div>

            <span onClick={() => openTerminal()} className="ml-auto flex">
                <span className="bg-gray-500 py-1 px-2 w-28 rounded text-white text-sm cursor-pointer flex">
                    <IoTerminal  className='rounded bg-gray-500 text-white w-6 h-6 p-1' /> <span>Consola</span>
                </span>
            </span>
        </div>

        <div className="w-full px-5 py-3 max-h-screen overflow-y-auto">
            <div id="view-1">

            <div className="text-gray-700 mt-5">
            <div className="text-gray-700">
                <h3 className="text-xl">Red pública</h3>
                <div className="grid md:grid-cols-2 text-sm">
                <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">IPv4:</div>
                    <div className="px-4 py-2">{networks["v4"][0].ip_address}</div>
                </div>
                <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Entrada Publica:</div>
                    <div className="px-4 py-2">{networks["v4"][0].gateway}</div>
                </div>
                <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                    Mascara de SubNet:
                    </div>
                    <div className="px-4 py-2">{networks["v4"][0].netmask}</div>
                </div>

                <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">IP Reservada:</div>
                    <div className="px-4 py-2">
                    {ipReservada === undefined || ipReservada === "" ? (
                        <span
                        className="cursor-pointer text-blue-500"
                        onClick={() => setOpen(true)}
                        >
                        Habilitado ahora
                        </span>
                    ) : (
                        <span
                        className="cursor-pointer text-blue-500"
                        onClick={() => DeleteIp()}
                        >
                        {ipReservada}
                        </span>
                    )}
                    </div>

                    <Modals open={open} onClose={() => setOpen(false)}>
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1 w-96">
                        <div className="text-gray-600 lg:col-span-1">
                        {!ipReser ? (
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-1">
                            <div className="md:col-span-1">
                                <h3 className="mb-3 text-lg font-semibold">
                                Asignar una IP reservada
                                </h3>
                                <p className="mb-3 text-md">
                                Una IP reservada es una dirección IP estática que
                                apunta a uno de sus Pileos. Le permite redirigir
                                el tráfico de la red a cualquiera de sus Pileos en
                                el mismo centro de datos. Por ejemplo, si su Pileo
                                principal se desconecta, puede apuntar su IP
                                reservada a un Pileo de respaldo. Las IP
                                reservadas están vinculadas a los centros de
                                datos.
                                </p>
                            </div>

                            <div className="md:col-span-5 text-right">
                                <div className="inline-flex items-end w-full">
                                <button
                                    // disabled={false}
                                    onClick={reserveIp}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded disabled:opacity-75"
                                >
                                    Asignar una IP
                                </button>
                                </div>
                            </div>
                            </div>
                        ) : (
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-1">
                            <div className="md:col-span-1">
                                <h3 className="mb-3 text-lg font-semibold">
                                Eliminar una IP reservada
                                </h3>
                                <p className="mb-3 text-md">
                                ¿Está seguro de que desea eliminar la IP reservada
                                {ipReservada}?
                                </p>
                            </div>

                            <div className="md:col-span-5 text-right">
                                <div className="inline-flex items-end w-full">
                                <button
                                    // disabled={false}
                                    onClick={reserveIpDelete}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 w-full rounded disabled:opacity-75"
                                >
                                    Eliminar
                                </button>
                                </div>
                            </div>
                            </div>
                        )}
                        </div>
                    </div>
                    </Modals>
                </div>

                </div>

                <hr className="mt-4" />

                <h3 className="mt-6 text-xl">Red privada</h3>
                <div className="grid md:grid-cols-2 text-sm">
                <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                    Direccion IPv4 privada:
                    </div>
                    <div className="px-4 py-2">{networks["v4"][1].ip_address}</div>
                </div>
                </div>
            </div>
            </div>

            </div>
        </div>
    </>
  )
}
