<template lang="pug">
    div
</template>

<script>
import base from '@/mixins/base.vue';

export default {
    mixins: [base],
    data () {
        return {
            avatar: '',
            id: '',
            username: '',
            firstname: '',
            lastname: '',
            age: '',
            bio: '',
            tags: [],
            gender: '',
            sexual_orientation: '',
            photos: []
        }
    },
    created () {
        this.id = this.$route.params.id;
        let route = '/otherprofiles/' + this.id;
        this.AjaxGet(route, true).then(res => {
            if (res.hasOwnProperty('err')) {
                this.$router.push('/settings/profile');
                return this.$store.dispatch('notifWarning', res.err);
            }
            let genders = { M: 'Male', F: 'Female' };
            let sexual_orientations = { E: 'Heterosexual', O: 'Homosexual', B: 'Bisexual' };
            this.avatar = res.avatar;
            this.username = res.username;
            this.firstname = res.firstname;
            this.lastname = res.lastname;
            this.age = res.age;
            this.bio = res.bio;
            this.tags = res.tags;
            this.gender = genders[res.gender];
            this.sexual_orientation = sexual_orientations[res.sexual_orientation];
            this.photos = res.photos;
        }).catch(err => {
            console.log('ye')
        })
    }
}
</script>
