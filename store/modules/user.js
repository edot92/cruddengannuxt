export default {
  namespaced: true,
  state: {
    listuser: [],
    formEditor: {}
    // nama,
    // alamat
  },
  mutations: {
    ADD_USER (state, data) {
      state.listuser.push(data)
    },
    DELETE_USER (state, paramIndex) {
      state.listuser.splice(paramIndex, 1)
    },
    SET_FORM_EDITOR (state, data) {
      state.formEditor = data
    },
    UPDATE_USER (state, data) {
      let param = {
        nama: data.nama,
        alamat: data.alamat
      }
      state.listuser[data.index] = param
      let tempArray = state.listuser
      state.listuser = []
      state.listuser = tempArray
    }
  },
  actions: {
    ACTION_ADD_USER ({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit('ADD_USER', data)
        // uncoment to demo asyncronus
        // setTimeout(() => {
        resolve(true)
        // }, 5000)
      })
    },
    ACTION_DELETE_USER ({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit('DELETE_USER', data)
        resolve()
      })
    },
    ACTION_SET_FORM_EDIT ({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit('SET_FORM_EDITOR', data)
        resolve()
      })
    },
    ACTION_UPDATE_USER ({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit('UPDATE_USER', data)
        resolve()
      })
    }
  },
  getters: {
    GET_LIST_USER (state) {
      return state.listuser
    }
  }
}
