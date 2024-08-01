// import { Link,  Router, Routes } from "react-router-dom";

import "../../assets/css/navbar.css"
import {Link, NavLink} from "react-router-dom";


function Navbar(){

    return(
        <nav className="navbar">

            <Link to="/" className="title">Sakila</Link>

            <ul className="nav">

                <li className="nav-item">
                    <NavLink className="nav-link" to="/">Home</NavLink>
                </li>

                <li className="nav-item">
                    <NavLink className="nav-link" to="/actors">Actors</NavLink>
                </li>

                <li className="nav-item">
                    <NavLink className="nav-link" to="/films">Films</NavLink>
                </li>


                <li className="nav-item">
                    <NavLink className="nav-link" to="/add-actor">Add Actors</NavLink>
                </li>

            </ul>
        </nav>


    );
}

export default Navbar;