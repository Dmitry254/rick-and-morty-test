<template>
  <div class="singleCharCard">
    <img class="singleCharImg" v-bind:src=this?.charData.image>
    <div class="singleCharBio">
      <p class="charName">Name: {{ this?.charData.name }}</p>
      <p class="charSpecies">Species: {{ this?.charData.species }}</p>
      <a class="charLocation">Location: {{ this?.charData.location.name }}</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "@/assets/character.css"

export default {
  name: "_id",
  data() {
    return {
      charData: {image: "", name: "", species: "", location: {name: ""}},
      characterInfoLink: "https://rickandmortyapi.com/api/character/"
    }
  },
  beforeMount() {
    this.getCharacterInfo();
  },
  methods: {
    getCharacterInfo() {
      axios
        .get(this.characterInfoLink + this.$route.params.id)
        .then(res => {
          this.charData = res.data;
          console.log(res);
        })
        .catch(function (error){
          console.log(error.response);
        })
    }
  },
}
</script>

<style scoped>

</style>
