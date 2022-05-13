<template>
    <gPageTitle class="pleft-2" titleText="보낸알림" @clickEvnt = "previewChan" />
    <div class="leftPage">
        <div style="width: 100%; height: 100%; border: 1px solid #ccc; border-radius: 15px;  overflow: hidden;">
            <chanAlimList class="pcNone" :chanDetail="this.chanParam" />
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
import chanDetailComp from '../../../components/commonPopup/components/Tal_chanDetail.vue'
import chanAlimList from '../../../components/commonPopup/components/Tal_chanAlimList.vue'
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
    var teamInfo = JSON.parse(localStorage.getItem('sessionTeam'))
    this.chanDetail = teamInfo
    var teamKey = teamInfo.teamKey
    // eslint-disable-next-line vue/no-mutating-props
    this.chanParam.targetKey = teamKey
  },
  data () {
    return {
      chanParam: [],
      chanDetail: []
    }
  }
}
</script>
<style scoped>
.leftPage {width: 50%; height: 100%; position: relative; float: left; padding: 20px 20px;}
.rightPage {width: 50%; height: 100%; position: relative; float: left; padding: 0 20px;}
.pcNone{display: none;}
.mobileNone {display: block;}
@media screen and (max-width:730px) {
    .leftPage, .rightPage {width: 100%;}
    .mobileNone{display: none;}
    .pcNone {display: block;}
}
</style>
