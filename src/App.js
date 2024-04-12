import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AccountCreation from "./pages/AccountCreation";
import ProfilePage from "./pages/ProfilePage";
import Logout from "./pages/Logout";
import VerifyEmail from "./pages/VerifyEmail";
import Classes from "./pages/Classes";
import StudySets from "./pages/StudySets";
import CreateStudySets from "./pages/CreateStudySets";
import EditStudySets from "./pages/EditStudySets";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/accountcreation" element={<AccountCreation />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/ProfilePage" element={<ProfilePage />} />
          <Route exact path="/studysets" element={<StudySets />} />
          <Route exact path="/createstudysets" element={<CreateStudySets />} />
          <Route exact path="/editstudysets/:id" element={<EditStudySets />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/verifyemail" element={<VerifyEmail />} />
          <Route exact path="*" element={<Navigate to="/" />} />
          <Route exact path="/classes" element = {<Classes />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}




export default App;
