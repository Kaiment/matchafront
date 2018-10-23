<template lang="pug">
  div.container
    h1 Dashboard
    button(@click='test') test
</template>

<script>
// import store from '@/store.js';
// import { mapGetters } from 'vuex';
import base from '@/mixins/base.vue';

export default {
  // store,
  name: 'dashboard',
  mixins: [base],
  // computed: {
  //   ...mapGetters([
  //     'is_loggued'
  //   ])
  // // },
  // created () {
  //   if (!this.is_loggued)
  //     this.$router.push('home');
  // },
  components: {
  },
  methods: {
    test () {
      this.$http.post('http://10.4.3.5:8008/test', { foo: 'bar' }).then(res => {
        console.log(res);
      })
    }
  }
}
</script>
