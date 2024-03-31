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
import AccountCreation from "./pages/AccountCreation";
import ProfilePage from "./pages/ProfilePage";
import Logout from "./pages/Logout"
import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  //...
};

const app = initializeApp(firebaseConfig);


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/accountcreation" element={<AccountCreation />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/ProfilePage" element={<ProfilePage />} />
          <Route eact path="/logout" element={<Logout />} />
          <Route exact path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}




export default App;
