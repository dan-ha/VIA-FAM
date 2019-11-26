<template>
<v-container class="grey lighten-5">
    <FacilitatorAppointment />
</v-container>
</template>

<script>
import FacilitatorAppointment from "@/components/FacilitatorAppointment.vue";

export default {
    name: "FacilitatorAppointments",
    components: {
        FacilitatorAppointment
    }
};
</script>