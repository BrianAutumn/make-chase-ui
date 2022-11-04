<template>
  <div class="container">
    <div class="background" />
    <div class="content elevation-7">
      <HeaderBar/>
      <div class="inner-content">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>

import HeaderBar from "@/components/HeaderBar";

export default {
  name: "MainFrame",
  components: {HeaderBar}
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap');

.background {
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  background-color: #6e6046;
}

.content {
  z-index: 1;
  position: absolute;
  display:flex;
  flex-direction: column;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 1000px;
  max-height: calc(100% - 20px);
  height: max-content;
  background-color: wheat;
  padding: 10px;
  border-radius: 3px;
  border: none;
}

.inner-content {
  overflow-y: auto;
  height: max-content;
  border: none;
}
</style>