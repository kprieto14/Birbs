import React from "react";
import Junior from "../assets/junior-bird.jpeg"

export function NoTitleCage() {
    return (
        <article className="bird-cage">
            <aside>
                <h3 className="mb-3">Junior</h3>
                <p><strong>Season:</strong> Spring</p>
                <p><strong>Holiday:</strong> Easter</p>
                <p><strong>Year:</strong> 2024</p>
                <p><strong>Adopted From:</strong> Target</p>
            </aside>
            
            {/* <img src={Junior} alt="Fabric Bird" /> */}
        </article>
    )
}