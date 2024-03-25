import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';
import {
  faUser, faUserCircle, faUserSecret, faUserNinja,
  faCat, faDog, faHorse, faOtter, faFrog, faDragon, faHeart,
  faMusic, faSun, faComputer, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import "../pages/ProfilePage.css";

const availableIcons = [faUser, faUserCircle, faUserSecret, faUserNinja,
  faCat, faDog, faHorse, faOtter, faFrog, faDragon, faHeart,
  faMusic, faSun, faComputer
];

const ProfilePage = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');
  const email = queryParams.get('email');

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
    setModalOpen(false);
  };

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <nav className="bg-light rounded-3 p-3 mb-4">
              <a href="./pages/Home" className="breadcrumb-item">Home</a>
            </nav>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                {selectedIcon ? (
                  <FontAwesomeIcon icon={selectedIcon} size="6x" />
                ) : (
                  <FontAwesomeIcon icon={faUserCircle} size="6x" />
                )}
                <div className="mt-3">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setModalOpen(true)}
                  >
                    Select profile icon
                  </button>
                </div>
                <p className="text-muted mb-1">Student</p>
                <p className="text-muted mb-4">West Virginia University</p>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-9">
                    <p className="card-text text-muted">Username {username}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="card-text">Email: {email}</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="card-text text-muted">example@example.com</p>
                  </div>
                </div>
                <hr />
              </div>
            </div>

            <div className="container">
              <div className="card text-white bg-primary mb-3">
                <div className="card-body">
                  <h5 className="card-title">Saved Study Sets</h5>
                  <p className="card-text">Favorited study sets will go here.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Created Study Sets</h5>
              <p className="card-text">Created study sets will go here.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Logout button */}
      <div className="logout-btn-container">
        <a href="/login" className="btn btn-danger logout-btn">
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
                  onClick={() => handleIconSelect(icon)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProfilePage;
