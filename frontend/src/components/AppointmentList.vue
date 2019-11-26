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

      <template v-slot:item.delete="{ item }">
        <v-btn color="blue" text @click="deleteAppointment(item)">Delete</v-btn>
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
        { text: "Duration", value: "duration" },
        { text: "delete", value: "delete" }
      ],
      appointments: []
    };
  },
  methods: {
    async deleteAppointment( appointment ) {
      try {
        if(await facilityService.deleteAppointment(appointment.id)){
          await this.fetchAppointemnts()
        }
      } catch (error) {
         console.log(error);
      }
    },
    async fetchAppointemnts() {
      this.appointments = await facilityService.getAppointments(undefined, this.user.username)
    }
  },
  async mounted() {
    await this.fetchAppointemnts()
  },
};
</script>