import { Route, Routes, useLocation } from "react-router-dom";
import NavbarComponent from "./components/Navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import NotFound from "./pages/notFound";
import Detail from "./pages/details";
import Account from "./pages/account";
import Checkout from "./pages/checkout";
import { useEffect } from "react";
import { Auth } from "./api/auth";
import Shop from "./pages/shop";
import Footer from "./components/Footer";
import PromPage from "./pages/promPage";

function App() {
  const location = useLocation();
  const allowedPathsOnNavbar = ['/', '/detail', '/shop']; // Add more path as we add Route, Add the path that needs to render the NavbarComponent to work
  const shouldRenderNavbar = allowedPathsOnNavbar.includes(location.pathname);

  const allowedPathOnFooter = ['/', '/detail', '/shop', 'checkout'];
  const shouldRenderFooter = allowedPathOnFooter.includes(location.pathname);

  const handleRefresh = () => {
    Auth.getInstance().refreshSession();
  };

  useEffect(() => {
    document.addEventListener('click', handleRefresh);
    return () => {
      document.removeEventListener('click', handleRefresh);
    };
  }, []);

  return (
    <>
      {shouldRenderNavbar && <NavbarComponent />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/account" element={<Account />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/promotion" element={<PromPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {shouldRenderFooter && <Footer />}
    </>
  );
}

export default App;