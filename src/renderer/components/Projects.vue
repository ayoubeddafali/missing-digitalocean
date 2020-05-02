<template>
  <v-container >
    <v-row>

      <v-col cols="6" sm="4" v-for="project in projects">
        <v-card raised class="mx-auto card-gradient"  dark max-width="400">
          <v-card-title>
            <v-icon large left >
              mdi-folder
            </v-icon>

            <span class="title font-weight-light">{{ project.name  }}</span>
          </v-card-title>

          <v-card-text class="headline font-weight-bold">
            {{ project.description }}
          </v-card-text>
          <v-card-actions>
            <v-btn text small bold  color="#EC407A" > <b>{{ project.environment }} </b> </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="openActionsDialog()">
              <v-icon color="#EC407A">mdi-settings</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-dialog v-model="actionsDialog" width="500px">
        <v-card>
          <v-card-title>
            Actions
          </v-card-title>
          <v-card-text>
            <v-select
              :items="actions"
              label="Select Action"
              item-value="text"
            ></v-select>
            <v-btn color="primary" dark @click="scheduleDialog = !scheduleDialog" >
              Schedule Action
            </v-btn>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              text
              @click="actionsDialog = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
   </v-row>
  </v-container>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      actionsDialog: false,
      scheduleDialog: false,
      actions: [
        { text: 'Shutdown' },
        { text: 'Restart' },
        { text: 'Destroy' },
      ],
    }
  },
  computed: {
    ...mapGetters({
      token: 'getToken',
      projects: 'getProjects'
    })
  },
  mounted(){
    this.$store.dispatchPromise("fetchProjects", { token: this.token  })
  }, 
  methods: {
    ...mapActions({
      fetchProjects: 'fetchProjects'
    }),
    openActionsDialog(){
      console.log("Opening Actions")
      this.actionsDialog = true 
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