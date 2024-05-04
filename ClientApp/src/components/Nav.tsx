import React from "react";
import { GiBirdHouse } from "react-icons/gi";
import IconCenter from "./IconCenter";
import { Link } from "react-router-dom";
import { isLoggedIn, logout } from "../api/auth";

export function Nav() {
    function handleLogout() {
        logout()
    
        window.location.assign('/')
    }

    return (
        <header className="nav-header">
            <nav>
                <div>
                    {/* Should only show if user is logged in */}
                    {
                        isLoggedIn() ? (
                            <>
                                <Link to={'/'}>
                                    <button className="blue-outline">
                                        <IconCenter reactIcon={ <GiBirdHouse/> } text="Home"/>
                                    </button>
                                </Link>   

                                    <Link to='/birdcage-list'>
                                    <button className="blue-outline">
                                        My Aviary
                                    </button>
                                </Link>                     
                            </>
                        ) 
                        : null
                    }
                </div>

                <div>
                    {/* If user is logged in, make button to logout show, else show sign-in and register buttons */}
                    {
                        isLoggedIn() ? (
                            <>
                                <button className="blue-outline" onClick={handleLogout}>
                                    Logout
                                </button>                 
                            </>
                        ) 
                        : 
                        <>
                            <Link to='/login'>
                                <button className="blue-outline">
                                    Log In
                                </button>
                            </Link>

                            <Link to='/register'>
                                <button className="gradient-button">
                                    Register
                                </button>  
                            </Link>
                        </>
                    }
                </div>
            </nav>
        </header>
    )
}