import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Dashboard from "./pages/Dashboard";

function App() {

  return (
    <>
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/search" element={<Search />} />

        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>

    </>
  );
}

export default App;