<template>
  <v-container>
    <h1>Appointment List</h1>
    <v-data-table :headers="headers" :items="appointments" :items-per-page="10" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Appointments</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import facilityService from "@/services/facilityService.js";

export default {
  name: "AppointmentList",
    computed: {
    ...mapGetters(["user"])
  },
  data() {
    return {
      headers: [
        {
          text: "Subject",
          value: "subject"
        },
        { text: "Location", value: "location" },
        { text: "Date", value: "date" },
        { text: "Duration", value: "duration" }
      ],
      appointments: []
    };
  },
  async mounted() {
    this.appointments = await facilityService.getAppointments(undefined, this.user.username)
  },
};
</script>