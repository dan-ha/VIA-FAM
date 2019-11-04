<template>
      <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" class="blue lighten-4">
        <h1 style="text-align: center">Make new appointment</h1>
        <v-form 
          ref="form" 
          class="d-flex flex-column" 
          v-model="valid"
          lazy-validation>
        </v-form>
        <v-text-field 
            v-model="subject"
            :rules="subjectRules" 
            counter="100" 
            label="Appointment topic" >
          </v-text-field>
          <v-text-field 
            v-model="description"
            :rules="appDescriptionRules"
            counter="1000" 
            label="Description">
          </v-text-field>

          <v-text-field 
            v-model="AppLocation"
            :rules="AppLocationRules"
            label="Optional Location" 
            prepend-icon="place">
          </v-text-field>


          
    </v-col>
    </v-row>
  </v-container>


</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";

export default {
    name: "AppointmentRegister",
    data: () => ({
      loading: false,
      valid: true,
      name: '',
      subjectRules: [
        v => !!v || 'Topic is required',
        v => (v && v.length >= 6)  || 'Topic must be 5 or more characters',
        v => (v &&  v.length <= 100) || 'Topic must be less than 100 characters'
      ],
        description: "",
        appDescriptionRules: [
        v => !!v || 'Description is required',
        v => (v &&  v.length <= 1000) || 'Description must be less than 1000 characters'
    ],
    locationRules: [
      v => !!v || 'Location is required'
    ]
    })
}
</script>