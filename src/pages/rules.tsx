import { useState } from 'react';
import { Container, Row, Col, Card, OverlayTrigger, Tooltip, Accordion, Button } from 'react-bootstrap';
import '../styles/pages/rules.css';
import { Link } from 'react-router-dom';

const RulesPage = () => {
    const [showLegalDisclaimer, setShowLegalDisclaimer] = useState(false);

    const toggleLegalDisclaimer = () => {
        setShowLegalDisclaimer(!showLegalDisclaimer);
    };

    return (
        <Container className="rules-page">
            <Row>
                <Col>
                    <h1 className="text-center mb-4">Rules and Regulations</h1>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>General Rules</Card.Title>
                            <Card.Text>
                                <ol>
                                    <li>
                                        Respect and follow all applicable laws and regulations.
                                        <OverlayTrigger
                                            placement="right"
                                            overlay={<Tooltip>This includes local, state, and federal laws.</Tooltip>}
                                        >
                                            <i className="fas fa-question-circle ms-2 text-primary tooltip-icon"></i>
                                        </OverlayTrigger>
                                    </li>
                                    <li>Treat others with respect and courtesy.</li>
                                    <li>Maintain a safe and secure environment for all.</li>
                                    <li>Refrain from any form of harassment, discrimination, or offensive behavior.</li>
                                    <li>
                                        Protect the privacy and personal information of others.
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip>
                                                    Do not share or disclose personal information without consent.
                                                </Tooltip>
                                            }
                                        >
                                            <i className="fas fa-question-circle ms-2 text-primary tooltip-icon"></i>
                                        </OverlayTrigger>
                                    </li>
                                    <li>
                                        Comply with the terms of service and community guidelines.
                                    </li>
                                    <li>
                                        Ensure your actions do not harm others or disrupt the community.
                                    </li>
                                </ol>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Legality</Card.Title>
                            <Card.Text>
                                <p>
                                    We strive to ensure that all our activities and services comply with
                                    applicable laws and regulations. However, laws and regulations may vary
                                    depending on your location and jurisdiction.
                                </p>
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                        <Tooltip>
                                            It is your responsibility to ensure compliance with local laws and regulations.
                                        </Tooltip>
                                    }
                                >
                                    <p className="text-primary mb-0 tooltip-text" onClick={toggleLegalDisclaimer}>
                                        <i className="fas fa-exclamation-triangle me-2"></i>
                                        Please consult with legal professionals for guidance.
                                    </p>
                                </OverlayTrigger>
                                {showLegalDisclaimer && (
                                    <div className="legal-disclaimer mt-3">
                                        <p>
                                            This website and its content are provided for informational purposes only
                                            and should not be construed as legal advice. We make no representations or
                                            warranties regarding the accuracy or completeness of the information
                                            provided. It is your responsibility to comply with all applicable laws and
                                            regulations in your jurisdiction.
                                        </p>
                                        <p>
                                            By using our services, you agree to indemnify and hold us harmless from any
                                            claims, damages, or liabilities arising from your failure to comply with
                                            applicable laws and regulations.
                                        </p>
                                    </div>
                                )}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Additional Rules and Guidelines</Card.Title>
                            <Card.Text>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Responsible Use</Accordion.Header>
                                        <Accordion.Body>
                                            <ul>
                                                <li>Use our services and platforms responsibly.</li>
                                                <li>
                                                    Do not engage in any illegal or unethical activities.
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={
                                                            <Tooltip>
                                                                This includes but is not limited to hacking, fraud, or distributing
                                                                harmful content.
                                                            </Tooltip>
                                                        }
                                                    >
                                                        <i className="fas fa-question-circle ms-2 text-primary tooltip-icon"></i>
                                                    </OverlayTrigger>
                                                </li>
                                                <li>Respect intellectual property rights and copyrights.</li>
                                                <li>
                                                    Ensure your actions do not harm the reputation or functionality of our services.
                                                </li>
                                                <li>
                                                    Report any security vulnerabilities or issues promptly.
                                                </li>
                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Reporting Violations</Accordion.Header>
                                        <Accordion.Body>
                                            <p>
                                                If you witness any violations of these rules or have concerns about
                                                inappropriate behavior, please report it to our support team immediately.
                                                We take all reports seriously and will investigate them thoroughly.
                                            </p>
                                            <p>
                                                You can report violations by sending an email to
                                                <a href="mailto:support@example.com"> support@example.com</a> or by using
                                                the reporting feature within our platform.
                                            </p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Community Guidelines</Accordion.Header>
                                        <Accordion.Body>
                                            <ul>
                                                <li>Engage in positive and constructive discussions.</li>
                                                <li>Avoid using offensive or inappropriate language.</li>
                                                <li>
                                                    Support and encourage other members of the community.
                                                </li>
                                                <li>
                                                    Share accurate information and avoid spreading misinformation.
                                                </li>
                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>Data Protection</Accordion.Header>
                                        <Accordion.Body>
                                            <ul>
                                                <li>Ensure the security of your account credentials.</li>
                                                <li>
                                                    Do not share your password with others.
                                                </li>
                                                <li>
                                                    Report any suspicious activities to our support team.
                                                </li>
                                                <li>
                                                    Follow best practices for data protection and privacy.
                                                </li>
                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col className="text-center">
                    <Link to="/">
                        <Button variant="primary">Go Back to Home</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default RulesPage;
