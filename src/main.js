import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import firebase from 'firebase';
import 'vuetify/dist/vuetify.min.css';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false



let app = '';
const config = {
  apiKey: "AIzaSyAQj5ypgMZtizKmFp_Zj4EcwOCT0HJCEh4",
  authDomain: "pwa-vue-af4fc.firebaseapp.com",
  databaseURL: "https://pwa-vue-af4fc.firebaseio.com",
  projectId: "pwa-vue-af4fc",
  storageBucket: "pwa-vue-af4fc.appspot.com",
  messagingSenderId: "848075515289",
  appId: "1:848075515289:web:d7522631bc1a4959"
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});
