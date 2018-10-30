<template lang="pug">
    .hero-body
        .container
            form
                input#avatar_input(type='file' @change='manage_img($event, "avatar")' ref='avatar_input' hidden='true')
                .profile-header.columns
                    .avatar-part.column.is-4
                        .avatar-box(@click='change_avatar')
                            img.avatar.v-centered(v-bind:src='avatar')
                    .main-info.column.is-8
                        label.label Firstname
                        input.input(v-model='firstname' type='text' @blur='set_firstname')
                        label.label Lastname
                        input.input(v-model='lastname' type='text' @blur='set_lastname')
                        label.label Age
                        input.input(v-model='age' type='text' @blur='set_age')
                .profile-secondary.columns.is-multiline
                    .field.column.is-8
                        label.label Bio
                        .control
                            textarea.textarea.is-small(@blur='set_bio' v-model='bio')
                        .field
                            label.label Interests
                            tags-input(element-id='tags' v-model='selectedTags')
                            button.column.is-12(@click='') UPDATE
                    div.column.is-4
                        .field
                            label.label Gender
                            .select
                                select(@blur='set_gender' v-model='gender')
                                    option Male
                                    option Female
                        .field
                            label.label Sexual orientation
                            .select
                                select(@blur='set_sexual_orientation' v-model='sexual_orientation')
                                    option Heterosexual
                                    option Homosexual
                                    option Bisexual
                    .column
                        .photo.is-vcenter
                            img(v-bind:src='photos[0]')
                            i.far.fa-times-circle.delete_img_icon(@click='delete_img(0)' v-if='photos[0]')
                    .column
                        .photo.is-vcenter
                            img(v-bind:src='photos[1]')
                            i.far.fa-times-circle.delete_img_icon(@click='delete_img(1)' v-if='photos[1]')
                    .column
                        .photo.is-vcenter
                            img(v-bind:src='photos[2]')
                            i.far.fa-times-circle.delete_img_icon(@click='delete_img(2)' v-if='photos[2]')
                    .column
                        .photo.is-vcenter
                            img(v-bind:src='photos[3]')
                            i.far.fa-times-circle.delete_img_icon(@click='delete_img(3)' v-if='photos[3]')
                    button.column.is-12(@click.prevent='add_photo') ADD PHOTO
                    input#photos_input(type='file' hidden='true' @change='manage_img($event, "image")' ref='photos_input')
</template>

<script>
import base from '@/mixins/base.vue'

