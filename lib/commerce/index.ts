import { FAKE_STORE_API_ENDPOINT } from 'lib/constants';
import { cookies } from 'next/headers';
import {
  CommerceCart,
  Product
} from './types';

const endpoint = `${FAKE_STORE_API_ENDPOINT}`;

export async function getAllProducts() {
  try {
    const result = await fetch(endpoint, {
      method: 'GET',
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (error) {
    throw {
      error: error
    };
  }
}

export async function getOneProductPerCategory() {
  try {
    const dataState = await getAllProducts();

    const productsByCategory: Record<string, any> = {};

    dataState.body.forEach((product: any) => {
      if (!productsByCategory[product.category]) {
        productsByCategory[product.category] = product;
      }
    });

    const oneProductPerCategory: any[] = Object.values(productsByCategory);
    return {
      status: dataState.status,
      body: oneProductPerCategory,
    };
  } catch (error) {
    throw {
      error: error,
    };
  }
}

export async function getProduct(handle: number): Promise<Product | undefined> {
  try {
    const allProductsResult = await getAllProducts();
    const allProducts = allProductsResult?.body;

    if (!allProducts || allProducts.length === 0) {
      return undefined;
    }
    const product = allProducts.find((p: Product) => p.id === handle);

    if (!product) {
      return undefined;
    }

    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return undefined;
  }
}

export async function createCart(): Promise<CommerceCart> {
  let cartId = generateRandomCartId();
  const newCart: CommerceCart = {
    cartId: cartId,
    items: [],
  };
  storeCartInSession(newCart, cartId);

  return newCart;
}

function storeCartInSession(cart: CommerceCart, cartId: string): void {
  try {
    const existingCartsRaw = cookies().get('carts');
    const existingCartsString = typeof existingCartsRaw === 'string' ? existingCartsRaw : '{}';

    const existingCarts = JSON.parse(existingCartsString);

    existingCarts[cartId] = existingCarts[cartId] || {};

    existingCarts[cartId].items = cart.items;

    cookies().set('carts', JSON.stringify(existingCarts), { path: '/', maxAge: 3600 * 24 * 30 });
    cookies().set('cartId', cartId, { path: '/', maxAge: 3600 * 24 * 30 });
  } catch (error) {
    throw error;
  }
}

export async function getCart(cartId: string): Promise<CommerceCart | null> {
  try {
    const existingCartsString = cookies().get('carts') || '{}';

    const existingCarts = typeof existingCartsString === 'string'
      ? JSON.parse(existingCartsString)
      : existingCartsString;

    const cartValue = JSON.parse(existingCarts?.value);

    const cartData = cartValue[cartId];
    const cart = cartData && cartData.items !== null ? cartData : { items: [] };

    return { cartId, items: cart.items } || null;
  } catch (error) {
    throw error;
  }
}

export async function addItemToCart(cartId: string, productId: string, quantity: number): Promise<CommerceCart> {
  try {
    const cart = await getCart(cartId);
    if (!cart) {
      throw new Error('Cart not found');
    }
    if (!Array.isArray(cart.items)) {
      cart.items = [];
    }

    const existingItemIndex = cart.items.findIndex(item => item.productId === productId);
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      const product = await getProduct(parseInt(productId));
      cart.items.push({ productId, quantity, productTitle: product?.title || '', productImage: product?.image || '', productPrice: product?.price || 0 });
    }
    cart.items = cart.items;
    storeCartInSession(cart, cartId);

    return cart;
  } catch (error) {
    throw error;
  }
}

export async function updateCartItem(cartId: string, productId: string, quantity: number): Promise<CommerceCart> {
  const cart = await getCart(cartId);
  if (!cart) {
    throw new Error('Cart not found');
  }

  const itemIndex = cart.items.findIndex(item => item.productId === productId);
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity = quantity;
  } else {
    throw new Error('Item not found in cart');
  }

  storeCartInSession(cart, cartId);
  return cart;
}

export async function removeItemFromCart(cartId: string, productId: string): Promise<CommerceCart> {
  try {
    const cart = await getCart(cartId);
    if (!cart) {
      throw new Error('Cart not found');
    }

    const updatedItems = cart.items.filter(item => item.productId !== productId?.item);

    cart.items = updatedItems;
    storeCartInSession(cart, cartId);

    return cart;
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
}


function generateRandomCartId(): string {
  return Math.random().toString(36).substring(7);
}
