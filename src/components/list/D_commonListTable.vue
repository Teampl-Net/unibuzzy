
<template>
  <div style="width: 100%; height: 100%; float: left">
    <table class="w-100P">
      <colgroup>
        <col class="listHeader" style="width: 50px; float: left;">
        <col style="width: calc(100% - 50px); margin-left: 10px; float: left;">
      </colgroup>
      <tr v-for="(value, index) in propContentsList.slice(0,5)" class="commonListTr textLeft " :style="index === propContentsList.length - 1 ? 'border: none!important;' : ''" :key="index">
        <td style="padding: 5px 5px; width: 50px;" :class="{top5MyPushColor: this.GE_USER.userKey === value.creUserKey}">
          <div class="top5PushChanLogoImgWrap fl" @click="goChanDetail(value)"  :style="'background-image: url(' + (value.domainPath ? value.domainPath + value.logoPathMtext : value.logoPathMtext) + ');'" style="background-repeat: no-repeat; background-size: cover; background-position: center; position: relative;">
          </div>
        </td>
        <td v-on:click="goChanDetail(value)" :class="{top5MyPushColor:  this.GE_USER.userKey === value.creUserKey}">
          <div style="width:100%; float: left; padding: 2px 0 ; min-height: 25px;">
            <div v-if="value.jobkindId === 'ALIM'" class="font14 fl" style="margin-top: 0.5px; min-width: 30px; padding: 0 5px; min-height: 20px;  margin-right: 5px; border-radius: 10px; background:#6768A7; color: #FFF; ">{{'알림'}}</div>
            <div v-else-if="value.jobkindId === 'BOAR'" class="font14 fl" style="margin-top: 0.5px; min-width: 30px; padding: 0 5px; min-height: 20px;  margin-right: 5px; border-radius: 10px; background:#FFF; color: #6768A7; font-weight: bold; border: 1px solid #6768A7  ">{{'게시'}}</div>

            <p v-if="value.jobkindId === 'BOAR' && !(this.$checkUserAuth(value.shareItem).V === true || value.creUserKey === this.GE_USER.userKey ) && (value.titleBlindYn === true || value.titleBlindYn === 1)" v-html="'열람권한이 없는 컨텐츠 입니다.'" class="commonBlack textOverdot font15 fontBold" style="width: calc(100% - 75px); display: inline-block; white-space: nowrap; text-overflow: ellipsis;overflow: hidden;" />
            <p v-else v-html="value.title" class="commonBlack textOverdot font15 fontBold" style="width: calc(100% - 50px); display: inline-block; white-space: nowrap; text-overflow: ellipsis;overflow: hidden;" />
          </div>
          <img src="../../assets/images/channel/icon_official2.svg" v-if="value.officialYn" style=" height:16px; padding: 1px; margin-right: 3px; float: left;" />
          <span style="max-width: 75%;" v-html="setSendNameStr(value)" class="textOverdot fl commonBlack font12"></span>
          <span v-if="value.showCreNameYn" v-html="')'" class="fl commonBlack font12"></span>
          <span class="commonBlack mtop-01 font12 fr">{{this.$changeDateFormat(value.creDate)}}</span>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    propContentsList: []
  },
  methods: {
    goChanDetail (data) {
      console.log(' CommonListTable -- list => chanDetail // param ')
      var param = {}
      param.targetType = 'chanDetail'
      param.targetKey = data.creTeamKey
      param.nameMtext = data.nameMtext
      param.chanName = data.nameMtext
      param.targetContentsKey = data.contentsKey
      param.jobkindId = data.jobkindId
      console.log(param)
      this.$emit('goChanDetail', param)
    },
    resizeText (text, name) {
      if (!text) return '[' + this.$changeText(name) + '] 제목없는 알림'
      return text
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
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
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
