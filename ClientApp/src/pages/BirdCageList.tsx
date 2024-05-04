import React from "react";
import { Col, Collapse, Row } from "react-bootstrap";
import IconCenter from "../components/IconCenter";
import { FaPlus } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { BirdCage } from "../components/BirdCage";
import useToggle from "../hooks/useToggle";
import { getUserId } from "../api/auth";
import { Bird } from "../types";
import { useQuery } from "@tanstack/react-query";
import birdAPI from "../api/birdAPI";

export function BirdCageList() {
    const seasons = ['Spring', 'Summer', 'Fall', 'Winter']

    const user = getUserId()

    const nullBirdList: Bird[] = [];

    const { data: birdsList = nullBirdList } = useQuery<Bird[]>({
        queryKey: ['birds'],
        queryFn: () => birdAPI.getBirds(Number(user))
    })

    console.log(birdsList)
    // const springBirds = []
    // const summerBirds
    // const fallBirds
    // const winterBirds
    // // Make a list of unique payor names
    // let uniquePayorNames = [...new Set(feeSchedules.map(item => item.payorName))];

    const [isOpenSpring, toggleSpring] = useToggle(true);
    const [isOpenSummer, toggleSummer] = useToggle(true);
    const [isOpenFall, toggleFall] = useToggle(true);
    const [isOpenWinter, toggleWinter] = useToggle(true);

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

    return (
        <main className="bird-cage-list">
            <header>
                <Row className="mb-3">
                    <Col md={8}>
                        <h1>Hello, Username!</h1> 
                    </Col>

                    <Col md={4}>
                        <div className="float-end">
                            <button className="blue-outline me-3">
                                <IconCenter reactIcon={<TiArrowSortedDown />} text="Sort By"/>
                            </button>

                            <Link to='/add-bird'>
                                <button className="gradient-button">
                                    <IconCenter reactIcon={<FaPlus />} text="Add Bird"/>
                                </button>
                            </Link>
                        </div>
                    </Col>
                </Row>
                
                <p>A list of your birds by season, you may sort your birds by name or year in each season.</p>
                <p className="pb-5">You may also add a bird if you want.</p>
            </header>

            <div className="bird-list mt-5">
                {
                    seasons.map((season, index) => (
                    <section key={index}>
                        <header className="season-header mb-3" onClick={() => toggle(season)}>
                            <FaAngleDown className="season-icon"/>
                            <h2>Season: {season}</h2>
                        </header>

                        <Collapse in={isOpen(season)}>
                            <div>
                                <div className="mb-5 season-list">
                                    <BirdCage />
                                    <BirdCage />
                                    <BirdCage />
                                </div>  
                            </div>
                        </Collapse>
                    </section>
                ))}
            </div>
        </main>
    )
}