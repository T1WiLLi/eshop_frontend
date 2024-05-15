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
  const allowedPaths = ['/eshop', '/eshop/detail', '/eshop/shop']; // Add more path as we add Route, Add the path that needs to render the NavbarComponent to work
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
        <Route path="/eshop" element={<Home />} />
        <Route path="/eshop/login" element={<Login />} />
        <Route path="/eshop/detail" element={<Detail />} />
        <Route path="/eshop/account" element={<Account />} />
        <Route path="/eshop/checkout" element={<Checkout />} />
        <Route path="/eshop/shop" element={<Shop />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;