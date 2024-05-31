import React, { useState } from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { GiNestBirds } from "react-icons/gi";
import { MdAddAPhoto } from "react-icons/md";
import { useNavigate } from "react-router";
import { useDropzone } from 'react-dropzone'
import { getUserId } from "../api/auth";
import { Bird, NewBirdParams } from "../types";
import IconCenter from "../components/IconCenter";
import birdAPI from "../api/birdAPI";

export function AddBird() {
    const yearsOfRelease = ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024']

    const [newBird, setNewBird] = useState<NewBirdParams>({
        name: '',
        photoURL: '',
        adoptedFrom: '',
        holidayCollection: '',
        yearPublished: 2012,
        seasonCollection: 'Spring',
        userId: Number(getUserId()),
        // In the future photoUrl here
    })

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

    function onDropFile(acceptedFiles: File[]) {
        // Do something with the files
        const fileToUpload = acceptedFiles[0]
        console.log(fileToUpload)
      }

      const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onDropFile,
      })

    return (
        <section className="add-bird">
            <div className="middle-card w-100">
                <GiNestBirds className="react-bird-icon mb-3"/>
                <h2 className="mb-4">Add a Bird to Your Aviary</h2>
                
                <Form>
                    <Row>
                        <Form.Group>
                            <Form.Label className="h4 mb-3">Upload Bird Photo</Form.Label>
                            <InputGroup>
                                <label className="upload-button">
                                    <IconCenter reactIcon={<MdAddAPhoto />} text="Choose Photo"/>
                                    <input 
                                        name="photoURL" 
                                        type="file" 
                                    />  
                                </label>
                                
                                
                                <Form.Control
                                    type="text"
                                    id="photo-input"
                                    className="mb-3 input"
                                    size="lg"
                                    value={isDragActive
                                        ? 'Drop photo here ...'
                                        : 'Drag a photo here to upload'}
                                    disabled
                                />
                            </InputGroup>
                        </Form.Group>
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