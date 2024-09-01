import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa'; // Import the user icon

function Menu() {
    const navigate = useNavigate();

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from localStorage
        navigate('/login'); // Redirect to login
    };

    // Check if user is logged in based on the token in localStorage
    const token = localStorage.getItem('token');
    const user = token ? JSON.parse(atob(token.split('.')[1])) : null; // Decode the token to get user info

    return (
        <nav className="navbar navbar-expand-lg bg-dark rounded" aria-label="Thirteenth navbar example">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="true" aria-label="Toggle navigation" style={{ color: "white" }}>
                    <span className="navbar-toggler-icon navbar-dark"></span>
                </button>
                <Link className="navbar-brand col-lg-2 me-0" to="/" style={{ fontWeight: 600, fontSize: 20, color: "white" }}>DO CONNECT</Link>
                <div className="collapse navbar-collapse d-lg-flex" id="navbarsExample11">

                    <ul className="navbar-nav col-lg-8 justify-content-lg-center">
                        <Link className="nav-link active" aria-current="page" to="/"><li className="nav-item" style={{ marginRight: 30, color: "white", fontWeight: 600 }}>Home</li></Link>

                        {user && user.role === 'user' && (
                            <Link className="nav-link active" aria-current="page" to="/createquestion"><li className="nav-item" style={{ marginRight: 30, color: "white", fontWeight: 600 }}>Post Question</li></Link>
                        )}

                        {user && user.role === 'user' && (
                            <Link className="nav-link active" aria-current="page" to="/listallquestions"><li className="nav-item" style={{ marginRight: 30, color: "white", fontWeight: 600 }}>Questions</li></Link>
                        )}

                        {user && user.role === 'admin' && (
                            <Link className="nav-link active" aria-current="page" to="/adminquestions"><li className="nav-item" style={{ marginRight: 30, color: "white", fontWeight: 600 }}>Questions</li></Link>
                        )}

                        {user && user.role === 'admin' && (
                            <Link className="nav-link active" aria-current="page" to="/allusers"><li className="nav-item" style={{ marginRight: 30, color: "white", fontWeight: 600 }}>Users</li></Link>
                        )}
                    </ul>
                </div>

                {user && (
                    <div className="d-flex align-items-center text-white" style={{ marginRight: 20 }}>
                        <FaUserCircle size={30} className="me-2" /> {/* Profile Icon */}
                        <div>
                            <strong>{user.username}</strong> <br />
                            <small>{user.role}</small>
                        </div>
                        <button className="btn btn-link text-white ms-3" onClick={handleLogout} style={{ textDecoration: 'none' }}>
                            Logout
                        </button>
                    </div>
                )}

                {!user && (
                    <div className="dropdown" style={{ marginRight: 20 }}>
                        <button type="button" className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                            Menu
                        </button>
                        <ul className="dropdown-menu dropdown-menu-lg-end dropdown-menu-dark">
                            <li><Link className="dropdown-item" to="/login">Login</Link></li>
                            <li><Link className="dropdown-item" to="/register">Register</Link></li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Menu;
