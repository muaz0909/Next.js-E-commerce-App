import { getCart } from 'lib/commerce';
import { cookies } from 'next/headers';
import CartModal from './modal';

export default async function Cart() {
  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId) || undefined;
  }

  return <CartModal cart={cart} />;
}
