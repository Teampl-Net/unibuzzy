<template>
    <div style="width: 100%; height: 100%; padding: 0 10px; padding-top: 15px;">
      <div v-if="this.chanList.length === 0" class="w-100P h-100P">
        <!-- chanList.vue 에서 introChanPageTab() 수정 -->
        <img :src="this.imgUrl" style="float: left;" />
      </div>
      <!-- <div v-else class="chanRow w-100P fl channelRow " :class="{ownerChannelRowColor : value.ownerYn}" v-for="(value, index) in chanList" :key="index" v-on:click="goDetail(value)" > -->
      <div v-else class="chanRow w-100P fl channelRow cursorP" style="border: none; border-radius: 8px; background: #FFF; padding: 10px 10px; padding-bottom: 5px;" v-for="(value, index) in chanList" :key="index" v-on:click="goDetail(value)" >
        <div style="width: 100%; display: flex; min-height: 40px; float: left; ">
<!-- url("fileServer/image/2022/09/15�33-edb1-4f1f-b530-9c5d32b3369a_aaaaaaaaaaaaa.png") -->
          <!-- <div class="gChanPageChanLogoImgWrap" :class="{ownerChannelRow : value.ownerYn}" :style="'background-image: url(' + (value.logoDomainPath ? value.logoDomainPath + value.logoPathMtext : value.logoPathMtext) + ');'" style="background-repeat: no-repeat; background-size: cover; background-position: center;"> -->
              <div class="gChanPageChanLogoImgWrap" :class="{ownerChannelRow : value.ownerYn}" :style="'background-image: url(' + (value.logoDomainPath ? value.logoDomainPath + value.logoPathMtext : value.logoPathMtext ? value.logoPathMtext : '/resource/userCommonIcon/userImg.png') + ');'" style="background-repeat: no-repeat; background-size: cover; background-position: center;">
                <!-- <img src="../../assets/images/channel/ownerChannel_crown.svg" v-if="value.ownerYn" style="width: 20px; height: 25px; position: absolute; top: -15px;" />
                <img src="../../assets/images/common/icon_setting_gear.svg" v-if="!value.ownerYn && value.managerKey" style="width: 20px; position: absolute; top: -10px;" /> -->
            </div>
            <div style=" margin-left: 10px; width: calc(100% - 40px); min-height: 40px; display:flex;flex-direction: column;">
                <div class=" text-start mr-04 w-100P" style="height: 23px; line-height:20px;">
                    <img src="../../assets/images/channel/icon_official.svg" v-if="value.officialYn" style="width: 25px; float: left;" alt="" />
                    <p class="font16 commonBlack fl fontBold mNone textOverdot" style="line-height: 23px;" :style="value.officialYn ? 'max-width: calc(100% - 140px);' : 'max-width: calc(100% - 120px);' " v-html="this.resizeText(this.$changeText(value.nameMtext))"></p>
                    <div style="line-height: 0.05rem; float: left; margin-top: 0px; margin-left: 5px; margin-top: 3.5px;">
                        <img style="width: 0.8rem; margin-right: 0.2rem;" src="../../assets/images/main/main_subscriber.png"/>
                        <span class="commonColo font12" >{{value.followerCount}}</span>
                    </div>
                    <!-- <p class="font16 commonBlack fl fontBold mNone textOverdot" style="line-height: 23px;" >
                      <p style="line-height: 0.05rem; float: right; margin-top: 0px; margin-left: 5px; margin-top: 3.5px;">
                        <img class="img-w13" style="margin-right: 0.2rem;" src="../../assets/images/main/main_subscriber.png"/>
                        <span class="commonColo font12" >{{value.followerCount}}</span>
                      </p>
                      {{this.resizeText(this.$changeText(value.nameMtext))}}
                    </p> -->
                    <p class="lightGray font14 fr mNone " style="line-height: 0.9rem; height: 100%; line-height: 20px; min-width: 40px" >{{'최근활동 ' + this.$changeDateFormat(value.updDate)}}</p>
                    <!-- <div class="fr" style="display: flex; margin-right: 5px; height: 23px; justify-content: space-around; align-items: center;">
                        <div style="line-height: 0.05rem; float: right; margin-top: 0px; margin-right: 5px;">
                            <img style="width: 0.8rem; margin-right: 0.2rem;" src="../../assets/images/main/main_subscriber.png"/>
                            <span class="commonColo font12" >{{value.followerCount}}</span>
                        </div>
                        <div style="padding: 3px 8px; border-radius: 8px; line-height: 18px; height: 23px;" :style="value.followerKey || value.followYn ? 'background-color:#6768a7' : 'background-color:#eee; border: 1px solid #ccc;' " >
                            <p class="fl font12 cursorP fontBold"  @click="saveMemberButton" :style="value.followerKey || value.followYn ? 'color:white' : '' " >{{value.followerKey || value.followYn ? '구독중' : '구독 +'}}</p>
                        </div>
                    </div> -->
                    <!-- <img src="../../assets/images/channel/icon_official.svg" v-if="value.officialYn" style="width:30px; margin-top: -2px; float: left;" alt=""> -->
                </div>
                <div style="width: 100%; margin-top: 5px; min-height: 25px; position: relative;">
                    <span class="chanMsgWrap fl font14 grayBlack " style="width: calc(100%); margin-right: 5px;" v-html="this.$makeMtextMap(value.memoMtext, 'KO')" ></span>
                </div>
                <!-- <div v-if="value.managerKey || value.memberYn" style="width: 100%; float: left;"> -->
                <div v-if="value.managerKey" style="width: 100%; float: left;">
                    <div class="fr" style="display: flex; height: 23px; justify-content: space-around; align-items: center;">
                        <div v-if="value.ownerYn" style="padding: 3px 8px;float: right; border-radius: 8px; line-height: 18px; margin-left: 5px; height: 23px; background-color:#F5F5F9;"  >
                            <p class="fr font12 cursorP fontBold lightGray"  @click="saveMemberButton" >{{value.ownerYn ? '소유자' : '관리자'}}</p>
                        </div>
                        <div v-if="value.managerKey" style="padding: 3px 8px;float: right; border-radius: 8px; line-height: 18px; margin-left: 5px; height: 23px; background-color:#F5F5F9;"  >
                            <p class="fr font12 cursorP fontBold lightGray"  @click="saveMemberButton" >{{'관리자'}}</p>
                        </div>
                        <!-- <div v-else-if="value.memberYn" style="padding: 3px 8px;float: right; border-radius: 8px; line-height: 18px; margin-left: 5px; height: 23px; background-color:#F5F5F9;"  >
                            <p class="fr font12 cursorP fontBold lightGray"  @click="saveMemberButton" >{{'멤버'}}</p>
                        </div> -->
                        <!-- <div style="padding: 3px 8px;float: right; border-radius: 8px; line-height: 18px; height: 23px;" :style="value.followerKey || value.followYn ? 'background-color:rgb(220, 221, 235)' : 'background-color:#eee; border: 1px solid #ccc;' " >
                            <p class="fl font12 cursorP fontBold"  @click="saveMemberButton" :style="value.followerKey || value.followYn ? 'color:white' : '' " >{{value.followerKey || value.followYn ? '구독중' : '구독 +'}}</p>
                        </div> -->
                    </div>
                </div>
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
      // // console.log('show')
      this.$refs.sLoadingChan.show()
    },
    loadingRefHide () {
      // // console.log('hide')
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
.channelRow{/* display: flex;  */align-items: center; padding: 10px 5px; min-height: 50px; margin-bottom : 15px; box-shadow: 0 0 7px 3px #6768a740 !important; }
.chanTop5Wrap{width: 100%; padding-top: 0.2rem; padding-bottom: 0.5rem;}
.gChanPageChanLogoImgWrap {width: 40px; height:40px; padding: 5px; border-radius: 100%; display: flex; align-items: center; justify-content: center; border: 2px solid #ccc; position: relative; flex-shrink: 0}
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
