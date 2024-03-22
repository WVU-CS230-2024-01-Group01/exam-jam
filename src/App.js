import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ReactDOM from "react-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import React from "react";
import VerifyEmail from "./pages/VerifyEmail";
import CreateAccount from './pages/AccountCreation';






function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/accountcreation" element={<CreateAccount />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/verifyemail" element={<VerifyEmail />} />
          <Route exact path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}




export default App;
