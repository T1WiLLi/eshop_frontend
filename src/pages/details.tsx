import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Fetcher } from "../api/fetch";
import { Product } from "../interface/product";
import { Container, Row, Col, Image, Button, Carousel } from "react-bootstrap";
import { useBasket } from "../context/BasketContext";
import "../styles/pages/details.css";
import { Category } from "../lib/Category";

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
                const fetcher = Fetcher.getInstance();
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
    };

    const renderStars = (rating: number) => {
        const stars = [];
        const roundedRating = Math.floor(rating);

        for (let i = 0; i < 5; i++) {
            if (i < roundedRating) {
                stars.push(
                    <i key={i} className="fa-solid fa-star" style={{ color: "#FFD43B" }}></i>
                );
            } else {
                stars.push(
                    <i key={i} className="fa-regular fa-star" style={{ color: "#FFD43B" }}></i>
                );
            }
        }
        return stars;
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="product-detail-page">
            <Row className="d-flex align-items-stretch">
                <Col md={6} className="d-flex flex-column">
                    <div className="image-container flex-fill">
                        <Image src={product.thumbnail} fluid />
                    </div>
                </Col>
                <Col md={6} className="d-flex flex-column justify-content-between">
                    <div>
                        <h1>{product.title}</h1>
                        <p className="price">${product.price}</p>
                        <hr />
                        <h4>Product Details</h4>
                        <ul>
                            <li>
                                <strong>Brand:</strong> {product.brand}
                            </li>
                            <li>
                                <strong>Category:</strong> {Category.getIcon(product.category)}
                            </li>
                            <li>
                                <strong>Description:</strong> {product.description}
                            </li>
                            <li>
                                <strong>Rating:</strong> {renderStars(product.rating)}
                            </li>
                            <li>
                                <strong>Stock:</strong> {product.stock} units available
                            </li>
                        </ul>
                    </div>
                    <div className="product-detail-actions">
                        <Button onClick={handleBuyNow} variant="primary" className="me-2">
                            Buy Now
                        </Button>
                        <Button onClick={() => addToBasket(product)} variant="success">
                            Add to Cart
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h5>Product Images</h5>
                    {product.images.length > 1 ? (
                        <Carousel fade={true} variant="dark">
                            {product.images.slice(0, -1).map((image, index) => (
                                <Carousel.Item key={index}>
                                    <Image src={image} className="carousel-image" fluid />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    ) : (
                        <p>No images available.</p>
                    )}
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h5>Customer Reviews</h5>
                    {product.reviews.length > 0 ? (
                        product.reviews.map((review, index) => (
                            <div key={index} className="review-item mb-4">
                                <div className="d-flex align-items-center">
                                    <div className="me-2">
                                        {renderStars(review.rating)}
                                    </div>
                                    <div className="fw-bold">{review.reviewerName}</div>
                                </div>
                                <p>{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p>No reviews available.</p>
                    )}
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h5>Returns Policy</h5>
                    <p>{product.returnPolicy}</p>
                </Col>
                <Col>
                    <h5>Warranty Information</h5>
                    <p>{product.warrantyInformation}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default Detail;