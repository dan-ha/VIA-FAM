<template>
  <div>
    Opening hours:
    <div v-for="n in days" v-bind:key="n">
      <OpeningHoursDay v-if="n <= openingHours.length" ref="day" :openingHour="openingHours[n-1]"></OpeningHoursDay>
      <OpeningHoursDay v-else ref="day"></OpeningHoursDay>
    </div>
    <v-btn @click="addDay">+ Add</v-btn>
    <v-btn @click="removeDay">- Remove</v-btn>
  </div>
</template>

<script>
import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);
import OpeningHoursDay from "@/components/openingHours/OpeningHoursDay.vue";
export default {
  name: "OpeningHours",
  props: {
    openingHours: Array
  },
  components: {
    OpeningHoursDay
  },
  data: function() {
    return {
      days: this.openingHours ? this.openingHours.length : 1
    };
  },
  methods: {
    addDay() {
      this.days++;
    },
    removeDay() {
      if (this.days > 1) {
        if (this.openingHours && this.openingHours.length === this.days) {
          this.openingHours.pop();
        }
        this.days--;
      }
    },
    getOpeningHours() {
      return this.$refs.day.map(day => day.getOpeningHours()).filter(oh => oh);
    }
  }
};
</script>