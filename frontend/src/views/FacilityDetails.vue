<template>
  <v-card v-if="facility" class="mx-auto pa-5 mt-10" max-width="600">
    <v-card-text>
      <div class="display-1 text--primary">{{ facility.name }}</div>
      <p class="text--primary">{{ facility.description }}</p>
      <p>Contact information: {{facility.emailAddress}}, {{facility.phoneNo}}</p>
      <p>Location: {{facility.location}}</p>
      <p>{{facility.additionalInfo}}</p>
    </v-card-text>
    <v-card-actions>
          <router-link 
            v-if="facility.appointmentManager" 
            :to="calendarPath" 
            class="v-btn primary pa-2"
          >
            Make an appointment
          </router-link>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import store from '@/store'

export default {
  name: "facilityDetails",
    computed: {
    facility: function() {
      return store.getters.facility(this.$route.params.name);
    },
    calendarPath() {
      return `/facility/${this.$route.params.name}/calendar`
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