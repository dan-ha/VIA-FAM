<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
              <router-link to="/">Facility Appointment Manager</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/register">Register Facility</router-link>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: 'App',
  mounted() {
    this.fetchFacilities()
  },
  methods: {
    ...mapActions(["fetchFacilities"])
  }
};
</script>
