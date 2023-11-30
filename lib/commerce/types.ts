
export type Maybe<T> = T | null;

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export type CommerceCart = {
  cartId: string;
  items: CommerceCartItem[];
};

export type CommerceCartItem = {
  productId: string;
  productTitle: string;
  productPrice: number;
  productImage: string;
  quantity: number
};

export type CommerceProduct = {
  id: number;
  title: string;
  price: number;
};


