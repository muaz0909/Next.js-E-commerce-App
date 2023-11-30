'use client';
import { PlusIcon } from '@heroicons/react/24/outline';
import { addItem } from 'components/cart/actions';
import { Product } from 'lib/commerce/types';

interface AddToCartProps {
  product: Product;
}

export function AddToCart({ product }: AddToCartProps) {
  const addToCartHandler = () => {
    const cartItem = {
      id: product.id,
      title: product.title,
      image: product.image,
      quantity: 1,
    };
    addItem(product.id);
  };

  return (
    <button
      onClick={addToCartHandler}
      className="relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white"
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      Add To Cart
    </button>
  );
}
