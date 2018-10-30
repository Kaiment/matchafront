<template lang="pug">
    .hero-body
        form.column.is-4.is-offset-4.c-form(@submit.prevent='sub_form')
            div.title CHANGE EMAIL
            .field
                .control
                    input.c-input.c-input-first(v-model='email' type='text' placeholder='New email')
            .field
                .control
                    input.button.is-fullwidth.c-submit(type='submit' value='SUBMIT')
</template>

<script>
export default {
    data () {
        return {
            email: ''
        }
    },
    methods: {
        sub_form () {
            let url = process.env.VUE_APP_SERV_ADDR + '/profile/email';
            let payload = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    'Content-type': 'application/json'
                },
                body: {
                    email: this.email
                }
            };
            fetch(url, payload).then(res => res.json()).then(data => {
                console.log(data);
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>
