import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FaTrashCan } from "react-icons/fa6";
import { Modal } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import birdAPI from "../api/birdAPI";
import IconCenter from "./IconCenter";
import axios from "axios";

type DeleteBirdProps = {
    id: number,
    name: string
}

export function DeleteBirdModal({ id, name }: DeleteBirdProps) {
    const [ show, setShow ] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const queryClient = useQueryClient();

    const navigate = useNavigate()

    const deleteMutation = useMutation({
        mutationFn: async () => birdAPI.deleteBird(id),
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: [ 'birds' ]
            });

            try {
                // Send photoId to API to delete from Cloudinary
                await axios.post(`http://localhost:5000/api/Destroy/${id}`)

            } catch (error) {
                console.log(error)
            }

            handleClose()

            navigate('/birdcage-list')
        },
        onError: (error: Error) => {
            // Ignore TS error below, TS does not realize that response is a property of the error
            // @ts-ignore
            console.log(error.response?.data);
        }
    });
    
    return (
        <>
            <button className="pink-outline" onClick={ handleShow }>
                <IconCenter reactIcon={ <FaTrashCan /> } text="Delete Bird"/>
            </button>

            <Modal show={ show } onHide={ handleClose } centered>
                <Modal.Header closeButton>
                    <Modal.Title>Release Bird</Modal.Title>
                </Modal.Header>

                <Modal.Body className="mt-4 mb-4">
                    <h5>Are you sure you want to delete { name }?</h5>
                </Modal.Body>
                
                <Modal.Footer>
                    <button onClick={ handleClose } className="pink-outline">
                        Cancel
                    </button>
                    <button onClick={ () => deleteMutation.mutate() } className="confirm-button">
                        Yes :(
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )}