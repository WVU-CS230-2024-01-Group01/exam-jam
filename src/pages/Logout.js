import React from 'react';

const Logout = () => {

  const handleLogout = () => {
    // Perform any necessary logout actions (e.g., clearing session/local storage)
    // Redirect the user to the login page or any other desired destination
    // Redirect to the login page after logout


    
  };

  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
