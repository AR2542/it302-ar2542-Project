//Name: Abhinav Ramesh
//UCID: ar2542
//Course Name: Advanced internet Applications
//Section Number: 452
//Assignment Name: Phase 4 Read Node.js Data using React.js Assignment
//Email Address: ar2542@njit.edu

import React, { useState, useEffect } from 'react'
import pokemonsDataService from "../services/pokemonsDataService"
import { Link } from "react-router-dom"

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const PokemonsList = () => {
    const [Pokemons, setPokemons] = useState([]);
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        retrievePokemons();
    }, []);

    const retrievePokemons = () => {
        pokemonsDataService.getAll()
            .then((response) => {
                setPokemons(response.data.Pokemons);
                console.log(response.data.Pokemons);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const onChangeSearchName = (e) => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const find = (query, by) => {
        pokemonsDataService.find(query, by)
            .then(response => {
                setPokemons(response.data.Pokemons || []);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByName = () => {
        console.log("This is the name to search", searchName);
        find(searchName, 'name');
    };

    return (
        <div className="App">
            <Container>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Search by name"
                                    value={searchName}
                                    onChange={onChangeSearchName}
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={findByName}
                            >
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    {Pokemons && Pokemons.length > 0 ? (
                        Pokemons.map((pokemon) => {
                            return (
                                <Col key={pokemon.id}>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img src={pokemon.default_image} />
                                        <Card.Body>
                                            <Card.Title>Name: {pokemon.name}</Card.Title>
                                            <Card.Text>Weight: {pokemon.weight}</Card.Text>
                                            <Card.Text>Order: {pokemon.order}</Card.Text>
                                            <Link to={`/ar2542/pokemons/${pokemon.order}`} >View More </Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })
                    ) : (
                        <p>No pokemons found</p>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default PokemonsList;
