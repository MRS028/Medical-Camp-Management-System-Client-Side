import React from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid'; // Importing an icon from Heroicons

const PaymentSuccess = () => {
    const { trxnId } = useParams();

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
                <p className="text-gray-600 mb-6">
                    Your transaction ID: <span className="font-semibold text-gray-800">{trxnId}</span>
                </p>
                <p className="text-gray-600 mb-6">
                    Thank you for your payment. Your transaction has been completed successfully.
                </p>
                <button
                    onClick={() => window.location.href = '/'}
                    className="w-full bg-gradient-to-r  from-teal-500 to-green-400  text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Return to Home
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;