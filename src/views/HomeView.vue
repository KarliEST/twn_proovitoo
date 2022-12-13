<template>
  <div class="page">
    <div>
      <h1 style="color: var(--twn-highlightColor)">TRINIDAD WISEMAN</h1>
      <h2>SPA proovitöö</h2>
      <h2>Karli Kullasepp</h2>
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
</style>
