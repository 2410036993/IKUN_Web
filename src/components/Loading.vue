<script setup>
defineProps({
  isLoading:Boolean
})
</script>

<template>
  <div class="box-loading" v-if="isLoading">
    <div class="loader">
      <div class="inner one"></div>
      <div class="inner two"></div>
      <div class="inner three"></div>
    </div>
  </div>
</template>

<style scoped>
.bq {
  z-index: 20;
}

* {
  margin: 0;
  padding: 0;
}

.box-loading {
  height: 1200px;
  width: 100%;
  position: fixed;
  z-index: 1000;
  top: 0;
  /* 或者其他值，取决于你想要的位置 */
  left: 0;
}

.box-loading {
  background-color: #131f2b;
}

.loader {
  position: absolute;
  top: calc(29% - 32px);
  left: calc(50% - 32px);
  width: 74px;
  height: 74px;
  border-radius: 50%;
  perspective: 800px;
}

.inner {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.inner.one {
  left: 0%;
  top: 0%;
  animation: rotate-one 1s linear infinite;
  border-bottom: 3px solid #aac9fa;
}

.inner.two {
  right: 0%;
  top: 0%;
  animation: rotate-two 1s linear infinite;
  border-right: 3px solid #aac9fa;
}

.inner.three {
  right: 0%;
  bottom: 0%;
  animation: rotate-three 1s linear infinite;
  border-top: 3px solid #aac9fa;
}

@keyframes rotate-one {
  0% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }

  100% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@keyframes rotate-two {
  0% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }

  100% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@keyframes rotate-three {
  0% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }

  100% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}
</style>