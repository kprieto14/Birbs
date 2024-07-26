import React, { useEffect, useState } from "react";
import { Col, Collapse, Dropdown, DropdownButton, Row } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { BirdCage } from "../components/BirdCage";
import { getUser } from "../api/auth";
import { Bird } from "../types";
import birdAPI from "../api/birdAPI";
import IconCenter from "../components/IconCenter";
import useToggle from "../hooks/useToggle";

export function BirdCageList() {
    const seasons = ['Spring', 'Summer', 'Fall', 'Winter']

    const user = getUser()

    const nullBirdList: Bird[] = [];

    const { data: birdsList = nullBirdList } = useQuery<Bird[]>({
        queryKey: ['birds'],
        queryFn: () => birdAPI.getBirds(Number(user.id))
    })

    const [isOpenSpring, toggleSpring] = useToggle(true);
    const [isOpenSummer, toggleSummer] = useToggle(true);
    const [isOpenFall, toggleFall] = useToggle(true);
    const [isOpenWinter, toggleWinter] = useToggle(true);

    const [ sortedBirds, setSortedBirds ] = useState<Bird[]>([])
    const [ sortText, setSortText ] = useState<string>("ABC")

    // Set the birds when they load by name
    useEffect(() => setSortedBirds(birdsList.sort((bird, b) => bird.name.localeCompare(b.name))), [birdsList])

    function toggle(season: string) {
        switch(season) {
            case "Spring":
                toggleSpring()
                break;

            case "Summer":
                toggleSummer()
                break;
            case "Fall":
                toggleFall()
                break;
            case "Winter":
                toggleWinter()
                break;
        }
    }

    function isOpen(season: string): boolean {
        switch(season) {
            case "Spring":
                return isOpenSpring
            case "Summer":
                return isOpenSummer
            case "Fall":
                return isOpenFall
            case "Winter":
                return isOpenWinter
            default:
                return true;
        }
    }

    // Function to sort the Birdss
    function handleSort(value: string) {
        switch(value) {
            case "ABC":
                const birdsByName = birdsList.sort((bird, b) => bird.name.localeCompare(b.name))

                setSortedBirds([...birdsByName]);
                setSortText("ABC");
                break;

            case "oldest":
                const birdsByOldest = birdsList.sort((year, y) => year.yearPublished - y.yearPublished)

                setSortedBirds([...birdsByOldest]);
                setSortText("Oldest");
                break;

            case "newest":
                const birdsByNewest = birdsList.sort((year, y) => y.yearPublished - year.yearPublished)

                setSortedBirds([...birdsByNewest]);
                setSortText("Newest");
                break;
        }            
    }

    return (
        <main className="bird-cage-list">
            <header>
                <Row className="mb-3">
                    <Col md={8}>
                        <h1>Hello, {user.firstName}!</h1> 
                    </Col>

                    <Col md={4}>
                        <div className="float-end d-flex">
                            <DropdownButton 
                                id="blue-outline" 
                                title={`Sort By: ${sortText}`} 
                                className="arrow-none cursor-pointer me-3"
                                align={{ md: "end"}}
                            >
                                <Dropdown.Item onClick={ (e) => handleSort("ABC") } className="text-center">
                                    ABC
                                </Dropdown.Item>

                                <Dropdown.Item onClick={ (e) => handleSort("newest") } className="text-center">
                                    Newest
                                </Dropdown.Item>

                                <Dropdown.Item onClick={ (e) => handleSort("oldest") } className="text-center">
                                    Oldest
                                </Dropdown.Item>
                            </DropdownButton>

                            <Link to='/add-bird'>
                                <button className="gradient-button">
                                    <IconCenter reactIcon={<FaPlus />} text="Add Bird"/>
                                </button>
                            </Link>
                        </div>
                    </Col>
                </Row>
                
                <h5>A list of your birds by season, you may sort your birds by name or year in each season.</h5>
                <h5 className="mt-1 pb-5">You may also add a bird if you want.</h5>
            </header>

            <div className="bird-list mt-5">
                {
                    // Goes through each of the seasons to create a collapseable section based on the list length
                    seasons.map((season, index) => (
                        birdsList.filter(seasonName => seasonName.seasonCollection === season).length > 0 ? 
                            <section key={index}>
                            <header className="season-header mb-3" onClick={() => toggle(season)}>
                                {
                                    // If the current collapseable section is opened, return a pic of an arrow facing down, else return an arrow to the left
                                    isOpen(season) ?
                                    <FaAngleDown className="season-icon" /> :
                                    <FaAngleRight className="season-icon" />
                                }
                                <h2>Season: {season}</h2>
                            </header>

                            <Collapse in={isOpen(season)}>
                                <Row>
                                    {
                                        // SORT HERE USING A STATE? DEFAULT STATE BEING BY ID UNLESS USER CHOOSES OTHERWISE
                                        // Filters through the bird list by season and generates bird cards by season
                                        sortedBirds.filter(seasonName => seasonName.seasonCollection === season)
                                            .map((bird, index) => (
                                                <Col md={4} className="mb-5" key={index}>
                                                    <BirdCage
                                                        id={ Number(bird.id) } 
                                                        name={ bird.name }
                                                        photoURL= { bird.photoURL }
                                                        season={ bird.seasonCollection }
                                                        holiday={ bird.holidayCollection }
                                                        year={ bird.yearPublished }
                                                        adoptedFrom={ bird.adoptedFrom }
                                                    />
                                                </Col> 
                                        ))
                                    }
                                </Row>
                            </Collapse>
                        </section> 
                        : 
                        // If there are no birds, generate a section that says there are no birds
                        <section key={index}>
                            <header className="season-header mb-3" onClick={() => toggle(season)}>
                                {
                                    // If the current collapseable section is opened, return a pic of an arrow facing down, else return an arrow to the left
                                    isOpen(season) ?
                                    <FaAngleDown className="season-icon" /> :
                                    <FaAngleRight className="season-icon" />
                                }
                                <h2>Season: {season}</h2>
                            </header>

                            <Collapse in={isOpen(season)}>
                                <div>
                                    <h5>There are no bird cages to show here.</h5>
                                </div>
                            </Collapse>
                        </section>
                ))}
            </div>
        </main>
    )
}