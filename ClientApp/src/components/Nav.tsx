import React from "react";
import { GiBirdHouse } from "react-icons/gi";
import IconCenter from "./IconCenter";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../api/auth";

export function Nav() {
    const loginStatus = isLoggedIn()

    return (
        <header className="nav-header">
            <nav>
                <div>
                    {/* Should only show if user is logged in */}
                    {
                        loginStatus ? (
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
                        loginStatus ? (
                            <>
                                <Link to='/birdcage-list'>
                                    <button className="blue-outline">
                                        Logout
                                    </button>
                                </Link>                     
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