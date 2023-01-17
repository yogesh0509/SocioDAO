import Appbar from "./Components/Appbar";
import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from "./Components/Banner";
import Home from "./Components/Home";
import Mainpage from "./Components/Mainpage";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
          <Route exact path="/main" element={<Mainpage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;