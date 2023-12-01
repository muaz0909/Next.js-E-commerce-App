import Grid from "components/grid";
import Footer from "components/layout/footer";
import { getCart } from "lib/commerce";
import { cookies } from "next/headers";
import { Suspense } from "react";
import CheckoutForm from "./form";
import CheckoutSummery from "./summery";

export default async function Checkout() {
    const cartId = cookies().get('cartId')?.value;
    const cart = await getCart(cartId || "");
    return (
        <>
            <Grid className="mx-5 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
                <CheckoutForm />
                <CheckoutSummery cart={cart} />
            </Grid>
            <Suspense>
                <Footer />
            </Suspense>
        </>
    )
}