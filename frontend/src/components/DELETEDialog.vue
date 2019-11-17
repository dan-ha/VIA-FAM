<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">{{btnLabel}}</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <div class="headline">Delete {{facilityName}} ?</div>
      </v-card-title>
      <v-card-text>
        <p>Deleting this facility will remove all it's data.</p>
        <p>Are you sure you want to continue?</p>
        <v-alert v-model="alert" type="error" dismissible>An error occured</v-alert>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue" text @click="deleteFacility">Delete</v-btn>
        <v-btn color="blue" text @click="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import facilityService from "@/services/facilityService.js";

export default {
  name: "DELETEDialog",
  props: {
    btnLabel: String,
    facilityName: String
  },
  data: function() {
    return {
      dialog: false,
      alert: false
    };
  },
  methods: {
    async deleteFacility() {
      try {
        if (await facilityService.deleteFacility(this.facilityName)) {
          this.reset();
          this.$emit("deleted");
        } else {
          this.alert = true;
        }
      } catch (error) {
        this.alert = true;
        console.log(error);
      }
    },
    cancel() {
      this.reset();
    },
    reset() {
      this.alert = false;
      this.dialog = false;
    }
  }
};
</script>