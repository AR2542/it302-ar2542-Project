//Name: Abhinav Ramesh
//UCorder: ar2542
//Course Name: Advanced internet Applications
//Section Number: 452
//Assignment Name: Phase 5 CUD Node.js Data using React.js Assignment
//Email Address: ar2542@njit.edu

import axios from "axios";

console.log("REACT_APP_BACKEND_URL:", process.env.REACT_APP_BACKEND_URL);

class pokemonsDataService {
  getAll(page = 0) {
    return axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/ar2542/pokemons?page=${page}`
    );
  }
  get(order) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/ar2542/pokemons/order/${order}`
    );
  }
  find(query, by = "name", page = 0) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/ar2542/pokemons?${by}=${query}&page=${page}`
    )
  }

  createInformation(data) {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/ar2542/pokemons/information`, data)
  }
  updateInformation(data) {
    return axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/ar2542/pokemons/information`, data)
  }
  deleteInformation(infoId, writerid) {
    return axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/ar2542/pokemons/information`, { data: { info_id: infoId, writer_id: writerid }})
  }

}
export default new pokemonsDataService();
