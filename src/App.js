import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import ProfilePage from "./pages/ProfilePage";
import Logout from "./pages/Logout";
import VerifyEmail from "./pages/VerifyEmail";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/accountcreation" element={<CreateAccount />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/ProfilePage" element={<ProfilePage />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/verifyemail" element={<VerifyEmail />} />
          <Route exact path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}




export default App;
