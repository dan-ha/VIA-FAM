<template>
<v-container class="grey lighten-5">
    <AppointmentList />
</v-container>
</template>

<script>
import AppointmentList from "@/components/AppointmentList.vue";

export default {
    name: "StudentAppointments",
    components: {
        AppointmentList
    }
};
</script>