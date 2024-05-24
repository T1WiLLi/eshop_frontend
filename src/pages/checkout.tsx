import { useLocation, useNavigate } from "react-router-dom";
import { useBasket } from "../context/BasketContext";
import { useEffect, useState } from "react";
import { Cookie } from "../lib/Cookie";
import { Container, Row, Col, ListGroup, Button, Card, Form } from "react-bootstrap";
import NotFound from "./notFound";
import "../styles/pages/checkout.css";

function Checkout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { products, addToBasket, handleIncrement, handleDecrement, handleRemove, calculateSubtotal } = useBasket();

    const [address, setAddress] = useState("");


    const isUserConnected = !!Cookie.getToken();

    useEffect(() => {
        if (location.state && location.state.product) {
            addToBasket(location.state.product);
            handleDecrement(location.state.product.id);
        }
    }, []);

    const subtotal = calculateSubtotal();
    const taxRate = 0.08;
    const taxes = subtotal * taxRate;
    const total = subtotal + taxes;

    const handleNavigate = () => {
        navigate("/login");
    };

    const handleAddressChange = (e: any) => {
        setAddress(e.target.value);
    };

    if (!isUserConnected) {
        return (
            <div className="d-flex flex-column align-items-center">
                <NotFound statusCode={401} message="You need to connect in order to access this page" />
                <a onClick={handleNavigate} style={{ color: "blue", cursor: "pointer", fontSize: "3em", textDecoration: "underline" }}>LOGIN</a>
            </div>
        );
    }

    return (
        <Container className="checkout-container">
            <h2 className="my-4">Checkout</h2>
            {products.length > 0 ? (
                <>
                    <ListGroup variant="flush">
                        {products.map((item) => (
                            <ListGroup.Item key={item.product.id} className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <img src={item.product.thumbnail} alt={item.product.title} className="checkout-thumbnail me-3" />
                                    <div>
                                        <h5>{item.product.title}</h5>
                                        <p>Price: ${(item.product.price).toFixed(2)}</p>
                                        <p>Quantity: {item.amount}</p>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <Button variant="outline-primary" size="sm" onClick={() => handleIncrement(item.product.id)}>+</Button>
                                    <Button variant="outline-secondary" size="sm" onClick={() => handleDecrement(item.product.id)}>-</Button>
                                    <Button variant="outline-danger" size="sm" onClick={() => handleRemove(item.product.id)}>Remove</Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <Card className="mt-4">
                        <Card.Body>
                            <Row>
                                <Col><p>Subtotal:</p></Col>
                                <Col className="text-end"><p>${subtotal.toFixed(2)}</p></Col>
                            </Row>
                            <Row>
                                <Col><p>Taxes:</p></Col>
                                <Col className="text-end"><p>${taxes.toFixed(2)}</p></Col>
                            </Row>
                            <Row>
                                <Col><h5>Total:</h5></Col>
                                <Col className="text-end"><h5>${total.toFixed(2)}</h5></Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Form className="mt-4">
                        <Form.Group className="mb-3" controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter your address" value={address} onChange={handleAddressChange} />
                        </Form.Group>
                        <fieldset>
                            <Form.Group as={Row} className="mb-3" controlId="formDeliveryDate">
                                <Form.Label as="legend" column sm={4}>Delivery Date</Form.Label>
                                <Col sm={8}>
                                    <Form.Check
                                        type="radio"
                                        label="Tomorrow"
                                        name="deliveryDate"
                                        id="deliveryTomorrow"
                                        value="tomorrow"
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Day after tomorrow"
                                        name="deliveryDate"
                                        id="deliveryDayAfterTomorrow"
                                        value="dayAfterTomorrow"
                                    />
                                </Col>
                            </Form.Group>
                        </fieldset>
                        <Button variant="success" className="mt-4">Proceed to Payment</Button>
                    </Form>
                </>
            ) : (
                <p>Your basket is empty.</p>
            )}
        </Container>
    );
}

export default Checkout;
