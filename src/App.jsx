import React, { useEffect } from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const applyGlobalScrollAnimations = () => {
  const selectors = [
    "section",
    ".nft__item",
    ".nft_coll",
    ".author_list li",
    ".item_info",
    ".item_author",
    ".profile_avatar",
    ".profile_follow",
    ".de_tab",
  ];

  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      if (element.hasAttribute("data-aos-ignore")) {
        return;
      }

      if (!element.hasAttribute("data-aos")) {
        element.setAttribute("data-aos", "fade-up");
      }

      if (!element.hasAttribute("data-aos-duration")) {
        element.setAttribute("data-aos-duration", "700");
      }

      if (!element.hasAttribute("data-aos-delay")) {
        element.setAttribute("data-aos-delay", String((index % 6) * 40));
      }
    });
  });
};

const AnimatedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    AOS.init({
      once: true,
      offset: 80,
      duration: 700,
      easing: "ease-out-cubic",
      disable: prefersReducedMotion,
    });
  }, []);

  useEffect(() => {
    applyGlobalScrollAnimations();
    AOS.refreshHard();
  }, [location.pathname]);

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author" element={<Author />} />
        <Route path="/author/:authorId" element={<Author />} />
        <Route path="/item-details" element={<ItemDetails />} />
        <Route path="/item-details/:nftId" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
