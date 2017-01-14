import Vue from 'vue'
import Vuex from 'vuex'
import fetch from 'isomorphic-fetch'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    __loaded: [],
    loading: false,
    from: {
      countries: [],
      selected: true,
    },
    to: {
      countries: [],
      selected: false
    },
    countries: [],
    active: 'From'
  },
  getters: {
    selected: state => {
      return (state.from.selected) ? state.from : state.to;
    },
    bothCountries: state => {
      return state.from.countries.concat(state.to.countries);
    }
  },
  mutations: {
    addCountry (state, country) {
      if (state.from.selected) {
        state.from.countries.push({...country, selected: true });
      }
      else {
        state.to.countries.push({...country, selected: true });
      }
      state.__loaded.push(country.iso3);
    },
    setSelected (state, fromOrTo) {
      if (fromOrTo === 'From') {
        state.to.selected = false;
        state.from.selected = true;
      }
      else {
        state.from.selected = false;
        state.to.selected = true;
      }
    }
  },
  actions: {
    addCountryLayer: async function({ commit, state }, coord) {
      state.loading = true;
      // var ares = await axios.post('http://localhost:3000/api/countries', { coord });
      var resp =  await fetch('/api/countries', { method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify({ coord })}).then(res=>res.json());
      state.loading = false;
      if (!resp.found) return false;
      var data = resp.data;
      if (state.__loaded.some(doc => doc === data.iso3)) return false;
      commit('addCountry', data);
    }
  }
})
export default store;
