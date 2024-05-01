import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import SearchBar from "../Components/Searchbar";

// Functional component "Home"
const Home = () => {
    // Retrieve user from local storage
    let foundUser = localStorage.getItem('user')
    // Hook for navigation
    const navigate = useNavigate()

    // Function to handle logout
    function handleLogout () {
        localStorage.clear()
        navigate('/login')
    }

    // Component rendering
    return (
        <div>
            {/* Linking Bootstrap stylesheet */}
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
                integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                crossOrigin="anonymous"
            />
            <div className="hero">
                {/* Navigation bar */}
                <nav>
                    {/* Logo */}
                    <img className="logo" src="/logoimage.jpeg" alt="ExamJam Logo" width="451.5px"  length="164.25px"/>
                    {/* Welcome message */}
                    <h1 className="welcome">Welcome {foundUser}</h1>

                    {/* Conditional rendering of buttons based on user login status */}
                    {foundUser ? (
                        <>
                            {/* Link to profile page */}
                            <Link to="/profilepage"><button className="profileBar"> Edit Profile </button></Link>
                            {/* Logout button */}
                            <Link to="/logout"><button onClick={handleLogout} className="profileBar"> Logout </button></Link>
                        </>
                    ) : (
                        
                       <Link to="/login"><button className="profileBar"> Login </button></Link>
                    )}
                </nav>
                {/* Search container */}
                <div className="search-container">
                    {/* Render search bar component */}
                    <SearchBar />
                </div>                  
            </div>
        </div>
    );
};
 
export default Home;
