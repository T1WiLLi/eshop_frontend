import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Fetcher } from "../api/fetch";
import { Product } from "../interface/product";
import "../styles/components/details.css";
import { useBasket } from "../context/BasketContext";

const Detail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const productString = searchParams.get("product");

    const { addToBasket } = useBasket();

    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetcher = new Fetcher();
                if (productString) {
                    const productId = parseInt(productString, 10);
                    if (!isNaN(productId)) {
                        const productData = await fetcher.fetchProductFromId(productId);
                        setProduct(productData);
                    } else {
                        setError("Invalid product ID provided in the URL.");
                    }
                } else {
                    setError("No product ID provided in the URL.");
                }
            } catch (error: any) {
                setError(`Error fetching product data: ${error.message}`);
            }
        };

        fetchProduct();
    }, [productString]);

    const handleBuyNow = () => {
        navigate("/checkout", { state: { product } });
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-detail-page">
            <div className="product-detail-header">
                <img src={product.thumbnail} alt={product.title} />
                <h1>{product.title}</h1>
                <p className="price">${product.price}</p>
            </div>
            <div className="product-detail-information">
                <h2>Product Details</h2>
                <ul>
                    <li>
                        <span className="product-detail-key">Brand:</span>
                        {product.brand}
                    </li>
                    <li>
                        <span className="product-detail-key">Category:</span>
                        {product.category}
                    </li>
                    <li>
                        <span className="product-detail-key">Description:</span>
                        {product.description}
                    </li>
                    <li>
                        <span className="product-detail-key">Rating:</span>
                        {product.rating} / 5 stars
                    </li>
                    <li>
                        <span className="product-detail-key">Stock:</span>
                        {product.stock} units available
                    </li>
                </ul>
            </div>
            <div className="product-detail-images">
                <h2>Product Images</h2>
                <ul>
                    {product.images.map((image, index) => (
                        <li key={index}>
                            <img src={image} alt={product.title} />
                        </li>
                    ))}
                </ul>
            </div>
            <div className="product-detail-actions">
                <button onClick={handleBuyNow} className="buy-button">Buy Now</button>
                <button onClick={() => addToBasket(product)} className="add-to-cart-button">Add to Cart</button>
            </div>
        </div>
    );
};

export default Detail;