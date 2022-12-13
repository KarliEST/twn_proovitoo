<template>
  <div class="page">
    <div class="center-of-page">
            <h1 style="color: var(--twn-highlightColor); padding: 60px;scale: 2 ">TRINIDAD WISEMAN</h1>

      <h2 style="padding: 30px; scale: 2">SPA proovitöö <br>
        Karli Kullasepp</h2>
    </div>
  </div>
</template>

<script>

export default {
  name: "HomeView",
  data() {
    return {};
  }
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

.center-of-page {
  position: absolute;
  top: 30%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
}
</style>
