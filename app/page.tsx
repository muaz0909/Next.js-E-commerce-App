import Grid from 'components/grid';
import Footer from 'components/layout/footer';
import ProductGridItems from 'components/layout/product-grid-items';
import { getAllProducts } from 'lib/commerce';
import { Suspense } from 'react';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  const products = await getAllProducts();
  return (
    <>
      <Suspense>
        {products?.body.length > 0 ? (
          <Grid className="mx-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <ProductGridItems products={products?.body} />
          </Grid>
        ) : null}
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
