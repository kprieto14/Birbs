import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { GiNestBirds } from "react-icons/gi";

export function AddBird() {
    const yearsOfRelease = ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024']

    return (
        <section className="add-bird">
            <div className="middle-card w-100">
                <GiNestBirds className="react-bird-icon mb-3"/>
                <h2 className="mb-4">Add a Bird to Your Aviary</h2>
                <Form>
                    <Row>
                        <Col>
                            <Form.Label className="h4 mb-3">Name</Form.Label>
                            <Form.Control
                                type="text" 
                                placeholder="Enter name of bird" 
                                className="mb-3 input"
                                size="lg"
                                onChange={() => console.log("Changed")}
                            />
                        </Col>

                        <Col>
                            <Form.Label className="h4 mb-3">Adopted From</Form.Label>
                            <Form.Control
                                type="text" 
                                placeholder="Enter where you bought your bird" 
                                className="mb-3 input"
                                size="lg"
                                onChange={() => console.log("Changed")}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Label className="h4 mb-3">Year</Form.Label>
                            <Form.Select
                                defaultValue="2012" 
                                className="mb-3 input"
                                size="lg"
                                onChange={() => console.log("Changed")}
                            >
                                {yearsOfRelease.map((year, index) => (
                                    <option key={index} value={year}>{year}</option>
                                ))}
                            </Form.Select>
                        </Col>

                        <Col>
                            <Form.Label className="h4 mb-3">Season</Form.Label>
                            <Form.Select
                                defaultValue="Spring" 
                                className="mb-3 input"
                                size="lg"
                                onChange={() => console.log("Changed")}
                            >
                                <option>Spring</option>
                                <option>Summer</option>
                                <option>Fall</option>
                                <option>Winter</option>
                            </Form.Select>
                        </Col>
                    </Row>

                    <Form.Group className="" controlId="">
                        <Form.Label className="h4 mb-3">Holiday</Form.Label>
                        <Form.Control
                                type="text" 
                                placeholder="Enter the holiday of release" 
                                className="mb-3 input"
                                size="lg"
                                onChange={() => console.log("Changed")}
                        />
                    </Form.Group>

                    <button className="gradient-button w-100 mt-3" onClick={() => console.log("Clicked")}>
                        <h5>Add Bird</h5>
                    </button>
                </Form>
            </div>
        </section>
    )
}