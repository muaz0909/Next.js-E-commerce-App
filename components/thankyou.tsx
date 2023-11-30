'use client'
import Link from 'next/link';
import React, { useEffect } from 'react';
import { clearCart } from './cart/actions';

const OrderPlaced: React.FC = () => {
    const handleClearCart = async () => {
        await clearCart();
    }
    useEffect(() => {
        handleClearCart();
    }, []);
    return (
        <>
            <div className="flex items-center justify-center py-5">
                <div className="max-w-md p-8 bg-white shadow-lg rounded-md my-5 py-5">
                    <h1 className="text-2xl font-bold mb-4">Order Placed!</h1>
                    <p className="text-gray-600">
                        Thank you for your order. Your items will be on their way soon.
                    </p>
                    <Link href="/">
                        <button className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600">
                            Back to Home
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default OrderPlaced;
