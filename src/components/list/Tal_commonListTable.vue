
<template>
  <!-- <div v-if="this.commonListData.length === 0">
    <img src="/resource/common/placeholder_white.png" style="height: 150px; width: 150px;" />
  </div> -->
  <div style="width: 100%; height: 100%; float: left">
    <table class="w-100P">
        <colgroup>
            <col class="listHeader" style="width: 50px; float: left;">
            <col style="width: calc(100% - 50px); margin-left: 10px; float: left;">
        </colgroup>
        <tr v-for="(value, index) in commonListData.slice(0,5)" class="commonListTr textLeft " :style="index === commonListData.length - 1 ? 'border: none!important;' : ''" :key="index" @click="clickInfo(value)">
            <td style="padding: 5px 5px; width: 50px;" :class="{top5MyPushColor: sessionUserKey === value.creUserKey}">
              <div class="top5PushChanLogoImgWrap fl" @click="goChanDetail(value)"  :style="'background-image: url(' + (value.domainPath ? value.domainPath + value.logoPathMtext : value.logoPathMtext) + ');'" style="background-repeat: no-repeat; background-size: cover; background-position: center; position: relative;">
                <!-- <div style="background:#ffffff50; width:20px; height:20px; border-radius:100%; border:1px solid #ccc; overflow: hidden; position:absolute; bottom:-10px; right:-10px; display: flex; justify-content: center; align-items: center;"> -->
                <!-- <div style="background:#ffffff50; border-radius:100%; width:20px; height:20px; position:absolute; bottom:-5px; right:-5px; display: flex; justify-content: center; align-items: center;"> -->
                  <!-- <img v-if="value.jobkindId === 'ALIM'" class="cursorP" style="width:15px !important;" src="../../assets/images/common/icon_bell.svg" alt="">
                  <img v-if="value.jobkindId === 'BOAR'" class="cursorP" style="width:13px !important;" src="../../assets/images/channel/channer_board_color.png" alt=""> -->
                <!-- </div> -->
              </div>
            </td>
            <!-- <td class="textCenter" v-if="mainYn === true"> -->
                <!-- <img src="../../assets/images/main/icon_notice2.png" style="width:1.5rem"> -->
                <!-- <img v-if="value.readYn === true" src="../../assets/images/main/icon_notice1.png" style="width:1.5rem">
                <img else src="../../assets/images/main/icon_notice2.png" style="width:1.5rem"> -->
            <!-- </td> -->
            <td v-on:click="goChanDetail(value)" :class="{top5MyPushColor:  sessionUserKey === value.creUserKey}">
                <div style="width:100%; float: left; padding: 2px 0 ; min-height: 25px;">
                    <div v-if="value.jobkindId === 'ALIM'" class="font14 fl" style="margin-top: 0.5px; min-width: 30px; padding: 0 5px; min-height: 20px;  margin-right: 5px; border-radius: 10px; background:#6768A7; color: #FFF; ">{{'알림'}}</div>
                    <div v-else-if="value.jobkindId === 'BOAR'" class="font14 fl" style="margin-top: 0.5px; min-width: 30px; padding: 0 5px; min-height: 20px;  margin-right: 5px; border-radius: 10px; background:#FFF; color: #6768A7; font-weight: bold; border: 1px solid #6768A7  ">{{'게시'}}</div>
                    <!-- <img v-if="(value.jobkindId === 'BOAR' && this.$checkUserAuth(value.shareItem).V === false && value.creUserKey !== sessionUserKey)" style="width: 20px; float: right;" src="../../assets/images/board/securityDoc.svg" alt=""> -->
                    <p v-if="(value.jobkindId === 'BOAR' && this.$checkUserAuth(value.shareItem).V === false && value.creUserKey !== sessionUserKey)" v-html="value.title" class="commonBlack textOverdot font15 fontBold" style="width: calc(100% - 75px); display: inline-block; white-space: nowrap; text-overflow: ellipsis;overflow: hidden;" />
                    <p v-else v-html="value.title" class="commonBlack textOverdot font15 fontBold" style="width: calc(100% - 50px); display: inline-block; white-space: nowrap; text-overflow: ellipsis;overflow: hidden;" />
                    <!-- <p v-else v-html="value.title" class="commonBlack textOverdot font15 fontBold" style="width: calc(100% - 50px); display: inline-block; white-space: nowrap; text-overflow: ellipsis;overflow: hidden;" /> -->
                </div>
                <!-- <div> -->
                <!-- <div style="display: flex; align-items: center; justify-content: space-between;"> -->
                  <!-- <div style="display: flex; align-items: center; "> -->
                    <img src="../../assets/images/channel/icon_official2.svg" v-if="value.officialYn" style=" height:16px; padding: 1px; margin-right: 3px; float: left;" />
                    <span style="max-width: 75%;" v-html="setSendNameStr(value)" class="textOverdot fl commonBlack font12"></span>
                    <span v-if="value.showCreNameYn" v-html="')'" class="fl commonBlack font12"></span>
                    <!-- <span :style="{width: calc(100% - calcSpanWidth(index))}"  v-html="'&nbsp;(' + this.$changeText(value.creUserName) + ')'" v-if="value.showCreNameYn" class="textOverdot fl commonBlack font12"></span> -->
                    <!-- <span v-html="')'" class="fl commonBlack font12"></span> -->
                  <!-- </div> -->
                    <span class="commonBlack mtop-01 font12 fr">{{this.$changeDateFormat(value.creDate)}}</span>
                    <!-- <div :style="'background-color:' + value2.stickerColor" v-for="(value2, index2) in value.stickerList" :key="index2" style="width: 15px; margin-top: 8px; margin-right: 5px; height: 15px;float: right;border-radius: 10px; font-size: 12px; text-align: center;">{{cutStickerName(value2.stickerName)}}</div> -->
                <!-- </div> -->
            </td>
        </tr>
    </table>
  </div>
