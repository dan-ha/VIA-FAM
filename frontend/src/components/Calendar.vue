<template>
   <v-row>
     {{facility}}
    aaaaaaa {{facility.name}}
    <v-col>
      <v-sheet height="400">
        <v-calendar
          ref="calendar"
          :now="today"
          :value="today"
          :events="events"
          color="primary"
          event-color="purple"
          type="week"
        >
        <!-- the events that are showing when the facility isn't working -->
          
          <!-- the events at the top (all-day) -->
          <template v-slot:day-header="{ date }">
            <template v-for="event in eventsMap[date]">
              <!-- all day events don't have time -->
              <div
                v-if="!event.time"
                :key="event.title"
                class="my-event"
                @click="open(event)"
                v-html="event.title"
              ></div>
            </template>
          </template>
          <template v-slot:day-body="{date, timetoY, minutesToPixels}">
            <template v-for="event in eventsMap[date]">
              <div
                v-if="event.time"
                :key="event.title"
                :style="{ top: timeToY(event.time) + 'px', height: minutesToPixels(event.duration) + 'px' }"
                class="my-event with-time"
                @click="open(event)"

                v-html="event.title"
              ></div>
            </template>
          </template>
          <!-- the events at the bottom (timed) -->
          <template v-slot:day-body="{ timeToY, minutesToPixels }">
            
              <!-- timed events -->
              <!-- <div
                v-if="event.time"
                :key="facility.name"
                :style="{ top: timeToY(event.time) + 'px', height: minutesToPixels( facility.today ) + 'px' }"
                class="my-event with-time"
                @click="open(event)"
                v-html="event.title"
              ></div> -->
            
          </template>
        </v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
//import { mapGetters } from "vuex";




  export default {
    name: "Calendar",
    props: ['facility'],
    methods: {
      makeEnd(start, duration){
         let date = new Date(start)
         console.log('Data ' + date)
         let d2 = new Date(date.getTime() + duration *60000)
         let result =  d2.toISOString().substr(0, 10)
         result += ' '
         result +=d2.toISOString().substr(11, 5)
         console.log('Result' + result)
        return result
      }
    },
    data: function() {
      return {
      // today: DateTime.Today(),
      // events: this.appointments
      today: '2019-01-08',
      //todayDate: new Date().toISOString().substr(0, 10) /*'YYYY-MM-DD'*/ ,
      events: [
        {
          name: "" + this.facility.name,
          start: '2019-01-07 09:00',
          end: '2019-01-07 10:00',
        },
        {
          name: 'Thomas\' Birthday',
          start: '2019-01-10',
        },
        {
          name: 'Mash Potatoes',
          start: '2019-01-09 ' + this.facility.openingHours[0].timeOpen,
          end: this.makeEnd('2019-01-09 ' + this.facility.openingHours[0].timeOpen, this.facility.openingHours[0].duration),
        },
        {
          name: 'closed',
          start: '2019-01-11 00:00',
          end: '2019-01-11 ' + this.facility.openingHours[0].timeOpen,
        },
        {
          name: 'closedO',
          start: this.makeEnd('2019-01-11 ' + this.facility.openingHours[0].timeOpen, this.facility.openingHours[0].duration),
          end: '2019-01-11 23:59',
        },
      ],
    }},
    mounted () {
      this.$refs.calendar.scrollToTime('08:00')
    }
    
  }
</script>
 
<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}

.my-event.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}
</style>
