const mutations = {
  adicionarCanal(state, canal) {
    if (canal &&
      typeof canal === 'object' &&
      !canal.hasOwnProperty('length')) { // eslint-disable-line
      state.canais.unshift(canal);
    }
  },
};

const actions = {
  adicionarCanal({ commit }, canal) {
    commit('adicionarCanal', canal);
  },
};

const getters = {
  getCanais(state) {
    return state.canais;
  },
  getCabecalhoCanais(state) {
    return state.cabecalhoCanais;
  },
};

const state = {
  cabecalhoCanais: [],
  canais: [],
};

export default {
  namespaced: true,
  actions,
  getters,
  state,
  mutations,
};
