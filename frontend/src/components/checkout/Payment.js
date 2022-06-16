import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Payment.css";
import { PayPalButton } from "react-paypal-button-v2";

const Payment = () => {
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: msg } = await axios.get("/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${msg}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    addPayPalScript();

    if (!window.paypal) {
      addPayPalScript();
      setSdkReady(true);
    }
  }, []);
  return (
    <div className="paymentContainer">
      {sdkReady && (
        <PayPalButton
          amount="0.01"
          // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
          style={{
            outerWidth: "100%",
            innerWidth: "100%",
          }}
          onSuccess={(details, data) => {
            console.log(details);
            console.log(data);

            // OPTIONAL: Call your server to save the transaction
            // return fetch("/paypal-transaction-complete", {
            //   method: "post",
            //   body: JSON.stringify({
            //     orderID: data.orderID
            //   })
            // });
          }}
        />
      )}
    </div>
  );
};

export default Payment;
