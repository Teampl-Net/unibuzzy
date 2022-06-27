<template>
    <div class="chanRow w-100P top5ChannelRow" v-for="(value, index) in chanList"  :key="index" v-on:click="goDetail(value)" >
      <div class="chanLogoImgWrap"><img alt="채널 프로필이미지" class="" :src="value.logoPathMtext"></div>
      <div style=" margin-left: 10px; width: calc(100% - 60px); display:flex;flex-direction: column;">
        <div class=" text-start mr-04 w-100P" >
          <p class="font16 commonBlack fl fontBold mNone" v-html="this.resizeText(this.$changeText(value.nameMtext))"></p>
          <div style="line-height: 0.05rem; float: left; margin-top: 6px; margin-left: 8px;">
              <img style="width: 0.8rem; margin-right: 3px;" src="../../assets/images/main/main_subscriber.png"/>
              <span class="commonColor font14" >{{value.followerCount}}</span>
          </div>
          <span class="lightGray font14 fr" style="">{{this.$changeDateFormat(value.creDate)}}</span>
        </div>
        <div style="width: 100%; margin-top: 4px; position: relative;">
          <span class="chanMsgWrap w-100P fl font14 grayBlack "  v-html="this.$makeMtextMap(value.memoMtext, 'KO')" ></span>
        </div>
      </div>
    </div>
    <myObserver @triggerIntersected="loadMore" class="fl wich" />
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    chanList: {}
  },
  updated () {
  },
  methods: {
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

.top5ChannelRow{display: flex; align-items: center; padding: 15px 5px; min-height: 70px;  border-bottom: 1px solid #E4E4E4;}
.chanTop5Wrap{width: 100%; padding-top: 0.2rem; padding-bottom: 0.5rem;}
.chanLogoImgWrap {width: 60px; height:60px; border-radius: 60px; display: flex; align-items: center; justify-content: center; border: 2px solid #ccc;}
.chanLogoImgWrap img{width: 40px; margin-right: 0.05rem;}
.chanMsgWrap{line-height: 0.9rem; text-align: left; opacity: 1; box-sizing: border-box}
</style>
