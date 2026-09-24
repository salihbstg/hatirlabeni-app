import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import GoogleRegisterPage from "./pages/GoogleRegister/GoogleRegisterPage";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import MailActivationPage from "./pages/MailActivationPage";
import ChangeEmailVerifyPage from "./pages/ChangeEmailVerify/ChangeEmailVerifyPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster></Toaster>
      <BrowserRouter>
        <Routes>
          <Route path="/change-email-verify" element={<ChangeEmailVerifyPage></ChangeEmailVerifyPage>}></Route>
          <Route path="/google-register" element={<GoogleRegisterPage></GoogleRegisterPage>}></Route>
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
