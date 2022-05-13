<template>
    <div class="commonPopHeaerWrap">
        <!-- <img src="../../../assets/images/common/icon_back_white.png" v-on:click="goBack" class="fl" style=" width: 0.8rem;" > -->
        <img src="../../assets/images/common/icon_back.png" v-on:click="closeXPop" class="fl commonPopBackBtn" >
        <div v-for="(value, index) in subTitlebtnList"  :key="index" class="fr ml-04">
          <img :src="value.icon" />
        </div>
        <span class="popHeaderTitleSpan">{{headerTitle}}</span>
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
.commonPopHeaerWrap > img {position: absolute; left: 1rem;}
.commonPopHeaerWrap{ position: fixed; justify-content: center; top: 0; left: 0; box-sizing: border-box; display: flex; padding: 0.7rem 0.5rem; width: 100%; height: 50px; list-style: none; text-align: center; z-index: 999; background: #FFF;}
.popHeaderTitleSpan{position: absolute; color: #6768A7}
.commonPopBackBtn{width: 0.8rem;}

</style>
