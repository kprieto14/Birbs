import React from "react";
import { BirdOfTheDay } from "../components/BirdOfTheDay";

export function Home() {
    return (
    <main className="home">
        <header className="home-header">
            <h1 className="mb-4">Birds of Fabric</h1>
            <h2 className="mb-5">A website to track ( & hopefully in the future share) your own fabric bird collection</h2>
        </header>

        <BirdOfTheDay />         
    </main>
    )
}