import React from "react";
import { GiBirdHouse } from "react-icons/gi";
import birdLogo from '../assets/bird.png'
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

export function Nav() {
    return (
    <nav>
        <Container>
                <Row>
                    <Col sm={4} className="d-flex justify-content-start align-items-center">
                        <Link to={'/'}>
                            <div style={{display: "flex", justifyContent: "center", gap:"5px"}}>
                                <GiBirdHouse size={30} title="Bird cartoon facing to the right"/>
                                <span> My Aviary</span>
                            </div>
                        </Link>
                    </Col>
                    
                    <Col sm={4} className="d-flex justify-content-center align-items-center">
                            <img src={ birdLogo } alt="Logo of a colorful bird"/>
                    </Col>
                    
                    <Col sm={4} className="d-flex justify-content-end align-items-center">
                        {/* Span is needed for hover to work correctly for some reason */}
                        <Link to={'/'}><span>Login</span></Link>
                    </Col>
                </Row>
        </Container>
    </nav>
    )
}