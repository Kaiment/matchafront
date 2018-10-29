<template lang="pug">
    form.column.is-4.is-offset-4.c-form(@submit.prevent='sub_form')
        div.title RESET PASSWORD
        .field
            .control
                input.c-input.c-input-first(v-model='email' type='text' placeholder='Email' ref='email_input')
        .field
            a(@click='home_switch(1)') Get back to login
        .field
            .control
                input.button.is-fullwidth.c-submit(type='submit')
</template>

<script>
import base from '@/mixins/base.vue'

export default {
    data () {
        return {
            email: ''
        }
    },
    methods: {
        sub_form () {
            let body = {
                email: this.email
            }
            let url = process.env.VUE_APP_SERV_ADDR + '/reset'
            let payload = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authentication: localStorage.getItem('token'),
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            }
            fetch(url, payload).then(res => res.json()).then(data => {
                if (!data.hasOwnProperty('success'))
                    this.$store.commit('POP_NOTIF', { type: 'is-danger', message: data.err });
                else
                    this.$store.commit('POP_NOTIF', { type: 'is-success', message: 'An email has been sent, please follow the steps from here.' })
                this.email = '';
            }).catch(err => {
                this.$store.commit('POP_NOTIF', { type: 'is-danger', message: err.err });
                this.email = '';
            })
        },
        home_switch (select) {
            this.$store.commit('AUTH_FORM_SWITCH', select);
        }
    }
}
</script>
