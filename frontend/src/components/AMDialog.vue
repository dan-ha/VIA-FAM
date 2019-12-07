<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">{{btnLabel}}</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <div class="headline">{{facilityName}}</div>
      </v-card-title>
      <v-card-text>
        <span class="subtitle-1">Activate Appointment Management functionality for this facility</span>
        <v-container>
          <v-form ref="form">
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  v-model="services"
                  :items="allServices"
                  label="Pick Services"
                  multiple
                  chips
                  hint="Services offered by this facility"
                  persistent-hint
                ></v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="facilitators"
                  :items="employees"
                  :rules="requiredRules"
                  item-text="name"
                  item-value="username"
                  label="Pick Facilitators"
                  multiple
                  chips
                  hint="Facilitators working for this facility"
                  persistent-hint
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
        <v-alert v-model="alert" type="error" dismissible>An error occured</v-alert>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue" text @click="close">Close</v-btn>
        <v-btn color="blue" text @click="activate">Activate</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import authService from "@/services/authService.js";
import facilityService from "@/services/facilityService.js";

export default {
  name: "AMDialog",
  props: {
    btnLabel: String,
    facilityName: String
  },
  data: function() {
    return {
      dialog: false,
      services: [],
      allServices: [
        "Project support",
        "Bachelor project supervision",
        "References Help",
        "Literature search",
        "Erasmus consultation",
        "ECTS transfer",
        "Leave of absence",
        "CV consultation",
        "Internship guidance",
        "Motivation letter check",
        "Consultation",
        "OneOnOne",
        "Help",
        "Other"
      ],
      facilitators: [],
      employees: [],
      requiredRules: [v => !!v.length || "*This field is required"],
      alert: false
    };
  },
  methods: {
    async activate() {
      if (this.$refs.form.validate()) {
        try {
          await facilityService.activateAM(
            this.facilityName,
            this.services,
            this.facilitators
          );
          this.reset();
          this.$emit("activated");
        } catch (error) {
          this.alert = true;
          console.log(error);
        }
      }
    },
    close() {
      this.reset();
    },
    reset() {
      this.$refs.form.resetValidation();
      this.alert = false;
      this.services = [];
      this.facilitators = [];
      this.dialog = false;
    }
  },
  async created() {
    this.employees = await authService.getEmployees();
  }
};
</script>