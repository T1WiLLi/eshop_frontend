import { useState } from "react";
import { Auth } from "../api/auth";
import { AuthResponse } from "../interface/auth";
import { Col, Container, Form, FormGroup, Row, FormLabel, Button, Alert, FormControl } from "react-bootstrap";
import "../styles/pages/login.css"
import { Cookie } from "../lib/Cookie";

function Login() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleLogin = async () => {
        if (username.trim() === '' || password.trim() === '') {
            setErrorMessage('Please enter both username and password');
            return;
        }
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
        <div className="login-screen">
            <Container className="form-container position-absolute">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <div className="form-wrapper">
                            <Form>
                                <h2 className="mb-4 text-center">Login</h2>
                                <FormGroup>
                                    <FormLabel htmlFor="username" className="form-label">
                                        Username
                                    </FormLabel>
                                    <FormControl
                                        type="text"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="form-control form-control-lg"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <FormLabel htmlFor="password" className="form-label">
                                        Password
                                    </FormLabel>
                                    <FormControl
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control form-control-lg"
                                    />
                                </FormGroup>
                                <Button
                                    variant="primary"
                                    className="btn-lg btn-block mt-5"
                                    onClick={handleLogin}
                                >
                                    Login
                                </Button>
                                {errorMessage && (
                                    <Alert variant="danger" className="mt-3">
                                        {errorMessage}
                                    </Alert>
                                )}
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Login