<template>
    <gPageTitle class="pleft-2 mobileNone" titleText="보낸알림" @clickEvnt = "previewChan" />
    <div class="leftPage">
        <div  class="chanMainWrap">
            <chanAlimList @openPop="openPushDetailPop" class="pcNone" :chanDetail="this.chanParam" />
            <chanDetailComp class="mobileNone"  :chanDetail="chanDetail" />
            <!-- <chanAlimList :chanDetail="this.chanDetail" /> -->
        </div>
    </div>
    <div class="rightPage">
        <pushList :chanDetailKey="chanDetail.teamKey" />
    </div>
</template>

<script>
import gPageTitle from '../../../components/unit/admUnit/TalAdm_gPageTitle.vue'
import chanDetailComp from '../../../components/pageComponents/channel/Tal_chanDetail.vue'
import chanAlimList from '../../../components/pageComponents/channel/D_chanAlimList.vue'
import pushList from '../../../pages/routerPages/Tal_pushList.vue'
export default {
  components: {
    gPageTitle,
    chanAlimList,
    chanDetailComp,
    pushList
  },
  props: {
  },
  created () {
    var teamInfo = localStorage.getItem('sessionTeam')
    this.chanDetail = JSON.parse(teamInfo)
    var teamKey = JSON.parse(teamInfo).teamKey
    // eslint-disable-next-line vue/no-mutating-props
    this.chanParam.targetKey = teamKey
  },
  data () {
    return {
      chanParam: {},
      chanDetail: {}
    }
  },
  methods: {
    openPushDetailPop (param) {
      this.$emit('openPop', param)
    }
  }
}
</script>
<style scoped>
.leftPage {width: 50%; height: 100%; position: relative; float: left; padding: 20px 20px;}
.rightPage {width: 50%; height: 100%; position: relative; float: left; padding: 0 20px;}
.chanMainWrap{width: 100%; height: 100%; border: 1px solid #ccc; border-radius: 15px;  overflow: hidden;}
@media screen and (max-width:730px) {
    .leftPage, .rightPage {width: 100%; padding: 0}
    .chanMainWrap {border: none; border-radius: 0;}
}
</style>
