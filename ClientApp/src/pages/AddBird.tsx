import React, { useState } from "react";
import { Alert, Col, Form, Image, InputGroup, Row } from "react-bootstrap";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { GiNestBirds } from "react-icons/gi";
import { MdAddAPhoto } from "react-icons/md";
import { useNavigate } from "react-router";
import { FaTrashCan } from "react-icons/fa6";
import { useDropzone } from 'react-dropzone'
import { getUserId } from "../api/auth";
import { Bird, NewBirdParams } from "../types";
import IconCenter from "../components/IconCenter";
import birdAPI from "../api/birdAPI";
import axios from "axios";

export function AddBird() {
    const yearsOfRelease = ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024']

    const [ newBird, setNewBird ] = useState<NewBirdParams>({
        name: '',
        photoURL: 'https://res-console.cloudinary.com/dhhcadsts/thumbnails/v1/image/upload/v1719532410/ajdzdWJuZ2pnZzd2Nm40bHUwd3A=/drilldown',
        adoptedFrom: '',
        holidayCollection: '',
        yearPublished: 2012,
        seasonCollection: 'Spring',
        userId: Number(getUserId()),
        // In the future photoUrl here
    })

    const [ errorMessage, setErrorMessage ] = useState<string | null>(null)

    let dropzoneMessage = 'We accept PNG, JPEG/ JPG, and GIF up to 10MB'

    const navigate = useNavigate()

    const createBirdMutation: UseMutationResult<Bird, Error, NewBirdParams> = useMutation<Bird, Error, NewBirdParams> ({
        mutationFn: async(_variables: NewBirdParams) => birdAPI.createNewBird(_variables),
        onSuccess: () => {
            navigate('/birdcage-list')
        },
        onError: () => {
            console.log("error")
        }
    })

    function handleStringFieldChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        e.preventDefault()
        
        const { name, value } = e.target
    
        const updatedBird = { ...newBird, [name]: value }
    
        setNewBird(updatedBird)
    }

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()

        createBirdMutation.mutate(newBird)
    }

    function handleImageRemoval(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        
        // Remove URL from bird object and reset dropbox message 
        const removePhoto = { ...newBird, photoURL: null }
        dropzoneMessage = 'We accept PNG, JPEG/ JPG, and GIF up to 10MB'
        
        // Remove file from dropzone array
        acceptedFiles.pop()

        setNewBird(removePhoto)
    }

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        onDrop: onDropFile,
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/gif': ['.gif'],
        },
        maxFiles: 1
    })

    if(acceptedFiles.length > 0) {
        dropzoneMessage = acceptedFiles[0].name
    }

    async function onDropFile(acceptedFiles: File[]) {
        // Check if file is too large
        if(acceptedFiles[0].size > 10_000_000 ) {
            setErrorMessage("File size too large, please upload less than 10MB")
            return
        }

        // Remove file that has already been added if it exists
        if(acceptedFiles.length > 1) {
            acceptedFiles.pop()
        }

        // Set the error message always to null just in case the user added something too large before
        setErrorMessage(null)

        // Accepted files are always put into a list, always grab the first accepted file
        const fileToUpload = acceptedFiles[0]

        // Create a formData object so we can send the data to the API
        const formData = new FormData()

        // Append a field that is the form upload itself
        formData.append('file', fileToUpload)

        try {
            // Send upload to API
            const newPhotoUrl = await axios.post(`http://localhost:5000/api/Uploads`, formData)

            if (newPhotoUrl.status === 200) {
                setNewBird({ ...newBird, photoURL: newPhotoUrl.data.url })
                console.log(newPhotoUrl)
            } else {
                setErrorMessage("Failed to upload image, please try again.")
            }
        } catch (error) {
            // Catch any network errors and show the user we could not process their upload
            console.log(error)
            // @ts-ignore
            setErrorMessage(error.response.statusText)
        }
    }

    return (
        <section className="add-bird">
            <div className="middle-card w-100">
                <GiNestBirds className="react-bird-icon mb-3"/>
                <h2 className="mb-4">Add a Bird to Your Aviary</h2>
                
                <Form>
                    <Row>
                        <Form.Group>
                            <Form.Label className="h4 mb-3">Upload Bird Photo</Form.Label>
                            <div {...getRootProps()}>
                                <InputGroup >
                                    <label className="upload-button">
                                        <IconCenter reactIcon={<MdAddAPhoto />} text="Choose Photo"/>
                                        <input {...getInputProps()}/>                
                                    </label>
                                    
                                    <Form.Control
                                        type="text"
                                        id="photo-input"
                                        className="mb-3 input"
                                        size="lg"
                                        value={dropzoneMessage}
                                        disabled
                                    />                                    
                                </InputGroup>                                    
                            </div>
                        </Form.Group>

                        {/* If the user enters a photo too large, then show this message */}
                        {errorMessage ? <Alert className="mb-3 h5" variant='danger'>{errorMessage}</Alert> : null}
                            {/* Show the photo when it uploads */}
                            { newBird.photoURL ?
                                <div className="remove-image">
                                    <Image src={newBird.photoURL} alt="Upload of your bird photo" className="mb-3" thumbnail/> 

                                    <button className="pink-outline mb-3" onClick={(e) => handleImageRemoval(e)}><IconCenter reactIcon={<FaTrashCan />} text="Remove"/></button>
                                </div> 
                                : null}
                    </Row>

                    <Row>
                        <Col>
                            <Form.Label className="h4 mb-3">Name</Form.Label>
                            <Form.Control
                                name="name"
                                type="text" 
                                placeholder="Enter name of bird" 
                                className="mb-3 input"
                                size="lg"
                                value={ newBird.name }
                                onChange={ (e) => handleStringFieldChange(e) }
                            />
                        </Col>

                        <Col>
                            <Form.Label className="h4 mb-3">Adopted From</Form.Label>
                            <Form.Control
                                name="adoptedFrom"
                                type="text" 
                                placeholder="Enter where you bought your bird" 
                                className="mb-3 input"
                                size="lg"
                                value={ newBird.adoptedFrom }
                                onChange={(e) => handleStringFieldChange(e)}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Label className="h4 mb-3">Year</Form.Label>
                            <Form.Select
                                name="yearPublished"
                                className="mb-3 input"
                                size="lg"
                                value={ newBird.yearPublished }
                                onChange={ (e) => handleStringFieldChange(e) }
                            >
                                {yearsOfRelease.map((year, index) => (
                                    <option key={index} value={year}>{year}</option>
                                ))}
                            </Form.Select>
                        </Col>

                        <Col>
                            <Form.Label className="h4 mb-3">Season</Form.Label>
                            <Form.Select
                                name="seasonCollection"
                                className="mb-3 input"
                                size="lg"
                                value={ newBird.seasonCollection }
                                onChange={ (e) => handleStringFieldChange(e) }
                            >
                                <option>Spring</option>
                                <option>Summer</option>
                                <option>Fall</option>
                                <option>Winter</option>
                            </Form.Select>
                        </Col>
                    </Row>

                    <Form.Group className="" controlId="">
                        <Form.Label className="h4 mb-3">Holiday</Form.Label>
                        <Form.Control
                                name="holidayCollection"
                                type="text" 
                                placeholder="Enter the holiday of release" 
                                className="mb-3 input"
                                size="lg"
                                value={ newBird.holidayCollection }
                                onChange={ (e) => handleStringFieldChange(e) }
                        />
                    </Form.Group>
                </Form>

                <button className="gradient-button w-100 mt-3" onClick={(e) => handleSubmit(e)}>
                        <h5>Add Bird</h5>
                </button>
            </div>
        </section>
    )
}