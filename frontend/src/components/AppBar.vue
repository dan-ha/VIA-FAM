<template>
  <v-app-bar app>
    <v-toolbar-title class="headline text-uppercase">
      <router-link to="/">Facility Appointment Manager</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <router-link v-if="user && user.role === 'admin'" to="/adminPanel" class="v-btn pa-2 mr-5">Admin Panel</router-link>
    <router-link v-if="user && user.role === 'student'" to="/studentappointments" class="v-btn pa-2 mr-5">My appointments</router-link>
    <v-btn v-if="authenticated" color="primary" @click="logOut">Log out</v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "AppBar",
  computed: {
    ...mapGetters(["authenticated", "user"])
  },
  methods: {
    ...mapMutations(["LOGGED_OUT"]),
    logOut() {
      this.LOGGED_OUT();
      this.$router.push("/login");
    }
  }
};
</script>