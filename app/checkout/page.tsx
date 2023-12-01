import Checkout from 'components/checkout';
import { getCart } from 'lib/commerce';
import { cookies } from 'next/headers';
import React from 'react'; // Import React

// Assuming CommerceCart is a type/interface representing the cart structure
import type { CommerceCart } from 'lib/commerce/types';

export const runtime = 'edge';

// Define a type for the props expected by the Checkout component
interface CheckoutProps {
    cart: CommerceCart | null;
}

export default async function CheckoutPage() {
    const cartId = cookies().get('cartId')?.value;
    const cart = await getCart(cartId || "");

    return <Checkout cart={cart} />;
}
