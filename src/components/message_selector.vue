<template lang="pug">
    .thumbnail.columns.is-mobile
        .img_part.column.is-2.is-4-tablet
            img.is-center(:src='img_src')
        .info_part.column.is-10.is-8-tablet
            .name.text {{ firstname }} {{ lastname }}
            .msg.text {{ last_message }}
</template>

<script>
export default {
    props: {
        firstname: String,
        lastname: String,
        last_message: String,
        img_src: String
    }    
}
</script>


<style lang="scss">
    @import '@/assets/custom.scss';

    .thumbnail {
        background-color: $c-main-black-light;
        height: 5em;
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
            text-overflow: ellipsis;
            margin-bottom: 0em;
        }
        .age {
            font-size: .7em;
        }
        .msg {
            color: #888888;
            font-size: .6em;
            width: 100%;
            height: 60%;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        &:hover {
            transition: 0.2s;
            background-color: $c-main-black-lighter;
            cursor: pointer;
        }
    }
</style>
