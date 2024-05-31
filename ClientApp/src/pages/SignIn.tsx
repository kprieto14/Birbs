import React, { useState } from "react";
import { Form} from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { LoginSuccess, LoginUserType } from "../types";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import otherApi from "../api/otherApi";
import { recordAuthentication } from "../api/auth";

export function SignIn() {
    const [user, setUser] = useState<LoginUserType>({
        email: '',
        password: '',
      })

    const [errorMessage, setErrorMessage] = useState('')

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

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()

        loginUserMutation.mutate(user)
    }

    return (
        <section className="sign-in">
            <div className="middle-card w-100">
                <FaUser className="react-icon mb-3"/>
                <h2 className="mb-4">Sign In to Your Account</h2>
                {errorMessage ? <p>{errorMessage}</p> : null}
                <Form>
                    <Form.Group controlId="sign-in-email">
                        <Form.Label className="h4 mb-3">Email</Form.Label>
                        <Form.Control
                                name="email"
                                type="text" 
                                placeholder="Enter your email" 
                                className="mb-3 input"
                                size="lg"
                                value={user.email}
                                onChange={ (e) => handleStringFieldChange(e) }
                        />
                    </Form.Group>

                    <Form.Group controlId="sign-in-pw">
                        <Form.Label className="h4 mb-3">Password</Form.Label>
                        <Form.Control
                                name="password"
                                type="password" 
                                placeholder="********" 
                                className="mb-3 input"
                                size="lg"
                                value={user.password}
                                onChange={ (e) => handleStringFieldChange(e) }
                        />
                    </Form.Group>

                    <button className="gradient-button w-100 mt-3" onClick={(e) => handleSubmit(e)}>
                        <h5>Sign in</h5>
                    </button>
                </Form>
            </div>
        </section>   
    )
}