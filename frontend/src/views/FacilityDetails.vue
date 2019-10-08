<template>
  <v-card class="mx-auto" max-width="500">
    <v-card-text>
      <div class="display-1 text--primary">{{ facility.name }}</div>
      <p class="text--primary">{{ facility.description }}</p>
      <p>Contact information: {{facility.emailAddress}}, {{facility.phoneNo}}</p>
      <p>Location: {{facility.location}}</p>
      <p>{{facility.additionalInfo}}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary">Make an appointment</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import store from "@/store";

export default {
  name: "facilityDetails",
  computed: {
    facility: function() {
      return store.getters.facility(this.$route.params.name);
    }
  }
};
</script>