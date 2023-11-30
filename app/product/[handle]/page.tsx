import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { GridTileImage } from 'components/grid/tile';
import Footer from 'components/layout/footer';
import { Gallery } from 'components/product/gallery';
import { ProductDescription } from 'components/product/product-description';
import { getAllProducts, getProduct } from 'lib/commerce';
import { Product } from 'lib/commerce/types';
import Link from 'next/link';
import { Suspense } from 'react';

export const runtime = 'edge';

export async function generateMetadata({
  params
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await getProduct(parseInt(params.handle));

  if (!product) return notFound();

  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(parseInt(params.handle));

  if (!product) return notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.image,
    offers: {
      '@type': 'AggregateOffer',
      availability: '',
      priceCurrency: '',
      highPrice: '',
      lowPrice: ''
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Gallery
              images={
                [
                  {
                    src: product.image,
                    altText: "product image"
                  }
                ]
              }
            />
          </div>

          <div className="basis-full lg:basis-2/6">
            <ProductDescription product={product} />
          </div>
        </div>
        <Suspense>
          <RelatedProducts category={product.category} />
        </Suspense>
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}

async function RelatedProducts({ category }: { category: string }) {
  const allproducts = await getAllProducts();

  if (!allproducts?.body.length) return null;
  const relatedProducts = allproducts.body.filter((product: Product) =>
    product.category === category
  );

  if (!relatedProducts.length) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product: Product) => (
          <li
            key={product.id}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link className="relative h-full w-full" href={`/product/${product.id}`}>
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.price.toString() || '0',
                  currencyCode: 'USD'
                }}
                src={product.image}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}