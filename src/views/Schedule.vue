<template>
  <div class="schedule">
    <h2>Schedule</h2>

    <v-row class="fill-height">
      <v-col cols="12" sm="7">
        <v-sheet
        tile
        height="54"
        color="grey lighten-3"
        class="d-flex"
      >
        <v-btn
          icon
          class="ma-2"
          @click="$refs.calendar.prev()"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          icon
          class="ma-2"
          @click="$refs.calendar.next()"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="value"
            :weekdays="weekday"
            :type="type"
            :events="events"
            :event-overlap-mode="mode"
            :event-overlap-threshold="30"
            :event-color="getEventColor"
            @change="getEvents"
            @click:event="showEvent"
          ></v-calendar>
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="5">

            <v-card
              v-show="selectedOpen===true"
              color="grey lighten-4"
              flat
            >
              <v-toolbar
                :color="selectedEvent.color"
                dark
              >
                <v-toolbar-title v-html="selectedEvent.name + ' Details'"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="selectedOpen = false">
                  <v-icon>mdi-close-circle</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                
                <v-simple-table dense>
                    <template>
                      <thead>
                        <th>Status</th>
                        <th>Parameters</th>
                      </thead>
                      <tbody>
                        <tr>
                          <td width="30%">
                            <div class="text-center mb-2">
                              <v-chip
                                color="success"
                                center
                              >
                                Success
                              </v-chip>
                            </div>
                            <div class="caption"><div class="overline">Run</div> 2019-01-21 06:57:00</div>
                            <div class="caption"><div class="overline">Status</div> 2019-01-21 07:13:18</div>
                          </td>
                          <td>
                            <v-simple-table dense class="noborder">
                              <template>
                                <thead>
                                  <th>Status</th>
                                  <th>Parameters</th>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>cluster</td>
                                    <td>aaa</td>
                                  </tr>
                                  <tr>
                                    <td>environmentCode</td>
                                    <td>bbb</td>
                                  </tr>
                                  <tr>
                                    <td>mainOperation</td>
                                    <td>ccc</td>
                                  </tr>
                                  <tr>
                                    <td>roleType</td>
                                    <td>ddd</td>
                                  </tr>
                                  <tr>
                                    <td>template</td>
                                    <td>eee</td>
                                  </tr>
                                  <tr>
                                    <td>zoneID</td>
                                    <td>fff</td>
                                  </tr>
                                </tbody>
                              </template>
                              </v-simple-table>
                          </td>
                          
                        </tr>

                        <tr>
                          <td width="30%">
                            <div class="text-center mb-2">
                              <v-chip
                                color="greey"
                                center
                              >
                                Pending
                              </v-chip>
                            </div>
                            <div class="caption"><div class="overline">Run</div> 2019-01-21 06:57:00</div>
                          </td>
                          <td>
                            <v-simple-table dense class="noborder">
                              <template>
                                <thead>
                                  <th>Status</th>
                                  <th>Parameters</th>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>cluster</td>
                                    <td>aaa</td>
                                  </tr>
                                  <tr>
                                    <td>environmentCode</td>
                                    <td>bbb</td>
                                  </tr>
                                  <tr>
                                    <td>mainOperation</td>
                                    <td>ccc</td>
                                  </tr>
                                  <tr>
                                    <td>roleType</td>
                                    <td>ddd</td>
                                  </tr>
                                  <tr>
                                    <td>template</td>
                                    <td>eee</td>
                                  </tr>
                                  <tr>
                                    <td>zoneID</td>
                                    <td>fff</td>
                                  </tr>
                                </tbody>
                              </template>
                              </v-simple-table>
                          </td>
                          
                        </tr>
                        
                      </tbody>
                    </template>
                </v-simple-table>
                
              </v-card-text>
            </v-card>

      </v-col>
    </v-row>
    

  </div>
</template>


<script>

  export default {
    data: () => ({
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,

      type: 'month',
      mode: 'stack',
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
        { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
        { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
        { text: 'Mon, Wed, Fri', value: [1, 3, 5] },
      ],
      value: '',
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    }),
    methods: {
      created() {
        console.log("selectedOpen", this.selectedOpen)
      },
      showEvent ({ event }) {
        const open = () => {
          this.selectedEvent = event
          setTimeout(() => this.selectedOpen = true, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

      },
      getEvents ({ start, end }) {
        const events = []

        const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)
        const days = (max.getTime() - min.getTime()) / 86400000
        const eventCount = this.rnd(days, days + 20)

        for (let i = 0; i < eventCount; i++) {
          const allDay = this.rnd(0, 3) === 0
          const firstTimestamp = this.rnd(min.getTime(), max.getTime())
          const first = new Date(firstTimestamp - (firstTimestamp % 900000))
          const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
          const second = new Date(first.getTime() + secondTimestamp)

          events.push({
            name: this.names[this.rnd(0, this.names.length - 1)],
            start: this.formatDate(first, !allDay),
            end: this.formatDate(second, !allDay),
            color: this.colors[this.rnd(0, this.colors.length - 1)],
          })
        }

        this.events = events
      },
      getEventColor (event) {
        return event.color
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      formatDate (a, withTime) {
        return withTime
          ? `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
          : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`
      },
    },
  }
</script>

<style scoped>


</style>