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
  <div style="width: 100%; height: 100%; float: left">
    <table class="w-100P">
      <colgroup>
        <col class="listHeader" style="width: 50px; float: left;">
        <col style="width: calc(100% - 50px); margin-left: 10px; float: left;">
      </colgroup>
      <template v-for="(value, index) in propContentsList" :key="index">
        <tr v-if="index < 5" class="commonListTr textLeft " :style="index === propContentsList.length - 1 ? 'border: none!important;' : ''" >
            <td style="padding: 5px 5px; width: 50px;" :class="{top5MyPushColor: this.GE_USER.userKey === value.creUserKey}">
            <div v-if="value.logoPathMtext" class="top5PushChanLogoImgWrap fl" @click="goChanDetail(value)"  :style="'background-image: url(' + (value.logoPathMtext ? value.domainPath + value.logoPathMtext : value.logoPathMtext) + ');'" style="background-repeat: no-repeat; background-size: cover; background-position: center; position: relative;"></div>
            <div v-else-if="value.userProfileImg" class="top5PushChanLogoImgWrap fl" @click="goUserProfile(value.userKey)"  :style="'background-image: url(' + (value.domainPath ? value.domainPath + value.userProfileImg : value.userDomainPath + value.userProfileImg) + ');'" style="background-repeat: no-repeat; background-size: cover; background-position: center; position: relative;"></div>
            </td>
            <td @click="goChanDetail(value)" :class="{top5MyPushColor:  this.GE_USER.userKey === value.creUserKey}">
            <div style="width:100%; float: left; padding: 2px 0 ; min-height: 25px;">
                <div v-if="value.jobkindId === 'ALIM'" class="font14 fl" style="margin-top: 0.5px; min-width: 30px; padding: 0 5px; min-height: 20px;  margin-right: 5px; border-radius: 10px; background:#879dc9; color: #FFF; ">{{$t('COMMON_TAB_NOTI')}}</div>
                <div v-else-if="value.jobkindId === 'BOAR'" class="font14 fl" style="margin-top: 0.5px; min-width: 30px; padding: 0 5px; min-height: 20px;  margin-right: 5px; border-radius: 10px; background:#FFF; color: #879dc9; font-weight: bold; border: 1px solid #879dc9  ">{{$t('COMMON_TAB_POST')}}</div>
                <div v-else-if="value.jobkindId === 'TODO'" class="font14 fl" style="margin-top: 0.5px; min-width: 30px; padding: 0 5px; min-height: 20px;  margin-right: 5px; border-radius: 10px; background:#FFF; color: #879dc9; font-weight: bold; border: 1px solid #879dc9  ">{{$t('COMMON_TAB_TODO')}}</div>
                <div v-else class="font14 fl" style="margin-top: 0.5px; min-width: 30px; padding: 0 5px; min-height: 20px;  margin-right: 5px; border-radius: 10px; background:#FFF; color: #879dc9; font-weight: bold; border: 1px solid #879dc9  ">{{$t('COMM_TITLE_ELSE')}}</div>

                <p v-if="value.jobkindId === 'BOAR' && !(this.$checkUserAuth(value.shareItem).V === true || value.creUserKey === this.GE_USER.userKey ) && (value.titleBlindYn === true || value.titleBlindYn === 1)" :v-html="$t('LIST_MSG_ACCESS')" class="commonBlack textOverdot font15 fontBold" style="width: calc(100% - 75px); display: inline-block; white-space: nowrap; text-overflow: ellipsis;overflow: hidden;" />
                <p v-else class="commonBlack textOverdot font15 fontBold" style="width: calc(100% - 75px); display: inline-block; white-space: nowrap; text-overflow: ellipsis;overflow: hidden;">
                  {{ value.title }}
                </p>
            </div>
            <img src="../../assets/images/channel/icon_official2.svg" v-if="value.officialYn" style=" height:16px; padding: 1px; margin-right: 3px; float: left;" />
            <span v-if="value.jobkindId !== 'TODO'" style="max-width: 75%;" v-html="setSendNameStr(value)" class="textOverdot fl commonBlack font12"></span>
            <span v-if="value.jobkindId === 'TODO' && !value.logItemListStr" style="max-width: 75%;" class="textOverdot fl commonBlack font12">{{ $t('COMMON_NAME_TODOLIST') + '(' + $changeText(value.workUserName) + ')'}}</span>
            <!-- <span v-if="value.showCreNameYn" v-html="')'" class="fl commonBlack font12"></span> -->
            <span style="max-width: 75%;" class="fl commonBlack font13" v-html="value.dispText"></span>
            <span class="commonBlack mtop-01 font12 fr">{{this.$changeDateFormat(value.creDate)}}</span>
            </td>
        </tr>
      </template>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    propContentsList: [],
    isAlim: Boolean
  },
  data () {
    return {
      newPropContentsList: []
    }
  },
  updated () {
  },
  created () {
    // console.log('propContentsListpropContentsListpropContentsList', this.propContentsList)
  },
  methods: {
    async goUserProfile (targetUserKey) {
      if (this.GE_USER.unknownYn) {
        this.$showToastPop(this.$t('COMM_MSG_MEMB_NEED'))
        return
      }
      var openPopParam = {}
      openPopParam.targetType = 'bookMemberDetail'
      openPopParam.userKey = targetUserKey
      openPopParam.popHeaderText = this.$t('COMMON_TITLE_PROFILE')
      openPopParam.readOnlyYn = true

      console.log('openPopParam', openPopParam)
      this.$emit('openPop', openPopParam)
    },
    goChanDetail (data) {
      console.log('data', data)
      var param = {}
      if (data && data.bundleCode && data.bundleCode === 'ADD_FOLL' && data.targetKind === 'U') {
        console.log('????')
        param.targetType = 'followList'
        param.popHeaderText = this.$t('COMMON_NAME_MY_ADDERSS')
      } else if (data && data.bundleCode && data.bundleCode === 'ADD_FOLL' && data.targetKind === 'T') {
        param.targetType = 'chanDetail'
        param.teamKey = data.targetKey
        param.chanName = data.title
      } else if (data && data.targetKind === 'C') {
        param.targetType = 'contentsDetail'
        param.targetKey = data.contentsKey | data.targetKey
        param.nameMtext = data.nameMtext
        param.teamKey = data.creTeamKey
        param.chanName = data.nameMtext
        // param.targetContentsKey = data.contentsKey
        param.jobkindId = data.jobkindId
      }
      this.$emit('goChanDetail', param)
    },
    resizeText (text, name) {
      if (!text) return '[' + this.$changeText(name) + `] ${this.$t('COMMON_TITLE_NOTITLE')}`
      return text
    },
    setSendNameStr (value) {
      var nameStr = this.$changeText(value.nameMtext)
      if (value.cabinetNameMtext) {
        nameStr += ('[' + this.$changeText(value.cabinetNameMtext) + ']')
      }

      if (value.creUserName) {
        nameStr += ('(' + (value.blindYn === 1 ? this.$t('COMMON_NAME_UNKNOWN') : this.$changeText(value.creUserName)) + ')')
      }
      return nameStr
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    GE_LOCALE () {
      return this.$i18n.locale
    }
  }
}
</script>
<style scoped>
/* .top5PushListRow{display: flex; align-items: center; padding: 5px 10px; min-height: 60px;  border-bottom: 1px solid #E4E4E4;} */
.top5MyPushColor { background-color: #879dc912;}
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
