import { useEffect } from "react";
import "../styles/components/navbar.css";

function Navbar() {

    useEffect(() => {
        new ScrollHandler();
    }, []);

    return (
        <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="index.html">
                    WeSoft<span id="span_lio">Qc</span>
                </a>
                <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="toggler-icon top-bar"></span>
                    <span className="toggler-icon middle-bar"></span>
                    <span className="toggler-icon bottom-bar"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-1 mb-lg-0 align-content-center">
                        <li className="nav-item">
                            <a className="nav-link" target="_self" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" target="_self" href="#games">Games</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" target="_self" href="#team">Team</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" target="_self" href="#investor">Investors</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" target="_self" href="#careers">Careers</a>
                        </li>
                    </ul>
                </div>
            </div>
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

export default Navbar;