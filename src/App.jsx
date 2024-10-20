import { useState } from "react";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ToDo from "./components/ToDo";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ErrorPage from "./pages/ErrorPage";
import { ThemeProvider } from "./units/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <ToDo />
              </div>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
