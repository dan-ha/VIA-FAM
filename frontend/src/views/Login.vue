<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" class="via-card">
        <h1 style="text-align: center">VIA-FAM Login</h1>
        <v-form ref="form" class="d-flex flex-column" v-model="valid" lazy-validation>
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            label="Username"
            filled
            rounded
            dense
          ></v-text-field>
          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            :rules="passwordRules"
            label="Password"
            @click:append="showPassword = !showPassword"
            filled
            rounded
            dense
          ></v-text-field>
          <v-alert 
            v-model="alert"
            type="error"
            dismissible>
            Incorrect username/password.
          </v-alert>
          <v-btn :disabled="!valid" color="primary" @click="submit">Login</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
    valid: true,
    username: "",
    usernameRules: [v => !!v || "Username is required"],
    password: "",
    passwordRules: [v => !!v || "Password is required"],
    showPassword: false,
    alert: false
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.alert = false
        this.login();
      }
    },
    async login() {
      const response = await axios.get(
        `${process.env.VUE_APP_AUTHENT_SERVICE_URL}/authenticate`,
        {
          params: {
            username: this.username,
            password: this.password
          }
        }
      );
      if (response.data.authenticated) {
        this.$router.push('/')
      } else {
        this.alert = true
      }
    }
  }
};
</script>