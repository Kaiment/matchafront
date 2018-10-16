<script>
import store from '@/store.js'
import { mapGetters } from 'vuex';

export default {
    store,
    computed: {
        ...mapGetters([
            'is_loggued',
            'popup'
        ])
    },
    mounted () {
        if (localStorage.getItem('token'))
            store.commit('LOG', true);
    }
}
</script>
