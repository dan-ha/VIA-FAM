<template>
  <div id="app">
    <AppointmentDialog :display='appointmentDialog' :event='selectedEvent' :facility='facility' @close='appointmentDialog = false'/>
    <v-app id="inspire">
      <v-row class="fill-height">
        <v-col>
          <v-sheet height="64">
            <v-toolbar flat color="white">
              <v-btn outlined class="mr-4" @click="setToday">Today</v-btn>
              <v-btn fab text small @click="prev">
                <v-icon small>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn fab text small @click="next">
                <v-icon small>mdi-chevron-right</v-icon>
              </v-btn>
              <v-toolbar-title>{{ title }}</v-toolbar-title>
            </v-toolbar>
          </v-sheet>
          <v-sheet height="600">
            <v-calendar
              ref="calendar"
              v-model="focus"
              color="primary"
              :events="availableEvents"
              :event-color="getEventColor"
              :event-margin-bottom="3"
              :now="today"
              type="week"
              :weekdays="days"
              @click:event="showEvent"
              @change="updateRange"
            ></v-calendar>
          </v-sheet>
        </v-col>
      </v-row>
    </v-app>
        {{facility}}
    <br />
    <br />
    {{availableEvents}}
  </div>
</template>

<script>
import AppointmentDialog from '@/components/AppointmentDialog.vue'
import moment from 'moment'

export default {
  name: "calendar",
  props: {
    facility: Object
  },
  data: () => ({
    today: moment().format('YYYY-MM-DD'),
    focus: moment().format('YYYY-MM-DD'),
    start: null,
    end: null,
    days: [1, 2, 3, 4, 5],
    appointmentDialog: false,
    selectedEvent: null
  }),
  computed: {
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }

      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const suffixMonth = startMonth === endMonth ? "" : endMonth;

      const startYear = start.year;
      const endYear = end.year;
      const suffixYear = startYear === endYear ? "" : endYear;

      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);

      return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long"
      });
    },
    availableEvents() {
      let availableSlots = [];
      let generateOh = this.generateOpeningHours
      let start = this.start
      if (this.facility && start) {
        this.facility.openingHours.forEach( oh => {
          availableSlots.push(...generateOh(oh, start))
        });
      }
      return availableSlots;
    }
  },
  mounted() {
    this.$refs.calendar.checkChange();
    this.$refs.calendar.scrollToTime("07:00");
  },
  methods: {
    generateOpeningHours(openingHours, mondayDate) {
      const events = []
      let date = moment(`${mondayDate.date} ${openingHours.timeOpen}`, 'YYYY-MM-DD HH:mm')
      date.add(openingHours.dayOfWeek - 1, 'days')
      for(let i = 0; i < openingHours.duration / 60; i++) {
        const start = date.format('YYYY-MM-DD HH:mm')
        date.add(60, 'minutes')
        const end = date.format('YYYY-MM-DD HH:mm')
        events.push({name: 'Available', start, end, available: true})
      }
      return events
    },
    showEvent(event) {
      this.appointmentDialog = false
      this.appointmentDialog = true
      this.selectedEvent = null
      this.selectedEvent = event.event
      console.log(JSON.stringify(event));
    },
    getEventColor(event) {
      return event.available ? 'green' : 'red'
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    updateRange({ start, end }) {
      // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
      this.start = start;
      this.end = end;
    },
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    }
  },
  components: {
    AppointmentDialog
  }
};
</script>