<template>
    <admHeader/>
    <div class="admRouterMainWrap">
        <div style="height: 100%; width: 100%; overflow-x: hidden; overflow-y: scroll;">
          <router-view />
        </div>
    </div>
</template>

<script>
import admHeader from '../../../components/layout/admLayout/TalAdm_gHeader.vue'

export default {
  components: {
    admHeader
  },
  data () {
    return {
      chanDetail: []
    }
  },
  props: {
    teamKey: {}
  },
  created () {
    // localStorage.setItem('teamKey')
    // this.getChannelList()
  },
  methods: {
    /* async getChannelList () {
      if (localStorage.getItem('sessionUser') !== undefined && localStorage.getItem('sessionUser') !== null && localStorage.getItem('sessionUser') !== '') {
        var paramMap = new Map()
        // alert(Number((location.href.split('?')[1]).split('#')[0]))
        // alert(this.teamKey)
        paramMap.set('userKey', this.$changeText(JSON.parse(localStorage.getItem('sessionUser')).userKey))
        paramMap.set('teamKey', this.teamKey)
        paramMap.set('followerType', 'M')
        var resultList = await this.$getTeamList(paramMap)
        this.chanDetail = resultList.content[0]
        localStorage.setItem('sessionTeam', JSON.stringify(this.chanDetail))
      }
      // this.$emit('closeLoading')
    } */
  }
}
</script>
<style scoped>
.admRouterMainWrap{width: 1290px; height: calc(100vh - 3.7rem); margin: 0 auto; position: relative; padding-top: 90px; overflow: hidden;}
@media screen and (max-width:1290px) {
    .admRouterMainWrap {width: 100vw;}
}
</style>
