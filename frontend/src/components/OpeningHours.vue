<template>
  <div>
    Opening hours:
    <div class="d-flex">
      <v-combobox v-model="select" :items="items" label="Select a working day"></v-combobox>
      <v-menu
        ref="menu1"
        v-model="menu1"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="timeFrom"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="timeFrom"
            :rules="timeRules"
            label="From"
            prepend-icon="access_time"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker v-if="menu1" v-model="timeFrom" @click:minute="$refs.menu1.save(timeFrom)"></v-time-picker>
      </v-menu>

      <v-menu
        ref="menu2"
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="timeTo"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field 
            v-model="timeTo" 
            :rules="timeRules"
            label="To"
            prepend-icon="access_time" 
            v-on="on" required>
          </v-text-field>
        </template>
        <v-time-picker v-if="menu2" v-model="timeTo" @click:minute="$refs.menu2.save(timeTo)"></v-time-picker>
      </v-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: "openingHours",
  data: () => ({
    select: "Monday",
    items: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    timeFrom: null,
    timeRules: [
      v => !!v || 'Time is required',
    ],
    timeTo: null,
    menu1: false,
    menu2: false
  })
};
</script>