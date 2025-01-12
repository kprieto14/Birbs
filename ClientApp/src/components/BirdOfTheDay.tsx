import React from "react";
import { GiBirdCage } from "react-icons/gi";
import { useQuery } from "@tanstack/react-query";
import { CurrentBirdOfTheDay } from "../types";
import birdAPI from "../api/birdAPI";
// import Junior from "../assets/junior-bird.jpeg"

export function BirdOfTheDay() {

    const nullBird: CurrentBirdOfTheDay = {
        Id: 0,
        BirdId: 0,
        bird: null,
        ChosenDate: null,
        UserName: '',
    }

    const { data: birdOfTheDay = nullBird } = useQuery<CurrentBirdOfTheDay>({
        queryKey: [ 'birdOfTheDay' ],
        queryFn: () => birdAPI.getBirdOfTheDay()
    })

    console.log(birdOfTheDay)

    return (
        <article className="bird-day mt-5">
            <aside>
                <img src={ birdOfTheDay.bird?.PhotoURL ? birdOfTheDay.bird?.PhotoURL : '' } alt="Fabric bird of the day"/>
            </aside>

            <header className="day-header">
                <GiBirdCage className="react-icon"/>
                    <h3>Bird of the Day</h3>
                <GiBirdCage className="react-icon"/>
            </header>

            <div className="bird-day-info">
                <h3 className="mb-3"><strong>{ birdOfTheDay.bird?.Name || 'Loading' }</strong></h3>
                <h4 className="mb-2"><strong>User:</strong> { birdOfTheDay.UserName || 'Loading' }</h4>
                <h4 className="mb-2"><strong>Season:</strong> { birdOfTheDay.bird?.SeasonCollection || 'Loading' }</h4>
                <h4 className="mb-2"><strong>Holiday:</strong> { birdOfTheDay.bird?.HolidayCollection || 'Loading' }</h4>
                <h4 className="mb-2"><strong>Year:</strong> { birdOfTheDay.bird?.YearPublished || 'Loading' }</h4>
            </div>
        </article>
    )
}