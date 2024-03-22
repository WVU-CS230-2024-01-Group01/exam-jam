import "../pages/ProfilePage.css";


export default function ProfilePage({ useProfilePic = true }) {
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
          </div>


          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                  <p className="card-text">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="card-text text-muted">Username</p>
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

          <div class="container">
            <div class="card text-white bg-primary mb-3">
             <div class="card-body">
              <h5 class="card-title">Saved Study Sets </h5>
              <p class="card-text">Favorited study sets will go here.</p>
            </div>
          </div>
          </div>
          </div>
            <div class="card text-white bg-primary mb-3">
            <div class="card-body">
            <h5 class="card-title">Created Study Sets</h5>
               <p class="card-text">Created study sets will go here.</p>
              </div>
           </div>
           </div>
    </section>
  );
}