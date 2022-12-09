<template>
  <div>
    <div id="article">
      <h1> {{ title }}</h1>
      <div class="intro" id="intro"></div>
      <div id="image"></div>
      <img :src="imagePath" :alt="imageAlt" :title="imageTitle">
      <div id="body"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import json from '@/assets/article.json'

export default {
  name: "ArticleView",
  el: '#article',
  data() {
    return {
      json: json,
      title: json.title,
      intro: '',
      body: '',
      imagePath:json.image.medium,
      imageAlt: json.image.alt,
      imageTitle: json.image.title,
    };
  },
  methods: {
    getIntroElement: function () {
      console.log(json);
      document.getElementById("intro").innerHTML += this.json.intro;
      document.getElementById("body").innerHTML += this.json.body;
    },

  },
  mounted() {
    this.getIntroElement();
    // axios
    //     .get('https://midaiganes.irw.ee/api/list/972d2b8a')
    //     .then(response => (
    //         this.json = response.data
    //     ));
  },

}

</script>

<style scoped>

</style>
