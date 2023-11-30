import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { getAllProducts } from 'lib/commerce';
import { Product } from 'lib/commerce/types';

export const runtime = 'edge';

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.',
};

export default async function SearchPage({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { q: searchValue } = searchParams as { [key: string]: string };

  const products = await getAllProducts();
  const resultsText = products?.body.length > 1 ? 'results' : 'result';

  const filteredProducts = products?.body.filter((product: Product) => {
    const lowercaseSearchValue = searchValue?.toLowerCase();
    if (!lowercaseSearchValue) {
      return true;
    }
    return product.title.toLowerCase().includes(lowercaseSearchValue);
  });

  return (
    <>
      <p className="mb-4">
        {filteredProducts?.length === 0
          ? 'There are no products that match '
          : searchValue ? `Showing ${filteredProducts?.length} ${resultsText} for ` : ``}
        {searchValue && <span className="font-bold">&quot;{searchValue}&quot;</span>}
      </p>

      {filteredProducts?.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <ProductGridItems products={filteredProducts} />
        </Grid>
      ) : null}
    </>
  );
}
