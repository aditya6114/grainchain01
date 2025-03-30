import React, { useEffect } from "react";
import {
  BrowserRouter,
  Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import FoodDonation from "./pages/FoodDonation";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./dashboard/Layout";
import Navbar from "./components/Navbar/Navbar";
import AboutUs from './components/About Us/AboutUs';
import Vision from "./components/Our Visison/Vision";
import RecipientDashboard from "./requestfood/pages/Requestfood";

import Profile from "./dashboard/Profile";
import Food from "./dashboard/Food";

function App() {
  const token = localStorage.getItem("token");

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      {!pathname.includes("/login") &&
        !pathname.includes("/signup") &&
        !pathname.includes("/dashboard") && <Navbar token={token} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donation" element={<FoodDonation />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/requestfood" element={<RecipientDashboard/>} />

        {token ? (
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<FoodDonation />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/food" element={<Food />} />
          </Route>
        ) : (
          <Route path="*" element={<Login />} />
        )}
      </Routes>
    </>
  );
}

export default App;
