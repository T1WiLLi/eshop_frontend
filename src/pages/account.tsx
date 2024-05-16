import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"
import { User } from "../interface/user";
import { Auth } from "../api/auth";
import "../styles/pages/accounts.css";
import { Container, Row, Col, Card } from "react-bootstrap";
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
            <Row className="justify-content-center mt-5">
                <Col xs={12} md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Account Information</Card.Title>
                            <Card.Text>
                                <p>ID: {user.id}</p>
                                <p>Name: {user.firstName} {user.lastName}</p>
                                <p>Email: {user.email}</p>
                                <p>Age: {user.age}</p>
                                <p>Gender: {user.gender}</p>
                                <p>Phone: {user.phone}</p>
                                <p>Username: {user.username}</p>
                                <p>Birth Date: {user.birthDate}</p>
                                {/* Add more user information here */}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Link to="/">Go to Home</Link>
                </Col>
            </Row>
        </Container>
    );
}

export default Account