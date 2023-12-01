'use server';

import { addItemToCart as addToCart, createCart, getCart, removeItemFromCart, updateCartItem } from 'lib/commerce';
import { cookies } from 'next/headers';

export async function addItem(productId: number | undefined) {
  let cartId: string | undefined = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cartId || !cart) {
    cart = await createCart();
    cartId = cart.cartId;
  }

  if (!productId) {
    return 'Missing product ID';
  }

  try {
    await addToCart(cartId, productId.toString(), 1);
  } catch (e) {
    return 'Error adding item to cart';
  }
}

export async function removeItem(productId: string) {
  const cartId = cookies().get('cartId')?.value;
  if (!cartId) {
    return 'Missing cart ID';
  }
  try {
    await removeItemFromCart(cartId, productId);
  } catch (e) {
    return 'Error removing item from cart';
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    productId: string;
    quantity: number;
  }
) {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }

  const { productId, quantity } = payload;

  try {
    if (quantity === 0) {
      await removeItemFromCart(cartId, productId);
      return;
    }

    await updateCartItem(cartId, productId, quantity);
  } catch (e) {
    return 'Error updating item quantity';
  }
}

export async function clearCart() {
  try {
    cookies().delete('cartId');
  } catch (error) {
    throw error;
  }
}