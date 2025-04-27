//Name: Abhinav Ramesh
//UCorder: ar2542
//Course Name: Advanced internet Applications
//Section Number: 452
//Assignment Name: Phase 5 CUD Node.js Data using React.js Assignment
//Email Address: ar2542@njit.edu

import pokemonsinformationDAO from '../dao/pokemons_informationDAO.js'

export default class pokemonsinformationController {
    static async addInformation(req, res, next) {
        try {
            const pokemon_order = req.body.order;
            const information = req.body.information;
            const writer = req.body.writer;
            const writer_id = req.body.writer_id;
            const date = new Date();
            const PokemonInformation = await pokemonsinformationDAO.addInfo(pokemon_order, information, writer, writer_id, date)
            res.json(PokemonInformation)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
    static async changeInformation(req, res, next) {
        try {
            const infoID = req.body.information_id;
            const writerID = req.body.writer_id;
            const information = req.body.information;
            const date = new Date()
            const PokemonInformation = await pokemonsinformationDAO.changeInfo(infoID, writerID, information, date)

            var { error } = PokemonInformation
            if (error) res.status(400).json({ error })
            if (PokemonInformation.modifiedCount === 0) throw new Error("unable to update review. User may not be original poster")
            res.json(PokemonInformation)
        } catch (e) { res.status(500).json({ error: e.message }) }
    }
    static async removeInformation(req, res, next) {
        try {
            const infoId = req.body.info_id;
            const writerid = req.body.writer_id;
            const PokemonInformation = await pokemonsinformationDAO.removeInfo(infoId, writerid)
            res.json(PokemonInformation)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}