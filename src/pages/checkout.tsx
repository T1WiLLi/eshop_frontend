import { Link, useLocation } from "react-router-dom";
import { useBasket } from "../context/BasketContext";
import { useEffect } from "react";

function checkout() {
    const location = useLocation();
    const { products, addToBasket, handleDecrement, calculateSubtotal } = useBasket();

    useEffect(() => {
        if (location.state && location.state.product) {
            addToBasket(location.state.product);
            handleDecrement(location.state.product.id); // C'est pomal barouette, mais la jtanne
        }
    }, []);

    const subtotal = calculateSubtotal();
    const taxRate = 0.08;
    const taxes = subtotal * taxRate;
    const total = subtotal + taxes;

    return (
        <div>
            <h2>Checkout</h2>
            {products.length > 0 ? (
                <>
                    <ul>
                        {products.map((item) => (
                            <li key={item.product.id}>
                                {item.product.title} - Quantity: {item.amount} - Price: $
                                {(item.product.price * item.amount).toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    <div>
                        <p>Subtotal: ${subtotal.toFixed(2)}</p>
                        <p>Taxes: ${taxes.toFixed(2)}</p>
                        <p>Total: ${total.toFixed(2)}</p>
                    </div>
                </>
            ) : (
                <p>Your basket is empty.</p>
            )}
            <Link to="/">Go to Home</Link>
        </div>
    );
}

export default checkout;