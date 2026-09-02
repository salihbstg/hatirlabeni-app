import "./App.css";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import {Toaster} from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster></Toaster>
      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<Navbar></Navbar>}></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
