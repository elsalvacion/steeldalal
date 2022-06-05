import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Payment.css";

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

    if (!window.paypal) {
      addPayPalScript();
      setSdkReady(true);
    }
  }, []);
  return <div>Payment</div>;
};

export default Payment;
