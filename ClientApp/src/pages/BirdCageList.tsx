import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import IconCenter from "../components/IconCenter";
import { FaSortDown } from "react-icons/fa6";
import { BirdCage } from "../components/BirdCage";

export function BirdCageList() {
    return (
        <section className="bird-list">
            <h3>Hello, User!</h3>

            <Row>
                <Col>
                    <Link to='/add-bird'><Button>Add Birdhouse or Follow</Button></Link>  
                </Col>
            
                <Col>
                    <IconCenter reactIcon={<FaSortDown />} text="View By"/>
                    <IconCenter reactIcon={<FaSortDown />} text="Sort By"/>
                </Col>
            </Row>

            <h3>Season: Spring</h3>
            <div className="bird-grid">
                <BirdCage />
                <BirdCage />
                <BirdCage />
            </div>

            <h3>Season: Summer</h3>
            <div className="bird-grid">
                <BirdCage />
                <BirdCage />
                <BirdCage />
            </div>
            
        </section>
    )
}