import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"
import { User } from "../interface/user";
import { Auth } from "../api/auth";
import "../styles/pages/accounts.css";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import NotFound from "./notFound";


function Account() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const auth = Auth.getInstance()
                if (token) {
                    const user = await auth.getCurrentUser(token);
                    setUser(user);
                } else {
                    setError("No token provided in the URL.");
                }
            } catch (error: any) {
                setError(`Error fetching user data: ${error.message}`);
            }
        }

        fetchUser();
    }, [token]);

    if (error) {
        return <NotFound statusCode={403} message="You need to connect in order to access the Account page" />;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Row className="justify-content-center mt-5 mb-5">
                <Col xs={12} md={8}>
                    <AccountInfo user={user} />
                    <Card className="mb-3">
                        <Card.Header>Additional Information</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <strong>Maiden Name:</strong> {user.maidenName}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Blood Group:</strong> {user.bloodGroup}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Height:</strong> {user.height} cm
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Weight:</strong> {user.weight} kg
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Eye Color:</strong> {user.eyeColor}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Hair Color:</strong> {user.hair.color}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Hair Type:</strong> {user.hair.type}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                    <Card className="mb-3">
                        <Card.Header>Financial Information</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <strong>Bank:</strong> {user.bank.cardNumber} ({user.bank.cardType})
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>IBAN:</strong> {user.bank.iban}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Currency:</strong> {user.bank.currency}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>EIN:</strong> {user.ein}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>SSN:</strong> {user.ssn}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                    <div className="d-flex justify-content-between">
                        <Link to="/" className="btn btn-primary">
                            Go to Home
                        </Link>
                        <Button variant="secondary">Settings</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

const AccountInfo: React.FC<{ user: User }> = ({ user }) => {
    return (
        <Card className="mb-3">
            <Card.Header>Account Information</Card.Header>
            <Card.Body>
                <Row>
                    <Col md={3}>
                        <img src={user.image} alt="User Profile" className="img-fluid rounded" />
                    </Col>
                    <Col md={9}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <strong>Name:</strong> {user.firstName} {user.lastName}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Email:</strong> {user.email}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Age:</strong> {user.age}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Gender:</strong> {user.gender}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Phone:</strong> {user.phone}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Username:</strong> {user.username}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Birth Date:</strong> {user.birthDate}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default Account