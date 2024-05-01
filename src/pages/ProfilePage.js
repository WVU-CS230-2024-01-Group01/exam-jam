import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Button, Card, Modal } from 'react-bootstrap'; 
import {
  faUser, faUserCircle, faUserSecret, faUserNinja,
  faCat, faDog, faHorse, faOtter, faFrog, faDragon, faComputer, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import "./ProfilePage.css";
import "./CreateAccount";

// Array of available icons
const availableIcons = [faUser, faUserCircle, faUserSecret, faUserNinja,
  faCat, faDog, faHorse, faOtter, faFrog, faDragon, faComputer
];

// Functional component "ProfilePage"
const ProfilePage = () => {
    // State variables
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isProfessor, setIsProfessor] = useState(false);
    const [createdSets, setCreatedSets] = useState('');

    // Fetch account details
    useEffect(()=>{
        fetchAccount();
    }, []);

    // Function to handle icon selection
    const handleIconSelect = (icon, index) => {
        setSelectedIcon(icon);
        setModalOpen(false);
        updateIcon(index);
    };

    // Function to fetch account details
    const fetchAccount = async () => {
        const username = localStorage.getItem('user');
        const question = "FETCH";
        if (username) {
          try {
            const res = await axios.post("http://localhost:8081/accounts", {question, username});
            setUsername(res.data.username);
            setEmail(res.data.email);
            setSelectedIcon(availableIcons[res.data.picture]);
            setIsProfessor(res.data.isProfessor);
            setCreatedSets(res.data.created_sets);
          } catch (err) {
            console.log(err);
          } 
        }
    };

    // Function to update selected icon
    const updateIcon = async (index) => {
        const question = "UPDATE_PICTURE";
        try {
            const res = await axios.put("http://localhost:8081/accounts", {question, index, username});
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    // Component rendering
    return (
        <section className="profile-page">
            {/* Linking Bootstrap stylesheet */}
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
                integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                crossOrigin="anonymous"
            />
            <div className="hero">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="banner">
                              <div className="logo-container">
                                <img className="logo" src="/logoimage.jpeg" alt="ExamJam Logo" width="451.5px"  length="164.25px"/>
                                <Link to="/home" className="btn btn-primary">Homepage</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <Card className="mb-4">
                            <Card.Body className="text-center">
                                {/* Display selected icon */}
                                {selectedIcon ? (
                                    <FontAwesomeIcon icon={selectedIcon} size="6x" />
                                ) : (
                                    <FontAwesomeIcon icon={faUserCircle} size="6x" />
                                )}
                                <div className="mt-3">
                                    {/* Button to open modal for selecting profile icon */}
                                    <Button
                                        variant="secondary"
                                        onClick={() => setModalOpen(true)}
                                    >
                                        Select Profile Icon
                                    </Button>
                                </div>
                                {/* Display user type */}
                                <p className="text-muted mb-1">{isProfessor ? 'Professor' : 'Student'}</p>
                                <p className="text-muted mb-4">West Virginia University</p>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-lg-8">
                        <Card className="mb-4">
                            <Card.Body>
                                <p className="card-text text-muted">Username: {username}</p>
                                <hr />
                                <p className="card-text">Email:</p>
                                <p className="card-text text-muted">{email}</p>
                            </Card.Body>
                        </Card>
                        <Card className="mb-4">
                            <Card.Body>
                                <h5 className="card-title">Favorited Study Sets</h5>
                                <Card bg="light" className="mb-3">
                                    <Card.Body>
                                        <p className="card-text text-muted">Favorited Study Sets Will Appear Here</p>
                                    </Card.Body>
                                </Card>
                            </Card.Body>
                        </Card>
                        <Card className="mb-4">
                            <Card.Body>
                                <h5 className="card-title">Created Study Sets</h5>
                                <Card bg="light" className="mb-3">
                                    <Card.Body>
                                        <p className="card-text text-muted">{createdSets}</p>
                                    </Card.Body>
                                </Card>
                            </Card.Body>
                        </Card>
                        {/* "Created Classes" card for professors */}
                        {isProfessor && (
                            <Card className="mb-4">
                                <Card.Body>
                                    <h5 className="card-title">Created Classes</h5>
                                    <Card bg="light" className="mb-3">
                                        <Card.Body>
                                            <p className="card-text text-muted">Created Classes Will Appear Here</p>
                                        </Card.Body>
                                    </Card>
                                </Card.Body>
                            </Card>
                        )}
                    </div>
                </div>
            </div>

            {/* Logout button */}
            <div className="logout-btn-container">
                <a href="/logout" className="btn btn-danger logout-btn">
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    Logout
                </a>
            </div>

            {/* Modal for icon selection */}
            <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Profile Icon</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-content">
                        {/* Display available icons */}
                        {availableIcons.map((icon, index) => (
                            <FontAwesomeIcon
                                key={index}
                                icon={icon}
                                size="2x"
                                className="icon"
                                onClick={() => handleIconSelect(icon, index)}
                            />
                        ))}
                    </div>
                </Modal.Body>
            </Modal>
        </section>
    );
};

export default ProfilePage;

