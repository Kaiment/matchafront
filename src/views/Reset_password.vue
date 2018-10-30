<template lang="pug">
    .hero-body
        form.column.is-4.is-offset-4.c-form(@submit.prevent='sub_form')
            div.title SELECT A NEW PASSWORD
            .field
                .control
                    input.c-input.c-input-first(v-model='password' ref='password' type='password' placeholder='Password')
            .field
                .control
                    input.c-input.c-input-last(v-model='cpassword' type='password' placeholder='cPassword')
            .field
                .control
                    input.button.is-fullwidth.c-submit(type='submit')
</template>

<script>
export default {
    data () {
        return {
            password: '',
            cpassword: ''
        }
    },
    methods: {
        sub_form () {
            if (this.password !== this.cpassword)
                return this.$store.commit('POP_NOTIF', { type: 'is_danger', message: 'The 2 passwords did not match, please retry' });
            // TEST MDP
            let url = process.env.VUE_APP_SERV_ADDR + '/reset/' + this.$route.params.id;
            let body = {
                password: this.password
            }
            let payload = {
                method: 'post',
                mode: 'cors',
                headers: {
                    Authorization: localStorage.getItem('token'),
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            }
            fetch(url, payload).then(res => res.json()).then(data => {
                if (data.hasOwnProperty('success'))
                    this.$store.commit('POP_NOTIF', { type: 'is-success', message: 'Your password has been reset with success.' });
                else
                    this.$store.commit('POP_NOTIF', { type: 'is-success', message: 'Unexpected error' });
            }).catch(err => {
                this.$store.commit('POP_NOTIF', { type: 'is-danger', message: err.err })
            })
        }
    }
}
</script>

<style lang="scss">

</style>