export default {
    name: 'profile',
    mixins: [base],
    data () {
        return {
            firstname: '',
            lastname: '',
            email: '',
            age: '',
            gender: '',
            sexual_orientation: '',
            bio: '',
            selectedTags: [],
            avatar: '',
            photos: []
        }
    },
    created () {
        let token = localStorage.getItem('token');
        let payload = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        fetch(process.env.VUE_APP_SERV_ADDR + "/profile", payload).then(res => {
            return res.json();
        }).then(data => {
            let genders = { M: 'Male', F: 'Female' };
            let sexual_orientations = { E: 'Heterosexual', O: 'Homosexual', B: 'Bisexual' };
            this.avatar = process.env.VUE_APP_SERV_ADDR + '/uploads/' + data.avatar; 
            this.firstname = data.firstname;
            this.lastname = data.lastname;
            this.email = data.email;
            this.age = data.age ? data.age : '';
            this.gender = genders[data.gender];
            this.sexual_orientation = sexual_orientations[data.sexual_orientation];
            this.bio = data.bio;
            this.photos = JSON.parse(data.images).map(s => process.env.VUE_APP_SERV_ADDR + '/uploads/' + s);
        }).catch(err => {
            this.$store.commit('POP_NOTIF', 'is-warning', err.err);
        })
    },
    methods: {
        change_avatar () {
            this.$refs.avatar_input.click();
        },
        add_photo () {
            this.$refs.photos_input.click();
        },
        manage_img (event, type) {
            if (type === 'image' && this.photos.length >= 4) {
                return (this.$store.commit('POP_NOTIF', { type: 'is-danger', message: 'Maximum number of photos : 4. You need to delete at least one photo' }))
            }
            let img = event.target.files[0];
            let regexp = /^image\/(png|jpg|jpeg|bmp)$/;
            if (!img.type || !regexp.test(img.type)) {
                this.$store.commit('POP_NOTIF', { type: 'is-danger', message: 'Please upload an image' })
                return ;
            } else if (Math.floor(img.size / 1000) / 1000 > 4) {
                this.$store.commit('POP_NOTIF', { type: 'is-danger', message: 'Image size too large' })
                return ;
            }
            let formData = new FormData();
            formData.append(type, img);
            let url = process.env.VUE_APP_SERV_ADDR + '/profile/' + type;
            let token = localStorage.getItem('token');
            let payload = {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + token
                },
                body: formData
            }
            fetch(url, payload).then(res => res.json()).then(data => {
                if (!data.hasOwnProperty('success'))
                    return this.$store.commit('POP_NOTIF', 'is-warning', 'Server internal error.'); 
                if (type === 'avatar')
                    this.avatar = process.env.VUE_APP_SERV_ADDR + "/uploads/" + data.image;
                else if (type === 'image')
                    this.photos.push(process.env.VUE_APP_SERV_ADDR + "/uploads/" + data.image);
            }).catch(err => {
                console.log(err);
            })
        },
        delete_img (id) {
            let url = process.env.VUE_APP_SERV_ADDR + '/profile/images/' + id;
            let payload = {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    id 
                })
            };
            fetch(url, payload).then(res => res.json()).then(data => {
                if (!data.hasOwnProperty('success'))
                    return this.$store.commit('POP_NOTIF', 'is-danger', 'Server internal error.');
                this.photos.splice(id, 1);
                return this.$store.commit('POP_NOTIF', 'is-success', 'Pic succesfully deleted.')
            }).catch(err => {
                return this.$store.commit('POP_NOTIF', 'is-danger', err.err);
            })
        },
        set_firstname () {
            this.set_data('firstname', { firstname: this.firstname });
        },
        set_lastname () {
            this.set_data('lastname', { lastname: this.lastname });
        },
        set_email () {
            this.set_data('email', { email: this.email });
        },
        set_age () {
            this.set_data('age', { age: this.age });
        },
        set_interests () {
            this.set_data('tags', { tags: this.selectedTags })
        },
        set_gender () {
            let gender = '-1';
            if (this.gender === 'Male')
                gender = 'M';
            else if (this.gender === 'Female')
                gender = 'F';
            this.set_data('gender', { gender });
        },
        set_sexual_orientation () {
            let sexual_orientations = { Heterosexual: 'E', Homosexual: 'O', Bisexual: 'B' };
            let sexual_orientation = '-1';
            if (this.sexual_orientation === 'Heterosexual')
                sexual_orientation = 'E';
            else if (this.sexual_orientation === 'Homosexual')
                sexual_orientation = 'O';
            else if (this.sexual_orientation === 'Bisexual')
                sexual_orientation = 'B';
            this.set_data('sexual_orientation', { sexual_orientation: sexual_orientation });
        },
        set_bio () {
            this.set_data('bio', { bio: this.bio });
        },
        set_data (route, data) {
            let url = process.env.VUE_APP_SERV_ADDR + '/profile' + route;
            let token = localStorage.getItem('token');
            let payload = {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(data)
            }
            fetch(url, payload).then(res => {
                return res.json();
            }).then(data => {
                if (!data.hasOwnProperty('success'))
                    this.$store.commit('POP_NOTIF', { type: 'is-danger', message: data.err });
            }).catch(err => {
                this.$store.commit('POP_NOTIF', { type: 'is-danger', message: err.err });
            })
        }
    }
}
</script>

<style lang="scss">
    @import '@/assets/custom.scss';

    .profile-header {
        border: 1px solid $c-main-black-lighter;
        padding: 2em;
    }

    .profile-secondary {
        border: 1px solid $c-main-black-lighter;
        padding: 2em;
        margin-top: 1em
    }

    .avatar-box {
        width: 200px;
        height: 200px;
        background-color: $c-main-black-lighter;
        &:hover {
            cursor: pointer;
            opacity: 0.5;
            img {
                opacity: 0.5;
            }
        }
    }

    .avatar {
        max-width: 100%;
        max-height: 100%;
        height: auto;
    }

    .photo {
        min-height: 250px;
        height: 100%;
        background-color: $c-main-black-lighter;
        position: relative;
        .fa-times-circle {
            color: #b84343;
            &:hover {
                cursor: pointer;
                color: #963535;
            }
        }
        .delete_img_icon {
            position: absolute;
            top: 0.5em;
            right: 0.5em;
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
        height: 100%;
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

