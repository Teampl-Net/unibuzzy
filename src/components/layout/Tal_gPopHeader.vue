<template>
    <div class="commonPopHeaerWrap">
        <!-- <img src="../../../assets/images/common/icon_back_white.png" v-on:click="goBack" class="fl" style=" width: 0.8rem;" > -->
        <img src="../../assets/images/common/icon_back.png" v-on:click="closeXPop" class="fl commonPopBackBtn" >
        <div v-for="(value, index) in subTitlebtnList"  :key="index" class="fr ml-04">
          <img :src="value.icon" />
        </div>
        <span class="popHeaderTitleSpan">{{headerTitle}}</span>

        <gBtnSmall v-if="this.headerTitle === '알림 작성'" :btnThema="'light'" v-on:click="sendBtnClick" btnTitle="발송하기" style="position: absolute; right: 1rem" />

        <div v-if="headerTitle === '' " class="chanMenubar" @click="this.$emit('openMenu')">
          <img src="../../assets/images/common/icon_menu.png" style="width:1.8rem;"/>
        </div>
    </div>
</template>

<script>
import PullToRefresh from 'pulltorefreshjs'
export default {
  name: 'talHeader',
  props: {
    headerTitle: {},
    subTitlebtnList: {},
    thisPopN: {}
  },
  methods: {
    closeXPop () {
      this.pullToRefresh()
      this.$emit('closeXPop', this.thisPopN)
    },
    sendBtnClick () {
      if (this.headerTitle === '알림 작성') {
        this.$emit('sendOk')
      }
    },

    pullToRefresh () {
      PullToRefresh.init({
        mainElement: 'body',
        // 최소 새로고침 길이( 이 길이가 되면 새로고침 시작)
        distThreshold: '80',
        // 최대 거리 (영역이 길어질 수 있는 최대 거리)
        distMax: '100',
        // 새로고침 후 갖고있는 영역의 크기
        distReload: '80',
        // 최소 새로고침에 도달 했을 때 문구
        instructionsReleaseToRefresh: ' ',
        // 끌고 있을 때 문구
        instructionsPullToRefresh: ' ',
        // 새로고침 중 문구
        instructionsRefreshing: ' ',
        onRefresh () {
          window.location.reload()
        }
      })
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

.chanMenubar{
  position: absolute;
  right: 1rem;
}

.chanDetailPopHeader .popHeaderTitleSpan {color: white;}

</style>
