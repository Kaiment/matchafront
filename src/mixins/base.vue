<script>
import store from '@/store.js'
import { mapGetters } from 'vuex';

export default {
    store,
    computed: {
        ...mapGetters([
            'is_loggued',
            'popup',
            'notif',
            'notif_test'
        ])
    },
    mounted () {
        if (localStorage.getItem('token'))
            store.commit('LOG', true);
    },
    methods: {
        AjaxGet(route) {
            return fetch(route).then(res => res.json());
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
        }
    }
}
</script>
