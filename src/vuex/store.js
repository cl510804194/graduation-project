import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const state = {
  count: 1,
  active: 0,
  chooseItem: 0,
  bridgeCode: "",
  checkType: 0
};
const mutations = {
  add(state, n) {
    state.count += n;
  },
  reduce(state) {
    state.count--;
  }
};
const getters = {
  count: function(state) {
    return (state.count += 100);
  }
};
const actions = {
  addAction(context) {
    context.commit("add", 10);
    setTimeout(() => {
      context.commit("reduce");
    }, 5000);
  },
  reduceAction(context) {
    context.commit("reduce");
  }
};
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
});
