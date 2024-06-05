import React, { useEffect, useState } from 'react';
import axiosClient from '../../../axios-client';
import * as echarts from "echarts";
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { IoTerminal } from 'react-icons/io5';

export const Graficos = ({ id, }) => {

  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [loading3, setLoading3] = useState(false)

  useEffect(() => {
    getCPU()
    getBandwidth()
    getGraficMemory()
  }, [])
  
  const chartCpu = ( title, legend, date, mapGrafic, yAxis ) => {
    return {
      title: {
        text: title,
        left: "center",
        top: "center",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: legend,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: date,
      },
      yAxis: yAxis,
      dataZoom: [
        {
          type: "inside",
          start: 100,
          end: 80,
        },
        {
          start: 100,
          end: 80,
        },
      ],
      series: mapGrafic,
    };
  };

  const getCPU = () => {
    setLoading(true)
    axiosClient.get(`/get-cpu/${id}`).then(({ data }) => {
      initialChats(data)
    })
  }

  const getBandwidth = () => {
    setLoading2(true)
    axiosClient.get(`/get-bandwidth/${id}`).then(({ data }) => {
      initialChats2(data)
    })
  }

  const getGraficMemory = () => {
    setLoading3(true)
    axiosClient.get(`/get-memory/${id}`).then(({ data }) => {
      console.log(data)
      initialChats3(data)
    })
  }

  const initialChats = ( data ) => {
    const chartCpus = echarts.init(document.getElementById("chart-cpu"));
    let NameCpu = "";
    let Cpu = [];
    let TimesCpu = [];
    let mapCpu = [];

    if (!data) {
      NameCpu = "Gráficas CPU sin datos";
      Cpu = ["Si uso"];
      TimesCpu = ["0"];
      mapCpu = ["", "", "", [0]];
    } else {
      NameCpu = "Gráficas CPU";
      Cpu = data.mapGrafic.map((title) => title.name);
      TimesCpu = data.timestamps;
      mapCpu = data.mapGrafic;
    }

    setTimeout(() => {
      setLoading(false)
      chartCpus.setOption(
        chartCpu(NameCpu, Cpu, TimesCpu, mapCpu, {
          type: "value",
        })
      );

    }, 1000);

  }

  const initialChats2 = ( data ) => {
    const chartBandwidth = echarts.init(document.getElementById("chart-bandwidth"));
    let Name = "";
    let Bandwidth = [];
    let Times = [];
    let map = [];

    if (!data) {
      Name = "Gráficas Bandwidth sin datos";
      Cpu = ["Si uso"];
      Times = ["0"];
      map = ["", "", "", [0]];
    } else {
      Name = "Gráficas Bandwidth";
      Bandwidth = data.dataResult.map((title) => title.name);
      Times = data.timestamps;
      map = data.dataResult;
    }

    setTimeout(() => {
      setLoading2(false)
      chartBandwidth.setOption(
        chartCpu(Name, Bandwidth, Times, map, {
          type: "value",
        })
      );

    }, 1000);

  }

  const initialChats3 = ( data ) => {
    const chartBandwidth = echarts.init(document.getElementById("chart-memory"));
    let Name = "";
    let Times = [];
    let map = [];

    if (!data) {
      Name = "Gráficas Memoria sin datos";
      Times = ["0"];
      map = ["", "", "", [0]];
    } else {
      Name = "Gráficas Memoria";
      Times = data.timestamps;
      map = data.dataResult;
    }

    setTimeout(() => {
      setLoading3(false)
      chartBandwidth.setOption(
        chartCpu(Name, ["memoria"], Times, map, {
          type: "value",
          axisLabel: {
            formatter: "{value} %",
          },
        })
      );
    }, 1000);

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
                Gráficas
            </div>

            <span onClick={() => openTerminal()} className="ml-auto flex">
                <span className="bg-gray-500 py-1 px-2 w-28 rounded text-white text-sm cursor-pointer flex">
                    <IoTerminal  className='rounded bg-gray-500 text-white w-6 h-6 p-1' /> <span>Consola</span>
                </span>
            </span>
        </div>

        <div className="w-full px-5 py-3 max-h-screen overflow-y-auto">

          <div className=" mt-6 border rounded-sm">
            {
              loading && 
              (
                <LoadingSpinner />
              )
            }
              <div id="chart-cpu" name="chart-cpu" className="w-full min-h-[400px]"></div>
          </div>

          <div className=" mt-6 border rounded-sm">
                {
                  loading2 && 
                  (
                    <LoadingSpinner />
                  )
                }
              <div id="chart-bandwidth" className="w-full min-h-[400px]"> </div>
            </div>

            <div className=" mt-6 border rounded-sm">
                {
                  loading3 && 
                  (
                    <LoadingSpinner />
                  )
                }
              <div id="chart-memory" className="w-full min-h-[400px]"> </div>
            </div>

        </div>

    </>
  )
}
