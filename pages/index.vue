<template>
  <div class="charactersMain">

    <div class="charactersFilter">
      <input id="inputFilter" class="inputFilter">
      <select id="selectFilter" class="selectFilter">
        <option value="" selected="selected">Any</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <button class="buttonFilter" @click="setFilters()">Search</button>
    </div>

    <div class="charCardsList" key="charCardsListKey">
      <template v-for="item in this?.charData">
        <div class="charCard">

          <NuxtLink class="charImg" :to="'/character/' + item.id">
            <img class="charImg" v-bind:src=item.image>
          </NuxtLink>
          <NuxtLink class="descriptionP" :to="'/character/' + item.id">{{ item.name }}</NuxtLink>
          <p class="descriptionP">{{ item.species }}</p>
          <p class="descriptionP">{{ item.location?.name }}</p>

          <div class="episodes">
            <p class="descriptionP">Episodes:</p>
            <template v-for="episode in item.episode.slice(0, 5)">
              <NuxtLink class="episodeNumbers" :to="'/episode/' + episode.slice(40)">{{ episode.slice(40) }}</NuxtLink>
            </template>
          </div>

        </div>
      </template>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import {useFiltersStore} from "@/store/filters.js";

export default {
  name: "index",
  data() {
    return {
      charData: [],
      firstPage: "https://rickandmortyapi.com/api/character/?page=1",
      nextPage: "",
      filterParams: {name: "", status: ""},
      componentKey: 0,
      filtersStore: useFiltersStore()
    }
  },
  beforeMount() {
    document.getElementById("inputFilter").value = this.filtersStore.name;
    document.getElementById("selectFilter").value = this.filtersStore.status;
    this.filterParams.name = this.filtersStore.name;
    this.filterParams.status = this.filtersStore.status;
    this.getFirstCharacters();
  },
  mounted() {
    this.getNextCharacters();
  },
  methods: {
    getFirstCharacters() {
      axios
        .get(this.firstPage, {params: this.filterParams})
        .then(res => {
          this.charData = res.data.results;
          this.nextPage = res.data.info.next;
        })
        .catch(function (error) {
          this.charData = [1];
          this.nextPage = null;
          this.forceRerender();
        })
    },
    getNextCharacters() {
      window.onscroll = () => {
        if (this.nextPage === null) {
          return;
        }
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          axios
            .get(this.nextPage, {params: this.filterParams})
            .then(res => {
              this.charData = this.charData.concat(res.data.results);
              this.nextPage = res.data.info.next;
            })
            .catch(function (error) {
              this.charData = [1];
              this.nextPage = null;
              this.forceRerender();
            })
          this.forceRerender();
        }
      }
    },
    forceRerender() {
      this.charCardsListKey += 1;
    },
    setFilters() {
      this.nextPage = this.firstPage;
      this.filterParams.name = document.getElementById("inputFilter").value;
      this.filterParams.status = document.getElementById("selectFilter").value;
      this.filtersStore.addValueToStore(document.getElementById("inputFilter").value,
        document.getElementById("selectFilter").value)
      this.getFirstCharacters();
    }
  },

}

</script>

<style scoped>

</style>
