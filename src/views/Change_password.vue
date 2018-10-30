<template lang="pug">
    .hero-body
        form.column.is-4.is-offset-4.c-form(@submit.prevent='sub_form')
                div.title CHANGE PASSWORD
                .field
                    .control
                        input.c-input.c-input(v-model='new_password' ref='password' type='password'  placeholder='New password')
                .field
                    .control
                        input.c-input.c-input-last(v-model='confirm_new_password' ref='password' type='password'  placeholder='Confirm new password')
                .field
                    .control
                        input.button.is-fullwidth.c-submit(type='submit' value='SUBMIT')
</template>

<script>
import base from '@/mixins/base.vue'

export default {
    mixins: [base],
    data () {
        return {
            new_password: '',
            confirm_new_password: ''
        }
    },
    methods: {
        sub_form () {
            url = process.env.VUE_APP_SERV_ADDR + '/profile/password';
            payload = {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    password: this.new_password,
                })
            }
            fetch(url, payload).then(res => res.json()).then(data => {
                if (data.hasOwnProperty('success'))
                    this.$store.dispatch('notifSuccess', 'Password updated with success');
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>
