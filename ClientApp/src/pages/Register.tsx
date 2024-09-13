import React, { useState } from "react";
import { Form, FormGroup } from "react-bootstrap";
import { FaClipboardCheck } from "react-icons/fa";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { NewUserType, User } from "../types";
import otherApi from "../api/otherApi";

export function Register() {
    const [ errorMessage, setErrorMessage ] = useState('')

    const navigate = useNavigate()

    const [newUser, setNewUser] = useState<NewUserType>({
        username: '',
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

    function handleStringFieldChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target
    
        const updatedUser = { ...newUser, [name]: value }
    
        setNewUser(updatedUser)
    }

    // When Register button is clicked, call for the mutation and send the register information
    function handleSubmit(e: React.FormEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const userParams = { 
            username: newUser.username.toLowerCase(),
            email: newUser.email.toLowerCase(),
            password: newUser.password,
        };

        createUserMutation.mutate(userParams)
    }
  
    return (
        <section className="register">
            <div className="middle-card w-100">
                <FaClipboardCheck className="react-icon mb-3"/>
                <h2 className="mb-4">Register Your Account</h2>

                <Form onSubmit={ (e) => handleSubmit(e) }>
                    <FormGroup role="form">
                        { errorMessage ? <p>{ errorMessage }</p> : null}

                        <Form.Label className="h4 mb-3" htmlFor="new-user">Username</Form.Label>
                        <Form.Control
                            name="username"
                            type="text" 
                            placeholder="Enter a username for your account" 
                            className="mb-3 input"
                            size="lg"
                            autoComplete="off"
                            required
                            id="new-user"
                            onChange={ (e) => handleStringFieldChange(e) }
                        />

                        <Form.Label className="h4 mb-3" htmlFor="new-email">Email</Form.Label>
                        <Form.Control
                                name="email"
                                type="text" 
                                placeholder="Enter your email" 
                                className="mb-3 input"
                                size="lg"
                                autoComplete="off"
                                required
                                id="new-email"
                                onChange={ (e) => handleStringFieldChange(e) }
                        />

                        <Form.Label className="h4 mb-3" htmlFor="new-pw">Password</Form.Label>
                        <Form.Control
                                name="password"
                                type="password" 
                                placeholder="********" 
                                className="mb-3 input"
                                size="lg"
                                required
                                id="new-pw"
                                onChange={ (e) => handleStringFieldChange(e) }
                        />                       
                    </FormGroup>

                    <button className="gradient-button w-100 mt-3" onSubmit={(e) => handleSubmit(e)}>
                        <h5>Register</h5>
                    </button>                    
                </Form>

                <p className="mt-3">*This page was creating for hobby purposes, please do not save sensitive information :)</p>
            </div>
        </section>     
    )
}