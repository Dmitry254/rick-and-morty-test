<template>
  <div class="charactersMain">
    <div class="charCardsList" key="charCardsListKey">
      <template v-for="item in this.charData">
        <div class="charCard">
          <img class="charImg" v-bind:src=item.image>
          <p class="descriptionP">{{ item.name }}</p>
          <p class="descriptionP">{{ item.species }}</p>
          <p class="descriptionP">{{ item.location.name }}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import "@/assets/index.css";

export default {
  name: "index",
  data() {
    return {
      charData: [],
      firstPage: "https://rickandmortyapi.com/api/character/?page=1",
      nextPage: "",
      componentKey: 0,
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
        .get(this.firstPage)
        .then(res => {
          this.charData = res.data.results;
          console.log(res);
          this.nextPage = res.data.info.next;
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
            .get(this.nextPage)
            .then(res => {
              this.charData = this.charData.concat(res.data.results);
              console.log(this.charData);
              console.log(this.nextPage);
              this.nextPage = res.data.info.next;
            })
          this.forceRerender();
        }
      }
    },
    forceRerender() {
      this.charCardsListKey += 1;
    }
  },

}

</script>

<style scoped>

</style>
