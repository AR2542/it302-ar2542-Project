//Name: Abhinav Ramesh
//UCID: ar2542
//Course Name: Advanced internet Applications
//Section Number: 452
//Assignment Name: Phase 2 Read MongoDB Data using Node.js Assignment
//Email Address: ar2542@njit.edu

import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"
import pokemonsDAO from './dao/pokemonsDAO.js'
import pokemonsinformationDAO from './dao/pokemons_informationDAO.js'

async function main() {

    dotenv.config()

    const client = new mongodb.MongoClient(process.env.POKEMONS_AR2542_DB_URI)

    const port = process.env.PORT || 8000

    try {
        await client.connect()
        await pokemonsDAO.injectDB(client)
        await pokemonsinformationDAO.injectDB(client)

        app.listen(port, () => {
            console.log('server is running on port:' + port);
        })

    } catch (e) {
        console.error(e);
        process.exit(1)
    }
}
main().catch(console.error);
