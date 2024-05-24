import { useLocation, useNavigate } from "react-router-dom";
import { useBasket } from "../context/BasketContext";
import { SetStateAction, useEffect, useState } from "react";
import { Cookie } from "../lib/Cookie";
import { Container, Row, Col, ListGroup, Button, Card, Form, Accordion } from "react-bootstrap";
import NotFound from "./notFound";
import "../styles/pages/checkout.css";
import { Address } from "../interface/user";
import { Auth } from "../api/auth";

function Checkout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { products, addToBasket, handleIncrement, handleDecrement, handleRemove, calculateSubtotal } = useBasket();

    const [address, setAddress] = useState<Address>({
        address: "",
        city: "",
        state: "",
        stateCode: "",
        postalCode: "",
        coordinates: { lat: 0, lng: 0 },
        country: ""
    });

    const [userAddress, setUserAddress] = useState<Address>();
    const [addressSaved, setAddressSaved] = useState<boolean>(false);
    const [useStoredAddress, setUseStoredAddress] = useState<boolean>(true);
    const [includeGift, setIncludeGift] = useState<boolean>(false);
    const [giftMessage, setGiftMessage] = useState<string>("");
    const [deliverySpeed, setDeliverySpeed] = useState<string>("standard");
    const [deliveryDate, setDeliveryDate] = useState<Date[]>([]);

    const isUserConnected = !!Cookie.getToken();

    useEffect(() => {
        if (location.state && location.state.product) {
            addToBasket(location.state.product);
            handleDecrement(location.state.product.id);
        }
        const fetchUser = async () => {
            let token = Cookie.getToken();
            if (token) {
                const user = await Auth.getInstance().getCurrentUser(token);
                setUserAddress(user.address);
            }
        }
        fetchUser();
    }, []);

    useEffect(() => {
        const calculateDeliveryDates = () => {
            const getDeliveryDate = (speed: string) => {
                const today = new Date();
                const date = [];

                if (speed === 'standard') {
                    date.push(new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000));
                } else if (speed === 'express') {
                    date.push(new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000));
                } else if (speed === 'overnight') {
                    date.push(new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000));
                }

                return date;
            };

            const date = getDeliveryDate(deliverySpeed);
            setDeliveryDate(() => date);
        };

        calculateDeliveryDates();
    }, [deliverySpeed]);


    const subtotal = calculateSubtotal();
    const taxRate = 0.15;
    const taxPercentage = taxRate * 100;
    const taxes = subtotal * taxRate;
    const total = subtotal + taxes;

    const handleNavigate = () => {
        navigate("/login");
    };

    const handleAddressChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value
        }));
    };

    const handleSaveAddress = () => {
        setAddressSaved(true);
    };

    const handleGiftOptionChange = (e: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setIncludeGift(e.target.checked);
    };

    const handleGiftMessageChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setGiftMessage(e.target.value);
    };

    const handleDeliverySpeedChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setDeliverySpeed(e.target.value);
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
                                <Col><p>Taxes ({taxPercentage}%):</p></Col>
                                <Col className="text-end"><p>${taxes.toFixed(2)}</p></Col>
                            </Row>
                            <Row>
                                <Col><h5>Total:</h5></Col>
                                <Col className="text-end"><h5>${total.toFixed(2)}</h5></Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Form className="mt-4">
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Custom Address</Accordion.Header>
                                <Accordion.Body>
                                    <Form.Group className="mb-3" controlId="formStreet">
                                        <Form.Label>Street Address</Form.Label>
                                        <Form.Control type="text" placeholder="Enter street address" name="address" value={address?.address} onChange={handleAddressChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formCity">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control type="text" placeholder="Enter city" name="city" value={address?.city} onChange={handleAddressChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formState">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control type="text" placeholder="Enter state" name="state" value={address?.state} onChange={handleAddressChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formPostalCode">
                                        <Form.Label>Postal Code</Form.Label>
                                        <Form.Control type="text" placeholder="Enter postal code" name="postalCode" value={address?.postalCode} onChange={handleAddressChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formCountry">
                                        <Form.Label>Country</Form.Label>
                                        <Form.Control type="text" placeholder="Enter country" name="country" value={address?.country} onChange={handleAddressChange} />
                                    </Form.Group>
                                    <Button variant="primary" onClick={handleSaveAddress}>Save Address</Button>
                                    {addressSaved && <p className="text-success">Address saved successfully.</p>}
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Use Stored Address</Accordion.Header>
                                <Accordion.Body>
                                    <Form.Group className="mb-3" controlId="useStoredAddress">
                                        <Form.Check
                                            type="checkbox"
                                            label="Use stored address"
                                            checked={useStoredAddress}
                                            onChange={() => setUseStoredAddress(!useStoredAddress)}
                                        />
                                    </Form.Group>
                                    {userAddress && useStoredAddress && (
                                        <div>
                                            <p><strong>Street:</strong> {userAddress.address}</p>
                                            <p><strong>City:</strong> {userAddress.city}</p>
                                            <p><strong>State:</strong> {userAddress.state}</p>
                                            <p><strong>Postal Code:</strong> {userAddress.postalCode}</p>
                                            <p><strong>Country:</strong> {userAddress.country}</p>
                                        </div>
                                    )}
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Gift Option</Accordion.Header>
                                <Accordion.Body>
                                    <Form.Group className="mb-3" controlId="giftOption">
                                        <Form.Check
                                            type="checkbox"
                                            label="Include a gift card"
                                            checked={includeGift}
                                            onChange={handleGiftOptionChange}
                                        />
                                    </Form.Group>
                                    {includeGift && (
                                        <>
                                            <Form.Group className="mb-3" controlId="giftMessage">
                                                <Form.Label>Gift Message</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    placeholder="Add a message for the gift recipient"
                                                    value={giftMessage}
                                                    onChange={handleGiftMessageChange}
                                                />
                                            </Form.Group>
                                        </>
                                    )}
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>Delivery Speed</Accordion.Header>
                                <Accordion.Body>
                                    <Form.Group className="mb-3" controlId="deliverySpeed">
                                        <Form.Label>Select Delivery Speed</Form.Label>
                                        <Form.Select value={deliverySpeed} onChange={handleDeliverySpeedChange}>
                                            <option value="standard">Standard (Free)</option>
                                            <option value="express">Express (2% | +${(total * 0.02).toFixed(2)})</option>
                                            <option value="overnight">Overnight (4% | +${(total * 0.05).toFixed(2)})</option>
                                        </Form.Select>
                                    </Form.Group>
                                    {deliveryDate.length > 0 && (
                                        <p>
                                            Possible Delivery Date(s):{' '}
                                            {deliveryDate.map((date) => date.toLocaleDateString()).join(', ')}
                                        </p>
                                    )}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <Form.Group className="mb-3 mt-4" controlId="formDeliveryMessage">
                            <Form.Label>Delivery Message</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Add a delivery message (optional)" />
                        </Form.Group>
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
