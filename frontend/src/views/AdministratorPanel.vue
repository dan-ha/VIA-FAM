<template>
  <v-container class="grey lighten-5">
    <FacilityList />
  </v-container>
</template>

<script>
import FacilityList from "@/components/FacilityList.vue";

export default {
  name: "home",
  components: {
    FacilityList
  }
};
</script>