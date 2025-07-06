import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import Login_page from "./pages/Login_page";
import Signup_page from "./pages/Signup_page";
import Home from "./pages/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "./pages/GoogleLogin";
import "./pages/form.css";

function App() {
  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId="32712112537-1ef5ime2mvpohhrfdp0ar2u0jtskgv18.apps.googleusercontent.com">
        <div className="bgColor">
          <Login_page />
          <GoogleLogin />
        </div>
      </GoogleOAuthProvider>
    );
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<GoogleAuthWrapper />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<Signup_page />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
