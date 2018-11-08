<template lang="pug">
   #app
    transition(name='slide-fadeY' mode='out-in')
      popup(v-if='popup.type', :type='popup.type', :message='popup.message', :time='popup.time')
    .hero.is-fullheight
      .hero-head
        navbar
      .hero-body
        router-view
      .hero-foot
        button(@click='test') TEST
      
</template>

<script>
import navbar from '@/components/navbar.vue';
import popup from '@/components/popup.vue';
import base from '@/mixins/base.vue';
import Vue from 'vue';
import socketIo_vue from 'vue-socket.io';
import io from 'socket.io-client';
import store from './store.js';

export default {
  mixins: [base],
  components: {
    navbar,
    popup
  },
  watch: {
    connect_socket () {
      console.log(this.$store.is_loggued)
    }
  },
  computed: {
  },
  methods: {
    test () {
      console.log('ye');
      Vue.use(socketIo_vue, io(process.env.VUE_APP_SERV_ADDR, { query: 'auth_token=' + localStorage.getItem('token') }), store);
    }
  }
}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";
@import "./assets/custom.scss";


$navbar-background-color: $c-main-black;

$navbar-item-color: $c-main-white;
$navbar-item-hover-color: $c-main-black;
$navbar-item-hover-background-color: $c-main;

$navbar-dropdown-background-color: $c-main-black;
$navbar-dropdown-item-hover-color: $c-main-black;
$navbar-dropdown-item-hover-background-color: $c-main;
$dropdown-content-arrow: $c-main;

$tabs-boxed-link-active-border-color: $c-main;
$tabs-link-color: $c-main-white;
$tabs-link-hover-color: $c-main-black;
$tabs-link-active-color: $c-main-white;
$tabs-boxed-link-hover-background-color: $c-main;
$tabs-boxed-link-active-background-color: $c-main-black;
$tabs-boxed-link-hover-border-bottom-color: $c-main;
$tabs-border-bottom-color: $c-main;
$tabs-boxed-link-radius: 0;

$navbar-burger-color: $c-main;

$button-focus-box-shadow-size: 0;

@import "~bulma";
@import "~buefy/src/scss/buefy";


.slide-fadeY-enter-active, .slide-fadeY-leave-active  {
  transition: all .4s ease;
}

.slide-fadeY-enter, .slide-fadeY-leave-to {
  transform: translateY(-60px);
  opacity: 0;
}

#app {
  font-family: 'Source Code Pro', 'Monospace', 'Sans-serif';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

input {
  &::placeholder {
    font-family: 'Source Code Pro', 'Monospace', 'Sans-serif';
  }
}

body {
  background-color: #1a1a1d;
}

.popup {
  z-index: 999;
}

textarea, select, input, button { outline: none; }

</style>
