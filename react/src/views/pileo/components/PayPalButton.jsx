import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import axiosClient from "../../../axios-client";

export const PayPalButton = ({ orderId, amount }) => {
    const rountedAmount = Math.round(amount * 100) / 100;

    const createOrder = async ( data,  actions ) => {
        const transactionId = await actions.order.create({
          purchase_units: [
            {
              invoice_id: orderId,
              amount: {
                value: `${rountedAmount.toString()}`,
                // value: "100.00",
              },
            },
          ],
        });
    
        // console.log({ transactionId });

        // axiosClient.put(`/order/${orderId}`, {
        //     medio: 'paypal',
        //     transactionId
        // }).then(({data}) => {
        //     console.log(data)
        // })
    
        // const { ok } = await setTransactionId(orderId, transactionId);
    
        // if (!ok) {
        //   throw new Error("No se pudo actualizar la orden");
        // }
    
        return transactionId;
      };

      const onApprove = async (data, actions) => {
        console.log("onApprove");
        const details = await actions.order?.capture();
    
        if (!details) return;
    
        // await paypalCheckPayment(details.id);

        console.log(details);
      };

  return (
    <div className="relative z-0">
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </div>
  )
}
