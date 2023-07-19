import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import HomePage from "./components/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/registerForm" exact Component={RegisterForm} />
          <Route path="/loginForm" exact Component={LoginForm} />
          <Route path="/homePage" exact Component={HomePage} />
          <Route path="*" exact Component={<h1>not found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
