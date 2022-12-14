<template>
  <div>
    <div id="article" class="page">
      <div class="inline">
        <h1> {{ json.title }}</h1>
        <div class="intro" id="intro"></div>
        <div id="image" class="_nghost-uau-c35">
          <img :src="imagePath" :alt="imageAlt" :title="imageTitle">
          <div class="image__title">{{ imageTitle }}</div>
        </div>
        <div id="body" class="text-align-left"></div>
        <div class="nghost-nel-c31" id="tags"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// Used json file for development, before using API.
// import json from '@/assets/article.json'  //

export default {
  name: "ArticleView",
  el: '#article',
  data() {
    return {
      json: [],
      url: 'https://midaiganes.irw.ee/api/list/972d2b8a',
      imagePath: '',
      imageAlt: '',
      imageTitle: '',
    };
  },
  methods: {
    async getIntroElement() {
      const articleJson = await axios.get(this.url);
      this.json = articleJson.data;
      this.imagePath = articleJson.data.image.large;
      this.imageAlt = articleJson.data.image.alt;
      this.imageTitle = articleJson.data.image.title;
      document.getElementById("intro").innerHTML += this.json.intro;
      document.getElementById("body").innerHTML += this.json.body;
      document.getElementById("tags").innerHTML += this.json.tags;
    },
  },

  async mounted() {
    await this.getIntroElement();
  },

}

</script>

<style scoped>
.page {
  background-image: url(@/assets/imgs/bg-deco-left.svg), url(@/assets/imgs/bg-deco-right.svg);
  background-repeat: no-repeat;
  background-position: var(--twn-menuWidth) bottom, 100% 0;
  background-size: 150px, 250px;
  background-attachment: fixed;
  display: block;
  margin-left: var(--twn-menuWidth);
  height: 100vh;
  overflow: auto;
  padding: 5rem 2.5rem;
}

.inline, .page {
  position: relative;
}

.inline {
  max-width: var(--twnMaxWidth);
  min-height: 100%;
  margin: 0 auto;
}

.intro {
  font-weight: 900;
  text-align: left;
}

h1, h2 {
  text-align: center;
  text-transform: uppercase;
}

[_nghost-uau-c35] {
  display: block;
  padding-bottom: 50%;
  position: relative;
  border-radius: .375rem;
  transform: translate(0);
}


img {
  width: auto;
  height: auto;
  max-width: 100%;
}

p {
  margin: 2.5rem 0;
  text-align: left !important;
}

div {
  display: block;
}

.image__title {
  position: relative;
  bottom: 42px;
  left: 0;
  width: 100%;
  padding: .625rem 1.5rem;
  font-size: 1rem;
  z-index: 6;
  background: rgba(0, 0, 0, .5);
}

.nghost-nel-c31 {
  background: var(--twn-secondaryColor);
  display: inline-block;
  padding: .5rem 1rem;
  border-radius: 2rem;
  font-size: 14px;
  font-weight: 700;

}

.text-align-left {
  text-align: left
}
</style>
