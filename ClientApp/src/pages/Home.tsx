import React from "react";
import { BirdCage } from "../components/BirdCage";

export function Home() {
    return (
    <section className="home">
        <h1>Birds of Fabric</h1>
        <h2>A website to track & share your own fabric bird collection</h2>

        <BirdCage />
    </section>
    )
}