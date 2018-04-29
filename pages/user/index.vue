<template>
    <div>
        <v-layout row wrap>
            <v-flex xs12>
                <v-btn class="primary" @click="dialog.mode='Add';dialog.show=true">
                    <v-icon>
                        add
                    </v-icon>
                </v-btn>
            </v-flex>
            <v-flex xs12>
                <template>
                    <v-data-table :headers="headers" :items="listUser" hide-actions class="elevation-1">
                        <template slot="items" slot-scope="props">
                            <td class="text-xs-center">{{ props.index+1 }}</td>
                            <td class="text-xs-center">{{ props.item.nama }}</td>
                            <td class="text-xs-center">{{ props.item.alamat }}</td>
                            <td class="text-xs-center">
                                <v-btn dark color="red" @click="onDelete(props.index)">
                                    <v-icon>
                                        delete
                                    </v-icon>
                                </v-btn>
                                <v-btn dark color="blue" @click="onEdit(props.index)">
                                    <v-icon>
                                        edit
                                    </v-icon>
                                </v-btn>
                            </td>
                        </template>
                    </v-data-table>
                </template>
            </v-flex>
        </v-layout>
        <v-layout row justify-center>
            <dialoguser :mode="dialog.mode" :show.sync="dialog.show" @closedialog="onClose">
            </dialoguser>
        </v-layout>
    </div>
</template>


<script>
    /* eslint-disable */
    import { mapGetters, mapState, mapActions } from 'vuex'
    import dialoguser from './addOrEdit'
    export default {
        components: {
            'dialoguser': dialoguser,
        },
        layout: 'layoutsaya',
        computed: {
            ...mapGetters({
                GET_LIST_USER: 'MODULE_USER/GET_LIST_USER'
            }),
            ...mapState({
                stateListUser: state => state.MODULE_USER.listuser
            })
        },
        watch: {
            GET_LIST_USER(param) {
                this.listUser = []
                this.$nextTick(function () {
                    this.listUser = param
                })
            }
        },
        mounted() {
            this.listUser = this.stateListUser
        },
        data() {
            return {
                dialog: {
                    show: false,//false or true
                    mode: ''//Add or edit
                },
                formEditor: {
                    index: -1,
                    nama: '',
                    alamat: ''
                },
                headers: [
                    {
                        text: 'No.',
                        align: 'center'
                    },
                    {
                        text: 'Nama',
                        align: 'center'
                    },
                    {
                        text: 'Alamat',
                        align: 'center'
                    },
                    {
                        text: 'Action',
                        align: 'center'
                    }
                ],
                listUser: []
            }
        }, methods: {

            ...mapActions({
                ACTION_DELETE_USER: 'MODULE_USER/ACTION_DELETE_USER',
                ACTION_SET_FORM_EDIT: 'MODULE_USER/ACTION_SET_FORM_EDIT',

            }),
            onClose(param) {
                this.dialog.show = param
            },
            onDelete(param) {
                this.ACTION_DELETE_USER(param)
            },
            onEdit(index) {
                this.formEditor.index = index
                this.formEditor.nama = this.listUser[index].nama
                this.formEditor.alamat = this.listUser[index].alamat
                this.ACTION_SET_FORM_EDIT(this.formEditor)
                this.dialog.mode = "Edit"
                this.dialog.show = true
            }
        }
    }
</script>