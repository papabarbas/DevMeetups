<template>
  <v-dialog persistent v-model="registerDialog">
    <v-btn accent slot="activator">
      {{ userIsRegistered ? 'Unregister' : 'Register'}}
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title v-if="userIsRegistered">Unregister from meetup?</v-card-title>
            <v-card-title v-else>Register for meetup?</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>You can change your decision later on.</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat class="red--text darken--1" @click="registerDialog = false">Cancel</v-btn>
              <v-btn flat class="green--text darken--1" @click="onAgree">Confirm</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data () {
    return {
      registerDialog: false
    }
  },
  props: ['meetupId'],
  computed: {
    userIsRegistered () {
      return this.$store.getters.user.registeredMeetups.findIndex(meetupId => meetupId === this.meetupId) >= 0
    }
  },
  methods: {
    onAgree () {
      if (this.userIsRegistered) {
        this.$store.dispatch('unregisterUserFromMeetup', this.meetupId)
      } else {
        this.$store.dispatch('registerUserForMeetup', this.meetupId)
      }
    }
  }
}
</script>
