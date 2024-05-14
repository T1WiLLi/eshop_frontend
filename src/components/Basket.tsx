import { useBasket } from "../context/BasketContext";
import { Product } from "../interface/product";
import "../styles/components/basket.css";
interface ProductBasketProps {
    product: Product;
    amountOfProduct: number;
    onIncrement: (productId: number) => void;
    onDecrement: (productId: number) => void;
    onRemove: (productId: number) => void;
}

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
                <div className="basket-subtotal d-flex align-items-center justify-content-between font-weight-bold mx-1">
                    <p>Subtotal:</p>
                    <p>
                        {calculateSubtotal().toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </p>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                    <button type="button" className="btn btn-primary" onClick={handleCheckout}>Checkout</button>
                </div>
            </div>
        </div>
    );
}

// Create an item template that will be mapped to the basket-items

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
            <div className="product-details-container">
                <div className="product-details-header d-flex justify-content-between align-items-center">
                    <h1>{product.title}</h1>
                    <div className="details-extra d-flex align-items-center gap-1">
                        <p className="category-text">{product.category}</p>
                        <div className="product-actions">
                            <button aria-label="Remove" type="button" onClick={() => onRemove(product.id)}><i className="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                </div>

                <div className="product-details-footer d-flex justify-content-between align-items-center">
                    <div className="product-amount d-flex align-items-center">
                        <button onClick={() => onDecrement(product.id)} disabled={amountOfProduct === 1}>-</button>
                        <span>{amountOfProduct}</span>
                        <button onClick={() => onIncrement(product.id)}>+</button>
                    </div>

                    <div className="product-price">
                        <p>{`${(product.price * amountOfProduct).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Basket;