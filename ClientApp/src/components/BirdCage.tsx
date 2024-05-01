import React from "react";
import Junior from "../assets/junior-bird.jpeg"

export function BirdCage() {
    return (
        <article className="bird-cage">
            <aside>
                <h3 className="mb-3"><strong>Junior</strong></h3>
                <p className="mb-1"><strong>Season:</strong> Spring</p>
                <p className="mb-1"><strong>Holiday:</strong> Easter</p>
                <p className="mb-1"><strong>Year:</strong> 2024</p>
                <p className="mb-1"><strong>Adopted From:</strong> Target</p>
            </aside>
            
            <div className="h-100">
              <img src={Junior} alt="Fabric Bird" />  
            </div>  
        </article>
    )
}