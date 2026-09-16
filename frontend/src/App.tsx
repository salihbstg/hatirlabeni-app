import "./App.css";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import MailActivationPage from "./pages/MailActivationPage"
function App() {
  return (
    <>
      <Toaster></Toaster>
      <BrowserRouter>
        <Routes>
          <Route path="/reset-password" element={<ResetPassword></ResetPassword>}></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route
            path="/register"
            element={<RegisterPage></RegisterPage>}
          ></Route>
          <Route
            path="/forgot-password"
            element={<ForgotPassword></ForgotPassword>}
          ></Route>
          <Route path="/activation" element={<MailActivationPage></MailActivationPage>} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
