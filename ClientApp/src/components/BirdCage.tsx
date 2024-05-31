import React from "react";
import Junior from "../assets/junior-bird.jpeg"
import IconCenter from "./IconCenter";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";

type BirdProps = {
    id: number
    name: string
    photoURL: string
    adoptedFrom: string
    holiday: string
    year: number
    season: 'Spring' | 'Summer' | 'Fall' | 'Winter'
}

export function BirdCage({ id, name, photoURL, adoptedFrom, holiday, year, season }: BirdProps) {
    console.log(photoURL)
    
    return (
        <article className="bird-cage">
            <Col md={7} className="ps-4">
                <h3 className="mb-3"><strong>{ name }</strong></h3>
                <p className="mb-1"><strong>Season: </strong>{ season }</p>
                <p className="mb-1"><strong>Holiday: </strong>{ holiday }</p>
                <p className="mb-1"><strong>Year: </strong>{ year }</p>
                <p className="mb-1"><strong>Adopted From: </strong>{ adoptedFrom }</p>

                <Link to={`/edit-bird/${id}`}>
                    <button className="pink-outline mt-3">
                        <IconCenter reactIcon={<MdEdit />} text="Edit bird"/>
                    </button>
                </Link>
            </Col>
            
            <Col md={5} className="bird-container">
              <img src={Junior} alt="Fabric Bird" className="bird-photo"/>  
            </Col>  
        </article>
    )
}