import '../App.css';
import React from 'react';
import jwt_decode from "jwt-decode";

import Cookies from 'universal-cookie';

export default function NavBar(){
    const cookies = new Cookies();
    var loggedIn = cookies.get('JWT_Token');
    var loggedInBool;
    loggedIn != null ? loggedInBool = true : loggedInBool = false;
    var userName;
    loggedInBool ? userName = GetUsername() : userName = "";
    

    function LogOut(){
        cookies.remove('JWT_Token');
        window.location.href = "/";
    }

    function GetUsername() {
        var token = cookies.get('JWT_Token');
        var decoded = jwt_decode(token);
        return decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    }

    return (
        <div>
            
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                    GarageLog
                    </a>
                    {
                    loggedInBool ? 
                    <div className="NavBarLinks">
                            <div className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/MyVehciles">My Vehciles</a>
                            </div>
                            <div className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/MyAccount">My Account</a>
                            </div>
                            <div className="UserBox">
                                <p className=" nav-link">Logged in as: <strong>{userName}</strong></p>
                                <a className="nav-link float-end" href="/" onClick={LogOut}>Logout</a>
                            </div>
                    </div>
                    :
                    <div className="">
                        <h5 className="nav-link active">Login/Register</h5>
                    </div> 
                    }
                </div>
            </nav>
        </div>
    )
}