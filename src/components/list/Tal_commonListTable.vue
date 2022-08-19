
<template>
  <!-- <div v-if="this.commonListData.length === 0">
    <img src="/resource/common/placeholder_white.png" style="height: 150px; width: 150px;" />
  </div> -->
  <div style="width: 100%; height: 100%;">
    <table class="w-100P">
        <colgroup>
            <col class="listHeader" style="width: 65px; float: left;">
            <col style="width: calc(100% - 45px); margin-left: 10px; float: left;">
        </colgroup>
        <tr v-for="(value, index) in commonListData" class="commonListTr textLeft" :key="index" >
            <td style="padding: 5px 10px; margin-right: 10px; width: 65px;" :class="{top5MyPushColor: sessionUserKey === value.creUserKey}">
              <div class="top5PushChanLogoImgWrap fl" style="background-color: #fff;" @click="goChanDetail(value)"><img alt="채널 프로필이미지" class="" :src="value.logoPathMtext">
              </div>
            </td>
            <!-- <td class="textCenter" v-if="mainYn === true"> -->
                <!-- <img src="../../assets/images/main/icon_notice2.png" style="width:1.5rem"> -->
                <!-- <img v-if="value.readYn === true" src="../../assets/images/main/icon_notice1.png" style="width:1.5rem">
                <img else src="../../assets/images/main/icon_notice2.png" style="width:1.5rem"> -->
            <!-- </td> -->
            <td v-on:click="goChanDetail(value)" :class="{top5MyPushColor:  sessionUserKey === value.creUserKey}">
                <p v-html="resizeText(value.title, value.nameMtext)" class="commonBlack mtop-03 font15 fontBold" style="width: 100%; display: inline-block; white-space: nowrap; text-overflow: ellipsis;overflow: hidden;" />
                <!-- <div> -->
                <!-- <div style="display: flex; align-items: center; justify-content: space-between;"> -->
                  <!-- <div style="display: flex; align-items: center; "> -->
                    <img src="../../assets/images/channel/icon_official2.svg" v-if="value.officialYn" style=" height:16px; padding: 1px; margin-right: 3px; float: left;" />
                    <span style="max-width: 75%;" v-html="(value.showCreNameYn) ? (this.$changeText(value.nameMtext) + '&nbsp;(' + this.$changeText(value.creUserName)) : (this.$changeText(value.nameMtext))" class="textOverdot fl commonBlack font12"></span>
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
    goChanDetail (data) {
      console.log(data)
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetType = 'chanDetail'
      param.teamKey = data.creTeamKey
      param.targetKey = data.creTeamKey
      param.nameMtext = data.nameMtext
      param.chanName = data.nameMtext
      param.targetContentsKey = data.contentsKey
      // 세션에서 유저키 받아오기
      if (data.creUserKey === this.creUserKey) {
        param.ownerYn = true
      }
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
    }
  },
  data: function () {
    return { // 데이터 정의
      nameMtextSpanWidth: 0,
      mainYn: false,
      sessionUserKey: JSON.parse(localStorage.getItem('sessionUser')).userKey
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
