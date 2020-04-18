<template>
  <div class="migration">
     <v-flex xs12 md12 >

        <v-row
          no-gutters
          align="center"
        >
          <v-col cols="3" sm="3">
            <h2>Migration</h2>
          </v-col>
          <v-spacer />
          
        </v-row>

        <v-container fluid>
          <v-layout row>
            <v-flex xs5 md5>
              <v-card>
                <v-card-title>Section 1</v-card-title>
                <v-divider></v-divider>
                <v-simple-table dense>
                  <template>
                    <thead>
                      <th>Cluster</th>
                      <th>deployScriptOperations</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>AAA</td>
                        <td>Complete</td>
                        <td>
                          <v-btn dense small class="ma-2" rounded color="error">
                            <v-icon left>mdi-close-circle</v-icon> Remove
                          </v-btn>

                          <v-btn dense small class="ma-2" rounded>
                            <v-icon left>mdi-comment-text</v-icon> Log
                          </v-btn>
                        </td>
                      </tr>
                      <tr>
                        <td>BBB</td>
                        <td>Complete</td>
                        <td>
                          <v-btn dense small class="ma-2" rounded color="error">
                            <v-icon left>mdi-close-circle</v-icon> Remove
                          </v-btn>

                          <v-btn dense small class="ma-2" rounded>
                            <v-icon left>mdi-comment-text</v-icon> Log
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </template>
              </v-simple-table>
              </v-card>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs5 md5>
              <v-card>
                <v-card-title>Section 2</v-card-title>
                <v-divider></v-divider>
                <v-simple-table dense>
                  <template>
                    <thead>
                      <th>Cluster</th>
                      <th>Type</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>AAA</td>
                        <td>Complete</td>
                        <td>
                          <v-btn dense small class="ma-2" rounded color="error">
                            <v-icon left>mdi-close-circle</v-icon> Remove
                          </v-btn>

                          <v-btn dense small class="ma-2" rounded>
                            <v-icon left>mdi-comment-text</v-icon> Log
                          </v-btn>
                        </td>
                      </tr>
                      <tr>
                        <td>BBB</td>
                        <td>Complete</td>
                        <td>
                          <v-btn dense small class="ma-2" rounded color="error">
                            <v-icon left>mdi-close-circle</v-icon> Remove
                          </v-btn>

                          <v-btn dense small class="ma-2" rounded>
                            <v-icon left>mdi-comment-text</v-icon> Log
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </template>
              </v-simple-table>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
    </v-flex>
  </div>
</template>


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