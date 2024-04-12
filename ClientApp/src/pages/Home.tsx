import React from "react";
import { BirdCage } from "../components/BirdCage";

export function Home() {
    return (
    <section className="home">
        <h1>Birds of Fabric</h1>
        <h2>A website to keep track of your own fabric bird collection</h2>

        <BirdCage />

        <h3>Bird of the Day</h3>
    </section>
    )
}