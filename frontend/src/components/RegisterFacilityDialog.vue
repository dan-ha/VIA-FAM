<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">Register new Facility</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <div class="headline">Register New VIA Facility</div>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form">
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="name" :rules="nameRules" counter="100" label="Facility name"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="description"
                  :rules="descriptionRules"
                  counter="1000"
                  label="Description"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <OpeningHours ref="openingHours"></OpeningHours>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="Email address"
                  prepend-icon="email"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="phone"
                  :rules="phoneRules"
                  label="Phone number"
                  prepend-icon="phone"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="location"
                  :rules="locationRules"
                  label="Location"
                  prepend-icon="place"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  outlined
                  v-model="additionalInfo"
                  counter="1000"
                  label="Additional Information"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
        <v-alert v-model="alert" type="error" dismissible>An error occured. Please check for duplicates or incorrect information.</v-alert>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue" text @click="close">Close</v-btn>
        <v-btn color="blue" text @click="register">Register</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import OpeningHours from "@/components/OpeningHours.vue";
import facilityService from "@/services/facilityService.js";

export default {
  name: "FacilityRegisterDialog",
  data() {
    return {
      dialog: false,
      name: "",
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length >= 3) || "Name must be 3 or more characters",
        v => (v && v.length <= 100) || "Name must be less than 100 characters"
      ],
      description: "",
      descriptionRules: [v => !!v || "Description is required"],
      email: "email@address.com",
      emailRules: [v => /.+@.+\..+/.test(v) || "E-mail must be valid"],
      phone: "45000000",
      phoneRules: [v => /^[0-9]*$/.test(v) || "Phone number must be valid"],
      location: "D.301",
      locationRules: [v => !!v || "Location is required"],
      additionalInfo: "Additional information about the facility",
      alert: false
    };
  },
  methods: {
    async register() {
      if (this.$refs.form.validate()) {
        try {
          await facilityService.register(this.getFacility());
          this.reset();
          this.$emit("registered");
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
      this.$refs.form.reset();
      this.alert = false;
      this.dialog = false;
    },
    getFacility() {
      return {
        name: this.name,
        description: this.description,
        openingHours: [
          {
            dayOfWeek: 1,
            timeOpen: this.$refs.openingHours.timeFrom,
            duration: 180
          }
        ],
        emailAddress: this.email,
        phoneNo: this.phone,
        location: this.location,
        additionalInfo: this.additionalInfo
      };
    }
  },
  components: {
    OpeningHours
  }
};
</script>