<template>
  <v-container class="grey lighten-5">
    <Calendar :facility='facility'/>
  </v-container>
</template>

 <script>
import { mapActions } from "vuex";
import store from "@/store";
import Calendar from '@/components/Calendar.vue';

export default {
  name: "facilityCalendar",
    computed: {
    facility: function() {
      return store.getters.facility(this.$route.params.name);
    }
  },
  methods: {
    ...mapActions(["fetchFacility"]),
  },
  created() {
    this.fetchFacility(this.$route.params.name)
  },
   components: {
    Calendar
  },
}
</script>