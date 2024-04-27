import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { FaClipboardCheck } from "react-icons/fa";

export function Register() {
    return (
        <section className="register">
            <div className="middle-card w-100">
                <FaClipboardCheck className="react-icon mb-3"/>
                <h2 className="mb-4">Register Your Account</h2>
                <Form>
                    <Row>
                        <Col>
                            <Form.Label className="h4 mb-3">First Name</Form.Label>
                            <Form.Control
                                type="text" 
                                placeholder="Enter your first name" 
                                className="mb-3 input"
                                size="lg"
                                onChange={() => console.log("Changed")}
                            />
                        </Col>

                        <Col>
                            <Form.Label className="h4 mb-3">Last Name</Form.Label>
                            <Form.Control
                                type="text" 
                                placeholder="Enter your last name/ initial" 
                                className="mb-3 input"
                                size="lg"
                                onChange={() => console.log("Changed")}
                            />
                        </Col>
                    </Row>

                    <Form.Group className="" controlId="">
                        <Form.Label className="h4 mb-3">Email</Form.Label>
                        <Form.Control
                                type="text" 
                                placeholder="Enter your email" 
                                className="mb-3 input"
                                size="lg"
                                onChange={() => console.log("Changed")}
                        />
                    </Form.Group>

                    <Form.Group className="" controlId="">
                        <Form.Label className="h4 mb-3">Password</Form.Label>
                        <Form.Control
                                type="text" 
                                placeholder="********" 
                                className="mb-3 input"
                                size="lg"
                                onChange={() => console.log("Changed")}
                        />
                    </Form.Group>

                    <button className="gradient-button w-100 mt-3" onClick={() => console.log("Clicked")}>
                        <h5>Register</h5>
                    </button>
                </Form>
            </div>
        </section>     
    )
}