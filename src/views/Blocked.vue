<template lang="pug">
    .container
        .content(v-for='bu in blocked_users')
            user_thumbnail(
                :user_id='bu.id',
                :img_src='addr + bu.avatar',
                :firstname='bu.firstname',
                :lastname='bu.lastname',
                :city='bu.city',
                :age='bu.age',
                :bio='bu.bio')

</template>

<script>
import base from '@/mixins/base.vue';
import user_thumbnail from '@/components/profile_thumbnail.vue';

export default {
    components: {
        user_thumbnail
    },
    mixins: [base],
    data () {
        return {
            addr: process.env.VUE_APP_SERV_ADDR + '/uploads/',
            blocked_users: []
        }
    },
    mounted () {
        this.AjaxGet('/profile/blocked', true).then(res => {
            for(let i = 0; i < res.length; i++) {
                let user_id = res[i].user_blocked;
                this.AjaxGet('/otherprofiles/' + user_id, true).then(res => {
                    this.blocked_users.push(res.profile);
                }).catch(err => {
                    this.err_redirect()
                })
            }
        }).catch(err => {
            this.err_redirect()
        })
    }
}
</script>
