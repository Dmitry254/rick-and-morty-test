import { defineStore } from 'pinia'

export const useCharDataStore = defineStore({
  id: 'characters-data',
  state: () => ({
    storeCharData: "", storeNextPage: ""
  }),
  persist: true,
  actions: {
    addValueToStore(storeCharData, storeNextPage) {
      this.storeCharData = storeCharData;
      this.storeNextPage = storeNextPage;
      console.log(this.storeCharData);
    },
  }
})
