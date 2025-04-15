//Name: Abhinav Ramesh
//UCID: ar2542
//Course Name: Advanced internet Applications
//Section Number: 452
//Assignment Name: Phase 4 Read Node.js Data using React.js Assignment
//Email Address: ar2542@njit.edu

import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import pokemonsDataService from '../services/pokemonsDataService';


const Pokemon = (props) => {

    const [pokemon, setPokemon] = useState({
        order: null,
        name: "",
        weight: ""
    })
    let { order } = useParams();
    const getPokemon = order => {
        pokemonsDataService.get(order)
            .then(response => {
                setPokemon(response.data)
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            })
    }
    useEffect(() => {
        getPokemon(order)
    }, [order])

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Image src={pokemon.default_image} fluorder />
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">{pokemon.name}</Card.Header>
                        </Card>
                        <br></br>
                    </Col>
                    <p>{pokemon.name}</p>
                </Row>
            </Container>
        </div>
    );
}

export default Pokemon;
