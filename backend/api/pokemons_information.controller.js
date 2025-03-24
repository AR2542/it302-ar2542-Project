//Name: Abhinav Ramesh
//UCID: ar2542
//Course Name: Advanced internet Applications
//Section Number: 452
//Assignment Name: Phase 3 CUD MongoDB Data using Node.js Assignment
//Email Address: ar2542@njit.edu

import pokemonsinformationDAO from '../dao/pokemons_informationDAO.js'

export default class pokemonsinformationController {
    static async addInformation(req, res, next) {
        try {
            const pokemon_order = req.body.order;
            const pokemon_name = req.body.name;
            const information = req.body.information;
            const information_id = req.body.information_id;
            const writer = req.body.writer;
            const writer_id = req.body.writer_id;
            const date = new Date();
            const PokemonInformation = await pokemonsinformationDAO.addInfo(pokemon_order, pokemon_name, information, information_id, writer, writer_id, date)
            res.json(PokemonInformation)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
    static async changeInformation(req, res, next) {
        try {
            const information_id = req.body.information_id;
            const information = req.body.information;
            const date = new Date()
            const PokemonInformation = await pokemonsinformationDAO.changeInfo(information_id, information, date)

            var { error } = PokemonInformation
            if (error) res.status(400).json({ error })
            if (PokemonInformation.modifiedCount === 0) throw new Error("unable to update review. User may not be original poster")
            res.json(PokemonInformation)
        } catch (e) { res.status(500).json({ error: e.message }) }
    }
    static async removeInformation(req, res, next) {
        try {
            const information_id = req.body.information_id;
            const PokemonInformation = await pokemonsinformationDAO.removeInfo(information_id)
            res.json(PokemonInformation)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}