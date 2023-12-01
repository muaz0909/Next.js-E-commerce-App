import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import LogoSquare from 'components/logo-square';
import Link from 'next/link';
import { Suspense } from 'react';
import Search from './search';

export default async function Navbar() {
  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="flex w-full items-center">
        <div className="flex md:w-1/3 sm:w-1/3">
          <Link href="/" className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6">
            <LogoSquare />
          </Link>
        </div>
        <div className="justify-center w-full md:flex md:w-1/3 sm:w-1/3">
          <Search />
        </div>
        <div className="flex justify-end ml-2 md:w-1/3 sm:w-1/3">
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
