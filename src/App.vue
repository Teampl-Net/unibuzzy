<template>
  <div class="minW" style="width: 1390px; height: calc(100vh - 90px); margin: 0 auto;">
    <!-- <router-link to="/">Home</router-link> | -->
    <!-- <router-link to="/about">About</router-link> -->
    <router-view />
  </div>
</template>

<style>
.minW{
   width: 1390px;
        height: 100%;
        margin: 0 auto;
        padding: 0;
        overflow-y:visible;
}

@import url(./resource/css/ad_common.css)
</style>
