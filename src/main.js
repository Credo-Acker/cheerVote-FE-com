// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import 'lib-flexible';
import axios from 'axios';
import wcSwiper from './assets/wc-swiper.js';
import './assets/wc-swiper.css';
// import VueTouch from 'vue-touch';
import { Base64 } from 'js-base64';
import md5 from 'md5';
import sha1 from 'sha1';
import wcView from 'wc-view';
import 'wc-view/style.css';

// Vue.use(VueTouch, {name: 'v-touch'});

Vue.use(wcSwiper);
Vue.use(wcView);

axios.defaults.withCredentials = true;

Vue.prototype.$http = axios;
Vue.prototype.$md5 = md5;
Vue.prototype.$sha1 = sha1;
Vue.prototype.$base64 = Base64;

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});
