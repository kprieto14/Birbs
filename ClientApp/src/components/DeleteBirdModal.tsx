import React, { useState } from "react";
import IconCenter from "./IconCenter";
import { FaTrashCan } from "react-icons/fa6";
import { Modal } from "react-bootstrap";

type DeleteBirdProps = {
    id: number,
    name: string
}

export function DeleteBirdModal({ id, name }: DeleteBirdProps) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log(id)
    
    return (
        <>
            <button className="pink-outline" onClick={handleShow}><IconCenter reactIcon={<FaTrashCan />} text="Delete Bird"/></button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Release Bird</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h5>Are you sure you want to delete {name}?</h5>
                </Modal.Body>
                
                <Modal.Footer>
                    <button onClick={handleClose} className="pink-outline">
                        Cancel
                    </button>
                    <button onClick={handleClose} className="confirm-button">
                        Yes :(
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )}