import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles.css";

const Header = () => {
    const { logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <h1>📍 GPS Tracker</h1>
            <button onClick={logout} className="button">Déconnexion</button>
        </nav>
    );
};

export default Header;