</template>
<script>
export default {
  created () {
  },
  mounted () {
  },
  emits: ['goDetail'],
  methods: {
    clickInfo (data) {
      // console.log(data)
    },
    goChanDetail (data) {
      console.log(data)
      // eslint-disable-next-line no-new-object
      var param = new Object()
      // if (data.jobkindId === 'ALIM') {
      param.targetType = 'chanDetail'
      param.teamKey = data.creTeamKey
      param.targetKey = data.creTeamKey
      param.nameMtext = data.nameMtext
      param.chanName = data.nameMtext
      param.targetContentsKey = data.contentsKey
      // param.targetContentsKey = data.mccKey
      // if (data.jobkindId === 'BOAR') {}
      param.jobkindId = data.jobkindId
      // 세션에서 유저키 받아오기
      if (data.creUserKey === this.creUserKey) {
        param.ownerYn = true
      }
      // } else {
      //   param.targetType = 'boardDetail'
      //   param.cabinetNameMtext = data.cabinetNameMtext
      //   param.targetKey = data.contentsKey
      //   param.value = data
      // }
      this.$emit('goDetail', param)
    },
    resizeText (text, name) {
      if (text) {
        // if (text.length > 15) {
        //   text = text.substr(0, 15)
        //   text += '...'
        // }
      } else {
        text = '[' + this.$changeText(name) + '] 제목없는 알림'
      }
      return text
    },
    goDetail (value) {
      this.$emit('goDetail', value)
    },

    cutStickerName (value) {
      var cutName = value.substr(0, 1)
      return cutName
    },
    setSendNameStr (value) {
      var nameStr = this.$changeText(value.nameMtext)
      if (value.cabinetNameMtext) {
        nameStr += ('[' + this.$changeText(value.cabinetNameMtext) + ']')
      }

      if (value.creUserName) {
        nameStr += ('(' + (value.blindYn === 1 ? '익명' : this.$changeText(value.creUserName)) + ')')
      }
      return nameStr
    }
  },
  data: function () {
    return { // 데이터 정의
      nameMtextSpanWidth: 0,
      mainYn: false,
      sessionUserKey: this.$store.state.D_USER.userInfo.userKey
    }
  },
  props: {
    clickEvnt: {},
    mainYnProp: Boolean,
    commonListData: []
  }
}
</script>
<style scoped>
/* .top5PushListRow{display: flex; align-items: center; padding: 5px 10px; min-height: 60px;  border-bottom: 1px solid #E4E4E4;} */
.top5MyPushColor { background-color: #6768a712;}
.top5PushChanLogoImgWrap {width: 45px; height:45px; border-radius: 45px; display: flex; align-items: center; justify-content: center; border: 2px solid #ccc; position: relative;}
.top5PushChanLogoImgWrap img{width: 1.7rem; margin-right: 0.05rem;}
.commonListTr{
animation-name: fadein;
animation-duration: 0.3s;
}
.commonListTr, .commonListTr td, .commonListTr th {height: 4rem; padding: 5px 10px;}
.listHeader {text-align: center;}
.listBodyRow{width: calc(100% - 60px);}

</style>
