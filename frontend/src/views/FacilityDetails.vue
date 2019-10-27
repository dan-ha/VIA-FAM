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
      <!-- <v-btn color="primary" @click="this.$router.push({path:'../calendar',params:{ appointments = this.facility.appointments }})">Make an appointment</v-btn> -->
      <v-btn color="primary" @click="showCalendar">Make an appointment</v-btn>
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
  },
  methods: {
    showCalendar(){
      console.log(this.facility.name + 'a')
      var fac = this.facility.name
      this.$router.push('/')  // without this, it doesn't go back
      this.$router.push({name: 'calendar', params:{facility: fac}})
      //console.log(this.facility.name + 'b')
    }
  }
};

</script>