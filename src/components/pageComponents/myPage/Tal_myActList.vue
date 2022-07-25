<template>
  <!-- 내가 쓴 / 내가 댓글 단 / 내 like / 내 star -->
  <div class="w-100P h-100P pagePaddingWrap" style="overflow: hidden scroll;">
    <div style="width: 100%; height: 50px; line-height: 50px;" class="fontBold font20">{{myActTitle}}</div>
    <div class="myActTabList" style="height: calc(100% - 50px); width: 20%; float: left;">
      <div @click="myActTabClick(tab, index)" id="myActTabId" v-for="(tab, index) in myActTabList" :key="index" class="myActTab">{{tab.name}}</div>
    </div>
    <div style="height: calc(100% - 50px); width: 80%; float: left;">
      <myActContentList :myActTabType="this.myActTabType" :myActContentsList="this.myActContentsList" />
    </div>
  </div>
</template>
<script>
import myActContentList from './Tal_myActContentsList.vue'
export default {
  data () {
    return {
      myActTitle: '내가 쓴 게시글',
      myActTabType: 'myWriteBoard',
      offsetInt: 0,
      myActContentsList: [],
      endListYn: false,
      myActTabList: [{ myActTabType: 'myWriteBoard', name: '내가 쓴' }, { myActTabType: 'myCommentBoard', name: '내가 댓글 단' },
        { myActTabType: 'myLikeBoard', name: '내가 좋아한' }, { myActTabType: 'myStarBoard', name: '내가 스크랩한' }]
    }
  },
  async created () {
    this.getMyActContentsList()
  },
  methods: {
    // async loadMore (pageSize) {
    //   var resultList = await this.getMyActContentsList()
    //   this.myActContentsList = resultList.content
    //   if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
    //     this.endListYn = true
    //   } else {
    //     this.offsetInt += 1
    //     this.endListYn = false
    //   }
    // },
    async getMyActContentsList (pageSize, offsetInput) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      // param.offsetInt = this.offsetInt
      // if (offsetInput !== undefined) {
      //   param.offsetInt = offsetInput
      // }
      // if (pageSize) {
      //   param.pageSize = pageSize
      // } else {
      //   pageSize = 10
      // }
      param.jobkindId = 'BOAR'
      param.creUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      if (this.myActTabType === 'myLikeBoard') {
        param.findActYn = true
        param.findActLikeYn = true
      } else if (this.myActTabType === 'myStarBoard') {
        param.findActYn = true
        param.findActStarYn = true
      }
      var resultList = await this.$getContentsList(param)
      this.myActContentsList = resultList.content
      console.log('this.myActContentsList')
      console.log(this.myActContentsList)
    },
    async myActTabClick (tab, index) {
      this.myActTabType = tab.myActTabType
      this.myActTitle = tab.name + ' 게시글'
      var element = document.getElementsByClassName('myActTab')[index]
      element.style.backgroundColor = '#6768A7'
      element.style.color = '#fff'
      await this.getMyActContentsList()
    }
  },
  components: {
    myActContentList
  }
}
</script>
<style>
.myActTab {width: 100%; height: 60px; float: left; border: 1px solid #ccc;}
</style>
