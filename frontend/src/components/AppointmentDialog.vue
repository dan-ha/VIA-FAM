<template>
  <v-dialog v-model="display" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <div class="headline">Create new appointment</div>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="subject"
                  :rules="subjectRules"
                  counter="100"
                  label="Appointment topic"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="From" :value="from" disabled></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Until" :value="to" disabled></v-text-field>
              </v-col>
              <v-col cols="12" sm="5">
                <v-text-field :value="location" label="Location" prepend-icon="place" disabled></v-text-field>
              </v-col>
              <v-col cols="12" sm="7">
                <v-text-field v-model="optionalLocation" label="Optional location"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea outlined v-model="description" counter="1000" label="Description"></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
        <v-alert v-model="alert" type="error" dismissible>An error occured</v-alert>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue" text @click="close">Cancel</v-btn>
        <v-btn color="blue" text @click="reserve">Reserve</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "appointmentDialog",
  props: {
    display: Boolean,
    event: Object,
    facility: Object
  },
  computed: {
    from() {
      return this.event ? this.event.start : "";
    },
    to() {
      return this.event ? this.event.end : "";
    },
    location() {
      return this.facility ? this.facility.location : "";
    }
  },
  data() {
    return {
      subject: "",
      subjectRules: [
        v => !!v || "Subject is required",
        v => (v && v.length >= 3) || "Subject must be 3 or more characters",
        v => (v && v.length <= 100) || "Name must be less than 100 characters"
      ],
      description: "",
      descriptionRules: [v => !!v || "Description is required"],
      optionalLocation: "",
      alert: false
    };
  },
  methods: {
    async reserve() {
      // if (this.$refs.form.validate()) {
      //   try {
      //     await facilityService.register(this.getAppointment());
      //     this.reset();
      //     this.$emit("registered");
      //   } catch (error) {
      //     this.alert = true;
      //     console.log(error);
      //   }
      // }
    },
    close() {
      this.reset();
    },
    reset() {
      this.$refs.form.resetValidation();
      this.subject = "";
      this.description = "";
      this.optionalLocation = "";
      this.alert = false;
      this.$emit("close");
    },
    getAppointment() {
      return {
        subject: this.subject,
        description: this.description,
        location: this.location
      };
    }
  }
};
</script>