import React from 'react';
import { Link } from 'react-router-dom';

function HeaderComponent(props) {

        return (
            <div >
                <header>
                    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                            <Link to="/home" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                            <Link to="/client" className="nav-link">Exchange</Link>
                            </li>
                            <li className="nav-item">
                            <Link to="/custodian" className="nav-link">Custodian</Link>
                            </li>
                            <li className="nav-item">
                            <Link to="/settlement" className="nav-link">Settlement</Link>
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
        );
}

export default HeaderComponent;