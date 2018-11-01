<template lang="pug">
    .thumbnail.columns.is-mobile
        .img_part.column.is-2.is-4-tablet
            img.is-center(src='risitas.png')
        .info_part.column.is-10.is-8-tablet
            .name.text {{ firstname }} {{ lastname }}
            .age.text Age: {{ age }}
            .bio.text {{ bio }}
</template>

<script>
export default {
    props: {
        firstname: String,
        lastname: String,
        age: String,
        bio: String
    }
}
</script>


<style lang="scss">
    @import '@/assets/custom.scss';

    .thumbnail {
        border: 1px solid $c-main-blacker;
        background-color: $c-main-black-light;
        max-height: 8em;
        color: $c-main-white;
        margin: 1px;
        .img_part {
            position: relative;
            img {
                max-width: 100%;
                max-height: 100%;
            }
        }
        .info_part {
            padding: 0.5em;
        }
        .text {
            text-align: left;
        }
        .name {
            font-weight: bold;
            width: 100%;
            overflow: ellipsis;
            border-bottom: 1px solid $c-main-white;
            margin-bottom: 0em;
        }
        .age {
            font-size: .7em;
        }
        .bio {
            font-size: .8em;
            width: 100%;
            max-height: 50%;
            word-wrap: break-word;
            overflow-y: auto;
            overflow-x: hidden;
        }
        &:hover {
            transition: 0.2s;
            background-color: $c-main-black-lighter;
            cursor: pointer;
        }
    }
</style>
