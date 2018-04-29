<template>
  <div>
    <v-dialog v-model="dialog.show" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{dialog.mode}} User </span>
        </v-card-title>
        <v-card-text>
          <v-layout wrap row>
            <v-flex xs12>
              <v-text-field v-model="form.nama" label="Nama" required></v-text-field>
              <v-text-field v-model="form.alamat" label="Alamat" required></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="onClose">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="onSave">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  /* eslint-disable */
  import { mapActions } from 'vuex'
  export default {
    props: ['show', 'mode'],
    data() {
      return {
        dialog: {
          show: false,//false or true
          mode: ''//Add or edit
        },
        form: {
          index: 0,
          nama: '',
          alamat: '',
        }
      }
    },
    watch: {
      show(param) {
        this.dialog.show = param
      },
      mode(param) {
        this.dialog.mode = param
        if (param === 'Edit') {
          this.form = this.$store.state.MODULE_USER.formEditor
        }
      },
    },
    methods: {
      ...mapActions({
        ACTION_ADD_USER: 'MODULE_USER/ACTION_ADD_USER',
        ACTION_UPDATE_USER: 'MODULE_USER/ACTION_UPDATE_USER',

      }),
      onClose() {
        this.clearForm()
        this.$emit("closedialog", false)
        this.dialog.show = false
      },
      clearForm() {
        this.form.nama = ""
        this.form.alamat = ""
      },
      onSave() {

        if (this.mode === 'Edit') {
          let param = {
            index: this.form.index,// objek index ada ketika edit
            nama: this.form.nama,
            alamat: this.form.alamat,
          }
          this.ACTION_UPDATE_USER(param).then((value) => {
            // alert(value)
            this.clearForm()
          })
        } else {
          let param = {
            nama: this.form.nama,
            alamat: this.form.alamat,

          }
          // this.$store.dispatch("MODULE_USER/ACTION_ADD_USER", param)
          this.ACTION_ADD_USER(param).then((value) => {
            // alert(value)
            this.clearForm()
          })
        }

        this.$emit("closedialog", false)
        this.dialog.show = false
      },
    }
  }
</script>