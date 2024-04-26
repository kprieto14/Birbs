import React from "react";
import background from '../assets/BirdsBackground.png'
import { Form } from "react-bootstrap";

export function Register() {
    return (
        <>
            <div className="yellow-background"></div>
            <aside>
                    <img 
                        src={background} 
                        className="background-image"
                        alt="Background image of different fabric birds" 
                    />
            </aside>

            <section className="register">
                <aside className="left-side w-50">
                    <h2 className="mb-4">Register Your Account</h2>
                    <Form>
                        <Form.Group className="" controlId="">
                            <Form.Label className="h3">Email</Form.Label>
                            <Form.Control type="text" placeholder="Enter your email"></Form.Control>
                        </Form.Group>

                        <Form.Group className="" controlId="">
                            <Form.Label className="h3">Password</Form.Label>
                            <Form.Control type="text" placeholder="Enter password"></Form.Control>
                        </Form.Group>

                        <button className="gradient-button w-100">
                            Register
                        </button>
                    </Form>
                </aside>
            </section>            
        </>

    )
}