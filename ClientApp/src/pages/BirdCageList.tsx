import React from "react";
import { Col, Row } from "react-bootstrap";
import IconCenter from "../components/IconCenter";
import { FaPlus } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";

export function BirdCageList() {
    return (
        <main className="bird-list">
            <Row>
                <Col md={8}>
                    <h2>Hello, Username!</h2> 
                </Col>

                <Col md={4}>
                    <div className="float-end">
                        <button className="blue-outline me-3">
                            <IconCenter reactIcon={<TiArrowSortedDown />} text="Sort By"/>
                        </button>

                        <button className="gradient-button">
                            <IconCenter reactIcon={<FaPlus />} text="Add Bird"/>
                        </button>
                    </div>
                </Col>
               
            </Row>
            
            <p>Here is some text to describe the page</p>
            
        </main>
    )
}