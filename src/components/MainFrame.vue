<template>
  <div class="container">
    <div class="background" />
    <div class="content elevation-7">
      <div class="top-bar">
        <MakeChaseLogo class="logo"/>
        <span class="logo-text">Make Chase</span>
        <div class="spacer"/>
        <UserProfile/>
      </div>
      <div class="inner-content">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
import MakeChaseLogo from '../assets/make-chase-logo.svg'
import UserProfile from "@/components/UserProfile";

export default {
  name: "MainFrame",
  components: {UserProfile, MakeChaseLogo}
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
  width: 1000px;
  height: calc(100% - 30px);
  background-color: wheat;
  padding: 10px;
  border-radius: 3px;
}

.logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 10px;
  border: #cb9e57 solid 1px;
}

.logo-text {
  font-family: 'Rock Salt', cursive;
  font-size: 3em;
  color: #e31313;
  cursor:default;
}

.top-bar {
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: #cb9e57 solid 1px;
}

.spacer {
  flex-grow: 1;
}

.inner-content {
  overflow: auto;
}
</style>