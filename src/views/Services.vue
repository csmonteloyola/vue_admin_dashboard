<template>
  <div class="dashboard">


    <v-flex xs12 md12 >

        <v-row
          no-gutters
          align="center"
        >
          <v-col cols="3" sm="3">
            <h2>Services</h2>
          </v-col>
          <v-spacer />
          
        </v-row>
    </v-flex>

    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 md12>

          <!-- FILTERS -->
          <v-row
            align="center"
            >

            <v-col cols="12" sm="2">
              <v-select
                v-model="services_value"
                :items="services"
                label="Services"
                outlined
              ></v-select>
            </v-col>

          </v-row>
        
          <!-- Details -->
          <v-card class="mb-4">
            <v-card-title>
              Details
            </v-card-title>
            <v-divider/>
            <v-row>
              <v-col cols="12" sm="6" md="2" class="mx-5">
                <div class="overline">Service</div>
                <div class="subtitle-1	">AAA</div>
              </v-col>
              <v-col cols="12" sm="6" md="2" class="mx-5">
                <div class="overline">Service</div>
                <div class="subtitle-1	">BBB</div>
              </v-col>
              <v-col cols="12" sm="6" md="2" class="mx-5">
                <div class="overline">Service</div>
                <div class="subtitle-1	">CCC</div>
              </v-col>
            </v-row>
          </v-card>

           <!-- Services -->
          <v-card>
            <v-card-title>
              Section 1
            </v-card-title>
            <v-divider/>
            
            <v-row v-for="item in clusters" :key="item.service"> 
              <v-col cols="12" sm="12" md="12" class="px-5">
                <v-card outlined>
                  <v-row>
                    <v-col cols="10" sm="10" md="3" class="px-5">
                      <div class="font-weight-bold pa-2">{{item.cluster}}</div>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="1" sm="1" md="1" class=" text-lg-right">
                      <v-btn icon dark large dense color="blue" @click.stop="drawerRight = !drawerRight" @click="openActionsPane(item)">
                          <v-icon>mdi-arrow-right-circle</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-divider/>
                  <v-row>
                    <v-col cols=12 sm="9" class="px-5">
                      <v-simple-table dense class="bordered">
                        <template v-slot:default>
                          <tbody>
                            <tr v-for="item in item.servers" :key="item.service">
                              <td><span class="overline font-weight-bold blue--text">{{item.service}}</span><br/>{{item.cname}}</td>
                              <td>{{item.clustername}} {{item.clusterversion}}</td>
                              <td>{{item.database}}	</td>
                              <td>
                                <v-chip
                                  v-show="item.showcompatibility === 'on'"
                                  pill
                                  x-small
                                  class="ma-2"
                                  color="blue lighten-2"
                                  text-color="white"
                                >
                                  <v-avatar
                                    left
                                    class="overline blue darken-1"
                                  >
                                    ON
                                  </v-avatar>
                                  text
                                </v-chip>
                                <v-chip
                                  v-show="item.pxc === 'per'"
                                  pill
                                  x-small
                                  class="ma-2"
                                  color="blue lighten-2"
                                  text-color="white"
                                >
                                  <v-avatar
                                    left
                                    class="overline blue darken-1"
                                  >
                                    OFF
                                  </v-avatar>
                                  text
                                </v-chip>
                                
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-col>

                    <v-col cols=12 sm="3" class="px-5">
                      <div class="text-center body-2 font-weight-bold pa-1">Section</div>

                      <v-simple-table dense class="bordered mb-3">
                        <template v-slot:default>
                          <tbody>
                            <tr>
                              <td>Item 1</td>
                              <td v-bind:class="{ 'success--text': item.statuscheck.livestatus==='OK', 'error--text': item.statuscheck.livestatus!=='OK' }">{{item.statuscheck.livestatus}}</td>
                            </tr>
                            <tr>
                              <td>Item 2</td>
                              <td v-bind:class="{ 'success--text': item.statuscheck.zonedetail==='OK', 'error--text': item.statuscheck.zonedetail!=='OK' }">{{item.statuscheck.zonedetail}}</td>
                            </tr>
                            <tr>
                              <td>Item 3</td>
                              <td v-bind:class="{ 'success--text': item.statuscheck.zonestatus==='OK', 'error--text': item.statuscheck.zonestatus!=='OK' }">{{item.statuscheck.zonestatus}}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>

                      <div class="text-center body-2 font-weight-bold pa-1">Error</div>

                      <v-simple-table dense  class="bordered">
                        <template v-slot:default>
                          <tbody>
                            <tr v-for="err in item.detectorerror"  :key="err.name">
                              <td>{{err.name}}</td>
                              <td class="error--text">{{err.error}}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>

                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
              
            </v-row>
          </v-card>
        </v-flex>

        
       
        
      </v-layout>
    </v-container>


    <!-- RIGHT PANE -->
    <v-navigation-drawer
        v-model="drawerRight"
        hide-overlay
        app
        clipped
        right
        temporary
        color="blue-grey lighten-5"
        >

        <v-row class="mt-6">
          <v-col
            cols="12"
            sm="12"
          >
            <div class="pl-5">
              <p class="font-weight-medium ma-0 pa-0 blue--text darken-3">{{selectedClusterActions.service}}</p>
              <h3>Actions</h3>
            </div>
            <v-divider/>

            <v-list>
              <v-list-group
                v-for="item in items"
                :key="item.title"
                v-model="item.active"
                no-action=""
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item
                  v-for="subItem in item.items"
                  :key="subItem.title"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="subItem.title"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

              </v-list-group>
            </v-list>

          </v-col>
        </v-row>

        
        
    </v-navigation-drawer>

  </div>
