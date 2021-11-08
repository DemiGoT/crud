import './header.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    return (
        <header className="App-header">
            <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/crud">Crud List</Link>
                </li>
            </ul>
        </header>
    );
}


export default Header;
