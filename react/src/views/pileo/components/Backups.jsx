import React, { useEffect, useState } from 'react'
import axiosClient from '../../../axios-client';
import { IoTerminal } from 'react-icons/io5';

export const Backups = ({ id }) => {

    const [backups, setBackups] = useState({});

    useEffect(() => {
        listBackups();
    }, []);

    const listBackups = () => {
      axiosClient.get(`/info-backup/${id}`).then(({data}) => {
        console.log(data)
          setBackups(data.backups);
      })
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
                Backups
            </div>

            <span onClick={() => openTerminal()} className="ml-auto flex">
                <span className="bg-gray-500 py-1 px-2 w-28 rounded text-white text-sm cursor-pointer flex">
                    <IoTerminal  className='rounded bg-gray-500 text-white w-6 h-6 p-1' /> <span>Consola</span>
                </span>
            </span>
        </div>

        <div className="w-full px-5 py-3 max-h-screen overflow-y-auto">
            <div id="view-1">

                {
                    backups.length > 0 ? (
                        <>                        
                            <div className="text-gray-700">
                                <div className="grid md:grid-cols-1 text-sm">
                                    <div className="grid grid-cols-1">
                                    <p>
                                        Actualmente las copias de seguridad están habilitadas. Se
                                        conservan durante 4 semanas y se pueden convertir en
                                        instantáneas para su uso posterior.
                                    </p>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-hidden mt-6">
                                <table className="min-w-full">
                                    <thead className="bg-gray-200 border-b">
                                    <tr>
                                        <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                        Nombre
                                        </th>
                                        <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                        Fecha de creacion
                                        </th>
                                        <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                        Occión
                                        </th>
                                    </tr>
                                    </thead>
                                    {/* <tbody>
                                    {backups?.map((back) => (
                                        <tr
                                        key={back.id}
                                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                                        >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {back.name}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {back.created_at}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap items-center flex">
                                            <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline">...</Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56">
                                                <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <div>Eliminar</div>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Billing
                                                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                        </tr>
                                    ))}
                                    </tbody> */}
                                </table>
                            </div>
                        </>
                    ) : (
                        <>                        
                            <div className="text-gray-700">
                                <div className="grid md:grid-cols-1 text-sm">
                                    <div className="grid grid-cols-1">
                                    <p>
                                    Reduzca el estrés de las fallas con copias de seguridad automatizadas
                                    Se pueden utilizar para restaurar datos perdidos o corruptos y crear nuevos Pileo.
                                    </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }

            </div>
        </div>
    </>
  )
}
