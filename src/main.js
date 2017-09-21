// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import * as firebase from 'firebase'
import App from './App'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/shared/Alert'
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog'
import EditMeetupDateDialog from './components/Meetup/Edit/EditMeetupDateDialog'
import RegisterDialog from './components/Meetup/Registration/RegisterDialog'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)
Vue.component('app-edit-meetup-date-dialog', EditMeetupDateDialog)
Vue.component('app-meetup-register-dialog', RegisterDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCI9UhQbNZmsG3XLcmFJRBGzJbetgEoAs0',
      authDomain: 'blog-papabarbas.firebaseapp.com',
      databaseURL: 'https://blog-papabarbas.firebaseio.com',
      projectId: 'blog-papabarbas',
      storageBucket: 'blog-papabarbas.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetups')
  }

})
