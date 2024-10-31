import React from "react";
import { BirdOfTheDay } from "../components/BirdOfTheDay";
import { isLoggedIn } from "../api/auth";
import { useAuth0 } from "@auth0/auth0-react";

export function Home() {
    return (
    <main className="home">
        <header className="home-header">
            <h1 className="mb-4">Birds of Fabric</h1>
            <h2>A website to track ( & hopefully in the future share) your own fabric bird collection</h2>

            {
                isLoggedIn() ? (
                    null
                ) : <h3 className="mt-3">Come join the flock today!</h3>
            }
        </header>

        <BirdOfTheDay />         
    </main>
    )
}