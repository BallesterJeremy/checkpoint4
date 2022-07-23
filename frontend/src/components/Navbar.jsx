import { NavLink } from "react-router-dom";
import "./navbar.scss";

export default function Navbar() {
  return (
    <nav className="background-nav">
      <div className="logo-nav-position">
        {/* <NavLink to="/">
          <img  className="logo-nav-size" />
        </NavLink> */}
      </div>
      <div className="nav-position">
        <NavLink
          to="/"
          className={(nav) => (nav.isActive ? "nav-d-active" : undefined)}
        >
          <p>Home</p>
        </NavLink>
        <NavLink
          to="/Languages"
          className={(nav) => (nav.isActive ? "nav-d-active" : undefined)}
        >
          <p>Languages</p>
        </NavLink>
        <NavLink
          to="/Whatever"
          className={(nav) => (nav.isActive ? "nav-d-active" : undefined)}
        >
          <p>Whatever</p>
        </NavLink>
        <NavLink
          to="/admin"
          className={(nav) => (nav.isActive ? "nav-d-active" : undefined)}
        >
          <p>Log In</p>
        </NavLink>
      </div>
    </nav>
  );
}
