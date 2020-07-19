<template>
  <v-container >
    <v-row v-if="jobs.length != 0">
      <v-col cols="12" sm="12" md="12" class="d-flex justify-end">
        <v-btn class="mx-2" fab dark color="indigo" @click="refreshJobs()">
          <v-icon dark>mdi-cached</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters v-if="jobs.length == 0">
      <v-col cols="12" sm="6" md="8" v-for="index in 10" :key=index>
        <v-sheet
          color="grey lighten-4"
          class="px-3 pt-3 pb-8"
        >
          <v-responsive
            max-width="870"
            width="750"
            class="mx-auto"
          >
            <v-skeleton-loader
              ref="skeleton"
              :boilerplate="boilerplate"
              :type="type"
              :tile="tile"
              class="mx-auto"
            ></v-skeleton-loader>
          </v-responsive>
        </v-sheet>
      </v-col>
    </v-row>
    

  <div class=row v-if="jobs.length != 0">
   <div class="small-12 columns">
      <div id=ember1439 class=ember-view></div>
      <div class=row>
         <div class="small-12 columns">
            <table class=droplet-listing>
               <thead>
                  <tr>
                     <th class="aurora-th name sortable active ember-view"><span class=headerText>Name</span>
                        <span class="Icon--arrowFilterDown Icon--inactiveFilter"></span>
                     </th>
                     <th class="aurora-th name sortable active ember-view"><span class=headerText>Type</span>
                        <span class="Icon--arrowFilterDown Icon--inactiveFilter"></span>
                     </th>
                     <th class="aurora-th name sortable active ember-view"><span class=headerText>Action</span>
                        <span class="Icon--arrowFilterDown Icon--inactiveFilter"></span>
                     </th>
                     <th  class="aurora-th ip_address active sortable ember-view"><span class=headerText>Status</span>
                        <span class="Icon--arrowFilterDown Icon--inactiveFilter"></span>
                     </th>
                     <th class="aurora-th created_at active sortable ember-view"><span class=headerText>CronTime</span>
                        <span class="Icon--arrowFilterUp Icon--activeFilter"></span>
                     </th>
                     <th class="aurora-th created_at active sortable ember-view"></th>
                  </tr>
               </thead>
               <tbody>
                  <tr v-for="[jobKey, jobInfo] of Object.entries(jobs)">
                     <td class=name>
                        <p>{{ jobInfo.name }}</p>
                     </td>
                      <td class=name>
                        <p>{{ jobInfo.resource_type }}</p>
                     </td>
                      <td class=name>
                        <p>{{ jobInfo.action }}</p>
                     </td>
                     <td class=ip>
                       <p>{{ jobInfo.running  == true ? "Running" : "Stopped" }}</p>
                     </td>
                     <td class=created_at>
                       {{ jobInfo.cron }}
                     </td>
                     <td>
                        <v-menu bottom left>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              dark
                              icon
                              v-on="on"
                            >
                              <v-icon color="#EC407A">mdi-settings</v-icon>
                            </v-btn>
                          </template>

                          <v-list>
                            <v-list-item
                              v-for="(item, i) in items"
                              :key="i"
                              @click="updateJob(jobKey, item.title)"
                            >
                              <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
   </div>
  </div>

    
</v-container>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: "Jobs",

  data: () => ({
    boilerplate: false,
    tile: false,
    type: 'list-item-two-line',
    temp : [],
    items: [
      { title: 'Start' },
      { title: 'Stop' },
      { title: 'Update' },
      { title: 'Delete' },
    ],
  }),

  mounted () {},
  computed: {
    ...mapState({
      jobs: 'jobs',
    }),
  },
  methods: {
    updateJob(job, action){
      this.$store.dispatchPromise('runAction', { id: job, action: action}).then((msg) => {
        console.log(msg);
        this.$forceUpdate();
        
      })
    },
    refreshJobs() {
      this.$store.dispatchPromise('refreshJobs', {}).then(() => {
        console.log("Job refresh done");
        this.$forceUpdate(); 
        
      })
    }
  }

}
</script>


<style>


</style>