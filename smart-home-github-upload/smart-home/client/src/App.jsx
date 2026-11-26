import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { ContentContext, useContent } from "./ContentContext.jsx";
export { useContent };
import Intro from "./components/Intro.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Problems from "./pages/Problems.jsx";
import Architecture from "./pages/Architecture.jsx";
import Impact from "./pages/Impact.jsx";

export default function App() {
  const { pathname } = useLocation();
  const [content, setContent] = useState(null);
  const [error, setError] = useState("");
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then(setContent)
      .catch(() => setError("Could not reach the API. Start the server with npm run dev."));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <Intro onDone={() => setIntroDone(true)} />
      <Navbar ready={introDone} />
      <main>
        {error && <p className="error-box">{error}</p>}
        {content && introDone && (
          <ContentContext.Provider value={content}>
            <Routes key={pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/problems" element={<Problems />} />
              <Route path="/architecture" element={<Architecture />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </ContentContext.Provider>
        )}
      </main>
      {introDone && <Footer />}
    </MotionConfig>
  );
}