<template>
  <div class="dashboard">


    <v-flex xs12 md12 >

      <v-row
        no-gutters
        align="center"
        >
        <v-col cols="3" sm="3">
          <h2>Dashboard</h2>
        </v-col>
        <v-spacer />
        <v-col cols="12" sm="5" xs="12"> 
          <v-chip-group
          show-arrows
          multiple
          active-class="primary--text"
          >
            <v-chip
              class="ma-2"
              color="amber lighten-2"
              text-color="grey darken-2"
            >
              <v-avatar
                left
                class="amber darken-1"
              >
                1
              </v-avatar>
              Dead
            </v-chip>

            <v-chip
              class="ma-2"
              color="amber lighten-2"
              text-color="grey darken-2"
            >
              <v-avatar
                left
                class="amber darken-1"
              >
                1
              </v-avatar>
              Error
            </v-chip>

            <v-chip
              class="ma-2"
              color="amber lighten-2"
              text-color="grey darken-2"
            >
              <v-avatar
                left
                class="amber darken-1"
              >
                1
              </v-avatar>
              Backups
            </v-chip>

            <v-chip
              class="ma-2"
              color="amber lighten-2"
              text-color="grey darken-2"
            >
              <v-avatar
                left
                class="amber darken-1"
              >
                1
              </v-avatar>
              Standby
            </v-chip>

            <v-chip
              class="ma-2"
              color="grey lighten-3"
              text-color="grey  darken-3"
            >
              <v-avatar
                left
                class="grey lighten-1"
              >
                0
              </v-avatar>
              Faults
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
    

      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 md12>

            <!-- FILTERS -->
            <v-row
              align="center"
              >

              <v-col cols="12" sm="3">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  dense
                ></v-text-field>
              </v-col>
              
              <v-col cols="12" sm="2">
                <v-select
                  v-model="role_types_value"
                  :items="role_types"
                  label="Role Types"
                  dense
                ></v-select>
              </v-col>

              <v-col cols="12" sm="2">
                <v-select
                  v-model="services_value"
                  :items="services"
                  label="Service"
                  dense
                ></v-select>
              </v-col>

              <v-col cols="12" sm="2">
                <v-select
                  v-model="environments_value"
                  :items="environments"
                  label="Environment"
                  dense
                ></v-select>
              </v-col>

            </v-row>
        
            <!-- TABLE TOP -->
            <v-data-table
              :headers="clustersHeaders"
              :items="clusters"
              :items-per-page="5"
              :sort-by="['cluster', 'lastbackup']"
              :sort-desc="[false, true]"
              multi-sort
              :search="search"
              class="elevation-1 table_header"
              >
              <template v-slot:item="row">
                <tr @click="activeRowCluster(row.item)" :class="{'blue lighten-5': row.item.id===selectedCluster.id}">
                  <td>{{row.item.service}}</td>
                  <td>{{row.item.cluster}}</td>
                  <td>{{row.item.lastbackup}}</td>
                  <td>{{row.item.cnt}}</td>
                  <td>{{row.item.lag}}</td>
                  <td>{{row.item.srvs}}</td>
                  <td>{{row.item.disk}}</td>
                  <td>{{row.item.fault}}</td>
                  <td>{{row.item.maint}}</td>
                  <td>{{row.item.age}}</td>
                  <td>{{row.item.monitor}}</td>
                  <td>{{row.item.status}}</td>
                  <td>{{row.item.tickets}}</td>
                  <td>
                      <!-- @click.stop="drawerRight = !drawerRight" -->
                      <v-btn icon dark fab small color="blue" @click.stop="drawerRight = !drawerRight" @click="openActionsPane(row.item)">
                          <v-icon>mdi-arrow-right-circle</v-icon>
                      </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>

          

        
          <!-- BOTTOM -->
          <v-row class="my-4" v-show="selectedCluster.length !== 0">
            <v-col sm="12" cols="12">

              <div>
                <p class="font-weight-medium ma-0 pa-0 blue--text darken-3">{{selectedCluster.service}}</p>
                <h3>Servers</h3>
              </div>
              <v-divider class="mb-3"></v-divider>


              <!-- TABLE BOTTOM -->
              <v-data-table
                :headers="selectedClusterHeaders"
                :items="servers"
                :items-per-page="5"
                :sort-by="['cluster', 'lastbackup']"
                :sort-desc="[false, true]"
                class="elevation-1 table_header"
              >
                <template v-slot:item="row">
                  <tr @click="activeRowServer(row.item)" :class="{'blue lighten-5': row.item.id===selectedServer.id}">
                    <td>{{row.item.name}}</td>
                    <td>{{row.item.dc}}</td>
                    <td>{{row.item.role}}</td>
                    <td>{{row.item.bkps}}</td>
                    <td>{{row.item.lag}}</td>
                    <td>{{row.item.disk}}</td>
                    <td>{{row.item.age}}</td>
                    <td>{{row.item.broke}}</td>
                    <td>{{row.item.alert}}</td>
                    <td>{{row.item.warn}}</td>
                    <td>{{row.item.ok}}</td>
                    <td>{{row.item.cnt}}</td>
                    <td>{{row.item.status}}</td>
                    <td>{{row.item.detail}}</td>
                    <td>{{row.item.servicelevel}}</td>
                  </tr>
                </template>
              </v-data-table>


              <!-- SELECTED SERVER DETAILS -->
              <div class="my-5 py-5"  v-show="selectedServer.length !== 0">
                <h3>{{selectedServer.name}} Details</h3>
                <v-divider class="pb-5"></v-divider>

                <!-- Columns are always 50% wide, on mobile and desktop -->
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <div class="font-weight-black text-center grey lighten-4 pa-1">Backups</div>
                    <v-divider/>
                    <v-simple-table dense>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Database</th>
                            <th class="text-left">Run Date</th>
                            <th class="text-left">Run Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>DB Name</td>
                            <td>2019-12-04</td>
                            <td>06:40:40	</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <div class="font-weight-black text-center grey lighten-4 pa-1">Replication</div>
                    <v-divider/>
                    <v-simple-table dense>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Status</th>
                            <th class="text-left">Lag</th>
                            <th class="text-left">Poll Date</th>
                            <th class="text-left">Poll Age</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Replication Running</td>
                            <td>0</td>
                            <td>2019-12-04 06:40:40</td>
                            <td>108838</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <div class="font-weight-black text-center grey lighten-4 pa-1">Drives</div>
                    <v-divider/>
                    <v-simple-table dense>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Drive</th>
                            <th class="text-left">Total</th>
                            <th class="text-left">Used</th>
                            <th class="text-left">Used %</th>
                            <th class="text-left">Poll Age</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>/</td>
                            <td>177152 Mb</td>
                            <td>7372 Mb</td>
                            <td>5 %</td>
                            <td>108824</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <div class="font-weight-black text-center grey lighten-4 pa-1">Live Check</div>
                    <v-divider/>
                    <v-simple-table dense>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Status</th>
                            <th class="text-left">Detail</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>OK</td>
                            <td>--</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-col>
                </v-row>
                
              </div>
            </v-col>
          </v-row>

        </v-flex>
      </v-layout>
    </v-container>


      <!-- RIGHT PANE -->
      <v-navigation-drawer
          v-model="drawerRight"
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

                <v-list-item>
                  <v-list-item-title>Rebuild Standby</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Repoint Standby</v-list-item-title>
                </v-list-item>
            </v-col>
          </v-row>
      </v-navigation-drawer>
    </v-flex>
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
        clustersHeaders: [
          {
            text: 'Header',
            align: 'start',
            sortable: false,
            value: 'service',
          },
          { text: 'Header 1', value: 'cluster' },
          { text: 'Header 2', value: 'lastbackup' },
          { text: 'Header 3', value: 'cnt' },
          { text: 'Header 4', value: 'lag' },
          { text: 'Header 5', value: 'srvs' },
          { text: 'Header 6', value: 'disk' },
          { text: 'Header 7', value: 'fault' },
          { text: 'Header 8', value: 'maint' },
          { text: 'Header 9', value: 'age' },
          { text: 'Header 10', value: 'monitor' },
          { text: 'Header 11', value: 'status' },
          { text: 'Header 12', value: 'tickets' },
          { text: '', value: 'action' },

        ],
        clusters: [
          {
            id: 1,
            service: 'service 1',
            cluster: 'service 1',
            lastbackup: 'OK',
            cnt: 'service 1',
            lag: 0,
            srvs: 3,
            disk: 5,
            fault: 6,
            maint: 0,
            age: 234342,
            monitor: 'OK',
            status: 'OK',
            tickets: '',
          },
          {
            id: 2,
            service: 'service 2',
            cluster: 'service 2',
            lastbackup: 'OK',
            cnt: 'service 1',
            lag: 0,
            srvs: 3,
            disk: 5,
            fault: 6,
            maint: 0,
            age: 234342,
            monitor: 'OK',
            status: 'OK',
            tickets: '',
          }
        ],
        items: [
          {
            title: 'Option 1',
            items: [
              { title: 'A' },
              { title: 'B' },
              { title: 'C' },
            ],
          },
          {
            title: 'Option 2',
            /* active: true, */
            items: [
              { title: '222' },
              { title: 'aaa' },
              { title: 'bbb' },
            ],
          },
          {
            title: 'Option 3',
            items: [
              { title: '333' },
              { title: 'ccc' },
              { title: 'ddd' },
            ],
          }
        ],
        selectedClusterHeaders: [
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Header', value: 'cluster' },
          { text: 'Header', value: 'role' },
          { text: 'Header', value: 'bkps' },
          { text: 'Header', value: 'lag' },
          { text: 'Header', value: 'disk' },
          { text: 'Header', value: 'age' },
          { text: 'Header', value: 'broke' },
          { text: 'Header', value: 'alert' },
          { text: 'Header', value: 'warn' },
          { text: 'Header', value: 'ok' },
          { text: 'Header', value: 'cnt' },
          { text: 'Header', value: 'status' },
          { text: 'Header', value: 'detail' },
          { text: 'Header', value: 'servicelevel' },

        ],
        servers: [
          {
            id: 1,
            name: 'aaa',
            dc: 'bbb',
            role: 'ccc',
            bkps: '0',
            lag: '0',
            disk: 40,
            age: 234342,
            broke: 5,
            alert: 6,
            warn: 0,
            ok: 4,
            cnt: 4,
            status: 'OK',
            detail: '',
            servicelevel: 'ddd',
          },
          {
            id: 2,
            name: 'aaa',
            dc: 'bbb',
            role: 'ccc',
            bkps: '0',
            lag: '0',
            disk: 40,
            age: 234342,
            broke: 5,
            alert: 6,
            warn: 0,
            ok: 4,
            cnt: 4,
            status: 'OK',
            detail: '',
            servicelevel: 'ddd',
          }
        ],
        role_types_value: 0,
        services_value: 0,
        environments_value: 0,
        role_types: ['type 1', 'type 2'],
        services: ['Services', 'Service 1', 'Service 2', 'Service 3'],
        environments: ['DEV', 'QA', 'PROD'],
      }
    },
    methods: {
      openActionsPane(item) {
        if (item.id === this.selectedClusterActions.id){
          this.selectedClusterActions = []
          this.drawerRight = false;
        }else{
          this.selectedClusterActions = item;
          this.drawerRight = true;
        }
      },
      activeRowCluster: function (item) {
        if (item.id === this.selectedCluster.id){
          this.selectedCluster = [];
        }else{
          this.selectedCluster = item;
        }
        this.$set(item, 'selected', true)

        this.selectedServer = [];
        this.selectedClusterActions = []
      },
      activeRowServer: function (item) {
        if (item.id === this.selectedServer.id){
          this.selectedServer = [];
        }else{
          this.selectedServer = item;
        }
        this.$set(item, 'selected', true)
      }
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


  .resizable-content {
    height: 100%;
    width: 100vw;
    padding-bottom:20px;
    overflow:auto;
    border-top: 1px solid grey;
  }

</style>