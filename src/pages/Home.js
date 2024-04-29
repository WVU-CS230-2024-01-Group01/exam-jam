import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import SearchBar from "../Components/Searchbar";
const Home = () => {

    let foundUser = localStorage.getItem('user')
    const navigate = useNavigate()

    function handleLogout () {
        localStorage.clear()
        navigate('/login')
    }

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
                    
                    <img className="logo" src="/logoimage.jpeg" alt="ExamJam Logo" width="451.5px"  length="164.25px"/>
                    <h1 className="welcome">Welcome {foundUser}</h1>

                    {foundUser ? (
                        <>
                            <Link to="/profilepage"><button className="profileBar"> Edit Profile </button></Link>
                            <Link to="/logout"><button onClick={handleLogout} className="profileBar"> Logout </button></Link>
                        </>
                    ) : (
                       <Link to="/login"><button className="profileBar"> Login </button></Link>
                    )}

                   
                
                   
                    </nav>
                <div className="search-container">
                <SearchBar />
                </div>                  

                {/*Old homepage box layout*/}
                {/* <div id="classesBox">
                    <div className="behindClassesBox"> </div>
                    {classData.map((classItem, index) => ( //iterates over each item in classData and passes its information to a Card
                        <Card 
                            key={index} // Providing a unique key for each card
                            title={classItem.title}
                            description={classItem.description}
                            className={`card card-${index % 3 == 0 ? "whipple-blue" : index % 3 == 1 ? "behr-ice-cave" : "valspar-paint-prairie-dance"}`} //alternates color of each card
                        />
                    ))}
                   

                </div> */}

            </div>
    
            


      
        </div>
    );
};
 
export default Home;
