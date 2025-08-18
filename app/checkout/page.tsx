"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { checkoutAction } from "./checkout-action";
import Image from "next/image";

export default function CheckoutPage() {
    const { items, removeItem, addItem } = useCartStore();
    const total = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    // Helper function to format Naira currency
    const formatNaira = (amount: number) => {
        return `₦${(amount / 100).toLocaleString('en-NG', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    };

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <Image
                    src="/cart.svg"
                    alt="Empty cart"
                    width={250}
                    height={250}
                    className="mx-auto mb-4"
                />
                <h1 className="text-black  text-3xl font-bold mb-4">Your Cart is Empty!</h1>
            </div>
        );
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-black">Checkout</h1>
            <Card className="max-w-md mx-auto mb-8">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-center">
                        <span className="text-yellow-500 mr-2">Order</span>
                        <span className="text-blue-500">Summary</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {items.map((item) => (
                            <li key={item.id} className="flex flex-col gap-2 border-b pb-2">
                                <div className="flex justify-between">
                                    <span className="font-medium">{item.name}</span>
                                    <span className="font-semibold">
                                        {formatNaira(item.price * item.quantity)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="default"
                                        size="sm"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        –
                                    </Button>
                                    <span className="text-lg font-semibold">{item.quantity}</span>
                                    <Button
                                        variant="default"
                                        size="sm"
                                        onClick={() => addItem({ ...item, quantity: 1 })}
                                    >
                                        +
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 border-t pt-2 text-xl font-bold text-center">
                        Total: {formatNaira(total)}
                    </div>
                </CardContent>
            </Card>
            <form action={checkoutAction} className="max-w-md mx-auto">
                <input type="hidden" name="items" value={JSON.stringify(items)} />
                <Button type="submit" variant="default" className="w-full">
                    Proceed to Payment
                </Button>
            </form>
        </div>
    );
}