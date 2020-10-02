<template>
  <div id="app">
    <basic-vue-chat
      style="width: 25vw"
      title="Chat with strangers"
      @newOwnMessage="sendMessage" 
      :new-message="message"
    />
  </div>
</template>

<script>
import BasicVueChat from "basic-vue-chat";
import moment from 'moment';

export default {
  name: 'App',

  components: {
    BasicVueChat
  },

  data() {
    return {
      message: null,
    }
  },

  sockets: {
    statusRoom: function (message) {
      this.message = {
        contents: message,
        author: 'Bot',
        date: moment(new Date()).format('h:mm'),
      }
    },

    receiveMessage: function (message) {
      this.message = {
        contents: message,
        author: 'Strangers',
        date: moment(new Date()).format('h:mm'),
      }
    },
  },

  methods: {
    sendMessage(message) {
      if(this.message !== '') {
        this.$socket.emit('sendMessage', message)
      }
    }
  }
}
</script>

<style scoped>
  #app {
    margin: 0 auto;
    display: table;
  }
</style>
