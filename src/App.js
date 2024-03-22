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
<<<<<<< HEAD
import ProfilePage from "./pages/ProfilePage";
=======
import React from "react";
import VerifyEmail from "./pages/VerifyEmail";
import CreateAccount from './pages/AccountCreation';





>>>>>>> 0cede597d49c07c6964ee0e8023cf3bc964fc1b8

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/accountcreation" element={<CreateAccount />} />
          <Route exact path="/login" element={<Login />} />
<<<<<<< HEAD
          <Route exact path="/ProfilePage" element={<ProfilePage />} />
=======
          <Route exact path="/verifyemail" element={<VerifyEmail />} />
>>>>>>> 0cede597d49c07c6964ee0e8023cf3bc964fc1b8
          <Route exact path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}




export default App;