</template>


<script>
/* import VueResizable from 'vue-resizable' */

  export default {
    /* components: {VueResizable}, */
    data () {
      return {
        search: '',
        selectedCluster: [],
        selectedServer: [],
        drawerRight: false,
        selectedClusterActions: [],
        clusters: [
          {
            id: 1,
            service: 'AAA',
            cluster: 'AAA',
            servers: [
              {
                service: 'BBB',
                cname: 'bbb',
                clustername: 'bbb',
                clusterversion: 'bbb',
                database: 'foo',
                showcompatibility: 'on',
                pxc: 'off'
              },
              {
                service: 'CCC',
                cname: 'bbb',
                clustername: 'bbb',
                clusterversion: 'bbb',
                database: 'foo',
                showcompatibility: 'on',
                pxc: 'off'
              },
              {
                service: 'DDD',
                cname: 'bbb',
                clustername: 'bbb',
                clusterversion: 'bbb',
                database: 'foo',
                showcompatibility: 'on',
                pxc: 'off'
              }
            ],
            statuscheck: {
              livestatus: 'OK',
              zonedetail: 'OK',
              zonestatus: 'OK',
            },
            detectorerror: [
              {
                name: 'aaa',
                error: 'Error',
              },
              {
                name: 'bbb',
                error: 'Error',
              },
              {
                name: 'ccc',
                error: 'Error',
              },
            ]
          },
          
        ],
        items: [
          {
            title: 'Item 1',
            items: [
              { title: 'option 1' },
              { title: 'option 2' },
              { title: 'option 3' },
            ],
          },
          {
            title: 'Item 2',
            items: [
              { title: 'option 1' },
              { title: 'option 2' },
              { title: 'option 3' },
            ],
          },
          {
            title: 'Item 3',
            items: [
              { title: 'option 1' },
              { title: 'option 2' },
              { title: 'option 3' },
            ],
          },
        ],
        services_value: 0,
        services: ['Services', 'Service 1', 'Service 2', 'Service 3'],
      }
    },
    methods: {
      openActionsPane(item) {
        console.log(this.drawerRight, this.selectedClusterActions.id )
        this.selectedClusterActions = item;
      },
    }
  }
</script>

<style scoped>
  /* tbody tr:nth-of-type(even) {
    background-color: rgba(236, 237, 237);
  }

  tbody tr:nth-of-type(odd) {
    background-color: rgb(250 ,250, 250);
  } */

  tbody tr td{
    white-space: nowrap;
  }

  .bordered{
    border: 1px solid lightgrey;
  }


</style>