import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import loading from '@/components/loading.vue';


Vue.use(VueResource);
Vue.use(Buefy);
Vue.config.productionTip = false
Vue.component('tags-input', require('@voerro/vue-tagsinput').default);
Vue.component('loading', loading)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
