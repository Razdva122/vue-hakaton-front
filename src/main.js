// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App'
import router from './router'
import store from './store'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'


Vue.use(Vuelidate)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created(){
	  // Your web app's Firebase configuration
	  var firebaseConfig = {
	    apiKey: 'AIzaSyCDKYxive1zhfPHu-UF6hfuExanWS89DtE',
	    authDomain: 'psychic-kite-138623.firebaseapp.com',
	    databaseURL: 'https://psychic-kite-138623.firebaseio.com',
	    projectId: 'psychic-kite-138623',
	    storageBucket: 'sychic-kite-138623.appspot.com',
	    messagingSenderId: '698795150556',
	    appId: '1:698795150556:web:19cd2c7c9f5aa96e'
	  };
	  // Initialize Firebase
	  firebase.initializeApp(firebaseConfig);
  }
})
