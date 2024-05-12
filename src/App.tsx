import { Route, Routes, useLocation } from "react-router-dom";
import NavbarComponent from "./components/Navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import NotFound from "./pages/notFound";
import Detail from "./pages/details";
import Account from "./pages/account";
import { useEffect, useRef, useState } from "react";
import { Auth } from "./api/auth";

function App() {
  const location = useLocation();
  const allowedPaths = ['/', '/detail']; // Add more path as we add Route, Add the path that needs to render the NavbarComponent to work
  const shouldRenderNavbar = allowedPaths.includes(location.pathname);

  const [hasMovedInLastFiveMinutes, setHasMovedInLastFiveMinutes] = useState<boolean>(false);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    const handleMouseMove = () => {
      setHasMovedInLastFiveMinutes(true);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const fiveMinuteInterval = setInterval(() => {
      if (hasMovedInLastFiveMinutes) {
        console.log('Session refresh!');
        Auth.getInstance().refreshSession();
        setHasMovedInLastFiveMinutes(false);
      }
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    intervalRef.current = fiveMinuteInterval;

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(intervalRef.current);
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;