<template>
  <v-container>
    <h1>Admin Panel</h1>
    <v-data-table :headers="headers" :items="facilities" :items-per-page="10" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Facilities</v-toolbar-title>
          <v-spacer></v-spacer>
          <RegisterFacilityDialog @registered="fetchFacilities" />
        </v-toolbar>
      </template>
      <template v-slot:item.appointmentManager="{ item }">
        <AMDialog
          v-if="!item.appointmentManager"
          btnLabel="Activate"
          v-bind:facilityName="item.name"
          @activated="fetchFacilities"
        />
        <v-label v-else>Activated</v-label>
      </template>

      <template v-slot:item.edit="{ item }">
        <EditDialog btnLabel="Edit" v-bind:facility="item" @edited="fetchFacilities" />
      </template>

      <template v-slot:item.delete="{ item }">
        <DELETEDialog btnLabel="DELETE" v-bind:facilityName="item.name" @deleted="fetchFacilities" />
      </template>

    </v-data-table>
  </v-container>
</template>
<script>
import AMDialog from "@/components/AMDialog.vue";
import DELETEDialog from "@/components/DELETEDialog.vue";
import EditDialog from "@/components/EditDialog.vue";
import RegisterFacilityDialog from "@/components/RegisterFacilityDialog.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "adminPanel",
  computed: {
    ...mapGetters(["facilities"])
  },
  data() {
    return {
      headers: [
        {
          text: "Facility",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Location", value: "location" },
        { text: "Appointment Manager", value: "appointmentManager" },
        { text: "edit", value: "edit" },
        { text: "delete", value: "delete" }
      ]
    };
  },
  methods: {
    ...mapActions(["fetchFacilities"])
  },
  created() {
    this.fetchFacilities();
  },
  components: {
    RegisterFacilityDialog,
    AMDialog,
    DELETEDialog,
    EditDialog
  }
};
</script>

