import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "../styles/components/navbar.css";
import { User } from "../interface/user";
import Basket from "./Basket";


function NavbarComponent() {
    const [currentUser, setUser] = useState<User | null>(null);

    useEffect(() => {
        new ScrollHandler();
    }, []);

    return (
        <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
            <Container className="container-fluid">
                <Navbar.Brand className="navbar-brand" href="#home">
                    eShop<span id="span_lio">Qc</span>
                </Navbar.Brand>
                <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="toggler-icon top-bar"></span>
                    <span className="toggler-icon middle-bar"></span>
                    <span className="toggler-icon bottom-bar"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <Nav className="navbar-nav ms-auto mb-1 mb-lg-0 align-content-left">
                        <Nav.Link className="nav-link" href="#home">Home</Nav.Link>
                        <Nav.Link className="nav-link" href="#games">Search</Nav.Link>
                        <Nav.Link className="nav-link" href="#checkout"><Basket /></Nav.Link>
                        <Nav.Link data-log={currentUser?.firstName + " " + currentUser?.lastName} className="nav-link" href="#investor">Login</Nav.Link>
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