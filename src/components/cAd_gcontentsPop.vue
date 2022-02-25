<template>
    <div class="contentsPopWrap">
        <div class="contentsCard">
            <popHeader headerTitleText="수신확인"/>
            <div class="popBody">
                <div style="width: 100%;min-height: 2rem; margin-bottom: 1rem;">
                    <gWhiteSelect defaltText="전체" class="mright-05 fl" />
                    <gWhiteButton btnName="알림보내기" class="fl mright-05" />
                    <gSearchBox class="fr" />
                </div>
                <readTable style="height: calc(100% - 50px); " :recvList="this.recvList" />
            </div>
            <div class="popFooter">
                <gButton @click="this.$emit('closePop')" btnName="확인" />
            </div>
        </div>
    </div>
</template>

<script>
import readTable from './cAd_readTable.vue'
export default {
  data () {
    return {
      recvList: [
        { key: 0, name: '김철수', imgUrl: 'https://via.placeholder.com/50', groupName: '교직원', readDate: '2022.02.02' },
        { key: 0, name: '김철수', imgUrl: 'https://via.placeholder.com/50', groupName: '교직원', readDate: '2022.02.02' },
        { key: 0, name: '김철수', imgUrl: 'https://via.placeholder.com/50', groupName: '교직원', readDate: '2022.02.02' },
        { key: 0, name: '김철수', imgUrl: 'https://via.placeholder.com/50', groupName: '교직원', readDate: '2022.02.02' },
        { key: 0, name: '김철수', imgUrl: 'https://via.placeholder.com/50', groupName: '교직원', readDate: '2022.02.02' },
        { key: 0, name: '김철수', imgUrl: 'https://via.placeholder.com/50', groupName: '교직원', readDate: '2022.02.02' },
        { key: 0, name: '김철수', imgUrl: 'https://via.placeholder.com/50', groupName: '교직원', readDate: '2022.02.02' },
        { key: 0, name: '김철수', imgUrl: 'https://via.placeholder.com/50', groupName: '교직원', readDate: '2022.02.02' },
        { key: 0, name: '김철수', imgUrl: 'https://via.placeholder.com/50', groupName: '교직원', readDate: '2022.02.02' },
        { key: 0, name: '김철수', imgUrl: 'https://via.placeholder.com/50', groupName: '교직원', readDate: '2022.02.02' },
        { key: 0, name: '김철수', imgUrl: 'https://via.placeholder.com/50', groupName: '교직원', readDate: '2022.02.02' },
        { key: 0, name: '김철수', imgUrl: 'https://via.placeholder.com/50', groupName: '교직원', readDate: '2022.02.02' }
      ]
    }
  },
  components: {
    readTable
  }
}
</script>

<style scoped>
.contentsPopWrap{position: fixed; width: 100%; height: 100%; top: 0; left: 0; z-index: 9999;}
.contentsCard{width: 400px; height: 555px; border-radius: 10px; background: #FFFFFF; position: absolute; z-index: 9999; top: 25%; left: 25%; box-shadow: rgb(0 0 0 / 16%) 0px 0px 13px 2px;}
</style>
