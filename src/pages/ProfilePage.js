import React from 'react';

export default function ProfilePage() {
  return (
    <section style={{ backgroundColor: '#eee' }}>
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <nav className="bg-light rounded-3 p-3 mb-4">
              <a href="./pages/Home" className="breadcrumb-item">Home</a>
              <a href="#" className="breadcrumb-item">User</a>
              <span className="breadcrumb-item active">User Profile</span>
            </nav>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                />
                <p className="text-muted mb-1">Student</p>
                <p className="text-muted mb-4">West Virginia University</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fas fa-globe fa-lg text-warning"></i>
                    <span>https://mdbootstrap.com</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fab fa-github fa-lg" style={{ color: '#333333' }}></i>
                    <span>mdbootstrap</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fab fa-twitter fa-lg" style={{ color: '#55acee' }}></i>
                    <span>@mdbootstrap</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fab fa-instagram fa-lg" style={{ color: '#ac2bac' }}></i>
                    <span>mdbootstrap</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fab fa-facebook fa-lg" style={{ color: '#3b5998' }}></i>
                    <span>mdbootstrap</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                  <p className="card-text">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="card-text text-muted">Name</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="card-text">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="card-text text-muted">example@example.com</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="card-text">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="card-text text-muted">(***) ***-****</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="card-text">Mobile</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="card-text text-muted">(***) ***-****</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="card-text">Address</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="card-text text-muted">West Virginia University</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <p className="card-text mb-4"><span className="text-primary font-italic me-1">saved</span> Study Sets</p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <p className="card-text mb-4"><span className="text-primary font-italic me-1">created</span> Study Sets</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}
