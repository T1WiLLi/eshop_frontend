import { Link, useLocation, useNavigate } from "react-router-dom";
import { useBasket } from "../context/BasketContext";
import { useEffect } from "react";
import { Cookie } from "../lib/Cookie";
import NotFound from "./notFound";

function Checkout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { products, addToBasket, handleDecrement, calculateSubtotal } = useBasket();

    const isUserConnected = !!Cookie.getToken();

    useEffect(() => {
        if (location.state && location.state.product) {
            addToBasket(location.state.product);
            handleDecrement(location.state.product.id);
        }
    }, [location]);

    const subtotal = calculateSubtotal();
    const taxRate = 0.08;
    const taxes = subtotal * taxRate;
    const total = subtotal + taxes;

    const handleNavigate = () => {
        navigate("/login");
    };

    if (!isUserConnected) {
        return (
            <div className="d-flex flex-column align-items-center">
                <NotFound statusCode={401} message="You need to connect in order to access this page" />
                <a onClick={handleNavigate} style={{ color: "blue", cursor: "pointer", fontSize: "3em", textDecoration: "underline" }}>LOGIN</a>
            </div>
        );
    };

    return (
        <div>
            <h2>Checkout</h2>
            {products.length > 0 ? (
                <>
                    <ul>
                        {products.map((item) => (
                            <li key={item.product.id}>
                                {item.product.title} - Quantity: {item.amount} - Price: ${(item.product.price * item.amount).toFixed(2)}
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

export default Checkout;