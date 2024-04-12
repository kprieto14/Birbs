import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { MdAddAPhoto } from "react-icons/md";

export function AddBird() {
    return (
        <section className="add-bird">
            <h3>Add a Bird to Your Aviary</h3>
            <Card className="add-bird-card">
                <Form>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className="h3"><span style={{display: "flex", alignItems: "center", gap:"5px"}}><MdAddAPhoto /> Upload Bird Photo</span></Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>

                    <Row>
                        <Col>
                            <Form.Group className="" controlId="">
                                <Form.Label className="h3">Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter bird name"></Form.Control>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="" controlId="">
                                <Form.Label className="h3">Adopted From</Form.Label>
                                <Form.Control type="text" placeholder="Enter store name"></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    

                    <Row>
                        <Col>
                            <Form.Group className="" controlId="">
                                <Form.Label className="h3">Year</Form.Label>
                                <Form.Control type="text" placeholder="Enter year of release"></Form.Control>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="" controlId="">
                                <Form.Label className="h3">Season</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option value={'Spring'}>Spring</option>
                                    <option value={'Summer'}>Summer</option>
                                    <option value={'Fall'}>Fall</option>
                                    <option value={'Winter'}>Winter</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="" controlId="">
                        <Form.Label className="h3">Holiday</Form.Label>
                        <Form.Control type="text" placeholder="Enter holiday of release"></Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        + Add Bird
                    </Button>
                </Form>
            </Card>
        </section>
    )
}