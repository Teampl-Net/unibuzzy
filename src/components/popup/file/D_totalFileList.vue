<template>
  <div @click="click" id="fileBoxWrap"  style="width: 100%; height: 100%; padding: 10px; background-color: #dcddeb;" :style="'padding-top:' + (this.$STATUS_HEIGHT + 60)+ 'px;'">
    <div style="width: 100%; background-color: #FFF; height: 140px; padding: 10px 0 10px 10px; border-radius: 0.8rem; display: flex; flex-direction: column; justify-content: space-between;">
      <div v-if="this.mMainChanList" style="width: 100%; height: 30px; float: left;">
        <img src="../../../assets/images/main/main_followIcon2.png" style="float: left; margin-right: 8px;" class="img-w23 cursorP" alt="">
        <p class="font20 fontBold deepBorderColor textLeft CDeepColor" style="line-height: 26px;">채널</p>
      </div>
      <div v-if="this.mMainChanList" style="width: 100%; height: 85px; float: left; overflow: scroll hidden;">
        <div style="height: 100%; min-width: 100%; display:flex;">
          <div style="border: 0.5px solid rgba(0, 0, 0, 0.1); width: 65px; height: 65px; border-radius: 100%; float: left;">

          </div>
          <chanRoundIcon :chanElement="chan" v-for="(chan, index) in this.mMainChanList" :key="index"/>
          <template v-if="this.mMainChanList.length === 0">
              <circleSkeleton v-for="(value) in 10" :key="value"/>
          </template>
        </div>
      </div>
    </div>

    <div style="width: 100%; height: calc(100% - 150px); overflow: auto; margin-top: 10px;" v-if="fileList.length > 0">
      <template v-for="(date, index) in dateList" :key="index">
        <div class="textLeft fontBold font14 attachFileBg" style="width: fit-content; padding: 0px 8px; border-radius: 5px; margin-top: 20px; color: #fff;">{{ date }}</div>
        <div style="width: 98%; margin-left: 2%; margin-top: 8px;">
          <template v-for="(cont, index) in fileList" :key="index">
            <gFileBox listType="T" :contentsEle="cont" :key="index" v-if="$changeDateFormat(cont.contents.creDate) === date"/>
          </template>
        </div>
        <myObserver v-if="index === this.fileList.length - 5" @triggerIntersected="loadMore" id="observer" class="fl w-100P" style=""></myObserver>
      </template>
    </div>
    <gEmpty contentName="파일함" v-else class="mtop-2"/>
  </div>
</template>

<script>
import chanRoundIcon from '../../pageComponents/main/D_chanRoundIcon.vue'
import circleSkeleton from '../../pageComponents/main/D_mainChanCircleSkeleton.vue'
export default {
  name: 'App',
  components: {
    chanRoundIcon,
    circleSkeleton
  },
  created () {
    this.getContentsList()
    this.getAllFileList()
  },
  data () {
    return {
      mMainChanList: [],
      fileList: [],
      dateList: []
    }
  },
  watch: {
    fileList: {
      immediate: true,
      handler (value, old) {
        this.setDateList()
      },
      deep: true
    }
  },
  methods: {
    async getAllFileList () {
      const paramMap = new Map()
      paramMap.set('ownUserKey', this.GE_USER.userKey)
      paramMap.set('pageSize', 30)
      paramMap.set('offsetInt', 0)
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.getMyFileList',
        param: Object.fromEntries(paramMap)
      })
      console.log(result)
      var resultFileList = result.data.content.filter((item) => {
        return item.contents
      })
      this.fileList = resultFileList
    },
    async getContentsList () {
      var paramMap = new Map()
      paramMap.set('userKey', this.GE_USER.userKey)
      var nonLoading = true

      var resultList = await this.$getTeamList(paramMap, nonLoading)
      this.mMainChanList = resultList.data.content
      var newArr = []
      for (var i = 0; i < this.mMainChanList.length; i++) {
        if (!this.$getDetail('TEAM', this.mMainChanList[i].teamKey) || this.$getDetail('TEAM', this.mMainChanList[i].teamKey).length === 0) {
          newArr.push(this.mMainChanList[i])
        }
      }
      if (newArr.length > 0) {
        this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', newArr)
      }
    },
    setDateList () {
      var newArr = []
      var idx
      for (var i = 0; i < this.fileList.length; i++) {
        idx = newArr.indexOf(this.$changeDateFormat(this.fileList[i].contents.creDate))
        if (idx === -1) {
          newArr.push(this.$changeDateFormat(this.fileList[i].contents.creDate))
        }
      }
      this.dateList = newArr
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  }
}
</script>
