import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../interface/product';
import { Fetcher } from '../api/fetch';
import { BasketContextValue } from '../interface/Basket';
import { ToastContainer, Toast, ToastBody } from 'react-bootstrap';
import "./css.css";



const BasketContext = createContext<BasketContextValue>({
    products: [],
    addToBasket: () => { },
    handleIncrement: () => { },
    handleDecrement: () => { },
    handleRemove: () => { },
    calculateSubtotal: () => 0,
    handleCheckout: () => { }
});

export const BasketProvider = ({ children }: { children: React.ReactNode }) => {
    const [showToast, setShowToast] = useState(false);
    const [toastDetails, setToastDetails] = useState({ name: '', price: 0, amount: 0 });

    const [products, setProducts] = useState<{ product: Product; amount: number }[]>(() => {
        const storedProducts = localStorage.getItem('basket');
        return storedProducts ? JSON.parse(storedProducts) : [];
    });

    const navigate = useNavigate();

    useEffect(() => {
        const handleClick = async (event: MouseEvent) => {
            const clickedElement = event.target as HTMLElement;
            const productId = clickedElement.dataset.productId;
            if (productId) {
                try {
                    const product = await new Fetcher().fetchProductFromId(parseInt(productId));
                    addToBasket(product);
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('basket', JSON.stringify(products));
    }, [products]);

    const addToBasket = (product: Product) => {
        setProducts((prevProducts) => {
            const existingProductIndex = prevProducts.findIndex((item) => item.product.id === product.id);
            const updatedProducts = existingProductIndex !== -1
                ? prevProducts.map((item, index) => index === existingProductIndex
                    ? { ...item, amount: item.amount + 1 }
                    : item
                )
                : [...prevProducts, { product, amount: 1 }];

            const isNewProduct = existingProductIndex === -1;
            const currentAmount = isNewProduct ? 1 : updatedProducts[existingProductIndex].amount;

            setToastDetails({
                name: product.title,
                price: product.price,
                amount: currentAmount
            });
            setShowToast(true);

            return updatedProducts;
        });
    };


    const handleIncrement = (productId: number) => {
        setProducts((prevProducts) =>
            prevProducts.map((item) =>
                item.product.id === productId ? { ...item, amount: item.amount + 1 } : item
            )
        );
    };

    const handleDecrement = (productId: number) => {
        setProducts((prevProducts) =>
            prevProducts.map((item) =>
                item.product.id === productId && item.amount > 1 ? { ...item, amount: item.amount - 1 } : item
            )
        );
    };

    const handleRemove = (productId: number) => {
        setProducts((prevProducts) => prevProducts.filter((item) => item.product.id !== productId));
    };

    const calculateSubtotal = () => {
        return products.reduce((acc, item) => acc + item.product.price * item.amount, 0);
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const basket = {
        products,
        addToBasket,
        handleIncrement,
        handleDecrement,
        handleRemove,
        calculateSubtotal,
        handleCheckout
    };

    return (
        <BasketContext.Provider value={basket}>
            {children}
            <ToastContainer
                position="bottom-end"
                className="p-3"
                style={{
                    position: 'fixed',
                    bottom: '16px',
                    right: '16px',
                    zIndex: 1080,
                }}>
                <Toast
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    delay={3000}
                    autohide
                    className="custom-toast">
                    <Toast.Header>
                        <strong className="me-auto">Added to Basket</strong>
                    </Toast.Header>
                    <ToastBody className="custom-toast-body">
                        <p>
                            {toastDetails.name} - ${toastDetails.price.toFixed(2)} x {toastDetails.amount}
                        </p>
                    </ToastBody>
                </Toast>
            </ToastContainer>
        </BasketContext.Provider>
    );
};

export const useBasket = () => {
    return useContext(BasketContext);
};