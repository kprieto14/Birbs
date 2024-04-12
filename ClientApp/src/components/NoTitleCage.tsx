import React from "react";
import { Card, Col } from "react-bootstrap";
import Junior from "../assets/junior-bird.jpeg"

export function NoTitleCage() {
    return (
        <Card className="bird-cage-card">
            <Card.Body>
                <Card.Img variant="" src={Junior}/>
                
                <Col className="text-center">
                    <Card.Text><span className="bold-underline h5">Name</span>: Junior</Card.Text>
                    <Card.Text><span className="bold-underline h5">User</span>: Kristy</Card.Text>
                    <Card.Text><span className="bold-underline h5">Season</span>: Spring</Card.Text>
                    <Card.Text><span className="bold-underline h5">Holiday</span>: Easter</Card.Text>
                    <Card.Text><span className="bold-underline h5">Year</span>: 2024</Card.Text>
                </Col>
            </Card.Body>
        </Card>
    )
}