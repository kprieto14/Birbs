import React, { useEffect, useState } from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import { GiNestBirds } from "react-icons/gi";
import IconCenter from "../components/IconCenter";
import { MdAddAPhoto } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bird } from "../types";
import birdAPI from "../api/birdAPI";
import { DeleteBirdModal } from "../components/DeleteBirdModal";

const nullBird: Bird = {
    id: 0,
    name: ' ',
    photoURL: '',
    photoPublicId: null,
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
        queryKey: ['bird', id],
        queryFn: () => birdAPI.getBird(Number(id)),
    })

    const [ birdToUpdate, setBirdToUpdate ] = useState<Bird>({
        id: Number(id),
        name: bird.name,
        photoURL: bird.photoURL,
        photoPublicId: bird.photoPublicId,
        adoptedFrom: bird.adoptedFrom,
        holidayCollection: bird.holidayCollection,
        yearPublished: bird.yearPublished,
        seasonCollection: bird.seasonCollection,
        user: bird.user,
        userId: bird.userId
    })
    
    // Due to onSuccess being deprecated, the internet states the best way to set state on when useQuery is successful is to use useEffect instead and set state there
    useEffect(() => {
        const foundBird: Bird = {
            id: Number(bird.id),
            name: bird.name,
            photoURL: bird.photoURL,
            photoPublicId: bird.photoPublicId,
            adoptedFrom: bird.adoptedFrom,
            holidayCollection: bird.holidayCollection,
            yearPublished: bird.yearPublished,
            seasonCollection: bird.seasonCollection,
            userId: bird.userId
        }

        setBirdToUpdate(foundBird)
    }, [bird])

    // Mutation to update a player
    const updateBirdMutation = useMutation<Bird, Error, Bird>({
        mutationFn: async (_variables: Bird) => birdAPI.updateBird(Number(id), _variables),
        onSuccess: () => {
            navigate('/birdcage-list')
            queryClient.invalidateQueries({
                queryKey: ['birds']
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
                            <Form.Label className="h4 mb-3">Change Bird Photo</Form.Label>
                            <InputGroup>
                                <button className="upload-button"><IconCenter reactIcon={<MdAddAPhoto />} text="Change File"/></button>
                                <Form.Control
                                    type="text"
                                    id="photo-input"
                                    className="mb-3 input"
                                    size="lg"
                                    value={"No file chosen"}
                                    disabled
                                />
                            </InputGroup>

                        </Form.Group>
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
                        <button className="gradient-button w-100 mt-3" onClick={(e) => handleSubmit(e)}>
                                <h5>Save Bird</h5>
                        </button>                    
                    </Col>
                </Row>
            </div>
        </section>
    )
}