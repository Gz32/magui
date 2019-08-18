import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    author: 'He yukun',
    username: '',
    token: ''
  }
});

export default store
