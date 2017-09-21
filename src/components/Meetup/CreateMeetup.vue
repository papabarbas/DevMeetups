<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>Create a new meetup</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs10 offset-xs1>
        <form @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex>
              <v-text-field name="title" label="Title" id="title" v-model="title" required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex>
              <v-text-field name="location" label="Location" id="location" v-model="location" required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex>
              <v-btn raised class="primary" @click="onPickFile">Upload image</v-btn>
              <input type="file" style="display:none" ref="fileInput" accept="image/*" @change="onFilePicked">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex>
              <img :src="imageUrl" height="200px">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex>
              <v-text-field name="description" label="Description" id="description" multi-line v-model="description" required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex>
              <h4>Choose date & time</h4>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex>
              <v-date-picker v-model="date"></v-date-picker>
              <p>{{date}}</p>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex>
              <v-time-picker v-model="time" format="24hr"></v-time-picker>
              <p>{{time}}</p>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs8 offset-xs2>
              <v-btn class="primary" :disabled="!formIsValid" type="submit">Create Meetup</v-btn>
              {{ submittableDateTime }}
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      location: '',
      image: null,
      imageUrl: '',
      description: '',
      date: new Date(),
      time: new Date()
    }
  },
  computed: {
    formIsValid () {
      return this.title !== '' && this.location !== '' && this.imageUrl !== '' && this.description !== ''
    },
    submittableDateTime () {
      const date = new Date(this.date)
      if (typeof this.time === 'string') {
        const hours = this.time.match(/^(\d+)/)[1]
        const minutes = this.time.match(/:(\d+)/)[1]
        date.setHours(hours)
        date.setMinutes(minutes)
      } else {
        date.setHours(this.time.getHours())
        date.setMinutes(this.time.getMinutes())
      }
      console.log(date)
      return date
    }
  },
  methods: {
    onCreateMeetup () {
      if (!this.formIsValid) {
        return
      }
      if (!this.image) {
        return
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.submittableDateTime,
        id: 'hgsdi343'
      }
      this.$store.dispatch('createMeetup', meetupData)
      this.$router.push('/meetups')
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.indexOf('.') <= 0) {
        return alert('Choose a valid file')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>


