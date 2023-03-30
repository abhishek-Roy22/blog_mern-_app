import { Link } from "react-router-dom";
import "./Navbar.scss";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <header>
      <div className="navbar">
        <div className="logo">
          <Link className="link" to="/">
            <h1>RoyBlog.</h1>
          </Link>
        </div>
        <div className="links">
          {user && (
            <Link className="link" to={"/write"}>
              <span>Write</span>
            </Link>
          )}
          {user && (
            <div className="user">
              <span>{user.email}</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
          {!user && (
            <>
              <Link className="link" to={"/login"}>
                <span>Login</span>
              </Link>
              <Link to="/register" className="link">
                <span>SignUp</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
