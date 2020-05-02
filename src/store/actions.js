const os = require("os");
const storage = require("electron-json-storage");
import axios from 'axios'

const BASE_URL = "https://api.digitalocean.com/v2"


export const saveTokenLocally = ( {commit}, payload ) => {
  // check if the token is an empty string 
  return new Promise((resolve, reject) => {
    if ( payload.token.trim() != "") {
      console.log(`saving ${payload.token} locally ...`)
      commit('setDigitalOceanToken', payload.token)
      storage.set(
        "DIGITAL_OCEAN_TOKEN",
        { 
          token: payload.token
        },
        function(error) {
          reject({ status: "fail", message: "Error when setting key on storage" })
        }
      )
      resolve({ status: "success", message: "Key was stored successfully"})
    } else {
      console.log("Token is empty")
      reject({ status: "fail", message: "Token is empty"})
    }
  })
 
}

export const setToken = ({commit}, token) => {
  commit('setDigitalOceanToken', token)
}


export const getTokenFromLocal = ( {commit} , payload ) => {
  return new Promise((resolve, reject) => {
    storage.has("DIGITAL_OCEAN_TOKEN", function(error, hasKey) {
      if (error) {
        reject({ status: "fail", message: "Error checking the key existence"  })
      }
      if (hasKey) {
        storage.get("DIGITAL_OCEAN_TOKEN", function(error, data) {
          if (error) reject({ status: "fail", message: "Error when getting the key from the storage" })
          if ( data.token ){
              console.log("Commiting...")
              commit("setDigitalOceanToken", data.token)
          } else { 
            reject({ status: "fail", message: "No data found in DIGITAL_OCEAN_TOKEN"})
          }
        })
        resolve({ status: "success", message: "Token was set with success" })
      } else {
        console.log("No data stored as `DIGITAL_OCEAN_TOKEN`");
        reject({ status: "fail", message: "no data stored as DIGITAL_OCEAN_TOKEN" })
      }
    })
  })
}

export const fetchProjects = ({ commit }, payload) => {
  return axios.get(`${BASE_URL}/projects`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Authorization': `Bearer ${payload.token}`
    }
  }).then((response) => {
    commit('setProjects', response.data.projects)
  }).catch((error) => {
    console.log(error)
  })
}