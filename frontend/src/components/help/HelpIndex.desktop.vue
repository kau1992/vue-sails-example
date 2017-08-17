<template>
<b-modal id="modal" title="Help" size="lg">
  <div class="card mb-2">
    <div class="card-block">
      <div v-for="message in messages">
        <p v-if="message.message.assistant" class="mb-0"><b class="mr-2">{{ message.message.assistant.name}}</b> {{ message.message.assistant.message }}</p>
        <p v-if="message.message.assistant" class="text-muted"><small>{{ message.time}}</small></p>
        <p v-if="message.message.user" class="text-right mb-0">{{ message.message.user.message }} <b class="ml-2">You</b></p>
        <p class="text-right text-muted" v-if="message.message.user"><small>{{ message.time }}</small></p>
      </div>
    </div>
  </div>
  <b-form-input type="text" @keyup.enter="postMessage" v-model="message" placeholder="How can we help you?"></b-form-input>
</b-modal>
</template>

<script>
import * as socketIoClient from 'socket.io-client'
import * as sailsIo from 'sails.io.js'

const io = sailsIo(socketIoClient)

io.sails.url = 'http://localhost:1337'
io.sails.environment = process.env.NODE_ENV || 'development'
io.sails.useCORSRouteToGetCookie = false

export default {
  data () {
    return {
      message: '',
      messages: [{
        message: {
          assistant: {
            name: 'Mr Bean',
            message: 'Hey, how can I help you?'
          }
        },
        time: new Date().toString()
      }, {
        message: {
          user: {
            message: 'You can\'t'
          }
        },
        time: new Date().toString()
      }, {
        message: {
          user: {
            message: 'Really!'
          }
        },
        time: new Date().toString()
      }]
    }
  },

  mounted () {
    this.$root.$emit('show::modal', 'modal')
  },

  methods: {
    postMessage () {
      io.socket.post('/api/help', {test: 'test'}, function (resData, jwres) {
        console.log(jwres)
      })
    }
  }
}
</script>

<style>
.card {
  max-height: 250px;
  overflow-y: scroll;
}
</style>
