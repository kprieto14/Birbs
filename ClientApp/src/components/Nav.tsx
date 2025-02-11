import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { GiBirdHouse } from "react-icons/gi";
// import { isLoggedIn, logout } from "../api/auth";
import IconCenter from "./IconCenter";

export function Nav() {
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

    console.log(isAuthenticated)
    console.log(user)

    const handleSignUp = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: "/",
            },
            authorizationParams: {
                screen_hint: "signup",
            },
        })
    }

    const handleLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: "/",
            },
        })
    }

    const handleLogout = () => {
        logout({
          logoutParams: {
            returnTo: window.location.origin,
          },
        })
    }

    // function handleLogout() {
    //     logout()
    
    //     window.location.assign('/')
    // }

    return (
        <header className="nav-header">
            <nav>
                <div>
                    {/* Should only show if user is logged in */}
                    {
                        isAuthenticated ? (
                            <>
                                <Link to={'/'}>
                                    <button className='blue-outline'>
                                        <IconCenter reactIcon={ <GiBirdHouse /> } text="Home"/>
                                    </button>
                                </Link>   

                                    <Link to='/birdcage-list'>
                                    <button className="blue-outline">
                                        My Aviary
                                    </button>
                                </Link>                     
                            </>
                        ) : null
                    }
                </div>

                <div>
                    {/* If user is logged in, make button to logout show, else show sign-in and register buttons */}
                    {
                        isAuthenticated ? (
                            <>
                                <button className='blue-outline' onClick={ handleLogout }>
                                    Logout
                                </button>                 
                            </>
                        ) 
                        : 
                        <>

                            <button className='blue-outline' onClick={ handleLogin }>
                                Log In
                            </button>
                            <button className='gradient-button' onClick={ handleSignUp }>
                                Sign-Up
                            </button>    

                            {/* <Link to='/login'>
                                <button className="blue-outline">
                                    Log In
                                </button>
                            </Link> */}
                            {/* <Link to='/register'>
                                <button className="gradient-button">
                                    Register
                                </button>  
                            </Link> */}

                        </>
                    }
                </div>
            </nav>
        </header>
    )
}