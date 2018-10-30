<template lang="pug">
  div
    .hero-head
    .hero-body
      div.dashboard
        search_bar
        p lol
    .hero-foot
</template>

<script>
import base from '@/mixins/base.vue';
import search_bar from '@/components/search_bar.vue';

export default {
  name: 'dashboard',
  mixins: [base],
  components: {
    search_bar
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

<style lang="scss">
  .dashboard {
    height: 100vh;
    width: 100%;
  }
</style>
