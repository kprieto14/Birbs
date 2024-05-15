import React, { useEffect, useState } from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import { GiNestBirds } from "react-icons/gi";
import IconCenter from "../components/IconCenter";
import { MdAddAPhoto } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Bird, EditBirdParams } from "../types";
import birdAPI from "../api/birdAPI";

const nullBird: EditBirdParams = {
    id: 0,
    name: ' ',
    adoptedFrom: ' ',
    holidayCollection: ' ',
    yearPublished: 2012,
    seasonCollection: 'Spring',  
}

export function EditBird() {
    const yearsOfRelease = ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024']

    const { id } = useParams<{ id: string }>()

    const { data: bird = nullBird } = useQuery<Bird>({
        queryKey: ['bird', id],
        queryFn: () => birdAPI.getBird(Number(id)),
    })

    const [ birdToUpdate, setBirdToUpdate ] = useState<EditBirdParams>({
        id: Number(id),
        name: bird.name,
        adoptedFrom: bird.adoptedFrom,
        holidayCollection: bird.holidayCollection,
        yearPublished: bird.yearPublished,
        seasonCollection: bird.seasonCollection,
    })
    
    // Due to onSuccess being deprecated, the internet states the best way to set state on when useQuery is successful is to use useEffect instead
    useEffect(() => {
        const foundBird: EditBirdParams = {
            id: Number(bird.id),
            name: bird.name,
            adoptedFrom: bird.adoptedFrom,
            holidayCollection: bird.holidayCollection,
            yearPublished: bird.yearPublished,
            seasonCollection: bird.seasonCollection
        }

        setBirdToUpdate(foundBird)
    }, [bird])

    return (
        <section className="edit-bird">
            <div className="middle-card w-100">
                <GiNestBirds className="react-bird-icon mb-3"/>
                <header className="delete-bird mb-4">
                    <h2>Edit Your Bird</h2>
                    <button className="pink-outline"><IconCenter reactIcon={<FaTrashCan />} text="Delete Bird"/></button>
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
                                value={ birdToUpdate.name }
                                onChange={() => console.log("Changed")}
                            />
                        </Col>

                        <Col>
                            <Form.Label className="h4 mb-3">Adopted From</Form.Label>
                            <Form.Control
                                type="text" 
                                placeholder="Enter where you bought your bird" 
                                className="mb-3 input"
                                size="lg"
                                value={ birdToUpdate.adoptedFrom }
                                onChange={() => console.log("Changed")}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Label className="h4 mb-3">Year</Form.Label>
                            <Form.Select
                                className="mb-3 input"
                                size="lg"
                                value={ birdToUpdate.yearPublished }
                                onChange={() => console.log("Changed")}
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
                                value={ birdToUpdate.seasonCollection }
                                onChange={() => console.log("Changed")}
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
                                value={ birdToUpdate.holidayCollection }
                                onChange={() => console.log("Changed")}
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
                        <button className="gradient-button w-100 mt-3" onClick={() => console.log("Clicked")}>
                                <h5>Save Bird</h5>
                        </button>                    
                    </Col>
                </Row>
            </div>
        </section>
    )
}