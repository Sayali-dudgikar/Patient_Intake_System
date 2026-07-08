import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <h2>Patient Intake System</h2>

            <div>

                <NavLink to="/">Register</NavLink>

                <NavLink to="/search">Search</NavLink>

                <NavLink to="/dashboard">Dashboard</NavLink>

            </div>

        </nav>
    );
}

export default Navbar;