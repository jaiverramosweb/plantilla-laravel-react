import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axiosClient from "../../../axios-client";

export const NewFirewallPage = () => {
    // const router = useRouter();
  
    useEffect(() => {
      getDrop();
    }, []);
  
    const [fuentesEntrada, setFuentesEntrada] = useState([
      "0.0.0.0/0",
      "::/0",
    ]);
  
    const [fuentesSalida, setFuentesSalida] = useState([
      "0.0.0.0/0",
      "::/0",
    ]);
  
    const [pileo, setPileo] = useState();
  
    const [name, setName] = useState();
  
    const [fuente, setFuente] = useState();
    const [protocoloEntrada, setProtocoloEntrada] = useState();
    const [puertoEntrada, setPuertoEntrada] = useState();
    const [dataTablaEntrada, setDataTablaEntrada] =
      useState();
  
    const [fuenteSalida, setFuenteSalida] = useState();
    const [protocoloSalida, setProtocoloSalida] = useState();
    const [puertoSalida, setPuertoSalida] = useState();
    const [dataTablaSalida, setDataTablaSalida] = useState();
  
    const [idPileo, setIdPileo] = useState();
  
    const getDrop = async () => {
      axiosClient.get('/pileo').then(({ data }) => {
        setPileo(data);
      })
    };
  
    const addFuentes = () => {
      setFuentesEntrada([...fuentesEntrada, fuente]);
      setFuente("");
    };
  
    const deleteFuentes = (data ) => {
      let dataR = fuentesEntrada.filter((item) => item !== data);
      setFuentesEntrada(dataR);
    };
  
    const addTableFuenteEntrada = () => {
      let count = 0;
      if (Symbol.iterator in Object(dataTablaEntrada)) {
        count = dataTablaEntrada.length + 1;
      } else {
        count = 1;
      }
  
      const data = {
        id: count,
        protocol: protocoloEntrada,
        ports: puertoEntrada,
        sources: {
          addresses: fuentesEntrada,
        },
      };
  
      if (Symbol.iterator in Object(dataTablaEntrada)) {
        setDataTablaEntrada([...dataTablaEntrada, data]);
      } else {
        setDataTablaEntrada([data]);
      }
  
      setFuentesEntrada(["0.0.0.0/0", "::/0"]);
      setProtocoloEntrada("");
      setPuertoEntrada("");
    };
  
    const deleteTableFuenteEntrada = (id) => {
      let dataR = dataTablaEntrada?.filter((item) => item.id !== id);
      setDataTablaEntrada(dataR);
    };
  
    const addFuentesSalida = () => {
      setFuentesSalida([...fuentesSalida, fuenteSalida]);
      setFuenteSalida("");
    };
  
    const deleteFuentesDalida = (data) => {
      let dataR = fuentesSalida.filter((item) => item !== data);
      setFuentesSalida(dataR);
    };
  
    const addTableFuenteSalida = () => {
      let count = 0;
      if (Symbol.iterator in Object(dataTablaSalida)) {
        count = dataTablaSalida.length + 1;
      } else {
        count = 1;
      }
  
      const data = {
        id: count,
        protocol: protocoloSalida,
        ports: puertoSalida,
        destinations: {
          addresses: fuentesSalida,
        },
      };
  
      if (Symbol.iterator in Object(dataTablaSalida)) {
        setDataTablaSalida([...dataTablaSalida, data]);
      } else {
        setDataTablaSalida([data]);
      }
  
      setFuentesSalida(["0.0.0.0/0", "::/0"]);
      setProtocoloSalida("");
      setPuertoSalida("");
    };
  
    const deleteTableFuenteSalida = (id) => {
      let dataR = dataTablaSalida?.filter((item) => item.id !== id);
      setDataTablaSalida(dataR);
    };
  
    const saveFirewall = async () => {
      const inbound = [];
      dataTablaEntrada.forEach((data) => {
        const { id, ...rest } = data;
        inbound.push(rest);
      });
  
      const outbound = [];
      dataTablaSalida.forEach((data) => {
        const { id, ...rest } = data;
        outbound.push(rest);
      });
  
      const dataSave = {
        name: name,
        inbound_rules: inbound,
        outbound_rules: outbound,
        droplet_ids: [parseInt(idPileo)],
      };
  
      // const firewal = await postFirewall(dataSave, parseInt(idPileo));

      axiosClient.post('/firewall', {
        data: dataSave,
        id: idPileo
      }).then(({ data }) => {
        console.log(data)
        Swal.fire({
          title: "Creado con exito!",
          text: "Registro creado.",
          icon: "success",
        });
        setTimeout(() => {
          location.href =`/firewalls`;
        }, 500);
      })
  
      // if (firewal) {
      //   Swal.fire({
      //     title: "Creado con exito!",
      //     text: "Registro creado.",
      //     icon: "success",
      //   });
      //   setTimeout(() => {
      //     router.replace("/dashboard/products/networking/firewall");
      //   }, 500);
      // }

    };
  
    return (
      <div className="container mx-auto px-5 mt-5">
        <h1 className="text-4xl  font-semibold">Crear Firewall</h1>
  
        <div className="mt-6">
          <h2 className="text-2xl">Aplicar al Pileo</h2>
          <p className="mt-2 text-md ">
            Seleccione el Pileo para aplicar sus reglas de Firewall.
          </p>
  
          <div className="md:w-2/3 w-full">
            <label className="block mb-2 text-base font-medium"></label>
            <select
              id="large"
              value={idPileo}
              onChange={(e) => setIdPileo(e.target.value)}
              className="block w-full px-4 py-3 text-base text-gray-900 border  rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            >
              <option defaultValue="">Seleccione un pileo..</option>
              {pileo?.map((data) => (
                <option key={data.id} value={data.pileo_id}>
                  {data.name}
                </option>
              ))}
            </select>
          </div>
        </div>
  
        <hr className="mt-6" />
  
        <div className="flex flex-col mt-3">
          <div className="mb-5 mt-6">
            <label className="block mb-2 text-sm font-medium">
              Nombre *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              className="border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-2/3 w-full p-2.5 "
              required
            />
          </div>
        </div>
  
        {/* Reglas de entrada  */}
        <div>
          <h2 className="text-2xl">Reglas de entrada</h2>
          <p className="mt-2 text-md text-gray-600">
            Establezca las reglas del Firewall para el tráfico entrante. Sólo los
            puertos especificados aceptarán conexiones entrantes. Todo el resto
            del tráfico se eliminará.
          </p>
          <div className="flex flex-col md:flex-row">
            <div className="mt-4 border p-5 rounded-sm bg-white shadow">
              <div>
                <label
                  htmlFor="currentPassword"
                  className="text-sm font-medium text-gray-700 block mb-2"
                >
                  Protocolo
                </label>
                <select
                  value={protocoloEntrada}
                  onChange={(e) => setProtocoloEntrada(e.target.value)}
                  id="large"
                  className="block w-full px-4 py-3 text-base  border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option defaultValue="">Seleccione..</option>
                  <option value="tcp">TCP</option>
                  <option value="udp">UDP</option>
                  <option value="icmp">ICMP</option>
                </select>
              </div>
  
              <div className="mt-3">
                <label
                  htmlFor="currentPassword"
                  className="text-sm font-medium text-gray-700 block mb-2"
                >
                  Puerto
                </label>
                <input
                  value={puertoEntrada}
                  onChange={(e) => setPuertoEntrada(e.target.value)}
                  type="text"
                  className="fbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
  
              <div className="mt-3">
                <label
                  htmlFor="currentPassword"
                  className="text-sm font-medium text-gray-700 block mb-2"
                >
                  Fuentes
                </label>
                <div className="flex">
                  <input
                    value={fuente}
                    onChange={(e) => setFuente(e.target.value)}
                    type="text"
                    className="fbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <button
                    onClick={addFuentes}
                    className="border w-10 rounded-md text-green-500 border-green-500 ml-2"
                  >
                    +
                  </button>
                </div>
              </div>
  
              <div className="mt-6">
                {fuentesEntrada.map((data, index) => (
                  <div key={index}>
                    <div className="flex align-middle flex-row justify-between">
                      <div className="p-2">
                        <p className="text-md text-blac">{data}</p>
                      </div>
                      <button
                        onClick={() => deleteFuentes(data)}
                        className="border w-10 rounded-md text-red-500 border-red-500"
                      >
                        X
                      </button>
                    </div>
                    <hr className="mt-2 mb-2" />
                  </div>
                ))}
              </div>
  
              <button
                onClick={addTableFuenteEntrada}
                className="p-2 mt-6 border rounded-md w-full text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
              >
                Agregar
              </button>
            </div>
  
            <div className="mt-4 ml-4 border p-5 rounded-sm bg-white shadow w-full">
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
                    <th scope="col" className="relative py-3.5 px-4">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
  
                <tbody className="bg-white divide-y divide-gray-200">
                  {dataTablaEntrada?.length !== undefined ? (
                    dataTablaEntrada?.map((data, indice) => (
                      <tr key={indice}>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          <div>
                            <h2 className="font-medium text-gray-500">
                              {data.protocol}
                            </h2>
                          </div>
                        </td>
                        <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                          <h2 className="font-medium text-gray-500">
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
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <button
                            onClick={() => deleteTableFuenteEntrada(data.id)}
                            className="px-1 py-1 text-red-500 transition-colors duration-200 rounded-lg dark:text-red-400 hover:bg-red-200"
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center">
                        <h2>Agregar Parametros de entrada</h2>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
  
        <hr className="mt-6" />
  
        {/* Reglas de salida  */}
        <div className="mt-6">
          <h2 className="text-2xl">Reglas de salida</h2>
          <p className="mt-2 text-md text-gray-600">
            Establezca las reglas del Firewall para el tráfico saliente. El
            tráfico saliente solo se permitirá a los puertos especificados. Todo
            el resto del tráfico será bloqueado.
          </p>
          <div className="flex flex-col md:flex-row">
            <div className="mt-4 border p-5 rounded-sm bg-white shadow">
              <div>
                <label
                  htmlFor="currentPassword"
                  className="text-sm font-medium text-gray-700 block mb-2"
                >
                  Protocolo
                </label>
                <select
                  value={protocoloSalida}
                  onChange={(e) => setProtocoloSalida(e.target.value)}
                  id="large"
                  className="block w-full px-4 py-3 text-base  border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option defaultValue="">Seleccione..</option>
                  <option value="tcp">TCP</option>
                  <option value="udp">UDP</option>
                  <option value="icmp">ICMP</option>
                </select>
              </div>
  
              <div className="mt-3">
                <label
                  htmlFor="currentPassword"
                  className="text-sm font-medium text-gray-700 block mb-2"
                >
                  Puerto
                </label>
                <input
                  value={puertoSalida}
                  onChange={(e) => setPuertoSalida(e.target.value)}
                  type="text"
                  className="fbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
  
              <div className="mt-3">
                <label
                  htmlFor="currentPassword"
                  className="text-sm font-medium text-gray-700 block mb-2"
                >
                  Fuentes
                </label>
                <div className="flex">
                  <input
                    value={fuenteSalida}
                    onChange={(e) => setFuenteSalida(e.target.value)}
                    type="text"
                    className="fbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <button
                    onClick={addFuentesSalida}
                    className="border w-10 rounded-md text-green-500 border-green-500 ml-2"
                  >
                    +
                  </button>
                </div>
              </div>
  
              <div className="mt-6">
                {fuentesSalida.map((data, index) => (
                  <div key={index}>
                    <div className="flex align-middle flex-row justify-between">
                      <div className="p-2">
                        <p className="text-md text-blac">{data}</p>
                      </div>
                      <button
                        onClick={() => deleteFuentesDalida(data)}
                        className="border w-10 rounded-md text-red-500 border-red-500"
                      >
                        X
                      </button>
                    </div>
                    <hr className="mt-2 mb-2" />
                  </div>
                ))}
              </div>
  
              <button
                onClick={addTableFuenteSalida}
                className="p-2 mt-6 border rounded-md w-full text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
              >
                Agregar
              </button>
            </div>
  
            <div className="mt-4 ml-4 border p-5 rounded-sm bg-white shadow w-full">
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
                    <th scope="col" className="relative py-3.5 px-4">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
  
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                  {dataTablaSalida?.length !== undefined ? (
                    dataTablaSalida?.map((data, indice) => (
                      <tr key={indice}>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          <div>
                            <h2 className="font-medium text-gray-500">
                              {data.protocol}
                            </h2>
                          </div>
                        </td>
                        <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                          <h2 className="font-medium text-gray-500">
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
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <button
                            onClick={() => deleteTableFuenteSalida(data.id)}
                            className="px-1 py-1 text-red-500 transition-colors duration-200 rounded-lg dark:text-red-400 hover:bg-red-200"
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center">
                        <h2>Agregar Parametros de entrada</h2>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
  
        <hr className="mt-6" />
  
        <button
          disabled={false}
          onClick={saveFirewall}
          className="mt-6 mb-6 p-3 w-full rounded-md border text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
        >
          Crear Firewall
        </button>
      </div>
    );
}