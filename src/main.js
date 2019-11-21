import Vue from 'vue';
import VueChatScroll from 'vue-chat-scroll';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.use(VueChatScroll);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app');
