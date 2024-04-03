import React from "react";
import { GiBirdHouse } from "react-icons/gi";
import birdLogo from '../assets/bird.png'
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

export function Nav() {
    return (
    <nav>
        <Container>
                <Row className="d-flex align-items-center ">
                    <Col sm={4} className="d-flex justify-content-start">
                        <Link to={'/'}>
                            <div style={{display: "flex", justifyContent: "center", gap:"5px"}}>
                                <GiBirdHouse size={30} title="Bird cartoon facing to the right"/>
                                <span> My Aviary</span>
                            </div>
                        </Link>
                    </Col>
                    
                    <Col sm={4} className="d-flex justify-content-center">
                            <img src={ birdLogo } alt="Logo of a colorful bird" />
                    </Col>
                    
                    <Col sm={4} className="d-flex justify-content-end">
                        <Link to={'/'}>Login</Link>
                    </Col>
                </Row>
        </Container>
    </nav>
    )
}