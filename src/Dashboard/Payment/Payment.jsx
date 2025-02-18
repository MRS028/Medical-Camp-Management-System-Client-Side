import { useState } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import SSLCommerzPayment from "./SSLCommerzPayment";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
  const location = useLocation();
  const { camp } = location?.state || {};
  const [paymentMethod, setPaymentMethod] = useState(null);

  return (
    <div className="my-12">
      <SectionTitle
        heading={"Payment"}
        subHeading={"Please Pay To Join In Camp"}
      />
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setPaymentMethod("sslcommerz")}
            className={`py-2 px-4 rounded ${paymentMethod === "sslcommerz" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            SSLCommerz
          </button>
          <button
            onClick={() => setPaymentMethod("stripe")}
            className={`py-2 px-4 rounded ${paymentMethod === "stripe" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Stripe
          </button>
        </div>
        {paymentMethod === "stripe" && (
          <Elements stripe={stripePromise}>
            <CheckOutForm camp={camp} />
          </Elements>
        )}
        {paymentMethod === "sslcommerz" && (
         <SSLCommerzPayment camp={camp}/>
        )}
      </div>
    </div>
  );
};

export default Payment;
