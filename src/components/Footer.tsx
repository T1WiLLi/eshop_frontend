// footer components 
import { Container, Row, Col } from "react-bootstrap";
import "../styles/components/footer.css";

function Footer() {

    const icons: string[] = [
        "facebook-f",
        "twitter",
        "google-plus-g",
        "linkedin-in",
        "pinterest",
        "instagram",
        "github"
    ];

    function renderIcon(icon: string) {
        return <i className={`fa-brands fa-${icon}`}></i>
    }

    return (
        <footer className="footer position-relative mt-5 py-3 d-flex align-items-center">
            <Container>
                <Row>
                    <Col md={12} className="d-flex">
                        <p className="footer__copyright mb-0 d-flex align-items-center">&copy; William Beaudin 2024</p>
                        <ul className="footer__social-links p-0 flex-wrap d-flex align-items-center ms-auto mb-0 gap-4">
                            {icons.map((icon, index) => (
                                <li key={index}>
                                    <a href="#">
                                        {renderIcon(icon)}
                                    </a>
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