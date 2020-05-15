<template>
  <v-dialog :value="active" width="500px" @click:outside="dismissActionsDialog()">
    <v-card>
      <v-card-title>
        Actions
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="8" md="8">
            <v-select
              :items="actions"
              label="Select Action"
              v-model="action"
              item-value="text"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <v-chip
              class="ma-2"
              color="#EC407A"
              label
              large
              light
              text-color="#fff"
            >
              <v-icon left>mdi-label</v-icon>
              {{ type  }}
            </v-chip>

          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="name"
              label="Action Name"
              placeholder="Nightly Shutdown of .."
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="cron"
              label="Cron"
              placeholder="* * * * *"
            ></v-text-field>
          </v-col>
          <v-col cols="12" >
            <v-btn color="#396afc" dark @click="registerAJob()" >
              Schedule Action
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>


import {  mapActions, mapState  } from 'vuex'



function getDefaultData() {
    return {
      cron: "* * * * *",
      name: '',
      action: "Shutdown",
      actions: [
        { text: 'Shutdown' },
        { text: 'Restart' },
        { text: 'Destroy' },
      ]
    }
}

export default {
  name: 'Actions',
  props: ['project', 'active', 'type'],
  computed: {},
  data: getDefaultData,
  methods: {
    reset() {
      Object.assign(this.$data, this.$options.data.apply(this))
      // this.$data = getDefaultData()
    },
    dismissActionsDialog(){
      this.reset()
      this.$emit("set-visible", false)
    },
    registerAJob() { 
      this.$store.dispatchPromise('registerJob', { cron: this.cron, resource: this.project, action: this.action, name: this.name, resource_type: this.type}).then((message) => {
        this.$emit("set-visible", false);
        this.$emit("show-alert", { status: "success", message: message})
        this.reset()
      }).catch((message) => {
        this.$emit("show-alert", { status: "error", message: message})
      })
    }
  }
}
</script>