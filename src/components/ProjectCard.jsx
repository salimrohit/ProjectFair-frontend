import React from 'react'
import Card from 'react-bootstrap/Card';
import mediaplayerpic from '../assets/mediaplayerss.png'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../services/baseUrl';



function ProjectCard({proj}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Card className='m-md-4 shadow p-3 w-100' onClick={handleShow}>
                <Card.Img variant="top" src={proj? `${BASE_URL}/uploads/${proj.projectImage}`:mediaplayerpic} />
                <Card.Body>
                    <Card.Title className='text-center' >{proj.title}</Card.Title>

                </Card.Body>
            </Card>

            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{proj.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={12} md={6}>
                            <img className='w-100' src={proj? `${BASE_URL}/uploads/${proj.projectImage}`:mediaplayerpic} alt="" />
                        </Col>
                        <Col sm={12} md={6}>
                            <h3>Description</h3>
                            <p>{proj.overview}</p>
                            <h3>Technologies</h3>
                            <p>{proj.language}</p>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <div className='me-auto'>
                        <Link to={proj.github} target='_blank' ><FontAwesomeIcon icon={faGithub} size='2xl' className='me-4'/></Link>
                        <Link to={proj.website}target='_blank'  ><FontAwesomeIcon icon={faLink} size='2xl' /></Link>
                    </div>
                    
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ProjectCard
