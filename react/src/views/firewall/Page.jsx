import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import Swal from "sweetalert2";

export const FirewallPage = () => {

  const [firewall, setFirewall] = useState([])

  useEffect(() => {
    getFirewall()  
  }, [])
  

  const getFirewall = () => {
    axiosClient.get('/firewall').then(({ data }) => {
      setFirewall(data)
    })
  }

  const verInfo = (id) => {
    // console.log(id)
    location.href =`/firewalls/${id}`;
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
    <div className="container  mx-auto px-5 mt-5">
      <h1 className="text-2xl">Firewalls</h1>
      <div className="flex flex-col">
        <p className="mt-5 text-justify">
          Los firewalls le permiten proteger fácilmente su infraestructura al
          definir explícitamente qué tipo de tráfico puede llegar a ella.
          Utilice etiquetas para organizar su infraestructura y aplicar reglas
          de firewall a múltiples recursos.
        </p>
        <div className="mt-6">
          <a
            href="/firewalls/new"
            className="p-4 m-3 text-center rounded-xl border md:mt-0 md:w-96 bg-blue-900 text-white cursor-pointer"
          >
            Crea tu Firewalls
          </a>
        </div>
      </div>

      <hr className="my-5" />

      {
        firewall.length > 0 && (
          <div className='card animated fadeInDown'>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Pileo asignado</th>
                  <th>Fecha Creación</th>
                  <th>Actions</th>
                </tr>
              </thead>
                  <tbody>
                {
                  firewall.map((fire, i) => (
                    <tr key={fire.id}>
                      <td>{i + 1}</td>
                      <td>{fire.name}</td>
                      <td>{fire.pileo_name}</td>
                      <td>{fire.created_at}</td>
                      <td>
                        {/* <Link to={`/users/${user.id}`} className='btn-edit'>Edit</Link> */}
                        &nbsp;
                        {/* <button onClick={e => onDelete(user)} className='btn-delete'>Delete</button> */}
                        <button onClick={() => verInfo(fire.id)} className='btn-edit'>Ver</button>
                        &nbsp;
                        <button onClick={() => deleteFirewall(fire.firewall_id)} className='btn-delete'>Eliminar</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>

            </table>
          </div>
        )
      }

    </div>
  );
}