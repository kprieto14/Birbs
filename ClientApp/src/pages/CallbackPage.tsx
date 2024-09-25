import React from "react";
import { FaUser } from "react-icons/fa6";

export function CallbackPage() {
    return (
        <section className="call-back">
            <div className="middle-card w-100">
                <FaUser className="react-icon mb-3"/>
                <h2 className="mb-4">Welcome!</h2>
            </div>
        </section>  
    )
}