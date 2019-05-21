<template>
  <div>
    <ul class="list">
      <li class="list-item" v-for="(char, index) of response" :key="index">
        <div class="list-item-container">
          <img :src="`${char.thumbnail.path}/portrait_small.${char.thumbnail.extension}`" :alt="char.name">
          <h3>{{ char.name }}</h3>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import marvel from '../services/MarvelAPI.js'

export default {
  name: 'HelloWorld',

  data() {
    return {
      response: []
    }
  },

  created() {
    marvel.getAllCharacters().then(res => this.response = res);
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.list-item-container {
  display: flex;
}

</style>
