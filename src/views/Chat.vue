<template>
  <v-flex class="main mt-6 ml-12 mr-12" style="position: relative">
    <v-card class="users">
      <v-chip
        class="user"
        :class="{ 'blue lighten-4': u.name === name }"
        label
        v-for="(u, index) in users"
        :key="index"
      >
        {{ u.name }}
      </v-chip>
    </v-card>
    <v-card class="chat-container gray lighten-5" v-chat-scroll>
      <div v-for="(m, index) in messages" :key="index" class="pa-1">
        ({{ m.timestamp }})
        <span :class="{ 'font-weight-black': m.name === 'APP' }">
          {{ m.name }} :
        </span>
        <v-card class="message" :class="{ 'blue lighten-4': m.name === name }">
          {{ m.text }}
        </v-card>
      </div>
    </v-card>
    <v-card class="input blue lighten-5">
      <input
        type="text"
        placeholder="Enter a message..."
        @keydown.enter="sendMessage"
        v-model="message"
      >
    </v-card>
  </v-flex>
</template>

<script>
import socket from '../utils/socket';

export default {
  data() {
    return {
      name: '',
      message: '',
      messages: [],
      users: [],
    };
  },
  methods: {
    sendMessage() {
      if (this.message !== '') {
        socket.emit('send', this.message);
        this.message = '';
      }
    },
  },
  beforeCreate() {
    if (!this.$route.params.name) {
      this.$router.push('/');
    }
  },
  created() {
    socket.on('message', (msg) => {
      this.messages.push(msg);
      if (msg.name === 'APP') {
        this.users = msg.users;
      }
    });
  },
  mounted() {
    this.name = this.$route.params.name;
    if (this.name) {
      socket.emit('join', this.name);
    }
  },
};
</script>

<style lang="scss" scoped>
  .main {
    min-width: 500px;
  }

  .users {
    border-bottom-left-radius: 0% !important;
    border-bottom-right-radius: 0% !important;
    display: flex;
    overflow-x: auto;
    flex-direction: row !important;

    .user {
      flex: 0 0 auto;
      width: 140px;
      padding: 20px 5px;
      margin: 2px;
      justify-content: center;
    }
  }

  .chat-container {
    box-sizing: border-box;
    height: calc(100vh - 12.5rem);
    overflow-y: auto;
    padding: 10px;
    border-top-left-radius: 0% !important;
    border-top-right-radius: 0% !important;
    border-bottom-left-radius: 0% !important;
    border-bottom-right-radius: 0% !important;

    .message {
      display: inline-block;
      word-wrap: break-word;
      padding: 8px 15px;
      margin: 2px;
    }
  }

  .input {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    bottom: 0;
    height: 4.9rem;
    width: 100%;
    border-top-left-radius: 0% !important;
    border-top-right-radius: 0% !important;

    input {
      position: absolute;
      padding: 1rem;
      width: 100%;
      outline: none;
      font-size: 1.25rem;
    }
  }

  .users {
    display: flex;
    flex-direction: column;
  }
</style>
