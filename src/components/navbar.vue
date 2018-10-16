<template lang="pug">
    nav.navbar
        .navbar-brand
            router-link(class='navbar-item' to='/')
                img(src='../assets/logo.png') 
            a.navbar-burger(v-bind:class='isActive ? "is-active" : ""' role='button' aria-label='menu' aria-expanded='false' @click='toggle_burger')
                span(aria-hidden='true')
                span(aria-hidden='true')
                span(aria-hidden='true')
        .navbar-menu(v-bind:class='isActive ? "is-active" : ""')
            .navbar-start
                router-link.navbar-item(v-if='!is_loggued' to='/') HOME
                router-link.navbar-item(v-if='is_loggued' to='/dashboard') DASHBOARD
                router-link.navbar-item(v-if='is_loggued' to='/profile') PROFILE
            .navbar-end
                a.navbar-item.auth(v-if='!is_loggued' @click='home_switch(1)') LOG IN
                a.navbar-item.auth.signup(v-if='!is_loggued' @click='home_switch(2)') SIGN UP
                a.navbar-item.auth(v-if='is_loggued' @click='disconnect') DISCONNECT
</template>

<script>
import store from '@/store.js';
import { mapGetters } from 'vuex';

export default {
    store,
    data () {
        return {
            isActive: false
        }
    },
    computed: {
        ...mapGetters([
            'is_loggued'
        ])
    },
    methods: {
        home_switch (select) {
            store.commit('AUTH_FORM_SWITCH', select);
        },
        disconnect () {
            localStorage.removeItem('token');
            store.commit('LOG', false);
            this.$router.push('home')
        },
        toggle_burger () {
            this.isActive = !(this.isActive);
        }
    }
}
</script>

<style lang="scss">
    @import '@/assets/custom.scss';
    
    $navbar-burger-color: $c-main;

    .navbar-item {
        font-family: 'Source Code Pro', 'Monospace';
        font-weight: 200;
        &:hover {
            transition: .5s;
        }
    }

    .navbar {
        border-bottom: 1px solid $c-main;
    }

    .navbar-menu {
        .router-link-exact-active {
            background-color: $c-main;
        }
    }

</style>