<template>
    <div style="width: 100%; height: 100%;">
      <div v-if="this.chanList.length === 0" class="w-100P h-100P">
        <!-- chanList.vue 에서 introChanPageTab() 수정 -->
        <img :src="this.imgUrl" style="float: left;" />
      </div>
      <!-- <div v-else class="chanRow w-100P fl channelRow " :class="{ownerChannelRowColor : value.ownerYn}" v-for="(value, index) in chanList" :key="index" v-on:click="goDetail(value)" > -->
      <div v-else class="chanRow w-100P fl channelRow cursorP" v-for="(value, index) in chanList" :key="index" v-on:click="goDetail(value)" >
        <div class="gChanPageChanLogoImgWrap" :class="{ownerChannelRow : value.ownerYn}"><img alt="채널 프로필이미지" class="" :src="value.logoPathMtext">
        <img src="../../assets/images/channel/ownerChannel_crown.svg" v-if="value.ownerYn" style="width: 20px; height: 25px; position: absolute; top: -15px;" />
        <img src="../../assets/images/common/icon_setting_gear.svg" v-if="!value.ownerYn && value.managerKey" style="width: 20px; position: absolute; top: -10px;" />
        </div>
        <div style=" margin-left: 10px; width: calc(100% - 60px); display:flex;flex-direction: column;">
          <div class=" text-start mr-04 w-100P">
            <img src="../../assets/images/channel/icon_official.svg" v-if="value.officialYn" style="width: 30px; float: left;" alt="" />
            <p class="font16 commonBlack fl fontBold mNone textOverdot" style="line-height: 30px;" :style="value.officialYn ? 'max-width: calc(100% - 60px);' : 'max-width: calc(100% - 30px);' " v-html="this.resizeText(this.$changeText(value.nameMtext))"></p>
            <!-- <p class="font16 commonBlack fl fontBold mNone textOverdot" style="line-height: 30px; width: calc(100% - var(--calcWidth)) " :style="value.officialYn ? '--calcWidth : 60px' : '--calcWidth : 40px' " v-html="this.resizeText(this.$changeText(value.nameMtext))"></p> -->
            <div style="height: 30px; float: left; padding-top: 1px; margin-left: 8px;">
                <img style="width: 0.8rem; margin-right: 3px;" src="../../assets/images/main/main_subscriber.png"/>
                <span class="commonColor font14" >{{value.followerCount}}</span>
            </div>
            <!-- <img src="../../assets/images/channel/icon_official.svg" v-if="value.officialYn" style="width:30px; margin-top: -2px; float: left;" alt=""> -->
          </div>
          <div style="width: 100%; margin-top: 4px; position: relative;">
            <span class="chanMsgWrap fl font14 grayBlack textOverdot" style="width: calc(100% - 45px); margin-right: 5px;" v-html="this.$makeMtextMap(value.memoMtext, 'KO')" ></span>
            <p class="lightGray font14 fr mNone " style="line-height: 0.9rem; width: 40px" >{{this.$changeDateFormat(value.creDate)}}</p>
          </div>
        </div>
      </div>
      <myObserver @triggerIntersected="loadMore" class="fl wich" />
      <div class="w-100P fl mbottom-1 mtop-05" style="position: relative; width:100%; height: 40px;">
        <gLoadingS ref="sLoadingChan" class="fl"/>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    chanList: {},
    imgUrl: {}
  },
  created () {
  },
  watch: {
    chanList () {
      this.loadingRefHide()
      if (this.chanList.userTeamInfo) {

      }
    }
  },
  methods: {
    loadingRefShow () {
      // console.log('show')
      this.$refs.sLoadingChan.show()
    },
    loadingRefHide () {
      // console.log('hide')
      this.$refs.sLoadingChan.hide()
    },
    resizeText (text) {
      if (text.length > 20) {
        text = text.substr(0, 20) + '...'
      }
      return text
    },
    goDetail (chanName) {
      this.$emit('goDetail', chanName)
    },
    async loadMore () {
      this.loadingRefShow()
      this.$emit('moreList', 10)
      /* const newArr = [
        ...this.commonListData,
        ...resultList.content
      ]
      this.commonListData = newArr */
    }
    /*  settingFollowerType (value) {
      var followerTypeText = ''
      var userTeamInfo = null
      if (value.userTeamInfo !== undefined && value.userTeamInfo !== null && value.userTeamInfo !== '') {
        userTeamInfo = value.userTeamInfo
      } else if (value.followerType !== undefined && value.followerType !== null && value.followerType !== '') {
        userTeamInfo = value
      }
      if (userTeamInfo !== undefined && userTeamInfo !== null && userTeamInfo !== '') {
        if (userTeamInfo.followerType) {
          var followerType = userTeamInfo.followerType
          if (followerType === 'F') {
            followerTypeText = '[구독자]'
          } else if (followerType === 'M') {
            followerTypeText = '[관리자]'
          } if (followerType === 'A') {
            followerTypeText = '[소유자]'
          }
        }
      }

      return followerTypeText
    } */
  },
  computed: {
  }
}
</script>

<style scoped>
table{
    width: 100%;
    text-align: left;
}
td {
  min-height: 60px;
}
.chanItem{padding: 0.8rem 0.4rem}
.chanMsg{line-height: 18px; width: 100%; float: left;}
.ownerChannelRow {position: relative;}
.ownerChannelRowColor {background-color: #6768a712}
.channelRow{display: flex; align-items: center; padding: 15px 5px; min-height: 70px;  border-bottom: 1px solid #E4E4E4; }
.chanTop5Wrap{width: 100%; padding-top: 0.2rem; padding-bottom: 0.5rem;}
.gChanPageChanLogoImgWrap {width: 60px; height:60px; padding: 5px; border-radius: 60px; display: flex; align-items: center; justify-content: center; border: 2px solid #ccc; position: relative;}
.gChanPageChanLogoImgWrap img{width: 80%; margin-right: 0.05rem;}
.chanMsgWrap{line-height: 0.9rem; text-align: left; opacity: 1; box-sizing: border-box}
.chanRow{
  animation-name: fadein;
  animation-duration: 0.3s;
}

@media screen and (max-width: 300px) {
  .gChanPageChanLogoImgWrap {
    width: 40px!important;
    height: 40px!important;
    top: 10%!important;
    padding: 3px;
    margin-right: 0px!important;
  }
  .channelRow{
    padding: 8px 5px;
  }
}
</style>
