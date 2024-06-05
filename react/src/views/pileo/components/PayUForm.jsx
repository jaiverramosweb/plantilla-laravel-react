import React, { useEffect, useState } from 'react';
import axiosClient from '../../../axios-client';

const PayUForm = ( {  pago, address, document, phone } ) => {

  const  baseURL = import.meta.env.VITE_APP_BASE_URL + '/api'

  // console.log('info producto hijo', producto)
  // console.log('info pago hijo', pago)

  const handleClick = () => {
    const handler = window.ePayco.checkout.configure({
        key: import.meta.env.VITE_APP_KEY_EPAYCO,
        test: true
    });

    const dataPay = {
        name: 'nomber de apgo',
        description: 'nomber de apgo test',
        invoice: 'GJKDI125455',
        currency: "cop",
        amount: pago.toString(),
        tax_base: "0",
        tax: "0",
        tax_ico: "0",
        country: "co",
        lang: "es",

        // Onpage="false" - Standard="true"
        external: "false",

        // Atributos opcionales
        extra1: "extra1",
        extra2: "extra2",
        extra3: "extra3",
        confirmation: baseURL + '/epayco',
        response: import.meta.env.VITE_APP_RESPONSE_EPAYCO,
        // response: `http://localhost:3000/pileo/confirm/${data.id}`,

        // Atributos cliente
        name_billing: 'Jose Salazar',
        address_billing: address,
        type_doc_billing: "cc",
        mobilephone_billing: phone,
        number_doc_billing: document,

        // Atributo deshabilitación método de pago
        // methodsDisable: ["TDC", "PSE", "SP", "CASH", "DP"]
    };
    
    handler.open(dataPay);

  };

  return (   
      <button className="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white" onClick={handleClick}>ePayco</button>    
  );
};

export default PayUForm;