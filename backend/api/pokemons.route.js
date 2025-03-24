//Name: Abhinav Ramesh
//UCID: ar2542
//Course Name: Advanced internet Applications
//Section Number: 452
//Assignment Name: Phase 3 CUD MongoDB Data using Node.js Assignment
//Email Address: ar2542@njit.edu

import express from 'express'
import pokemonsController from './pokemons.controller.js'
import pokemonsinformationController from './pokemons_information.controller.js'

const router = express.Router()

router.route('/').get(pokemonsController.apiGetPokemons)

router.route('/information')
    .post(pokemonsinformationController.addInformation)
    .put(pokemonsinformationController.changeInformation)
    .delete(pokemonsinformationController.removeInformation)

export default router
