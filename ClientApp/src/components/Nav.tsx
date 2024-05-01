import React from "react";
import { GiBirdHouse } from "react-icons/gi";
import IconCenter from "./IconCenter";
import { Link } from "react-router-dom";

export function Nav() {
    return (
    <header>
        <nav>
            <div>
                <button className="blue-outline">
                    <IconCenter reactIcon={ <GiBirdHouse/> } text="Home"/>
                </button>

                <Link to='/birdcage-list'>
                    <button className="blue-outline">
                        My Aviary
                    </button>
                </Link>
             </div>

             <div>
                <Link to='/login'>
                    <button className="blue-outline">
                        Log In
                    </button>
                </Link>
                {/* Make this Change depending on if user is signed in or not */}


                <Link to='/register'>
                    <button className="gradient-button">
                        Register
                    </button>  
                </Link>
            </div>
        </nav>
    </header>
    )
}