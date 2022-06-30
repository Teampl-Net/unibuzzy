
<template>
    <table class="w-100P">
        <colgroup>
            <col class="listHeader" style="width: 65px; float: left;">
            <col style="width: calc(100% - 45px); margin-left: 10px; float: left;">
        </colgroup>
        <tr v-for="(value, index) in commonListData" class="commonListTr textLeft" :key="index" v-on:click="goDetail(value)" >
            <td v-if="mainYn === true" style="padding: 5px 10px; margin-right: 10px; width: 65px;">
              <div class="chanLogoImgWrap fl" style=""><img alt="채널 프로필이미지" class="" :src="value.logoPathMtext"></div>
            </td>
            <!-- <td class="textCenter" v-if="mainYn === true"> -->
                <!-- <img src="../../assets/images/main/icon_notice2.png" style="width:1.5rem"> -->
                <!-- <img v-if="value.readYn === true" src="../../assets/images/main/icon_notice1.png" style="width:1.5rem">
                <img else src="../../assets/images/main/icon_notice2.png" style="width:1.5rem"> -->
            <!-- </td> -->
            <td>
                <p v-html="resizeText(value.title, value.nameMtext)" class="commonBlack mtop-03 font15 fontBold" style="width: 180px;" />
                <div>
                    <span v-if="changeText(value.nameMtext)" v-html="changeText(value.nameMtext)" class="fl commonBlack font12"/>
                    <span class="commonBlack mtop-01 font12 fr">{{this.$changeDateFormat(value.creDate)}}</span>
                    <!-- <div :style="'background-color:' + value2.stickerColor" v-for="(value2, index2) in value.stickerList" :key="index2" style="width: 15px; margin-top: 8px; margin-right: 5px; height: 15px;float: right;border-radius: 10px; font-size: 12px; text-align: center;">{{cutStickerName(value2.stickerName)}}</div> -->
                </div>
            </td>
        </tr>
    </table>
</template>
<script>
export default {

  mounted () {
    if (this.mainYnProp === true) { this.mainYn = true }
  },
  emits: ['goDetail'],
  methods: {
    resizeText (text, name) {
      if (text) {
        if (text.length > 15) {
          text = text.substr(0, 15)
          text += '...'
        }
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
    changeText (text) {
      var changeTxt = ''
      // changeTxt = new Promise(this.$makeMtextMap(text, 'KO'))
      changeTxt = this.$makeMtextMap(text, 'KO')
      return changeTxt
      // if (changeTxt !== undefined) { return changeTxt }
    }
  },
  data: function () {
    return { // 데이터 정의
      mainYn: false
    }
  },
  props: {
    clickEvnt: {},
    mainYnProp: Boolean,
    commonListData: []
  },
  computed: {
  }
}
</script>
<style scoped>
/* .top5PushListRow{display: flex; align-items: center; padding: 5px 10px; min-height: 60px;  border-bottom: 1px solid #E4E4E4;} */

.chanLogoImgWrap {width: 45px; height:45px; border-radius: 45px; display: flex; align-items: center; justify-content: center; border: 2px solid #ccc;}
.chanLogoImgWrap img{width: 1.7rem; margin-right: 0.05rem;}
.commonListTr{
animation-name: fadein;
animation-duration: 0.3s;
}
.commonListTr, .commonListTr td, .commonListTr th {height: 4rem; }
.listHeader {text-align: center;}
.listBodyRow{width: calc(100% - 60px);}
</style>
