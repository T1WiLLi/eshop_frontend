import { Container, Row, Col } from "react-bootstrap";
import "../styles/components/footer.css";
import { Link } from "react-router-dom";

function Footer() {
    const icons: string[] = [
        "facebook-f",
        "twitter",
        "google-plus-g",
        "linkedin-in",
        "pinterest",
        "instagram",
        "github",
    ];

    function renderIcon(icon: string) {
        return <i className={`fa-brands fa-${icon}`}></i>;
    }

    return (
        <footer className="footer pt-5">
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="footer__header">
                            <h2>eShopQc</h2>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <div className="footer__about pe-5">
                            <h3>About</h3>
                            <p className="pe-5">
                                Our dedicated team is committed to providing exceptional customer service,
                                ensuring a seamless and enjoyable shopping experience from start to finish.
                            </p>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="footer__links">
                            <h3>Links</h3>
                            <ul>
                                <li>
                                    <Link to={"/"}>Home</Link>
                                </li>
                                <li>
                                    <Link to={"/shop"}>Shop</Link>
                                </li>
                                <li>
                                    <Link to={"/Account"}>Account</Link>
                                </li>
                                <li>
                                    <Link to={"/rules"}>Rules</Link>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col md={1}></Col>
                    <Col md={4}>
                        <div className="footer__subscription">
                            <h3>Subscribe</h3>
                            <form>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="form-control"
                                />
                                <button type="submit" className="btn btn-primary">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="footer-copyright d-flex pb-3">
                        <p className="footer__copyright mb-0 d-flex align-items-center">
                            &copy; William Beaudin 2024
                        </p>
                        <ul className="footer__social-links p-0 flex-wrap d-flex align-items-center ms-auto mb-0 gap-4">
                            {icons.map((icon, index) => (
                                <li key={index}>
                                    <a href="#">{renderIcon(icon)}</a>
                                </li>
                            ))}
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;