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

function App() {
  const location = useLocation();
  const allowedPaths = ['/', '/detail', '/shop']; // Add more path as we add Route, Add the path that needs to render the NavbarComponent to work
  const shouldRenderNavbar = allowedPaths.includes(location.pathname);

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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;