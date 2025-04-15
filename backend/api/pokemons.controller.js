//Name: Abhinav Ramesh
//UCID: ar2542
//Course Name: Advanced internet Applications
//Section Number: 452
//Assignment Name: Phase 2 Read MongoDB Data using Node.js Assignment
//Email Address: ar2542@njit.edu

import pokemonsDAO from '../dao/pokemonsDAO.js'

export default class pokemonsController {
    static async apiGetPokemons(req, res, next) {
        const PokemonsPerPage = req.query.PokemonsPerPage ? parseInt(req.query.PokemonsPerPage) : 20
        const page = req.query.page ? parseInt(req.query.page) : 0
        let filters = {}
        if (req.query.order) {
            filters.order = req.query.order
        } else if (req.query.name) {
            filters.name = req.query.name
        }
        const { PokemonsList, totalNumPokemons } = await pokemonsDAO.getPokemons({
            filters, page, PokemonsPerPage
        })

        let response = {
            Pokemons: PokemonsList,
            page: page,
            filters: filters,
            entries_per_page: PokemonsPerPage,
            total_results: totalNumPokemons,
        }
        res.json(response)
    }
}
