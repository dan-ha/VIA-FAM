<template>

</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AdministratorListOfFacilities",
  computed: {
    ...mapGetters(["facilities"]) //adm
  }
};
</script>