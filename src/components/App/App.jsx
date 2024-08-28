import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div className="page">
        <div className="page__content">
          <div className="page__style">
            <Header />
            <Routes>
              <Route exact path="/" element={<Main />} />
            </Routes>
          </div>
          <About />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
