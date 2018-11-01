<template lang="pug">
div
    div
        p {{ array }}
    div
        button(@click='add') +
        button(@click='remove') -
        button(@click='log') LOG
</template>

<script>
import base from '@/mixins/base.vue';

export default {
    mixins: [base],
    data () {
        return {
            array: ['banana', 'orange', 'apple']
        }
    },
    created () {
        this.AjaxGet('https://api.ipify.org?format=json').then(res => {
            console.log(res);
        })
    },
    methods: {
        log () {
            console.log(this.array)
        },
        add () {
            this.array.push(Math.floor(Math.random(0, 10) * 100));
        },
        remove () {
            let pos = Math.round(Math.random(0, this.array.length) * 10);
            console.log(pos);
            this.array.splice(Math.floor(Math.random(0, this.array.length)) * 100, 1);
        }
    }
}
</script>

<style lang="scss">
    label {
        padding: 20px;
    }
    .grey {
        background-color: #29292b;
    }
    .blue {
        background-color: #566594;
    }
    .red {
        background-color: #a74949;
    }
</style>
