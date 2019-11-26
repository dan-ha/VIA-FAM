<template>
  <v-dialog v-if='appointment' v-model="display" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <div class="headline">Appointment Details</div>
        
 
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  :value="appointment.subject"
                  label="Appointment topic"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="From" :value="from" disabled></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Until" :value="to" disabled></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-text-field label="Facilitator" :value="appointment.facilitatorEmployeeId" disabled></v-text-field>
              </v-col>
              <v-col cols="12" sm="5">
                <v-text-field :value="appointment.location" label="Location" prepend-icon="place" disabled></v-text-field>
              </v-col>
              <v-col cols="12" sm="7">
                <v-text-field :value="appointment.optionalLocation" label="Optional location" disabled></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  outlined
                  :value="appointment.description"
                  label="Description"
                  disabled
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue" text @click="close">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import facilityService from "@/services/facilityService.js";

export default {
  name: "informationDialog",
  props: {
    display: Boolean,
    appointment: Object,
  },
  computed: {
    from() {
      return new Date(this.appointment.date).toLocaleTimeString()
    },
    to() {
        let from = new Date(this.appointment.date)
        let to = new Date(from.getTime() + this.appointment.duration*60000)
      return to.toLocaleTimeString()
    },
    ...mapGetters(["user"])
  },
  methods: {
    close() {
     this.$emit("close");
    },
    getAppointment() {
 
    }
  }
};
</script>