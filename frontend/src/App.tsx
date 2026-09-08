import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Toaster></Toaster>
      <BrowserRouter>
        <Routes>
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route
            path="/register"
            element={<RegisterPage></RegisterPage>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
