<i18n>
{
  "ko": {
    "LIST_MSG_ACCESS": "열람권한이 없는 컨텐츠입니다."
  },
  "en": {
    "LIST_MSG_ACCESS": "You do not have permission to view."
  }
}
</i18n>
<template>
  <div class="w100P h100P fl">
    <table class="w100P">
      <tr v-for="(value, index) in propContentsList" class="contListTr" :key="index" :style="index === propContentsList.length - 1 ? 'border: none!important;' : ''" >
        <td class="contListTd" :class="{top5MyPushColor: GE_USER.userKey === value.creUserKey, top5MyPushColorMyInfo: $route.path==='/myPage'}">
          <div class="top5PushChanLogoImgWrap w100P fl" @click="goContentsDetail(value)"  :style="'background-image: url(' + (value.domainPath ? value.domainPath + $changeUrlBackslash(value.logoPathMtext) : value.logoPathMtext) + ');'">
          </div>
        </td>
        <td class="top5PushTd" @click="goContentsDetail(value)" :class="{top5MyPushColor: GE_USER.userKey === value.creUserKey, top5MyPushColorMyInfo: $route.path==='/myPage', marginLeft: value.officialYn}">
          <div class="pushItemBox">
            <div class="pushItemName">
              <span v-html="setSendNameStr(value)" class="textOverdot fl commonBlack font12"></span>
            </div>
            <div class="pushItemTitle">
              <p v-if="value.jobkindId === 'BOAR' && !($checkUserAuth(value.shareItem).V === true || value.creUserKey === GE_USER.userKey ) && (value.titleBlindYn === true || value.titleBlindYn === 1)" :v-html="$t('LIST_MSG_ACCESS')" class="commonBlack textOverdot font15 fontBold"></p>
              <p v-else v-html="value.title" class="commonBlack textOverdot font15 fontBold widths" />
            </div>

          </div>
        </td >
          <img src="@/assets/images/channel/icon_official2.svg" class="officialImg" v-if="value.officialYn" />
          <td class="creDate">
            <span class="commonBlack mtop-01 font12 fr">{{$changeDateFormat(value.creDate)}}</span>
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
    goContentsDetail (data) {
      var param = {}
      param.targetType = 'contentsDetail'
      param.targetKey = data.contentsKey
      param.nameMtext = data.nameMtext
      param.teamKey = data.creTeamKey
      param.chanName = data.nameMtext
      param.jobkindId = data.jobkindId
      this.$emit('goContentsDetail', param)
    },
    setSendNameStr (value) {
      var nameStr = this.$changeText(value.nameMtext)
      if (value.cabinetNameMtext) {
        nameStr += ('[' + this.$changeText(value.cabinetNameMtext) + ']')
      }

      if (value.creUserName) {
        nameStr += ('(' + (value.blindYn === 1 ? 'Anonymous' : this.$changeText(value.creUserName)) + ')')
      }
      return nameStr
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['UB_USER/GE_USER']
    }
  }
}
</script>
<style scoped>
.contListTr {
  padding: 5px 0;
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: space-between;
}
.contListTd {
  padding: 5px 5px;
  width: 50px;
}
.top5PushTd {
  display: flex;
  align-items: center;
  width: calc(100% - 100px);
}
.pushItemBox {
  display: flex;
  flex-direction: column;
  align-items: start;
  text-align: left;
  width: 100%;
  padding: 2px 0;
  min-height: 25px;
}
.pushItemName {
  width: 50vw;
  overflow-x: hidden;
}
.pushItemName > span {
  width:65%;
  line-height:25px;
}
.pushItemTitle {
  width: 50vw;
  overflow: hidden;
}
.pushItemTitle > p:first-child {
  width: calc(100% - 75px);
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.pushItemTitle > p:last-child {
  width:100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
/* .top5PushListRow{display: flex; align-items: center; padding: 5px 10px; min-height: 60px;  border-bottom: 1px solid #E4E4E4;} */
/* .top5MyPushColor { background-color: #6768a712;} */
.top5MyPushColor {
  background-color: #fff;
}
.top5MyPushColorMyInfo {
  background-color: #fff !important;
}
.top5PushChanLogoImgWrap {
  width: 45px;
  height:45px;
  border-radius: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ccc;
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.top5PushChanLogoImgWrap img {
  width: 1.7rem;
  margin-right: 0.05rem;
}
.commonListTr {
  animation-name: fadein;
  animation-duration: 0.3s;
}
.commonListTr, .commonListTr td, .commonListTr th {
  height: 4rem;
  padding: 5px 10px;
}
.listHeader {
  text-align: center;
}
.listBodyRow {
  width: calc(100% - 60px) !important;
}

.marginLeft {
  margin-left:6px !important;
}
.officialImg {
  height:16px;
  padding: 1px;
  float: left;
}
.creDate {
  display:flex;
  flex-direction:column;
  align-items:end;
  width:35px;
}
</style>
