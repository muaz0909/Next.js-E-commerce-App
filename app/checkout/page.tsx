import Checkout from 'components/checkout';
import { getCart } from 'lib/commerce';
import { cookies } from 'next/headers';

export const runtime = 'edge';

export default async function CheckoutPage() {
    return (
        <Checkout/>
    );
}
