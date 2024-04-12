import { Link } from "react-router-dom";
import "./Home.css";
import SearchBar from "../Components/Searchbar";
import Card from "../Components/Card";
import { useNavigate } from "react-router-dom";

const Home = () => {

    let foundUser = localStorage.getItem('user')
    foundUser = localStorage.getItem('user');
    const navigate = useNavigate()

    function handleLogout () {
        localStorage.clear()
        navigate('/login')
    }

    const classData = [ //for use in cards
        { title: "CS230", description: "Intro to Software Engineering" },
        { title: "CS320", description: "Analysis of Algorithms" },
        { title: "MATH251", description: "Calculus III" }
    ];

    return (
        <div>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
                integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                crossOrigin="anonymous"
            />
            <div className="hero">
                <nav>
                    <h2 className="logo">ExamJam</h2>
                    <h1>Welcome</h1>

                    <Link to="/login"><button>Login</button></Link>
                    <Link to="/profilepage"><button>Edit Profile</button></Link>
                    <Link to="/logout"><button onClick={handleLogout}>Logout</button></Link>
                   
                    </nav>
                <div className="search-container">
                <SearchBar />
                </div>

                <div id="classesBox">
         
                    {classData.map((classItem, index) => ( //iterates over each item in classData and passes its information to a Card
                        <Card className = "card"
                            key={index} // Providing a unique key for each card
                            title={classItem.title}
                            description={classItem.description}
                        />
                    ))}

                </div>

            </div>

            


      
        </div>
    );
};
 
export default Home;