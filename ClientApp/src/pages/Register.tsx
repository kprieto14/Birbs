import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { FaClipboardCheck } from "react-icons/fa";
import { NewUserType, User } from "../types";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import otherApi from "../api/otherApi";
import { useNavigate } from "react-router";

export function Register() {
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    const [newUser, setNewUser] = useState<NewUserType>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })

    // Mutation to call the api that registers the user
    const createUserMutation: UseMutationResult<User, Error, NewUserType> = useMutation<User, Error, NewUserType> ({
        mutationFn: async(_variables: NewUserType) => otherApi.registerUser(_variables),
        onSuccess: (data: User) => {
            console.log(data)

            navigate('/')
        },
        onError: () => {
            setErrorMessage(Error.name)
        }
    })

    function handleStringFieldChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target
    
        const updatedUser = { ...newUser, [name]: value }
    
        setNewUser(updatedUser)
    }

    // When Register button is clicked, call for the mutation and send the register information
    function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        const userParams = { 
            firstName: newUser.firstName, 
            lastName: newUser.lastName, 
            email: newUser.email,
            password: newUser.password,
        };

        createUserMutation.mutate(userParams)
    }
  
    return (
        <section className="register">
            <div className="middle-card w-100">
                <FaClipboardCheck className="react-icon mb-3"/>
                <h2 className="mb-4">Register Your Account</h2>

                <Form>
                    <Row>
                        {errorMessage ? <p>{errorMessage}</p> : null}
                        <Col>
                            <Form.Group controlId="register-firstname">
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
                            <Form.Group controlId="register-lastname">
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

                    <Form.Group controlId="register-email">
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

                    <Form.Group controlId="register-password">
                        <Form.Label className="h4 mb-3">Password</Form.Label>
                        <Form.Control
                                name="password"
                                type="password" 
                                placeholder="********" 
                                className="mb-3 input"
                                size="lg"
                                onChange={ (e) => handleStringFieldChange(e) }
                        />
                    </Form.Group>

                    <button className="gradient-button w-100 mt-3" onClick={(e) => handleSubmit(e)}>
                        <h5>Register</h5>
                    </button>
                </Form>
            </div>
        </section>     
    )
}