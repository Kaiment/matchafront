<template lang="pug">
    .profile_box.container
        i.fas.fa-flag(@click='report_user')
        .profile_header
            img.avatar(:src='avatar')
            .liked_me(v-if='liked_me')
                i.fas.fa-heart  Liked You !
            .main_info
                .columns.actions
                    .column.is-6.is-offset-3
                        .columns
                            .column.is-9.no-p
                                button.c-btn.like-btn(@click='like_user')
                                    i(:class='is_liked ? "fas fa-heart" : "far fa-heart"')
                            .column.is-3.no-p
                                button.c-btn.block-btn(@click='block_user')
                                    i(:class='is_blocked ? "fas fa-lock-open" : "fas fa-lock"')
                p.username {{ username }}  
                    i.fas.fa-star  {{ pop_score }}
                p {{ firstname }} {{ lastname }}
                p {{ age }}, {{ city }}
            p.bio {{ bio }}
        .profile_photos
            .columns
                div.photo_wrapper.column(v-for='photo in photos')
                    img.photo_profile(:src='photo')
        .profile_tags
            span.tag_list(v-for='tag in tags') {{ tag.title }}
</template>

<script>
import base from '@/mixins/base.vue';

export default {
    mixins: [base],
    data () {
        return {
            pop_score: '',
            avatar: '',
            id: '',
            city: '',
            username: '',
            firstname: '',
            lastname: '',
            age: '',
            bio: '',
            tags: [],
            gender: '',
            sexual_orientation: '',
            photos: [],
            is_liked: false,
            is_blocked: false,
            liked_me: false,
            has_reported: false
        }
    },
    mounted () {
        this.id = this.$route.params.id;
        let route = '/otherprofiles/' + this.id;
        this.AjaxGet(route, true).then(res => {
            if (res.hasOwnProperty('err')) {
                this.$store.dispatch('notifWarning', res.err);
                this.$router.push('/settings/profile');
                return ;
            }
            let p = res.profile;
            console.log(p)
            this.pop_score = p.popularity + 1;
            this.is_liked = p.isliked;
            this.is_blocked = p.isblocked;
            this.liked_me = p.liked_me;
            let genders = { M: 'Male', F: 'Female' };
            let sexual_orientations = { E: 'Heterosexual', O: 'Homosexual', B: 'Bisexual' };
            this.avatar = process.env.VUE_APP_SERV_ADDR + '/uploads/' + p.avatar;
            this.username = p.username.toUpperCase();
            this.firstname = p.firstname;
            this.lastname = p.lastname;
            this.age = p.age;
            this.bio = p.bio;
            this.tags = p.tags;
            this.gender = genders[p.gender];
            this.sexual_orientation = sexual_orientations[p.sexual_orientation];
            this.photos = JSON.parse(p.images).map(p => process.env.VUE_APP_SERV_ADDR + '/uploads/' + p);
            this.city = p.city;
        }).catch(err => {
            this.$store.dispatch('notifDanger', 'Server internal error...');
            this.$router.push('/dashboard');
        })

        // VOIR AVEC MARTIN
        // if (this.$socket.connected) {
        //     this.$socket.emit('visit')
        // }

        // ADD LA PAGE DANS L'HISTORIQUE
        // this.AjaxCall('/history', 'PUT', this.id).then(res => {
        //     if (!res.hasOwnProperty('success'))
        //         console.log(res.err);
        // }).catch(err => {
        //     this.$store.dispatch('notifDanger', 'Server Internal error..')
        // })
    },
    methods: {
        // NEED CHECK
        like_user () {
            let route = '/otherprofiles/like/' + this.id;
            this.AjaxCall(route, 'PUT', {}).then(res => {
                if (res.hasOwnProperty('success')) {
                    this.is_liked = !this.is_liked;
                    if (this.is_liked) {
                        this.pop_score += 100;
                        this.$store.dispatch('notifSuccess', 'User liked successfully !');
                    }
                    else {
                        this.pop_score -= 100;
                        this.$store.dispatch('notifSuccess', 'User unliked successfully !');
                    }
                }
                else
                    this.$store.dispatch('notifDanger', res.err);
            }).catch(err => {
                this.$store.dispatch('notifDanger', 'Server internal error...');
            })
        },
        block_user () {
            let route = '/otherprofiles/block/' + this.id;
            this.AjaxCall(route, 'PUT', {}).then(res => {
                if (res.hasOwnProperty('success')) {
                    this.is_blocked = !this.is_blocked;
                    if (this.is_blocked)
                        this.$store.dispatch('notifSuccess', 'User blocked successfully !');
                    else
                        this.$store.dispatch('notifSuccess', 'User unblocked successfully !');
                } else {
                    this.$store.dispatch('notifDanger', res.err);
                }
            }).catch(err => {
                this.serv_err();
                this.$router.push('/dashboard');
            })
        },
        report_user () {
            let route = 'otherprofile/block/' + this.id;
            this.AjaxCall(route, 'PUT', {}).then(res => {
                if (res.hasOwnProperty('success') && !this.has_reported) {
                    this.$store.dispatch('notifSuccess', 'User reported with success');
                    this.has_reported = true;
                } else {
                    this.$store.dispatch('notifWarning', res.err);
                }
            }).catch(err => {
                this.err_redirect();
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '@/assets/custom.scss';

    .fa-star {
        color: #f3d657;
    }

    .like-btn {
        border-radius: 2px;
    }

    .block-btn {
        border-radius: 2px;
    }

    .profile_box {
        background-color: $c-main-black-light;
        position: relative;
        border-radius: 2px;
        max-width: 600px;
        padding: 1em;
        p {
            color: $c-main-white;
        }
        .profile_header {
            margin: 1em;
            .main_info {
                padding: .5em;
                border-bottom: 1px solid $c-main-white;
                .no-p {
                    padding: 0em .5em .5em .5em;
                }
            }
        }
        .profile_photos {
            padding: .5em;
        }
        .photo_wrapper {
            display: inline-block;
            vertical-align: middle;
        }
        .actions {
            margin: 0;
        }
        .username {
            font-weight: bold;
        }
        .bio {
            padding: 1em;
        }
    }

    .profile_main {
        border: 1px solid white;
    }

    .profile_secondary {
        border: 1px solid white;
    }

    .photo_profile {
        max-height: 8em;
    }

    .avatar {
        max-height: 15em;
        border: 1px solid $c-main-white;
    }

    .like {
        background-color: $c-main;
        color: $c-main-white;
    }

    .tag_list {
        background-color: $c-main;
        color: $c-main-white;
        border-radius: 3px;
        float: left;
        padding: 0.2em 0.5em;
        margin: 4px;
    }

    .fa-flag {
        position: absolute;
        top: 5px;
        right: 5px;
        color: $c-main-white;
        &:hover {
            color: $c-main;
            cursor: pointer;
        }
    }

    .liked_me {
        color: $c-main-lighter;
    }
</style>
