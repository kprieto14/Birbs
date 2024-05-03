import React from "react";
import { Link } from "react-router-dom";

export function ErrorPage() {
    return (
        <main className="error-page">
            <section>
                <h3 className="mb-5">Oops, looks like you got lost</h3>

                {/* Make this go back to previous page user was in eventually */}
                <Link to={'/'}>
                    <button className="gradient-button w-100">Go Back</button>
                </Link>             
            </section>
        </main>
    )
}