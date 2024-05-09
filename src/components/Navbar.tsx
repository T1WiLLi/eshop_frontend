import { useEffect, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import "../styles/components/navbar.css";
import { User } from "../interface/user";
import Basket from "./Basket";
import { Link } from "react-router-dom";
import { Auth } from "../api/auth";
import { Cookie } from "../lib/Cookie";


function NavbarComponent() {
    const [currentUser, setUser] = useState<User | null>(null);

    useEffect(() => {
        new ScrollHandler();

        const fetchUser = async () => {
            try {
                const auth = new Auth();
                const token = Cookie.getToken();
                if (token) {
                    const user = await auth.getCurrentUser(token);
                    console.log(user);
                    setUser(user);
                }
            } catch (error: any) {
                console.error("Error fetching user:", error.message);
            }
        };
        fetchUser();

        const tokenChangeHandler = () => {
            fetchUser();
        };
        window.addEventListener("tokenchange", tokenChangeHandler);


        return () => {
            window.removeEventListener("tokenchange", tokenChangeHandler);
        };
    }, []);

    return (
        <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
            <Container className="container-fluid">
                <Link to="/" className="navbar-brand">
                    eShop<span id="span_lio">Qc</span>
                </Link>
                <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="toggler-icon top-bar"></span>
                    <span className="toggler-icon middle-bar"></span>
                    <span className="toggler-icon bottom-bar"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <Nav className="navbar-nav ms-auto mb-1 mb-lg-0 align-content-left">
                        <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
                        <Nav.Link as={Link} to="/search" className="nav-link">Search</Nav.Link>
                        <Nav.Link as={Link} to="/checkout" className="nav-link"><Basket /></Nav.Link>
                        <Nav.Link as={Link} to="/login" data-log={currentUser?.firstName + " " + currentUser?.lastName} className="nav-link">Login</Nav.Link>
                    </Nav>
                </div>
            </Container>
        </nav>
    );
}

class ScrollHandler {
    constructor() {
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar') as HTMLElement;
            const navLinks = document.querySelectorAll('.nav-link') as NodeListOf<HTMLAnchorElement>;
            const spanLio = document.querySelector('#span_lio') as HTMLSpanElement;
            const toggler = document.querySelectorAll('.toggler-icon') as NodeListOf<HTMLSpanElement>;
            if (window.scrollY > 50) {
                if (navbar) navbar.classList.add('sticky');
                navLinks.forEach(element => element.classList.add('scroll'));
                if (spanLio) spanLio.classList.add('span-sticky');
                if (toggler) {
                    toggler.forEach(element => element.classList.add('toggle-on'));
                }
            } else {
                if (navbar) navbar.classList.remove('sticky');
                navLinks.forEach(element => element.classList.remove('scroll'));
                if (spanLio) spanLio.classList.remove('span-sticky');
                if (toggler) {
                    toggler.forEach(element => element.classList.remove('toggle-on'));
                }
            }
        });
    }
}

export default NavbarComponent;