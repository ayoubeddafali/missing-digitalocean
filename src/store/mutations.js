
export const setDigitalOceanToken = (state, token) => {
  state.token = token
}


export const setProjects = (state, projects ) => {
  state.projects = projects
}

export const addJob = (state, payload) => {
  state.jobs[payload.id] = payload
}

export const updateJobStatus = (state, payload) => {
  state.jobs[payload.id].running = payload.running
}

export const deleteJob = (state, payload) => {
  delete state.jobs[payload.id]
}