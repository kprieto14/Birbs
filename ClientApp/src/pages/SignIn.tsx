import React from "react";
import { Form} from "react-bootstrap";
import { FaUser } from "react-icons/fa";

export function SignIn() {
    return (
        <section className="sign-in">
            <div className="middle-card w-100">
                <FaUser className="react-icon mb-3"/>
                <h2 className="mb-4">Sign In to Your Account</h2>
                <Form>
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
                        <h5>Sign in</h5>
                    </button>
                </Form>
            </div>
        </section>   
    )
}