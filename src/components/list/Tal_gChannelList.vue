<template>
    <table>
        <colgroup>
            <col width="20%">
            <col width="80%">
        </colgroup>
        <tr class="commonListTr" v-for="(value, index) in chanList" :key="index" v-on:click="goDetail(value)">
            <td><img src="http://placehold.it/50" alt=""></td>
            <td class="chanItem">
                <p class="font18 fontBold commonBlack" v-html="value.chanName"></p>
                <p class="font15 commonBlack chanMsg" v-html="value.chanMsg"></p>
            </td>
        </tr>
    </table>
</template>

<script>
export default {
  props: {
    chanList: {}
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
