import { createStore } from 'vuex';
import modules from './modules';

export default createStore({
  modules
});

// Vuex는 Vue.js에서 사용하는 state management tool
// Vuex Store에 state 저장