
<template>
  <table class="w-100P">
            <colgroup>
                <col width="15%">
                <col width="85%">
            </colgroup>
            <tr v-for="(value, index) in commonListData" class="commonListTr textLeft" :key="index" v-on:click="goDetail(value)" >
                <td v-if="mainYn === false">
                    <img :src="value.chanImg"/>
                </td>
                <td v-if="mainYn === true">
                    <img v-if="value.readYn === true" src="../../assets/images/main/icon_notice1.png" style="width:1.5rem">
                    <img v-if="value.readYn === false" src="../../assets/images/main/icon_notice2.png" style="width:1.5rem">
                </td>
                <td>
                    <p v-html="value.title" class="commonBlack font15 fontBold" />
                    <div>
                        <sapn v-html="value.chanName" class="mtop-05 fl commonBlack font12"/>
                        <sapn class="commonBlack mtop-05 font12 fr">{{settingDateFormat(value.recvDate * 1000)}}</sapn>
                        <div :style="'background-color:' + value2.stickerColor" v-for="(value2, index2) in value.stickerList" :key="index2" style="width: 15px; margin-top: 8px; margin-right: 5px; height: 15px;float: right;border-radius: 10px; font-size: 12px; text-align: center;">{{cutStickerName(value2.stickerName)}}</div>
                    </div>
                </td>
                <td>
                </td>
            </tr>
        </table>
</template>
<script>
export default {
  mounted () {
    if (this.mainYnProp === true) { this.mainYn = true }
  },
  methods: {
    goDetail (value) {
      this.$emit('goDetail', value)
    },
    settingDateFormat (date) {
      return this.changeDateFormat(date, 'list')
    },
    cutStickerName (value) {
      var cutName = value.substr(0, 1)
      return cutName
    }
  },
  data: function () {
    return { // 데이터 정의
      mainYn: false
    }
  },
  props: {
    commonListData: {},
    clickEvnt: {},
    mainYnProp: Boolean
  },
  computed: {
  }
}
</script>
<style scoped>
.commonListTr, .commonListTr td, .commonListTr th {height: 4rem; }

</style>
