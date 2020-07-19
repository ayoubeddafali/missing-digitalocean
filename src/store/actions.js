const storage = require("electron-json-storage");
const BASE_URL = "https://api.digitalocean.com/v2"

import axios from 'axios'

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
              console.log("Found in local storage " + data.token)
              commit("setDigitalOceanToken", data.token)
          } else { 
            reject({ status: "fail", message: "No data found in DIGITAL_OCEAN_TOKEN"})
          }
        })
        resolve({ status: "success", message: "Token was set with success"})
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

const applyAction = (resource, action) => {
  console.log(`Going to apply ${action} Action on resource id  ${resource.id}`)
}

/**
 * 
 * @param payload { resource, cron, action}
 */
export const registerJob = ({ commit, state }, payload  ) => {
  return new Promise((resolve, reject) => {
    //  Add job to manager 
    try {
      state.manager.add(`${payload.resource.id}`, `${payload.cron}`, (stopRunOnceJobs) => {
        console.log(`[${payload.name}] Going to apply ${payload.action} Action on resource id ${payload.resource.id}`) 
        if (payload.runOnce) {
          stopRunOnceJobs()
        }
      }, {}, payload.runOnce)
      state.manager.start(`${payload.resource.id}`)
      commit('addJob', { 
          id: payload.resource.id, 
          name: payload.name, 
          cron: payload.cron,
          resource_type: payload.resource_type, 
          action: payload.action, 
          running: state.manager.status(payload.resource.id)
      })
      resolve("Job registered successfully")
    }
    catch(exception){
      if ( exception.name == "JobExist") {
        resolve(exception.message)
      }else {
        reject(exception.message)
      }
    }
  })
}

export const refreshJobs = ({commit, state}, payload) => {
  return new Promise((resolve, reject) => {
    //  Add job to manager 
    try {
      var ids = state.manager.getJobsIds()
      ids.forEach(id => {
        commit('updateJobStatus', {
          id: id,
          running: state.manager.status(id)
        })
      });
      resolve("Job registered successfully")
    }
    catch(exception){
        reject(exception)
    }
  })
}

export const getJobs = ({commit, state}, payload) => {
  return new Promise((resolve, reject) => {
    // console.log(state.manager.jobs)
    resolve(state.manager.jobs)
  })
}

export const runAction = ({commit, state}, payload) => {
  return new Promise((resolve, reject) => {
    try {
      switch (payload.action) {
        case 'Start':
          state.manager.start(`${payload.id}`)
          commit('updateJobStatus', {
            id: payload.id,
            running: state.manager.status(payload.id)
          })
          break;
        case 'Stop':
          state.manager.stop(`${payload.id}`)
          commit('updateJobStatus', {
            id: payload.id,
            running: state.manager.status(payload.id)
          })
          break;
        case 'Update':
          break;
        case 'Delete':
          state.manager.stop(`${payload.id}`)
          commit('deleteJob', {
            id: payload.id
          })
          break;
        default:
          break;
      }
      resolve('Success')
    } 
    catch(exception){
      reject(exception)
    }
  })
}