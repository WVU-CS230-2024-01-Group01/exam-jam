import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap'; // Import React Bootstrap components
import {
  faUser, faUserCircle, faUserSecret, faUserNinja,
  faCat, faDog, faHorse, faOtter, faFrog, faDragon, faHeart,
  faMusic, faSun, faComputer, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import "./ProfilePage.css";
import "./AccountCreation";


const availableIcons = [faUser, faUserCircle, faUserSecret, faUserNinja,
  faCat, faDog, faHorse, faOtter, faFrog, faDragon, faHeart,
  faMusic, faSun, faComputer
];

const ProfilePage = () => {
    useEffect(()=>{
        fetchAccount()
      })

    const [selectedIcon, setSelectedIcon] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')


    const handleIconSelect = (icon, index) => {
        setSelectedIcon(icon);
        setModalOpen(false);
        updateIcon(index)
    };

    const fetchAccount = async()=> {
        let username = localStorage.getItem('user')
        if (username) {
          try {
            await axios.post("http://localhost:8081/accounts", {username})
            .then( res => {
              setUsername(res.data.username)
              setEmail(res.data.email)
              setSelectedIcon(availableIcons[res.data.picture])
            })
            .catch(err => console.log(err))
          } catch (err) {
            console.log(err)
          } 
      }
    }

    let updateIcon = async(index)=> {
        await axios.put("http://localhost:8081/accounts", {index, username})
        .then( res => {
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }

    return (
      <section className="profile-page">
          <div className="hero">
              <div className="container">
                  <div className="row">
                      <div className="col-lg-12">
                          <div className="banner">
                              <h1>Exam Jam</h1>
                              <Link to="/" className="btn btn-primary">Homepage</Link>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="col-lg-4">
                      <Card className="mb-4">
                          <Card.Body className="text-center">
                              {selectedIcon ? (
                                  <FontAwesomeIcon icon={selectedIcon} size="6x" />
                              ) : (
                                  <FontAwesomeIcon icon={faUserCircle} size="6x" />
                              )}
                              <div className="mt-3">
                                  <Button
                                      variant="secondary"
                                      onClick={() => setModalOpen(true)}
                                  >
                                      Select Profile Icon
                                  </Button>
                              </div>
                              <p className="text-muted mb-1">Student</p>
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
                                      <p className="card-text text-muted">Created Study Sets Will Appear Here</p>
                                  </Card.Body>
                              </Card>
                          </Card.Body>
                      </Card>
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
          {modalOpen && (
              <div className="modal-overlay">
                  <div className="modal">
                      <button className="close-btn" onClick={() => setModalOpen(false)}>
                          &times;
                      </button>
                      <div className="modal-content">
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
                  </div>
              </div>
            
          )}
      </section>
  );
};

export default ProfilePage;
