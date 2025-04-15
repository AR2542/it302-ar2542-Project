//Name: Abhinav Ramesh
//UCID: ar2542
//Course Name: Advanced internet Applications
//Section Number: 452
//Assignment Name: Phase 4 Read Node.js Data using React.js Assignment
//Email Address: ar2542@njit.edu

import React, { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import PokemonsList from "./components/PokemonsList";
import Pokemon from "./components/pokemon";


function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Pokemons List</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to={"/ar2542/pokemons"}>Pokemons</Nav.Link>
              <Nav.Link as={NavLink} to={user ? "" : "/login"}>
                {user ? "Logout User" : "Login"}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/ar2542" element={<PokemonsList />}></Route>
        <Route path="/ar2542/pokemons" element={<PokemonsList />}></Route>
        <Route path="/ar2542/pokemons/:order/" element={<Pokemon user={user} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
