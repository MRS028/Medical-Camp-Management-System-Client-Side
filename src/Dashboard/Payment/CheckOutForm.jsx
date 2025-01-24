import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const CheckOutForm = ({ camp }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();

  const fees = camp?.campFees ? parseFloat(camp.campFees) : 0;
//   console.log(camp._id)

  // Fetch client secret
  useEffect(() => {
    if (fees > 0) {
      axiosSecure
        .post("/create-payment-intent", { campFees: fees })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, fees]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements || !clientSecret) {
      setError("Stripe or Elements not loaded properly.");
      setIsProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      setError("Card details not found.");
      setIsProcessing(false);
      return;
    }

    // Create Payment Method
    const { error: paymentError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (paymentError) {
      setError(paymentError.message);
      setIsProcessing(false);
      return;
    }

    // Confirm Payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "Anonymous",
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
      setIsProcessing(false);
      return;
    }

    // Payment Successful
    if (paymentIntent?.status === "succeeded") {
      setError("");
      setIsProcessing(false);
      //sending data to mongodb
      const paymentData = {
        //email: user.email,
        //price: fees,
        date: new Date(),
        transactionId : paymentIntent.id,
        // campId : camp.campId,
        confirmationStatus: 'Pending',
        paymentStatus: 'Paid',
      }
      const res = await axiosSecure.patch(`/join-camp/${camp._id}`, paymentData);
      console.log('payment updated',res.data)

      Swal.fire({
        title: "Payment Successful!",
        html: `
          <p>
            Transaction ID: 
            <strong id="transactionId">${paymentIntent.id}</strong>
            <button 
              id="copyButton" 
              style="background: none; border: none; cursor: pointer;" 
              title="Copy Transaction ID"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 text-blue-500">
             <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15.75v2.25a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25H15.75M8.25 15.75H6a2.25 2.25 0 01-2.25-2.25V6A2.25 2.25 0 016 3.75h7.5a2.25 2.25 0 012.25 2.25v2.25M8.25 15.75l9-9" />
                </svg>

            </button>
          </p>
        `,
        icon: "success",
        confirmButtonText: "OK",
        didRender: () => {
          // Add copy functionality
          const copyButton = document.getElementById("copyButton");
          const transactionIdElement = document.getElementById("transactionId");

          if (copyButton && transactionIdElement) {
            copyButton.addEventListener("click", () => {
              navigator.clipboard
                .writeText(transactionIdElement.textContent)
                .then(() => {
                  Swal.fire({
                    icon: "success",
                    title: "Copied!",
                    text: "Transaction ID copied to clipboard.",
                    timer: 2000,
                    showConfirmButton: false,
                  });
                });
            });
          }
        },
      });
    } else {
      setError("Payment could not be completed.");
      setIsProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-800 text-center">
        Complete Your Payment
      </h2>
      <p className="text-sm text-gray-500 text-center">
        Please enter your card details below to proceed.
      </p>

      <div className="p-4 border rounded-md bg-gray-50">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                fontFamily: "Arial, sans-serif",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>

      <button
        type="submit"
        className={`w-full py-3 px-4 rounded-md text-white font-semibold transition ${
          isProcessing || !stripe
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-teal-500 to-green-400 hover:from-teal-600 hover:to-green-500"
        }`}
        disabled={!stripe || isProcessing || !clientSecret}
      >
        {isProcessing ? (
          <span className="flex items-center justify-center space-x-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"
              ></path>
            </svg>
            <span>Processing...</span>
          </span>
        ) : (
          `Pay Now`
        )}
      </button>
      <p className="text-red-600 text-center">{error}</p>
    </form>
  );
};

export default CheckOutForm;
