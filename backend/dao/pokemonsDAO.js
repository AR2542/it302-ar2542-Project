//Name: Abhinav Ramesh
//UCorder: ar2542
//Course Name: Advanced internet Applications
//Section Number: 452
//Assignment Name: Phase 5 CUD Node.js Data using React.js Assignment
//Email Address: ar2542@njit.edu

let pokemons
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

export default class pokemonsDAO {
    static async injectDB(conn) {
        if (pokemons) { return }
        try { pokemons = await conn.db(process.env.POKEMONS_AR2542_NS).collection('pokemon_ar2542') } //POKEMONS_AR2542_NS is it302, which is the directory in which the collection exists
        catch (e) { console.error(`unable to connect in PokemonsDAO: ${e}`) }
    }
    static async getPokemons({
        filters = null,
        page = 0,
        PokemonsPerPage = 20,
    } = {}) {
        let query
        if (filters) {
            if ("name" in filters) {
                query = { $text: { $search: filters['name'] } }
            } else if ("order" in filters) {
                const orderValue = Number(filters['order']) //The Order is always a number, so the query is to treat it as a number
                query = { "order": orderValue }
            }
        }
        let cursor
        try {
            cursor = await pokemons
                .find(query)
                .limit(PokemonsPerPage)
                .skip(PokemonsPerPage * page)
            const PokemonsList = await cursor.toArray()
            const totalNumPokemons = await pokemons.countDocuments(query)
            return { PokemonsList, totalNumPokemons }
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            console.error(e)
            return { PokemonsList: [], totalNumPokemons: 0 }
        }
    }

    static async getPokemonsbyOrder(order) {
        try {
            return await pokemons.aggregate([
                {
                    $match: {
                        order: parseInt(order),
                    }
                },
                {
                    $lookup:
                    {
                        from: 'information_ar2542',
                        localField: 'order',
                        foreignField: 'order',
                        as: 'details'
                    }
                }
            ]).next()
        }
        catch (e) {
            console.error(`something went wrong in getPokemonsbyOrder: ${e}`)
            throw e
        }
    }
}