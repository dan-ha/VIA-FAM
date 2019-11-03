<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" class="via-card">
        <h1 style="text-align: center">VIA-FAM Login</h1>
        <v-form ref="form" class="d-flex flex-column" v-model="valid" lazy-validation @submit="submit">
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
          <v-alert v-model="alert" type="error" dismissible>Incorrect username/password.</v-alert>
          <v-btn type="submit" :disabled="!valid" color="primary">Login</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex"
import authService from "@/services/authService.js"

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
    ...mapMutations(["LOGGED_IN", "SET_USER"]),
    submit() {
      if (this.$refs.form.validate()) {
        this.alert = false;
        this.login()
      }
    },
    async login() {
      if (await authService.authenticated(this.username, this.password)) {
        const user = await authService.getUser(this.username)
        this.LOGGED_IN()
        this.SET_USER(user)
        this.$router.push("/")
      } else {
        this.alert = true
      }
    }
  }
};
</script>