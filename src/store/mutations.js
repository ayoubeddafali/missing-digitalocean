
export const setDigitalOceanToken = (state, token) => {
  state.token = token
}


export const setProjects = (state, projects ) => {
  state.projects = projects
}

export const addJob = (state, payload) => {
  state.jobs[payload.id] = payload
}