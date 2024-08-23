import React, { useState } from "react";
import { Form, FormGroup} from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { LoginSuccess, LoginUserType } from "../types";
import { recordAuthentication } from "../api/auth";
import otherApi from "../api/otherApi";

export function SignIn() {
    const [ user, setUser ] = useState<LoginUserType>({
        email: '',
        password: '',
      })

    const [ errorMessage, setErrorMessage ] = useState('')

    const loginUserMutation: UseMutationResult<LoginSuccess, Error, LoginUserType> = useMutation<LoginSuccess, Error, LoginUserType> ({
        mutationFn: async(_variables: LoginUserType) => otherApi.loginUser(_variables),
        onSuccess: (data: LoginSuccess) => {
            recordAuthentication(data)

            // Manually set the location to refresh page so navbar can automatically update, do not use navigate
            window.location.assign('/')
        },
        onError: (error: Error) => {
            // Ignore TS error below, TS does not realize that response is a property of the error
            // @ts-ignore
            console.log(error.response?.data);
            setErrorMessage("Error")
        }
    })

    function handleStringFieldChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target

        const updatedUser = { ...user, [name]: value }

        setUser(updatedUser)
    }

    function handleSubmit(e: React.FormEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        loginUserMutation.mutate(user)
    }

    return (
        <section className="sign-in">
            <div className="middle-card w-100">
                <FaUser className="react-icon mb-3"/>
                <h2 className="mb-4">Sign In to Your Account</h2>
                { errorMessage ? <p>{ errorMessage }</p> : null } 
                
                <Form onSubmit={ (e) => handleSubmit(e) }>
                    <FormGroup role="form">
                        <Form.Label className="h4 mb-3" htmlFor="email">Email</Form.Label>
                        <Form.Control
                                name="email"
                                type="text"
                                id="email" 
                                placeholder="Enter your email" 
                                className="mb-3 input"
                                size="lg"
                                autoComplete="email"
                                required
                                value={ user.email }
                                onChange={ (e) => handleStringFieldChange(e) }
                        />

                        <Form.Label className="h4 mb-3" htmlFor="password">Password</Form.Label>
                        <Form.Control
                                name="password"
                                type="password"
                                id="password" 
                                placeholder="********" 
                                className="mb-3 input"
                                size="lg"
                                required
                                value={ user.password }
                                onChange={ (e) => handleStringFieldChange(e) }
                        />
                    </FormGroup>
                
                    <button type="submit" className="gradient-button w-100 mt-3" onSubmit={ (e) => handleSubmit(e) }>
                        <h5>Sign in</h5>
                    </button>
                </Form>
            </div>
        </section>   
    )
}