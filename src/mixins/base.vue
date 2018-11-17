<script>
import store from '@/store.js'
import { mapGetters } from 'vuex';

export default {
    store,
    computed: {
        ...mapGetters([
            'is_loggued',
            'popup',
            'nb_notifs'
        ])
    },
    mounted () {
        if (localStorage.getItem('token'))
            store.commit('LOG', true);
    },
    methods: {
        AjaxGet(route, authorization) {
            let url = process.env.VUE_APP_SERV_ADDR + route;
            if (authorization) {
                let payload = {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                }
                return fetch(url, payload).then(res => res.json());
            }
            return fetch(url).then(res => res.json());
        },
        AjaxCall(route, method, body) {
            let url = process.env.VUE_APP_SERV_ADDR + route;
            let payload = {
                method,
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            }
            return fetch(url, payload).then(res => res.json());
        },
        err_redirect() {
            this.serv_err();
            this.redirect_home();
        },
        serv_err () {
            this.$store.dispatch('notifDanger', 'Internal server error...')
        },
        redirect_home() {
            if (this.is_loggued)
                return this.$router.push('/dashboard');
            else
                return this.$router.push('/home');
        }
    }
}
</script>
