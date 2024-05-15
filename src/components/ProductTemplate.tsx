import { Card, Button } from "react-bootstrap";
import { Product } from "../interface/product";
import "../styles/components/productTemplate.css";
import { useNavigate } from "react-router-dom";

interface ProductTemplateProps {
    product: Product;
}

function ProductTemplate({ product }: ProductTemplateProps) {
    const { id, title, description, price, discountPercentage, rating, stock, thumbnail } = product;

    const navigate = useNavigate();

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

    const handleSeeDetailsClick = (productId: number) => {
        navigate(`/eshop/detail?product=${productId}`);
    }

    return (
        <Card className="product-card">
            <div className="product-card-header">
                <div className="discount-badge">-{discountPercentage}%</div>
                <div className="rating-stars">{renderStars(rating)}</div>
            </div>
            <Card.Img variant="top" src={thumbnail} alt={title} />
            <Card.Body>
                <Card.Title>
                    {title.length > 26
                        ? `${title.substring(0, 26)}...`
                        : title}
                </Card.Title>
                <Card.Text>
                    {description.length > 30
                        ? `${description.substring(0, 30)}...`
                        : description}
                </Card.Text>
                <div className="product-card-footer">
                    <div>
                        <span className="price">Price: ${price}</span>
                        <span className="stock">Stock: {stock}</span>
                    </div>
                    <div>
                        <Button variant="primary" data-product-id={id}>Add To Cart</Button>
                        <Button variant="success" onClick={() => handleSeeDetailsClick(id)}>Details</Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ProductTemplate;
