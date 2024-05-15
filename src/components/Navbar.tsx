import { useEffect, useState } from "react";
import { Container, Dropdown, Nav } from "react-bootstrap";
import "../styles/components/navbar.css";
import { User } from "../interface/user";
import Basket from "./Basket";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../api/auth";
import { Cookie } from "../lib/Cookie";


function NavbarComponent() {
    const [currentUser, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        new ScrollHandler();

        const fetchUser = async () => {
            try {
                const auth = Auth.getInstance();
                const token = Cookie.getToken();
                if (token) {
                    const user = await auth.getCurrentUser(token);
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

    const handleLogout = () => {
        Cookie.destroyToken();
        setUser(null);
    };

    const handleAccount = async () => {
        if (currentUser && currentUser.username && currentUser.password) {
            try {
                const res = await Auth.getInstance().loginUser(
                    currentUser.username,
                    currentUser.password,
                    120
                );
                navigate(`/account?token=${res.token}`);
            } catch (error) {
                console.error("Error logging in:", error);
            }
        }
    }

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
                        <Nav.Link as={Link} to="/shop" className="nav-link">Shop</Nav.Link>
                        <Nav.Link as={Link} to="/checkout" className="nav-link"><Basket /></Nav.Link>
                        {currentUser ? (
                            <AccountMenu user={currentUser} onLogout={handleLogout} onAccount={handleAccount} />
                        ) : (
                            <Nav.Link as={Link} to="/login">
                                Login
                            </Nav.Link>
                        )}
                    </Nav>
                </div>
            </Container>
        </nav>
    );
}

interface AccountMenuProps {
    user: User;
    onLogout: () => void;
    onAccount: () => void;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ user, onLogout, onAccount }) => {
    return (
        <Dropdown>
            <Dropdown.Toggle as={Nav.Link} className="nav-link">
                <i className="fa-solid fa-user"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item>
                    {user.firstName} {user.lastName}
                </Dropdown.Item>
                <Dropdown.Item onClick={onAccount}>Account</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={onLogout}>Disconnect</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

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