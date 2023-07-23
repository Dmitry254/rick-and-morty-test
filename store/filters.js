import { defineStore } from 'pinia'
import {ref} from "vue";

export const useFiltersStore = defineStore({
  id: 'filter',
  state: () => ({
    name: "", status: ""
  }),
  persist: true,
  actions: {
    addValueToStore(name, status) {
      this.name = name;
      this.status = status;
    },
  }
})
