import React from 'react'
import ReactDOM from 'react-dom/client'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ContextProvider } from './contexts/ContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
      <PayPalScriptProvider options={{ 'clientId': import.meta.env.VITE_APP_PAYPAL_ID}}>
        <ContextProvider>
          < RouterProvider router={router} />
        </ContextProvider>
      </PayPalScriptProvider>
  // </React.StrictMode>
)
