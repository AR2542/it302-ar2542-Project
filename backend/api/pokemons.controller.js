//Name: Abhinav Ramesh
//UCID: ar2542
//Course Name: Advanced internet Applications
//Section Number: 452
//Assignment Name: Phase 4 Read Node.js Data using React.js Assignment
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

    static async apiGetPokemonsbyOrder(req, res, next) {
        try {
            let order = req.params.order || {}
            let pokemon = await pokemonsDAO.getPokemonsbyOrder(order)
            if (!pokemon) {
                res.status(404).json({ error: "not found" })
                return
            }
            res.json(pokemon)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }
}
