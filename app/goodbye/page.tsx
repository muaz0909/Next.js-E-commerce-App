import OrderPlaced from 'components/thankyou';

export const runtime = 'edge';

export default async function GoodBye() {
    return (
        <OrderPlaced />
    );
}
