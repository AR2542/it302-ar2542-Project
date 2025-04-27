//Name: Abhinav Ramesh
//UCorder: ar2542
//Course Name: Advanced internet Applications
//Section Number: 452
//Assignment Name: Phase 5 CUD Node.js Data using React.js Assignment
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
        weight: "",
        details: []
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

    const deleteInformation = (infoId, index) => {
        pokemonsDataService.deleteInformation(infoId, props.user.id)
            .then(response => {
                setPokemon((prevState) => {
                    prevState.details.splice(index, 1)
                    return ({
                        ...prevState
                    })
                })
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Image src={pokemon.default_image} />
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">{pokemon.name}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <p>Order: {pokemon.order}</p>
                                    <p>Weight: {pokemon.weight}</p>
                                </Card.Text>
                                {props.user && <Link to={"/ar2542/pokemons/" + order + "/information"}>Add Information</Link>}
                            </Card.Body>
                        </Card>
                        <br></br>
                        <h2>Information</h2><br></br>
                        {pokemon.details.map((info, index) => {
                            return (
                                <Card key={index}>
                                    <h5>{info.writer + " wrote this information on " + new Date(Date.parse(info.date)).toDateString()}</h5>
                                    <p>{info.information}</p>
                                    {props.user && props.user.id === info.writer_id &&
                                        <Row>
                                            <Col><Link
                                                to={"/ar2542/pokemons/" + order + "/information"}
                                                state={{ currentInformation: info }}
                                            >Edit</Link>
                                            </Col>
                                            <Col><Button variant="link" onClick={() => deleteInformation(info._id, index)}>
                                                    Delete</Button></Col>
                                        </Row>}
                                </Card>
                            )
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Pokemon;
