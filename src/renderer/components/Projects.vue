<template>
  <v-container >
    <v-row v-if="projects.length == 0" >
      <v-col cols="6" sm="4" v-for="index in 6">
        <v-sheet
          color="grey lighten-4"
          class="px-3 pt-3"
        >
          <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            width="300"
            height="182"
            max-height="200"
            type="card"
          ></v-skeleton-loader>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8" sm="4" v-for="project in projects">
        <v-card raised height="100%" class="mx-auto card-gradient"  dark max-width="400">
          <v-card-title>
            <v-icon large left >
              mdi-folder
            </v-icon>

            <span class="title font-weight-bold">{{ project.name  }}</span>
          </v-card-title>

          <v-card-text>
            <p> {{ project.description }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn text small bold  color="#EC407A" > <b>{{ project.environment }} </b> </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="openActionsDialog(project)">
              <v-icon color="#EC407A">mdi-settings</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
        <actions :active="actionsDialog" type="Project" :project="project" @show-alert="alert" @set-visible="update" />
   </v-row>
  </v-container>
</template>
<script>

import { mapState } from 'vuex'
import Actions from './Actions'
export default {
  name: 'Projects',
  data () {
    return {
      actionsDialog: false,
      project: null,
    }
  },
  components: {
   'actions': Actions
  },
  computed: {
    ...mapState({
      token: 'token',
      projects: 'projects'
    })
  },
  mounted(){
    this.$store.dispatchPromise("fetchProjects", { token: this.token  })
  }, 
  methods: {
    openActionsDialog(project){
      this.actionsDialog = true 
      this.project = project
    },
    update(isVisible) {
      this.actionsDialog = isVisible;
    },
    alert(alert){
      this.$toasted.show(alert.message, {
        position: 'bottom-right',
        keepOnHover: true, 
        duration: 800,
        theme: 'bubble',
        type: alert.status
      })
    }
}
}
</script>

<style scoped>
  .card-gradient {
    background: #396afc;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #2948ff, #396afc);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #2948ff, #396afc); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  .bottom-gradient {
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
  }

  .repeating-gradient {
    background-image: repeating-linear-gradient(-45deg,
                        rgba(255,0,0,.25),
                        rgba(255,0,0,.25) 5px,
                        rgba(0,0,255,.25) 5px,
                        rgba(0,0,255,.25) 10px
                      );
  }
</style>