import React from "react";
import { Col, Row } from "react-bootstrap";
import IconCenter from "../components/IconCenter";
import { FaPlus } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { NoTitleCage } from "../components/NoTitleCage";

export function BirdCageList() {
    const seasons = ['Spring', 'Summer', 'Fall', 'Winter']

    return (
        <main className="bird-list">
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
                <p>You may also add a bird if you so wish.</p>
            </header>

            <div className="bird-list">
                {
                    seasons.map((season, index) => (
                    <section key={index}>
                        <header className="season-header mb-3">
                            <FaAngleDown className="season-icon"/>
                            <h2>Season: {season}</h2>
                        </header>

                        <article className="mb-5">
                            <NoTitleCage />
                        </article>
                    </section>
                ))}
            </div>
        </main>
    )
}