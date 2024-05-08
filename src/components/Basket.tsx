import { useEffect, useState } from "react";
import { Product } from "../interface/product";
import "../styles/components/basket.css";
import { Fetcher } from "../api/fetch";

interface ProductBasketProps {
    product: Product;
    amountOfProduct: number;
    onIncrement: (productId: number) => void;
    onDecrement: (productId: number) => void;
    onRemove: (productId: number) => void;
}

function Basket() {
    const [products, setProducts] = useState<{ product: Product; amount: number }[]>([]);

    useEffect(() => {
        const handleClick = async (event: { currentTarget: any; }) => {
            const clickedElement = event.currentTarget;
            const productId = clickedElement.dataset.productId;
            if (productId) {
                try {
                    const product = await new Fetcher().fetchProductFromId(productId);
                    addToBasket(product);
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            }
        };

        const productElements = document.querySelectorAll('[data-product-id]');
        productElements.forEach((element) => {
            element.addEventListener('click', handleClick);
        });

        return () => {
            productElements.forEach((element) => {
                element.removeEventListener('click', handleClick);
            });
        };
    }, []);

    const addToBasket = (product: Product) => {
        setProducts((prevProducts) => {
            const existingProductIndex = prevProducts.findIndex((item) => item.product.id === product.id);

            if (existingProductIndex !== -1) {
                console.log("Product exists!");
                return prevProducts.map((item, index) =>
                    index === existingProductIndex ? { ...item, amount: item.amount + 1 } : item
                );
            } else {
                console.log("Product doesn't exist!");
                return [...prevProducts, { product, amount: 1 }];
            }
        });
    };


    const handleIncrement = (productId: number) => {
        setProducts((prevProducts) =>
            prevProducts.map((item) =>
                item.product.id === productId
                    ? { ...item, amount: item.amount + 1 }
                    : item
            )
        );
    };

    const handleDecrement = (productId: number) => {
        setProducts((prevProducts) =>
            prevProducts.map((item) =>
                item.product.id === productId && item.amount > 1
                    ? { ...item, amount: item.amount - 1 }
                    : item
            )
        );
    };

    const handleRemove = (productId: number) => {
        setProducts((prevProducts) =>
            prevProducts.filter((item) => item.product.id !== productId)
        );
    };

    const calculateSubtotal = () => {
        return products.reduce((acc, item) => acc + item.product.price * item.amount, 0);
    };


    return (
        <div className="basket-container position-relative d-inline-block">
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
                <button className="btn btn-primary mx-1 mb-2">Checkout</button>
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
                            <button onClick={() => onRemove(product.id)}><i className="fa-solid fa-trash"></i></button>
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