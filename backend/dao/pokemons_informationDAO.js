//Name: Abhinav Ramesh
//UCID: ar2542
//Course Name: Advanced internet Applications
//Section Number: 452
//Assignment Name: Phase 3 CUD MongoDB Data using Node.js Assignment
//Email Address: ar2542@njit.edu

import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let pokemoninfos
export default class pokemonsinformationDAO {
    static async injectDB(conn) {
        if (pokemoninfos)  return
        try { pokemoninfos = await conn.db(process.env.POKEMONS_AR2542_NS).collection('infomation_ar2542') } 
        catch (e) { console.error(`unable to establish connection handle in pokemon_informationDAO: ${e}`) }
    }
    static async addInfo(pokemon_order, pokemon_name, information, information_id, writer, writer_id, date) {
        try {
            const pokemonInformationDocument = {
                order: pokemon_order,
                pokemon_name: pokemon_name,
                information: information,
                information_id: information_id,
                writer: writer,
                writer_id: writer_id,
                date: date
            }
            return await pokemoninfos.insertOne(pokemonInformationDocument)
        } catch (e) {
            console.error(`unable to post information: ${e}`)
            console.error(e)
            return { error: e }
        }
    }
    static async changeInfo(information_id, information, date) {
        try {
            const changingInformation = await pokemoninfos.updateOne(
                { information_id: information_id },
                { $set: { information: information, date: date } }
            )
            return changingInformation
        } catch (e) {
            console.error(`unable to update information: ${e}`)
            console.error(e)
            return { error: e }
        }
    }
    static async removeInfo(information_id) {
        try {
            const deleteResponse = await pokemoninfos.deleteOne({ information_id: information_id })
            return deleteResponse
        } catch (e) {
            console.error(`unable to delete information: ${e}`)
            console.error(e)
            return { error: e.message }
        }
    }


}
