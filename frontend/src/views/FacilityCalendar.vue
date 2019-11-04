<template>
  <v-container class="grey lighten-5">
    {{this.facility.name}}
    <Calendar :facility='facility'/>
  </v-container>
</template>

<script>
import Calendar from '@/components/Calendar.vue';
import store from "@/store";
export default {
  name: "calendar",
  components: {
    Calendar
  },
  computed: {
    facility: function() {
      console.log('route param', this.$route.params.facility)
      return store.getters.facility(this.$route.params.facility);
    }
  },
};
</script>
