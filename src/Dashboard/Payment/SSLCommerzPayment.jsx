import { useState } from "react";
import axios from "axios";
import { FaMoneyBillWave } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid"; 

const SSLCommerzPayment = ({ camp }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  // const navigate = useNavigate()

  // const fees = camp?.campFees ? parseFloat(camp.campFees) : 0;
  // const transactionId = uuidv4(); 

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    const paymentData = {
      email: user?.email,
      // price: fees,
      date: new Date(),
      // transactionId: transactionId,
      campId: camp?._id || "Unknown",
      feedback: false,
      confirmationStatus: "Pending",
      paymentStatus: "Paid",
    };
    console.log(paymentData);
    const res = await axios.post("http://localhost:5000/payment",paymentData);
    // window.location.replace(res.data.url)
    if (res.data.url) {
      window.location.href = res.data.url; 
    } else {
      setError("Payment URL not received");
    }
    // console.log(res)
    setLoading(false)

  
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-4">
      <div className="bg-white border-2 border-gray-700 shadow-md rounded-lg p-6 text-center">
        <FaMoneyBillWave className="text-green-500 text-4xl mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">SSLCommerz Payment</h2>
        <p className="text-gray-600 mb-4">
          Click the button below to proceed with payment.
        </p>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <div className="flex justify-center"> 
        <button
          onClick={handlePayment}
          className="bg-gradient-to-r from-teal-500 to-green-400 text-white font-bold py-2 px-4 rounded flex items-center"
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
        </div>
      </div>
    </div>
  );
};

export default SSLCommerzPayment;
