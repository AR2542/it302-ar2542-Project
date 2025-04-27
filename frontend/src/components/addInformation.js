//Name: Abhinav Ramesh
//UCorder: ar2542
//Course Name: Advanced internet Applications
//Section Number: 452
//Assignment Name: Phase 5 CUD Node.js Data using React.js Assignment
//Email Address: ar2542@njit.edu

import React, { useState } from 'react'
import { Link, useParams, useLocation } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import pokemonsDataService from '../services/pokemonsDataService';

const AddInformation = (props) => {
  let editing = false
  let initialInformationState = ""

  const location = useLocation();
  if (location.state && location.state.currentInformation) {
    editing = true
    initialInformationState = location.state.currentInformation.information
  }


  const [information, setInformation] = useState(initialInformationState)
  // keeps track if information is submitted
  const [submitted, setSubmitted] = useState(false)
  let { order } = useParams();

  const onChangeInformation = e => {
    const information = e.target.value
    setInformation(information);
  }

  const saveInformation = () => {
    var data = {
      information: information,
      writer: props.user.name,
      writer_id: props.user.id,
      order: parseInt(order)
    }
    if (editing) {
      // get existing information id
      data.information_id = location.state.currentInformation._id
      pokemonsDataService.updateInformation(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data)
        })
        .catch(e => {
          console.log(e);
        })
    } else {
      pokemonsDataService.createInformation(data)
        .then(response => {
          setSubmitted(true)
        }).catch(e => { })
    }
  }

  return (
    <div>
      {submitted ? (
        <div>
          <h5>information submitted successfully</h5>
          <Link to={"/ar2542/pokemons/" + order}>
            Back to Pokemons
          </Link>
        </div>) : (
        <Form>
          <Form.Group>
            <Form.Label>{editing ? "Edit" : "Create"} Information</Form.Label>
            <Form.Control
              type="text"
              required
              value={information}
              onChange={onChangeInformation}
            />
          </Form.Group>
          <Button variant="primary" onClick={saveInformation}>
            Submit
          </Button>
        </Form>
      )}
    </div>
  )
}

export default AddInformation;