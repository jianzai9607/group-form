import { createStore } from "vuex";
import _ from "lodash";
import RevenueGroup from "../models/revenue-group";

const getDefaultState = () => {
  return {
    revenueGroups: [],
    selectedRevenueGroup: null
  };
};

export default createStore({
  state: () => getDefaultState(),
  getters: {
    revenueGroups: (state) => state.revenueGroups,
    selectedRevenueGroup: (state) => state.selectedRevenueGroup
  },
  mutations: {
    setState(state, newState) {
      Object.assign(state, newState);
    }
  },
  actions: {
    async addRevenueGroup({ state, commit }, revenueGroup) {
      commit("setState", {
        revenueGroups: [
          ...state.revenueGroups,
          new RevenueGroup({ ...revenueGroup, id: RevenueGroup.revenueGroupId })
        ]
      });
      RevenueGroup.revenueGroupId++;
    },
    async editRevenueGroup({ state, commit }, { id, revenueGroup }) {
      commit("setState", {
        revenueGroups: [...state.revenueGroups.filter((group) => group.id != id), revenueGroup]
      });
    },
    async removeRevenueGroup({ state, commit }, id) {
      var revenueGroups = state.revenueGroups;
      _.remove(revenueGroups, (item) => item.id == id);
      commit("setState", {
        revenueGroups: revenueGroups
      });
    },
    setSelectedRevenueGroup({ commit }, revenueGroup) {
      commit("setState", {
        selectedRevenueGroup: revenueGroup
      });
    }
  }
});
