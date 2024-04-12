import React from "react";
import { Button, Card, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export function SignIn() {
    return (
        <section className="sign-in">
            <Card className="add-bird-card">
                <Form>
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

                    <Row>
                        <Link to={'/register'}>Register Here</Link>   
                    </Row>
                </Form>
            </Card>
        </section>
    )
}