import type { IState, IURIData } from "@/interfaces";
import { createStore } from "vuex";
import { api } from "@/utils";

export default createStore<IState>({
  state: {
    products: [],
  },

  actions: {
    async getProducts({ commit }) {
      try {
        const { products } = await api<IURIData>(
          "https://dummyjson.com/products?limit=100"
        );

        commit("set_best_sellers", products);
      } catch (e) {
        console.log(e);
      }
    },
  },

  mutations: {
    set_best_sellers(state, products) {
      state.products = products;
    },
  },
});
