import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { FaClipboardCheck } from "react-icons/fa";
import { NewUserType } from "../types";

export function Register() {
    // const [errorMessage, setErrorMessage] = useState('')

    const [newUser, setNewUser] = useState<NewUserType>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      })


      function handleStringFieldChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target
  
        const updatedUser = { ...newUser, [name]: value }
  
        setNewUser(updatedUser)
      }
      
    return (
        <section className="register">
            <div className="middle-card w-100">
                <FaClipboardCheck className="react-icon mb-3"/>
                <h2 className="mb-4">Register Your Account</h2>

                <Form>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label className="h4 mb-3">First Name</Form.Label>
                                <Form.Control
                                    name="firstName"
                                    type="text" 
                                    placeholder="Enter your first name" 
                                    className="mb-3 input"
                                    size="lg"
                                    onChange={ (e) => handleStringFieldChange(e) }
                                />
                            </Form.Group>
                        </Col>


                        <Col>
                            <Form.Group>
                                <Form.Label className="h4 mb-3">Last Name</Form.Label>
                                <Form.Control
                                    name="lastName"
                                    type="text" 
                                    placeholder="Enter your last name/ initial" 
                                    className="mb-3 input"
                                    size="lg"
                                    onChange={ (e) => handleStringFieldChange(e) }
                                />
                            </Form.Group>           
                        </Col>
                    </Row>

                    <Form.Group className="" controlId="">
                        <Form.Label className="h4 mb-3">Email</Form.Label>
                        <Form.Control
                                name="email"
                                type="text" 
                                placeholder="Enter your email" 
                                className="mb-3 input"
                                size="lg"
                                onChange={ (e) => handleStringFieldChange(e) }
                        />
                    </Form.Group>

                    <Form.Group className="" controlId="">
                        <Form.Label className="h4 mb-3">Password</Form.Label>
                        <Form.Control
                                name="password"
                                type="text" 
                                placeholder="********" 
                                className="mb-3 input"
                                size="lg"
                                onChange={ (e) => handleStringFieldChange(e) }
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