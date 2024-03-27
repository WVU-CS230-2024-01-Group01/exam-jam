
const Logout = () => {
   
        
        localStorage.removeItem('user');
        window.location.href = '/login'; 
    };


export default Logout;
