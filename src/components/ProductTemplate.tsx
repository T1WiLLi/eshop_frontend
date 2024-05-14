import { Card, Button } from "react-bootstrap";
import { Product } from "../interface/product";
import "../styles/components/productTemplate.css";

interface ProductTemplateProps {
    product: Product;
}

function ProductTemplate({ product }: ProductTemplateProps) {
    const { id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images } = product;

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={thumbnail} alt={title} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Text>Price: ${price}</Card.Text>
                <Card.Text>Discount: {discountPercentage}%</Card.Text>
                <Card.Text>Rating: {rating}</Card.Text>
                <Card.Text>Stock: {stock}</Card.Text>
                <Card.Text>Brand: {brand}</Card.Text>
                <Card.Text>Category: {category}</Card.Text>
                <Button variant="primary" onClick={() => console.log(`Adding ${title} to cart`)}>Add To Cart</Button>
                <Button variant="success" onClick={() => console.log(`Buying ${title} now`)}>Buy Now</Button>
            </Card.Body>
        </Card>
    );
}

export default ProductTemplate;