<template>
  <v-container fluid>
    <v-layout row wrap v-for="meetup in meetups" :key="meetup.id">
      <v-flex xs12 sm10 offset-sm1 md8 offset-md2 lg6 offset-lg3>
        <v-card class="info mb-2" hover raised>
          <v-container fluid class="pa-0">
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media :src="meetup.imageUrl" height="130px"></v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title class="pb-0" primary-title>
                  <div>
                    <h5 class="white--text mb-0">{{ meetup.title }}</h5>
                    <div>{{ meetup.date | date }}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat :to="/meetups/ + meetup.id">
                    <v-icon left light>arrow_forward</v-icon>
                    View Meetup
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate :size="70" :width="5" class="primary--text mt-5"></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.loadedMeetups
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

