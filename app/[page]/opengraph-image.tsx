import OpengraphImage from 'components/opengraph-image';

export const runtime = 'edge';

export default async function Image({ params }: { params: { page: string } }) {
  const title = params.toString() || 'Ecommerce';
  return await OpengraphImage({ title });
}
