import React from "react";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
  const location = useLocation();
  const { camp } = location?.state || {};
//   console.log(camp);
  return (
    <div className="my-12">
      <SectionTitle
        heading={"Payment"}
        subHeading={"Please Pay To Join In Camp"}
      ></SectionTitle>
      <div>
        <Elements stripe={stripePromise}>
          <CheckOutForm camp={camp}/>{" "}
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
