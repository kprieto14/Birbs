import React from "react";
import { GiBirdCage } from "react-icons/gi";
import Junior from "../assets/junior-bird.jpeg"
import { CurrentBirdOfTheDay } from "../types";
import birdAPI from "../api/birdAPI";
import { useQuery } from "@tanstack/react-query";

export function BirdOfTheDay() {

    const nullBird: CurrentBirdOfTheDay = {
        id: 0,
        birdId: 0,
        bird: null,
        chosenDate: null
    }

    const { data: birdOfTheDay = nullBird } = useQuery<CurrentBirdOfTheDay>({
        queryKey: ['birdOfTheDay'],
        queryFn: () => birdAPI.getBirdOfTheDay()
    })

    console.log(birdOfTheDay)

    return (
        <article className="bird-day mt-5">
            <aside>
                <img src={Junior} alt="Fabric bird of the day"/>
            </aside>

            <header className="day-header">
                <GiBirdCage className="react-icon"/>
                <h3>Bird of the Day</h3>
                <GiBirdCage className="react-icon"/>
            </header>

            <div className="bird-day-info">
                <h3 className="mb-3"><strong>{birdOfTheDay.bird?.name}</strong></h3>
                <h4 className="mb-2"><strong>User:</strong> Me</h4>
                <h4 className="mb-2"><strong>Season:</strong> Spring</h4>
                <h4 className="mb-2"><strong>Holiday:</strong> Easter</h4>
                <h4 className="mb-2"><strong>Year:</strong> 2024</h4>
            </div>
        </article>
    )
}