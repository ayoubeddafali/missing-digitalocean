<template>
  <div id="app" data-app="true">
    <Push >
      <router-link tag="li" to="/">
        <a id="home"> 
          <span>Home</span>  
        </a>
      </router-link>

      <router-link tag="li" :to="{ name: 'Projects' }" v-if="token">
        <a id="projects"> 
          <span>Projects</span>  
        </a>
      </router-link>

      <a id="Settings" @click="openSettingsDialog()"> 
        <span>Settings</span>  
      </a>

      <router-link tag="li" to="/contact">
        <a id="about"> 
          <span>Contact</span>  
        </a>
      </router-link>
    </Push>

    <main id="page-wrap">
      <router-view />
    </main>


    <v-dialog v-model="showAlertDialog" width="500" >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Privacy Policy
        </v-card-title>

        <v-card-text>
          <b>Hi There, </b>
          <p>
            The following application needs access to your Digital Ocean Account.
            You can provide that by settings the Digital Ocean Token in the Setting Page.   
            <v-spacer></v-spacer>
            <strong>You cannot </strong> access the application functionnalities if the TOKEN is not provided.
          </p> 

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="openSettingsDialog()"
          >
            Let's do that
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showSettingsDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="showSettingsDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="saveSettings()">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>Digital Ocean</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Token</v-list-item-title>
                  <v-text-field
                    v-model="token"
                    :counter="10"
                    label="Digital Ocean Token"
                    required
                  ></v-text-field>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>

      </v-card>
    </v-dialog>
  </div>
</template>



<script>
import 'vuetify/dist/vuetify.min.css'
import { Push } from 'vue-burger-menu' 
import { mapGetters, mapActions } from 'vuex'


const os = require("os");
const storage = require("electron-json-storage");


export default {
  name: "App",
  data() {
      return {
        showSettingsDialog: false,
        showAlertDialog: false
      }
  },
  computed: {
    ...mapGetters({
      token: 'getToken'
    })
  },
  components: {
    Push
  },
  created(){
    let status = this.getTokenFromLocal()

    if ( status ) {
      this.showAlertDialog = false
    } else {
      this.showAlertDialog = true 
    }

  },
  methods: {
    ...mapActions({
      saveToken: 'saveTokenLocally',
      getTokenFromLocal: 'getTokenFromLocal'
    }),
    openSettingsDialog(){
      this.showAlertDialog = false 
      this.showSettingsDialog = true 
    },
    saveSettings(){
      let status = this.saveToken(this.token)
      if ( status ) this.showSettingsDialog = false 
    },
  }
};

</script>

<style lang="less">
    *,
    *:after,
    *:before {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }

    html {
      height: 100%;
    }
    body {
      height: 100%;
      font-family: 'Raleway', Arial, sans-serif;
      margin: 0px;
    }
    #app {
      height: 100%;
    }
    a {
      color: #000;
      text-decoration: none;
      &:hover,
      &:focus {
        color: #c94e50;
      }
    }
    main {
      height: 100%;
      padding: 3em 2em;
      text-align: center;
      overflow: auto;
    }
    
    @media screen and (max-width: 40em) {
      main {
        font-size: 80%;
      }
      h1 {
        padding-top: 1em;
        font-size: 2.5em;
      }
      .demo-buttons {
        max-width: 900px;
        padding: 0 2em;
      }
    }
    //
    // Burger menu custom styles
    //
    .bm-burger-button {
      position: absolute;
      width: 36px;
      height: 30px;
      left: 36px;
      top: 36px;
    }
    .right .bm-burger-button {
      left: initial;
      right: 36px;
    }
    .bm-burger-bars {
      background: #373a47;
    }
    .bm-morph-shape {
      fill: #373a47;
    }
    .bm-menu {
      background: #373a47;
      a {
        color: #b8b7ad;
        &:hover,
        &:focus {
          color: #c94e50;
        }
      }
    }
</style>
