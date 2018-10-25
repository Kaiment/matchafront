<template lang="pug">
    form.column.is-4.is-offset-4.c-form(@submit.prevent='sub_form')
        div.title LOG IN
        .field
            .control
                input.c-input.c-input-first(v-model='username' type='text' placeholder='Username')
        .field
            .control
                input.c-input.c-input-last(v-model='password' ref='password' autocomplete='on' type='password' placeholder='Password')
        .field
            .control
                input.button.is-fullwidth.c-submit(type='submit')
</template>

<script>
import store from '@/store.js';
import { mapGetters } from 'vuex'

export default {
    store,
    data () {
        return {
            username: '',
            password: '',
            geoloc_accepted: false
        }
    },
    created () {
        navigator.geolocation.getCurrentPosition(positon => {
            this.geoloc_accepted = true;
        })
    },
    computed: {
        ...mapGetters([
            'is_loggued'
        ])
    },
    methods: {
        sub_form () {
            let user = {
                username: this.username,
                password: this.password,
                geoloc_accepted: this.geoloc_accepted,
                geoloc_err: false,
                latitude: '',
                longitude: '',
                ip: ''
            };
            fetch('https://api.ipify.org?format=json').then(res => res.json()).then(data => {
                user.ip = data.ip
                console.log(user.ip)
            }).catch(err => {
                console.log(err);
            });

            if (this.geoloc_accepted)
                navigator.geolocation.getCurrentPosition(position => {
                    user.geoloc_accepted = true;
                    user.latitude = position.coords.latitude;
                    user.longitude = position.coords.longitude;
                }, errorCallback);

            function errorCallback(error){
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        user.geoloc_err = 'User denied'
                        break;          
                    case error.POSITION_UNAVAILABLE:
                        user.geoloc_err = 'Position unavailable'
                        break;
                    case error.TIMEOUT:
                        user.geoloc_err = 'Tiemout'
                        break;
                }
            };
            return console.log(user);

            let payload = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(user)
            };
            let url = process.env.VUE_APP_SERV_ADDR + '/get_token';
            fetch(url, payload).then(res => {
                return res.json();
            }).then(data => {
                if (data.hasOwnProperty('success') && data.success) {
                    store.commit('POP_NOTIF', { type: 'is-success', message: 'You logged in with success'});
                    store.commit('LOG', true);
                    localStorage.setItem('token', data.token);
                    this.$router.push('dashboard');
                } else {
                    store.commit('POP_NOTIF', { type: 'is-danger', message: 'Username and password did not match' });
                    this.password = '';
                    this.$refs.password.focus();
                }
            }).catch(err => {
                if (err.status >= 500 && err.status <= 500)
                    this.$store.commit('POP_NOTIF', { type: 'is-danger', message: 'Server internal erro, please retry...' });
                else
                    this.$store.commit('POP_NOTIF', { type: 'is-danger', message: 'App error, refresh...' })
                console.log(err)
            });
        }
    }
}
</script>


<style lang="scss">
    @import '@/assets/custom.scss';

    .title {
        padding-bottom: 15px;
        border-bottom: 1px solid $c-main;
        color: $c-main-white;
    }
</style>
