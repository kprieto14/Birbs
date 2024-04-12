import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

export function Register() {
    return (
        <section className="sign-in">
            <h3>Register for an Account</h3>

            <Card className="add-bird-card">
                <Form>
                    <Row>
                        <Col>
                            <Form.Group className="" controlId="">
                                <Form.Label className="h3">First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter your first name"></Form.Control>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="" controlId="">
                                <Form.Label className="h3">Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter your last name"></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="" controlId="">
                        <Form.Label className="h3">Email</Form.Label>
                        <Form.Control type="text" placeholder="Enter your email"></Form.Control>
                    </Form.Group>

                    <Form.Group className="" controlId="">
                        <Form.Label className="h3">Password</Form.Label>
                        <Form.Control type="text" placeholder="Enter password"></Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card>
        </section>
    )
}