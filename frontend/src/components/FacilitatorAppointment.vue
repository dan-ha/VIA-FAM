<template>
  <v-container>
    <h1>Appointment List</h1>
    <v-data-table :headers="headers" :items="appointments" :items-per-page="10" class="elevation-1"  @click:row="showAppointment" >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Appointments</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>

      <template v-slot:item.delete="{ item }">
        <v-btn color="blue" text @click="deleteAppointment(item, $event)">Delete</v-btn>
      </template>


    </v-data-table>
    <InformationDialog :display="display" :appointment="appointment" @close="display = false"/>

  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import facilityService from "@/services/facilityService.js";
import InformationDialog from "@/components/InformationDialog.vue";


export default {
  name: "FacilitatorAppointments",
    computed: {
    ...mapGetters(["user"])
  },
  data() {
    return {
      headers: [
        {
          text: "Student",
          value: "studentId"
        },
        {
          text: "Subject",
          value: "subject"
        },
        { text: "Location", value: "location" },
        { text: "Date", value: "date" },
        { text: "Duration", value: "duration" },
        { text: "delete", value: "delete" }
      ],
      appointments: [],
      display:false,
      appointment: null
    };
  },
  methods: {
    showAppointment(item) {
      this.appointment = null
      this.appointment = item
      this.display=true
      console.log( this.appointment)
      console.log('Show appointment')
    },
    async deleteAppointment( appointment, event) {
      event.stopPropagation()
      try {
        if(await facilityService.deleteAppointment(appointment.id)){
          await this.fetchAppointemnts()
        }
      } catch (error) {
         console.log(error);
      }
    },
    async fetchAppointemnts() {
      this.appointments = await facilityService.getAppointments(this.user.username)
    }
  },
  async mounted() {
    await this.fetchAppointemnts()
  },
  components:{InformationDialog}
};
</script>