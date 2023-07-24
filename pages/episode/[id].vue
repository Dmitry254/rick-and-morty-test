<template>
  <div class="episodeCard">

    <div class="episodeInfo">
      <p class="episodeName">Episode {{this?.$route.params.id}} - {{ this?.episodeData.name }}</p>
      <p class="episodeDate">Air date: {{ this?.episodeData.air_date }}</p>
    </div>

    <p class="episodeCharsTitle">Characters from the episode</p>
    <div class="episodeChars">
      <template v-for="item in this?.charactersData">
        <div class="episodeCharCard">
          <NuxtLink class="episodeCharImg" :to="'/character/' + item.id" >
            <img class="episodeCharImg" v-bind:src=item.image>
          </NuxtLink>
          <NuxtLink class="episodeCharName" :to="'/character/' + item.id" >{{ item.name }}</NuxtLink>
        </div>
      </template>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import "@/assets/episode.css"

export default {
  name: "_id",
  data() {
    return {
      episodeData: {name: "", air_date: ""},
      charactersData: [],
      episodeInfoLink: "https://rickandmortyapi.com/api/episode/",
      characterInfoLink: "https://rickandmortyapi.com/api/character/"
    }
  },
  beforeMount() {
    this.getEpisodeInfo();
  },
  methods: {
    getEpisodeInfo() {
      axios
        .get(this.episodeInfoLink + this.$route.params.id)
        .then(res => {
          this.episodeData = res.data;
          this.getCharactersInfo(res.data.characters);
        })
        .catch(function (error) {
        })
    },
    getCharactersInfo(charactersList) {
      let charsId = [];
      for (let i = 0; i < charactersList.length; i++) {
        charsId.push(parseInt(charactersList[i].slice(42)));
      }
      axios
        .get(this.characterInfoLink + charsId)
        .then(res => {
          this.charactersData = res.data;
        })
        .catch(function (error) {
        })
    }
  }
}
</script>

<style scoped>

</style>
