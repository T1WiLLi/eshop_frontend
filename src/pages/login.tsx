import { useState } from "react";
import { Auth } from "../api/auth";
import { AuthResponse } from "../interface/auth";
import { Col, Container, Form, FormGroup, Row, FormLabel, Button, Alert, FormControl } from "react-bootstrap";
import "../styles/components/login.css"
import { Cookie } from "../lib/Cookie";

function Login() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleLogin = async () => {
        try {
            const auth = Auth.getInstance();
            const loginResponse = await auth.loginUser(username, password) as AuthResponse;
            if (loginResponse.success) {
                new Cookie(loginResponse.token);
                window.location.href = '/';
            } else {
                setErrorMessage('Login failed: ' + loginResponse.response);
            }
        } catch (error: any) {
            setErrorMessage('Server error: ' + error.message);
        }
    }


    return (
        <Container className="form-container position-absolute">
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <Form>
                        <h2 className="mb-4">Login</h2>
                        <FormGroup>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <FormControl
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <FormControl
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormGroup>
                        <Button color="primary" onClick={handleLogin}>Login</Button>
                        {errorMessage && <Alert color="danger" className="mt-3">{errorMessage}</Alert>}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Login