<template lang="pug">
    .full-width
        .columns.is-multiline
            .column.is-4
                message_selector(
                    user_id='2'
                    firstname='Kai',
                    lastname='Bedene',
                    last_message='Salut je m\'appelle alexandre Barbosa je suis futur millifghjfghjfghjfghjfghkfghkfghk fgkfghkfghk fghkghfk fghkfghk fghkfgh kfghk onairedf gdfgdfgdfggggdfgdfgsggdgdfgdsgdsghfgndfg hdfghdfg hdf',
                    img_src='risitas.png'
                )
                message_selector(
                    firstname='Alexandre',
                    lastname='Barbosa',
                    last_message='Je suis le vrai alexandre barbosa hjfghjfghjfghjfghkfghkfghk fgkfghkfghk fghkghfk fghkfghk fghkfgh kfghk onairedf gdfgdfgdfggggdfgdfgsggdgdfgdsgdsghfgndfg hdfghdfg hdf',
                    img_src='risitas.png'
                )
            .column.is-7.message_panel
                form.send_bar.columns.is-mobile(@submit.prevent='send_msg')
                    input.message_input.column.is-10(v-model='msg' type='text')
                    button.column.is-2.c-btn(type='submit' value='SEND')
                        i.fas.fa-paper-plane

</template>

<script>
import base from '@/mixins/base.vue';
import message_selector from '@/components/message_selector.vue';

export default {
    mixins: [base],
    data () {
        return {
            msg: '',
            msgs: [
                {
                    fullname: 'Alexandre Barbosa',
                }
            ]
        }
    },
    components: {
        message_selector
    },
    methods: {
        send_msg () {
            console.log(this.msg)
        }
    }
}
</script>

<style lang="scss">
    @import '@/assets/custom.scss';

    .message_panel {
        position: relative;
        background-color: $c-main-black-light;
        height: 80vh;
        width: 100%;
    }

    .send_bar {
        position: absolute;
        width: 100%;
        bottom: 0;
    }
</style>
