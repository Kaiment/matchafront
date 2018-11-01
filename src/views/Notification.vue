<template lang="pug">
    .bodzer
        .hero-head
            .columns.is-multiline
                .tabs.is-boxed.column.is-12
                    ul
                        li(:class='state == 0 ? "is-active" : "non-active"')
                            a(@click='change_state(0)')
                                span VISIT
                                    i.fa.fa-circle.fa-xs
                        li(:class='state == 1 ? "is-active" : "non-active"')
                            a(@click='change_state(1)')
                                span LIKE
                                    i.far.fa-circle.fa-xs
                        li(:class='state == 2 ? "is-active" : "non-active"')
                            a(@click='change_state(2)')
                                span MATCH
                                    i.fa.fa-circle.fa-xs
                        li(:class='state == 3 ? "is-active" : "non-active"') 
                            a(@click='change_state(3)')
                                span UNMATCH
                                    i.fa.fa-circle.fa-xs
        .container
            .thumbnails.columns.is-multiline
                .column.is-8-mobile.is-offset-2-mobile.is-half-tablet.is-one-third-widescreen
                    profile_thumbnail(firstname='tamer', lastname='lapute' age='67', bio='YEE')
                .column.is-8-mobile.is-offset-2-mobile.is-half-tablet.is-one-third-widescreen
                    profile_thumbnail(firstname='tamer', lastname='lapute' age='67', bio='YEE')
                .column.is-8-mobile.is-offset-2-mobile.is-half-tablet.is-one-third-widescreen
                    profile_thumbnail(firstname='tamer', lastname='lapute' age='67', bio='YEE')
                .column.is-8-mobile.is-offset-2-mobile.is-half-tablet.is-one-third-widescreen
                    profile_thumbnail(firstname='tamer', lastname='lapute' age='67', bio='YEE')
                .column.is-8-mobile.is-offset-2-mobile.is-half-tablet.is-one-third-widescreen
                    profile_thumbnail(firstname='tamer', lastname='lapute' age='67', bio='YEE')
        .hero-body
        .hero-foot
            //- p lol
            //- button(@click='test') test
            //- p {{ notif_test }}
</template>

<script>
import base from '@/mixins/base.vue';
import profile_thumbnail from '@/components/profile_thumbnail.vue'

export default {
    mixins: [base],
    components: {
        profile_thumbnail
    },
    data () {
        return {
            state: '0'
        }
    },
    methods: {
        change_state(state) {
            this.state = state;
        },
        test () {
            this.$store.commit('PLUS_NOTIF', 'visit')
        }
    }
}
</script>

<style lang="scss">
    @import '@/assets/custom.scss';
    @import "~bulma/sass/utilities/_all";

    .hero-body {
        padding: 0;
    }

    .bodzer {
        height: 100vh;
    }

    .non-active {
        border-bottom: 1px solid $c-main;
    }

    .tabs {
        width: 100%;
        a {
            &:hover {
                transition: .5s;
            }
        }
    }

    .fa-circle {
        margin-left: 5px;
        height: 2px;
    }

    .fa {
        color: $c-main-lighter;
    }
</style>
