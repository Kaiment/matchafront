<template lang="pug">
    .container.columns
        .column.profile_pic.grey
        .column.grey
            .columns.is-multiline
                .field.column.is-12
                    label Username
                    input(type='text')
                .field.column.is-12
                    label Firstname
                    input(type='text')
                .field.column.is-12
                    label Lastname
                    input(type='text')

</template>

<script>
export default {
    
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
