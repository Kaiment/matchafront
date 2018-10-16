<script>
import base from '@/mixins/base.vue'

export default {
    mixins: [base],
    mounted () {
        if (!localStorage.getItem('token'))
            this.$router.push('/');
    }
}
</script>
