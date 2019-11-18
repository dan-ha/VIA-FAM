<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">{{btnLabel}}</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <div class="headline">Edit VIA Facility</div>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form">
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="facility.name" label="Facility name" disabled></v-text-field>
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
        <v-alert v-model="alert" type="error" dismissible>An error occured</v-alert>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue" text @click="close">Close</v-btn>
        <v-btn color="blue" text @click="edit">Edit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import OpeningHours from "@/components/OpeningHours.vue";
import facilityService from "@/services/facilityService.js";

export default {
  name: "FacilityRegisterDialog",
    props: {
    btnLabel: String,
    facility: Object
  },
  data() {
    return {
      dialog: false,
      description: this.facility.description,
      descriptionRules: [v => !!v || "Description is required"],
      email: this.facility.emailAddress,
      emailRules: [v => /.+@.+\..+/.test(v) || "E-mail must be valid"],
      phone: this.facility.phoneNo,
      phoneRules: [v => /^[0-9]*$/.test(v) || "Phone number must be valid"],
      location: this.facility.location,
      locationRules: [v => !!v || "Location is required"],
      additionalInfo: this.facility.additionalInfo,
      alert: false
    };
  },
  methods: {
    async edit() {
      if (this.$refs.form.validate()) {
        try {
          await facilityService.editFacility(this.getFacility());
          this.reset();
          this.$emit("edited");
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
      this.alert = false;
      this.dialog = false;
    },
    getFacility() {
      return {
        name: this.facility.name,
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