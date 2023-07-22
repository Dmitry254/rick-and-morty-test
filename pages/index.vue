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
      <template v-for="item in this.charData">
        <div class="charCard">
          <img class="charImg" v-bind:src=item.image>
          <a class="descriptionP">{{ item.name }}</a>
          <p class="descriptionP">{{ item.species }}</p>
          <a class="descriptionP">{{ item.location.name }}</a>
          <div class="episodes">
            <p class="descriptionP">Episodes:</p>
            <a class="episodeNumbers" v-for="episode in item.episode.slice(0, 5)">{{ episode.slice(40) }}</a>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "index",
  data() {
    return {
      charData: [],
      firstPage: "https://rickandmortyapi.com/api/character/?page=1",
      nextPage: "",
      filterParams: {name: "", status: ""},
      componentKey: 0
    }
  },
  beforeMount() {
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
          console.log(res);
          this.nextPage = res.data.info.next;
        })
        .catch(function (error){
          console.log(error.response);
          alert("Wrong filter");
        })
    },
    getNextCharacters() {
      window.onscroll = () => {
        if (this.nextPage === null) {
          return;
        }
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight + 20 > document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          axios
            .get(this.nextPage, {params: this.filterParams})
            .then(res => {
              this.charData = this.charData.concat(res.data.results);
              console.log(this.charData);
              console.log(this.nextPage);
              this.nextPage = res.data.info.next;
            })
            .catch(function (error){
              console.log(error.response);
              alert("Wrong filter");
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
      this.getFirstCharacters();
    }
  },

}

</script>

<style scoped>

</style>
