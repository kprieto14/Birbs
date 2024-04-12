import React from "react";
import { Card, Col } from "react-bootstrap";
import { GiBirdCage } from "react-icons/gi";
import Junior from "../assets/junior-bird.jpeg"

export function BirdCage() {
    return (
        <Card className="bird-cage-card">
            <Card.Body>
                <Card.Header className="text-center">
                    <div className="bird-card-header">
                        <GiBirdCage size={30}/>
                        <h4>Bird of the Day</h4> 
                        <GiBirdCage size={30}/>  
                    </div>
                </Card.Header>
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