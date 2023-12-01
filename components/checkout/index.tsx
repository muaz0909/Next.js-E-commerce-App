"use client"
import Grid from "components/grid";
import Footer from "components/layout/footer";
import { getCart } from "lib/commerce";
import { cookies } from "next/headers";
import React, { useEffect, useState } from "react";
import CheckoutForm from "./form";
import CheckoutSummery from "./summery";
import {CommerceCart} from "../../lib/commerce/types";

const Checkout = () => {
    const [cart, setCart] = useState<CommerceCart | null>(null);

    useEffect(() => {
        const fetchCart = async () => {
            const cartId = cookies().get('cartId')?.value;
            const fetchedCart = await getCart(cartId || "");
            setCart(fetchedCart);
        };

        fetchCart();
    }, []);

    return (
        <>
            <Grid className="mx-5 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
                <CheckoutForm />
                <CheckoutSummery cart={cart} />
            </Grid>
            <Footer />
        </>
    );
};

export default Checkout;
