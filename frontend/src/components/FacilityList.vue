<template>
    <v-row no-gutters>
      <v-col
        v-for="(facility, index) in facilities"
        v-bind:key="index"
        cols="12"
        sm="4"
      >
        <v-card
          class="pa-2 ma-2 blue lighten-3"
          tile
          @click="$router.push({ name: 'facilityDetails', params: { name: facility.name }})"
        >
          <v-card-title>{{ facility.name }}</v-card-title>
          <v-card-text>{{ facility.description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FacilityList",
  computed: {
    ...mapGetters(["facilities"])
  }
};
</script>