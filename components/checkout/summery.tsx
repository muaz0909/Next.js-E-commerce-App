'use client'
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Price from 'components/price';
import { CommerceCart } from 'lib/commerce/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface CheckoutSummeryProps {
    cart: CommerceCart | null;
}

const CheckoutSummery: React.FC<CheckoutSummeryProps> = ({ cart }) => {
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let totalAmount = 0;
        cart?.items.forEach(element => {
            totalAmount += element.productPrice * element.quantity;
        });
        setTotalPrice(totalAmount);
    }, [cart]);
    return (
        <div className='mx-3 mt-3 px-3' style={formStyles}>
            {!cart || cart.items.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                    <ShoppingCartIcon className="h-16" />
                    <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
                </div>
            ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                    <ul className="flex-grow overflow-auto py-4">
                        {cart.items.map((item, i) => {
                            return (
                                <li
                                    key={i}
                                    className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                                >
                                    <div className="relative flex w-full flex-row justify-between px-1 py-4">
                                        <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                                            <Image
                                                className="h-full w-full object-cover"
                                                width={64}
                                                height={64}
                                                alt={
                                                    item.productTitle
                                                }
                                                src={item.productImage}
                                            />
                                        </div>

                                        <div className="ms-2 flex flex-1 flex-col text-base">
                                            <span className="leading-tight">
                                                {item.productTitle}
                                            </span>
                                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                                {item.productTitle}
                                            </p>
                                        </div>
                                        <div className="flex h-16 flex-col justify-between">
                                            <Price
                                                className="flex justify-end space-y-2 text-right text-sm"
                                                amount={item.productPrice.toString()}
                                                currencyCode='USD'
                                            />
                                            <div className="mb-3 flex items-center justify-between">
                                                <span style={mainLableStyle}>1 x {item.quantity} = {item.quantity * item.productPrice}</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
                        <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                            <p>Total</p>
                            <Price
                                className="text-right text-base text-black dark:text-white"
                                amount={totalPrice.toString()}
                                currencyCode="USD"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const formStyles: React.CSSProperties = {
    maxWidth: '100%',
    margin: '10 auto',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const mainLableStyle: React.CSSProperties = {
    fontSize: '14px',
    color: 'gray'
}

export default CheckoutSummery;
