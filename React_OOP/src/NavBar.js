import React from 'react'
import {Link} from 'react-router-dom'

function NavBar() {
    return(
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/bisection">Bisection</Link></li>
            <li><Link to="/FalsePosition">False Position</Link></li>
            <li><Link to="/onepoint">Onepoint</Link></li>
            <li><Link to="/newton-raphson">Newton-Raphson</Link></li>
            <li><Link to="/secant">Secant</Link></li>
        </ul>

    );

}

export default NavBar;