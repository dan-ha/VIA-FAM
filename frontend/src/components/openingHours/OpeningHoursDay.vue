<template>
  <div>
    <div class="d-flex">
      <v-combobox v-model="day" :items="items" label="Select a working day"></v-combobox>
      <v-menu
        ref="menu1"
        v-model="menu1"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="timeFrom"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="timeFrom"
            :rules="timeRules"
            label="From"
            prepend-icon="access_time"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker v-if="menu1" v-model="timeFrom" @click:minute="saveTimeFrom" format="24hr"></v-time-picker>
      </v-menu>

      <v-menu
        ref="menu2"
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="timeTo"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="timeTo"
            :rules="timeRules"
            label="To"
            prepend-icon="access_time"
            v-on="on"
            required
          ></v-text-field>
        </template>
        <v-time-picker v-if="menu2" v-model="timeTo" @click:minute="saveTimeTo" format="24hr"></v-time-picker>
      </v-menu>
    </div>
  </div>
</template>

<script>
import WeekdaysEnum from "@/model/WeekdaysEnum.js";
import OpeningHours from "@/model/OpeningHours.js";

export default {
  name: "OpeningHoursDay",
  props: {
    openingHour: Object
  },
  data: function() {
    return {
      day: this.openingHour ? this.dayCodeToItem(this.openingHour.dayOfWeek) : { text: "Monday", value: 1 },
      items: [
        { text: "Monday", value: 1 },
        { text: "Tuesday", value: 2 },
        { text: "Wednesday", value: 3 },
        { text: "Thursday", value: 4 },
        { text: "Friday", value: 5 }
      ],
      timeFrom: this.openingHour ? this.openingHour.timeOpen : null,
      timeTo: this.openingHour ? this.openingHour.getTimeClose() : null,
      timeRules: [v => !!v || "Time is required"],
      menu1: false,
      menu2: false
    };
  },
  methods: {
    saveTimeFrom() {
      this.$refs.menu1.save(this.timeFrom);
    },
    saveTimeTo() {
      this.$refs.menu2.save(this.timeTo);
    },
    getOpeningHours() {
      let openingHours = null;
      if (this.day && this.timeFrom && this.timeTo) {
        openingHours = new OpeningHours(this.day.value, this.timeFrom);
        openingHours.setTimeClose(this.timeTo);
      }
      return openingHours;
    },
    dayCodeToItem(dayCode) {
      return {
        value: dayCode,
        text: WeekdaysEnum[dayCode]
      };
    }
  }
};
</script>