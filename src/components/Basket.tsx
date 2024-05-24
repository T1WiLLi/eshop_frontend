import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useBasket } from "../context/BasketContext";
import { Product } from "../interface/product";
import "../styles/components/basket.css";
/**
 * Represents a product displayed in the basket.
 */
interface ProductBasketProps {
    /**
     * The product to be displayed.
     */
    product: Product;
    /**
     * The quantity of the product in the basket.
     */
    amountOfProduct: number;
    /**
     * Function to handle incrementing the quantity of the product.
     * 
     * @param productId - The ID of the product.
     */
    onIncrement: (productId: number) => void;
    /**
     * Function to handle decrementing the quantity of the product.
     * 
     * @param productId - The ID of the product.
     */
    onDecrement: (productId: number) => void;
    /**
     * Function to handle removing the product from the basket.
     * 
     * @param productId - The ID of the product.
     */
    onRemove: (productId: number) => void;
}

/**
 * Represents the shopping basket.
 */
function Basket() {
    const { products, handleIncrement, handleDecrement, handleRemove, calculateSubtotal, handleCheckout } = useBasket();

    //TODO: Fixe the cart click 
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <div className="basket-container position-relative d-inline-block" onClick={handleClick}>
            <div className="basket-icon position-relative">
                <i className="fas fa-shopping-basket"></i>
            </div>
            <div className="basket-items position-absolute bg-light text-dark border rounded border-secondary shadow pb-1">
                <div className="d-flex align-items-center justify-content-between mx-1">
                    <h2 className="basket-title">Basket</h2>
                </div>
                <hr />

                <div className="product-holder">
                    {products.map(({ product, amount }) => (
                        <ProductBasket
                            key={product.id}
                            product={product}
                            amountOfProduct={amount}
                            onIncrement={handleIncrement}
                            onDecrement={handleDecrement}
                            onRemove={handleRemove}
                        />
                    ))}
                </div>

                <hr />
                <div className="basket-subtotal d-flex align-items-center justify-content-between font-weight-bold mx-1 mt-2">
                    <p>Subtotal:</p>
                    <p>
                        {calculateSubtotal().toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </p>
                </div>
                <div className="px-2" onClick={(e) => e.stopPropagation()}>
                    <button type="button" className="btn btn-primary w-100" onClick={handleCheckout}>Checkout</button>
                </div>
            </div>
        </div>
    );
}

// Create an item template that will be mapped to the basket-items

/**
 * Represents a product displayed in the basket.
 */
const ProductBasket: React.FC<ProductBasketProps> = ({
    product,
    amountOfProduct,
    onIncrement,
    onDecrement,
    onRemove,
}) => {

    return (
        <div className="product-basket d-flex flex-wrap m-1">
            <div className="product-image-container">
                <img src={product.thumbnail} alt={product.title} />
            </div>
            <div className="product-details-container d-flex flex-column gap-1">
                <div className="product-details-header d-flex flex-column">
                    <h1>{product.title}</h1>
                    <div className="details-extra d-flex align-items-center justify-content-between">
                        <p className="category-text m-0">{product.category}</p>
                        <div className="product-actions">
                            <OverlayTrigger
                                key="remove-tooltip"
                                placement="top"
                                overlay={<Tooltip id={`tooltip-remove`}>Remove</Tooltip>}>
                                <button aria-label="Remove" type="button" onClick={() => onRemove(product.id)}><i className="fa-solid fa-trash p-0"></i></button>
                            </OverlayTrigger>
                        </div>
                    </div>
                </div>

                <div className="product-details-footer d-flex justify-content-between align-items-center">
                    <div className="product-amount d-flex align-items-center">
                        <OverlayTrigger
                            key="decrement-tooltip"
                            placement="top"
                            overlay={<Tooltip id={`tooltip-decrement`}>Decrement</Tooltip>}>
                            <button onClick={() => onDecrement(product.id)} disabled={amountOfProduct === 1}>-</button>
                        </OverlayTrigger>

                        <span>{amountOfProduct}</span>

                        <OverlayTrigger
                            key="increment-tooltip"
                            placement="top"
                            overlay={<Tooltip id={`tooltip-increment`}>Increment</Tooltip>}>
                            <button onClick={() => onIncrement(product.id)}>+</button>
                        </OverlayTrigger>
                    </div>

                    <div className="product-price">
                        <p className="m-0">{`${(product.price * amountOfProduct).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Basket;