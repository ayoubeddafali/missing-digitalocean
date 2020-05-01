const os = require("os");
const storage = require("electron-json-storage");


export const saveTokenLocally = ({commit}, token) => {

  // check if the token is an empty string 
  if ( token.trim() != "") {
    commit('setDigitalOceanToken', token)
    storage.set(
      "DIGITAL_OCEAN_TOKEN",
      { 
        token: token
      },
      function(error) {
        return false
      }
    );
  }
  return true
}

export const setToken = ({commit}, token) => {
  commit('setDigitalOceanToken', token)
}


export const getTokenFromLocal = (state) => {
  storage.has("DIGITAL_OCEAN_TOKEN", function(error, hasKey) {
      if (error) {
        throw error; 
      }
      if (hasKey) {
        console.log("There is data stored as `DIGITAL_OCEAN_TOKEN`");
        storage.get("DIGITAL_OCEAN_TOKEN", function(error, data) {
          if (error) throw error;
          if ( data.do_token ){
              self.do_token = data["token"]
              return true 
          }
      });
      } else {
        console.log("No data stored as `DIGITAL_OCEAN_TOKEN`");
        return false; 
      }
    })
}