<template lang="pug">
    .container
        form
            .field
                label.label Age
                input.input(type='text')
            .field
                label.label Genre
                .select
                    select(@blur='test')
                        option Homme
                        option Femme
            .field
                label.label Orientation sexuelle
                .select
                    select(@blur='test')
                        option Hétéro
                        option Homo
                        option Bi
            .fiel
                label.label Bio
                .control
                    textarea.textarea.is-small(@blur='test')
            .field
                label.label Tags
                tags-input(element-id='tags' v-model='selectedTags' v-on:cBlur='test')
            .columns.is-1
                .column
                    .photo
                        <i class="fas fa-plus-circle"></i>
                        img
                .column
                    .photo
                        <i class="fas fa-plus-circle"></i>
                        img
                .column
                    .photo
                        <i class="fas fa-plus-circle"></i>
                        img
                .column
                    .photo
                        <i class="fas fa-plus-circle"></i>
                        img
</template>

<script>
import not_loggued from '@/mixins/not_loggued_vues.vue'

export default {
    name: 'profile',
    mixins: [not_loggued],
    data () {
        return {
            age: '',
            gender: '',
            sexual_orientation: '',
            bio: '',
            selectedTags: []
        }
    },
    methods: {
        test() {
            console.log('test');
        }
    }
}
</script>

<style lang="scss">
    @import '@/assets/custom.scss';

    .photo {
        i {
            margin-top: 50%;
        }
        min-height: 25em;
        background-color: $c-main-black-lighter;
        &:hover {
            cursor: pointer;
        }
    }

    .label {
        color: #ffffff;
    }

    .select {
        background-color: $c-main-black-lighter;
    }

    .textarea {
        background-color: $c-main-black-lighter;
        color: $c-main-white;
    }

    .tags-input {
        background-color: $c-main-black-lighter;
        input {
            color: $c-main-white;
            border: 0;
            padding: 6px;
            outline: none;
        }
        span {
            margin: 4px;
            padding: 2px;
            background-color: $c-main-black;
            border-radius: 2px;
            color: $c-main-white;
        }
    }
</style>

