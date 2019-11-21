<template>
  <v-content class="mx-auto" style="align-items: center">
    <v-form v-model="valid">
      <v-card
        width="600"
        height="230"
        class="pa-12 mb-10">
        <v-text-field
          v-model="name"
          label="Nickname"
          :rules="nameRules"
          :counter="16"
          @keydown.enter.prevent="submit"
          required
          outlined
          clearable
        ></v-text-field>
        <v-btn
          raised
          color="primary"
          @click="submit"
          x-large
          :disabled="!valid"
        >Signin</v-btn>
      </v-card>
    </v-form>
  </v-content>
</template>

<script>
import socket from '../utils/socket';

export default {
  name: 'join',
  data() {
    return {
      valid: false,
      name: '',
      validName: '',
      nameRules: [
        v => !!v || 'Nickname is required',
        v => v.length > 4 || 'Nickname must be more than 4 characters',
        v => v.length <= 16 || 'Nickname must be less than 16 characters',
      ],
    };
  },
  methods: {
    submit() {
      if (this.valid) {
        socket.emit('login', this.name);
        socket.on('nameValidation', (validName) => {
          this.validName = validName;
          this.$router.push({ name: 'chat', params: { name: this.validName.name } });
        });
      }
    },
  },
};
</script>
