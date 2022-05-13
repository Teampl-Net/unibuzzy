
<template>
  <div>
    <table class="w-100P">
        <colgroup>
            <col class="listHeader" width="90px">
            <col width="85%" >
        </colgroup>
        <tr v-for="(value, index) in commonListData" class="commonListTr textLeft" :key="index" v-on:click="goDetail(value)" >
            <td v-if="mainYn === false">
                <img src="../../assets/images/channel/tempChanImg.png" style="width: 50px;"/>
            </td>
            <td class="textCenter" v-if="mainYn === true">
                <img src="../../assets/images/main/icon_notice2.png" style="width:1.5rem">
                <!-- <img v-if="value.readYn === true" src="../../assets/images/main/icon_notice1.png" style="width:1.5rem">
                <img else src="../../assets/images/main/icon_notice2.png" style="width:1.5rem"> -->
            </td>
            <td>
                <p v-html="value.title" class="commonBlack mtop-03 font15 fontBold" />
                <div>
                    <span v-if="changeText(value.nameMtext)" v-html="changeText(value.nameMtext)" class="mtop-05 fl commonBlack font12"/>
                    <span class="commonBlack mtop-01 font12 fr">{{this.$dayjs(value.creDate).format('YYYY-MM-DD')}}</span>
                    <!-- <div :style="'background-color:' + value2.stickerColor" v-for="(value2, index2) in value.stickerList" :key="index2" style="width: 15px; margin-top: 8px; margin-right: 5px; height: 15px;float: right;border-radius: 10px; font-size: 12px; text-align: center;">{{cutStickerName(value2.stickerName)}}</div> -->
                </div>
            </td>
            <td>
            </td>
        </tr>
    </table>
  </div>
</template>
<script>
export default {
  created () {
    // this.getContentsList()
  },
  mounted () {
    // alert(this.commonListData)
    if (this.mainYnProp === true) { this.mainYn = true }
  },
  emits: ['goDetail'],
  methods: {
    goDetail (value) {
      // alert(JSON.stringify(value))
      this.$emit('goDetail', value)
    },
    settingDateFormat (date) {
      return this.$dayjs(date).format('YYYY-MM-DD')
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
.commonListTr, .commonListTr td, .commonListTr th {height: 4rem; }
.listHeader {text-align: center;}
.listBodyRow{width: calc(100% - 60px);}
</style>
