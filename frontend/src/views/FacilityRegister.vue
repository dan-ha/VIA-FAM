<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" class="blue lighten-4">
        <h1 style="text-align: center">Register new VIA Facility</h1>
        <v-form 
          ref="form" 
          class="d-flex flex-column" 
          v-model="valid"
          lazy-validation>
          <v-text-field 
            v-model="name"
            :rules="nameRules" 
            counter="100" 
            label="Facility name" >
          </v-text-field>
          <v-text-field 
            v-model="description"
            :rules="descriptionRules"
            counter="1000" 
            label="Description">
          </v-text-field>

          <OpeningHours ref="openingHours"></OpeningHours>
          <Facilitators ref="facilitators" @change="selectedFacilitator" ></Facilitators>
          

          <div class="d-flex">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Email address"
              prepend-icon="email"
            ></v-text-field>
            <v-text-field
              v-model="phone"
              :rules="phoneRules"
              label="Phone number"
              prepend-icon="phone"
            ></v-text-field>
          </div>
          <v-text-field 
            v-model="location"
            :rules="locationRules"
            label="Location" 
            prepend-icon="place">
          </v-text-field>
          <v-textarea
            outlined
            v-model="additionalInfo"
            counter="1000"
            label="Additional Information"
          ></v-textarea>
          <v-btn 
            :disabled="!valid"
            color="primary" 
            @click="submit">
            Submit
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import OpeningHours from "@/components/OpeningHours.vue";
import Facilitators from "@/components/Facilitators.vue";
import axios from "axios";

export default {
  name: "FacilityRegister",
  data: () => ({
    nOfFacilitators: 1,
    loading: false,
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length >= 3) || 'Name must be 3 or more characters',
      v => (v &&  v.length <= 100) || 'Name must be less than 100 characters'
    ],
    description: "",
    descriptionRules: [
      v => !!v || 'Description is required'
    ],
    facilitators: [],
    email: "email@address.com",
    emailRules: [
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    phone: "45000000",
    phoneRules: [
      v => /^[0-9]*$/.test(v) || "Phone number must be valid"
    ],
    location: "D.301",
    locationRules: [
      v => !!v || 'Location is required'
    ],
    additionalInfo: "Additional information about the facility"
  }),
  methods: {
    ...mapActions(["fetchFacilities"]),
    data: () => ({
      model: Facilitators.model
    }),
    submit() {
      if (this.$refs.form.validate()) {
        this.register()
      }
    },
    register: async function() {
      this.loading = true;
      try{
        const response = await axios.post(`${process.env.VUE_APP_BACKEND_URL}/facility`, this.getFacility())
        this.loading = false
        console.log(response)
        this.fetchFacilities();
        this.$router.push('/')
      }
      catch (error) {
        this.loading = false
        console.log(error)
        if (error.response) {
            console.log(error.response.data); // => the response payload
          }
      }
    },
    getFacility: function() {
      return {
        name: this.name,
        description: this.description,
        openingHours: [
          {
            dayOfWeek: 1,
            timeOpen: this.$refs.openingHours.timeFrom,
            duration: 180
          }
        ],
        emailAddress: this.email,
        phoneNo: this.phone,
        location: this.location,
        additionalInfo: this.additionalInfo + this.facilitators
      }
    },
    selectedFacilitator(facilitators) {
      console.log('New facilitator selected' + facilitators)
      this.facilitators = facilitators
    }
  },
  components: {
    OpeningHours,
    Facilitators
  }
};
</script>