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
            a(@click='home_switch(3)') Password forgotten ?
        .field
            .control
                input.button.is-fullwidth.c-submit(type='submit')
</template>

<script>
import base from '@/mixins/base.vue';

function get_geolocation() {
    navigator.geolocation.getCurrentPosition(position => {
        let geoloc = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
        }
        let url = process.env.VUE_APP_SERV_ADDR + '/profile/position';
        let payload = {
            method: 'PUT',
            mode: 'cors',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-type': 'application/json'
            },
            body: JSON.stringify(geoloc)
        }
        fetch(url, payload).then(res => res.json()).then(data => {
            console.log(data)
        }).catch(err => {
            console.log(err);
        })
    }, error => {
        console.log(error)
    })
}

export default {
    mixins: [base],
    data () {
        return {
            username: '',
            password: '',
            geoloc_accepted: false
        }
    },
    methods: {
        async sub_form () {
            let user = {
                username: this.username,
                password: this.password,
                ip: ''
            };
            let resIp;
            try {
                let rawFetch = await fetch('https://api.ipify.org?format=json');
                resIp = await rawFetch.json();
                user.ip = resIp.ip;
            } catch (err) {
                user.ip = false;
            }
            let payload = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(user)
            }
            let url = process.env.VUE_APP_SERV_ADDR + '/get_token';
            fetch(url, payload).then(res => {
                return res.json();
            }).then(data => {
                if (data.hasOwnProperty('success') && data.success) {
                    this.$store.commit('POP_NOTIF', { type: 'is-success', message: 'You logged in with success'});
                    this.$store.commit('LOG', true);
                    localStorage.setItem('token', data.token);
                    this.$router.push('dashboard');
                    get_geolocation();
                } else {
                    this.$store.commit('POP_NOTIF', { type: 'is-danger', message: 'Username and password did not match' });
                    this.password = '';
                    this.$refs.password.focus();
                }
            }).catch(err => {
                if (err.status >= 500 && err.status <= 500)
                    this.$store.commit('POP_NOTIF', { type: 'is-danger', message: 'Server internal erro, please retry...' });
                else
                    this.$store.commit('POP_NOTIF', { type: 'is-danger', message: 'App error, refresh...' })
            });
        },
        home_switch(select) {
            this.$store.commit('AUTH_FORM_SWITCH', select);
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
