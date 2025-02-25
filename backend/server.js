//Name: Abhinav Ramesh
//UCID: ar2542
//Course Name: Advanced internet Applications
//Section Number: 452
//Assignment Name: Phase 2 Read MongoDB Data using Node.js Assignment
//Email Address: ar2542@njit.edu

import express from 'express'
import cors from 'cors'
import pokemons from './api/pokemons.route.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/ar2542/pokemons", pokemons)

app.use('*', (req,res) => {
  res.status(404).json({error: "not found"})
})

export default app