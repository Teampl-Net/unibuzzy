<template>
    <table>
        <colgroup>
            <col width="90px">
            <col width="85%" >
        </colgroup>
        <tr class="commonListTr" v-for="(value, index) in chanList" :key="index" v-on:click="goDetail(value)">
            <td class="textCenter"><img src="../../assets/images/channel/tempChanImg.png" style="width: 50px;" alt=""></td>
            <td class="chanItem">
                <p class="font18 fontBold commonBlack" v-html="this.$makeMtextMap(value.nameMtext, 'KO')"></p>
                <p class="font15 commonBlack chanMsg" v-html="this.$makeMtextMap(value.memoMtext, 'KO')"></p>
            </td>
        </tr>
    </table>
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
  created () {
  },
  methods: {
    goDetail (chanName) {
      this.$emit('goDetail', chanName)
    }
  }
}
</script>

<style scoped>
table{
    width: 100%;
    text-align: left;
}
.chanItem{padding: 0.8rem 0.4rem}
.chanMsg{line-height: 18px;}
</style>
