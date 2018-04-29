import Vuex from 'vuex'
import MODULE_USER from './modules/user'
const createStore = () => {
  return new Vuex.Store({
    state: {},
    mutations: {},
    modules: { MODULE_USER }
  })
}

export default createStore
