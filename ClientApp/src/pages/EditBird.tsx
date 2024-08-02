import React, { useEffect, useState } from "react";
import { Alert, Col, Form, InputGroup, Row, Image } from "react-bootstrap";
import { GiNestBirds } from "react-icons/gi";
import { FaTrashCan } from "react-icons/fa6";
import { MdAddAPhoto } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDropzone } from "react-dropzone";
import { DeleteBirdModal } from "../components/DeleteBirdModal";
import { Bird } from "../types";
import axios from "axios";
import birdAPI from "../api/birdAPI";
import IconCenter from "../components/IconCenter";

const nullBird: Bird = {
    id: 0,
    name: ' ',
    photoURL: '',
    photoPublicId: null,
    photoFileName: null,
    adoptedFrom: ' ',
    holidayCollection: ' ',
    yearPublished: 2012,
    seasonCollection: 'Spring',  
    user: undefined,
    userId: 0
}

export function EditBird() {
    const yearsOfRelease = ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024']

    const { id } = useParams<{ id: string }>()

    const queryClient = useQueryClient();

    const navigate = useNavigate()

    const { data: bird = nullBird } = useQuery<Bird>({
        queryKey: [ 'bird', id ],
        queryFn: () => birdAPI.getBird(Number(id)),
    })

    const [ errorMessage, setErrorMessage ] = useState<string | null>(null)

    const [ birdToUpdate, setBirdToUpdate ] = useState<Bird>({
        id: Number(id),
        name: bird.name,
        photoURL: bird.photoURL,
        photoPublicId: bird.photoPublicId,
        photoFileName: bird.photoFileName,
        adoptedFrom: bird.adoptedFrom,
        holidayCollection: bird.holidayCollection,
        yearPublished: bird.yearPublished,
        seasonCollection: bird.seasonCollection,
        user: bird.user,
        userId: bird.userId
    })

    let dropzoneMessage = birdToUpdate.photoFileName ? birdToUpdate.photoFileName : 'We accept PNG, JPEG/ JPG, and GIF up to 10MB'
    
    // Due to onSuccess being deprecated, the internet states the best way to set state on when useQuery is successful is to use useEffect instead and set state there
    useEffect(() => {
        const foundBird: Bird = {
            id: Number(bird.id),
            name: bird.name,
            photoURL: bird.photoURL,
            photoPublicId: bird.photoPublicId,
            photoFileName: bird.photoFileName,
            adoptedFrom: bird.adoptedFrom,
            holidayCollection: bird.holidayCollection,
            yearPublished: bird.yearPublished,
            seasonCollection: bird.seasonCollection,
            userId: bird.userId
        }

        setBirdToUpdate(foundBird)
    }, [ bird ])

    // Mutation to update a player
    const updateBirdMutation = useMutation<Bird, Error, Bird>({
        mutationFn: async (_variables: Bird) => birdAPI.updateBird(Number(id), _variables),
        onSuccess: () => {
            navigate('/birdcage-list')
            queryClient.invalidateQueries({
                queryKey: [ 'birds' ]
            });
        },
        onError: (error: Error) => {
            // Ignore TS error below, TS does not realize that response is a property of the error
            // @ts-ignore
            console.log(error.response?.data);
        }
    });

    function handleStringFieldChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        e.preventDefault()
        const { name, value } = e.target
    
        const updatedBird = { ...birdToUpdate, [name]: value }
    
        setBirdToUpdate(updatedBird)
    }

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        updateBirdMutation.mutate(birdToUpdate)
    }

    async function handleImageRemoval(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()

        try {
            // Send photoId to API to delete from Cloudinary
            const removePhotoResult = await axios.post(`http://localhost:5000/api/Destroy/${birdToUpdate.photoPublicId}`)

            if (removePhotoResult.status === 200) {
                // Remove URL and photopublicId from bird object and reset dropbox message 
                const removePhoto = { ...birdToUpdate, 
                                            photoURL: '', 
                                            photoPublicId: null,
                                            photoFileName: null,
                                    }
                dropzoneMessage = 'We accept PNG, JPEG/ JPG, and GIF up to 10MB'
                
                // Remove file from dropzone array
                acceptedFiles.pop()

                setBirdToUpdate(removePhoto)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        onDrop: onDropFile,
        accept: {
            'image/png': [ '.png' ],
            'image/jpeg': [ '.jpeg', '.jpg' ],
            'image/gif': [ '.gif' ],
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
            // Send photoId to API to delete from Cloudinary
            acceptedFiles.pop()
        }

        // Checks if a bird image has already been uploaded to replace
        if(birdToUpdate.photoPublicId) {
            const response = await axios.post(`http://localhost:5000/api/Destroy/${birdToUpdate.photoPublicId}`)

            if (response.status === 200) {
                // Remove URL and photopublicId from bird object
                const removePhoto = { ...birdToUpdate, photoURL: '', photoPublicId: null }

                setBirdToUpdate(removePhoto)
            }
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
            const newPhotoResult = await axios.post(`http://localhost:5000/api/Uploads`, formData)

            if (newPhotoResult.status === 200) {
                setBirdToUpdate({ ...birdToUpdate, 
                                        photoURL: newPhotoResult.data.url, 
                                        photoPublicId: newPhotoResult.data.public_id, 
                                        photoFileName: acceptedFiles[0].name    
                                })
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
        <section className="edit-bird">
            <div className="middle-card w-100">
                <GiNestBirds className="react-bird-icon mb-3"/>
                <header className="delete-bird mb-4">
                    <h2>Edit Your Bird</h2>
                    <DeleteBirdModal id={ birdToUpdate.id || 0 } name={ birdToUpdate.name }/>
                </header>
                
                <Form>
                <Row>
                        <Form.Group>
                            <Form.Label className="h4 mb-3">Upload Bird Photo</Form.Label>
                            <div {...getRootProps()}>
                                <InputGroup >
                                    <label className="upload-button">
                                        <IconCenter reactIcon={<MdAddAPhoto />} text={birdToUpdate.photoFileName ? "Edit/ Change Photo" : "Choose Photo"}/>
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
                            { birdToUpdate.photoURL ?
                                <div className="remove-image">
                                    <Image src={ birdToUpdate.photoURL } alt="Upload of your bird photo" className="mb-3" thumbnail/> 

                                    <button className="pink-outline mb-3" onClick={ (e) => handleImageRemoval(e) }>
                                        <IconCenter reactIcon={ <FaTrashCan /> } text="Remove"/>
                                    </button>
                                </div> 
                                : null
                            }
                    </Row>

                    <Row>
                        <Col>
                            <Form.Label className="h4 mb-3">Name</Form.Label>
                            <Form.Control
                                type="text" 
                                placeholder="Enter name of bird" 
                                className="mb-3 input"
                                size="lg"
                                name="name"
                                value={ birdToUpdate.name }
                                onChange={ (e) => handleStringFieldChange(e) }
                            />
                        </Col>

                        <Col>
                            <Form.Label className="h4 mb-3">Adopted From</Form.Label>
                            <Form.Control
                                type="text" 
                                placeholder="Enter where you bought your bird" 
                                className="mb-3 input"
                                size="lg"
                                name="adoptedFrom"
                                value={ birdToUpdate.adoptedFrom }
                                onChange={ (e) => handleStringFieldChange(e) }
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Label className="h4 mb-3">Year</Form.Label>
                            <Form.Select
                                className="mb-3 input"
                                size="lg"
                                name="yearPublished"
                                value={ birdToUpdate.yearPublished }
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
                                className="mb-3 input"
                                size="lg"
                                name="seasonCollection"
                                value={ birdToUpdate.seasonCollection }
                                onChange={ (e) => handleStringFieldChange(e) }
                            >
                                <option>Spring</option>
                                <option>Summer</option>
                                <option>Fall</option>
                                <option>Winter</option>
                            </Form.Select>
                        </Col>
                    </Row>

                    <Form.Group controlId="editHolidayForm">
                        <Form.Label className="h4 mb-3">Holiday</Form.Label>
                        <Form.Control
                                type="text" 
                                placeholder="Enter the holiday of release" 
                                className="mb-3 input"
                                size="lg"
                                name="holidayCollection"
                                value={ birdToUpdate.holidayCollection }
                                onChange={ (e) => handleStringFieldChange(e) }
                        />
                    </Form.Group>
                </Form>

                <Row>
                    <Col>
                        <Link to={'/birdcage-list'}>
                            <button className="pink-outline w-100 mt-3 h-75">
                                <h5>Cancel</h5>
                            </button>                        
                        </Link>

                    </Col>
                    <Col>
                        <button className="gradient-button w-100 mt-3" onClick={ (e) => handleSubmit(e) }>
                            <h5>Save Bird</h5>
                        </button>                    
                    </Col>
                </Row>
            </div>
        </section>
    )
}