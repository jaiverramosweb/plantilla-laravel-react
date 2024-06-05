import React from 'react'
import Swal from "sweetalert2";
import axiosClient from '../../../axios-client';
import { IoTerminal } from 'react-icons/io5';

export const Destruir = ({ id }) => {

    const deletePileo = () => {
      Swal.fire({
          title: "Estas seguro?",
          text: "Se eliminara del sistema y no se va a poder recuperar!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Eliminar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            axiosClient.delete(`/eliminar-pileo/${id}`).then(({ data }) => {
                Swal.fire({
                  title: "Eliminado!",
                  text: "Fue borrado con exito",
                  icon: "success",
                });
            })

          //   router.replace(`/dashboard/products/pileos`);
          }
        });
    }

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
                Destruir
            </div>

            <span onClick={() => openTerminal()} className="ml-auto flex">
                <span className="bg-gray-500 py-1 px-2 w-28 rounded text-white text-sm cursor-pointer flex">
                    <IoTerminal  className='rounded bg-gray-500 text-white w-6 h-6 p-1' /> <span>Consola</span>
                </span>
            </span>
        </div>

        <div className="w-full px-5 py-3 max-h-screen overflow-y-auto">
            <div className="text-gray-700">
                <div className="grid md:grid-cols-1 text-sm">
                    <div className="grid grid-cols-1">
                        <p>
                            Esto es irreversible. Destruiremos su Pielo y todos los datos de
                            Pileo serán eliminados y serán irrecuperables.
                        </p>
                    </div>
                    <button
                    onClick={() => deletePileo()}
                    className="p-3 m-3 border rounded bg-red-500 text-white mt-5"
                    >
                    Destruir
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}
