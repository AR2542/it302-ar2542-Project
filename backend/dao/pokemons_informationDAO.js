//Name: Abhinav Ramesh
//UCorder: ar2542
//Course Name: Advanced internet Applications
//Section Number: 452
//Assignment Name: Phase 5 CUD Node.js Data using React.js Assignment
//Email Address: ar2542@njit.edu

import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let pokemoninfos
export default class pokemonsinformationDAO {
    static async injectDB(conn) {
        if (pokemoninfos)  return
        try { pokemoninfos = await conn.db(process.env.POKEMONS_AR2542_NS).collection('information_ar2542') } 
        catch (e) { console.error(`unable to establish connection handle in pokemon_informationDAO: ${e}`) }
    }
    static async addInfo(pokemon_order, information, writer, writer_id, date) {
        try {
            const pokemonInformationDocument = {
                order: pokemon_order,
                information: information,
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
    static async changeInfo(infoID, writerID, information, date) {
        try {
            const changingInformation = await pokemoninfos.updateOne(
                { writer_id: writerID, _id: ObjectId.createFromHexString(infoID) },
                { $set: { information: information, date: date } }
            )
            return changingInformation
        } catch (e) {
            console.error(`unable to update information: ${e}`)
            console.error(e)
            return { error: e }
        }
    }
    static async removeInfo(infoId, writerid) {
        try {
            const deleteResponse = await pokemoninfos.deleteOne({ 
                _id: ObjectId.createFromHexString(infoId),
                writer_id: writerid,
             })
            return deleteResponse
        } catch (e) {
            console.error(`unable to delete information: ${e}`)
            console.error(e)
            return { error: e.message }
        }
    }


}
