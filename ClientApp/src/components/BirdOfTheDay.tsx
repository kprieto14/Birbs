import React from "react";
import { GiBirdCage } from "react-icons/gi";
import Junior from "../assets/junior-bird.jpeg"

export function BirdOfTheDay() {
    return (
        <article className="bird-day">
            <aside>
                <img src={Junior} alt="Fabric bird of the day"/>
            </aside>

            <header className="day-header">
                <GiBirdCage className="react-icon"/>
                <h3>Bird of the Day</h3>
                <GiBirdCage className="react-icon"/>
            </header>

            <div className="bird-day-info">
                <h3 className="mb-3"><strong>Junior</strong></h3>
                <h4 className="mb-2"><strong>User:</strong> Me</h4>
                <h4 className="mb-2"><strong>Season:</strong> Spring</h4>
                <h4 className="mb-2"><strong>Holiday:</strong> Easter</h4>
                <h4 className="mb-2"><strong>Year:</strong> 2024</h4>
            </div>
        </article>
    )
}