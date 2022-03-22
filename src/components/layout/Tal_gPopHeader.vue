<template>
    <div class="headerWrap" style="list-style: none; text-align: center;">
        <!-- <img src="../../../assets/images/common/icon_back_white.png" v-on:click="goBack" class="fl" style=" width: 0.8rem;" > -->
        <img src="../../assets/images/common/icon_back.png" v-on:click="closeXPop" class="fl" style=" width: 0.8rem;" >
        <div v-for="(value, index) in subTitlebtnList"  :key="index" class="fr ml-04">
          <img :src="value.icon" />
        </div>
        <span style="position: absolute; color: #6768A7">{{headerTitle}}</span>
    </div>
</template>

<script>

export default {
  name: 'talHeader',
  props: {
    headerTitle: {},
    subTitlebtnList: {},
    thisPopN: {}
  },
  methods: {
    closeXPop () {
      this.$emit('closeXPop', this.thisPopN)
    }
  },
  data () {
    return {
    }
  }
}

</script>

<style>
.headerWrap > img {position: absolute; left: 1rem;}
.headerWrap{ position: fixed; justify-content: center; top: 0; box-sizing: border-box; display: flex; padding: 0.7rem 0.5rem; width: 100%; height: 50px;}

</style>
