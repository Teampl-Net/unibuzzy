<template>
    <div style="width: 100%; min-height: 100px; float: left; display: flex; flex-direction: column; justify-content: center; align-items: center; padding-bottom: 40px;">
        <gContentsBox :propDetailYn="false" v-for="(cont, index) in this.GE_DISP_CONTS_LIST" :key="index" :contentsEle="cont" @openPop="openPop" @makeNewContents='makeNewContents' />
        <myObserver @triggerIntersected="loadMore" id="observer" class="fl w-100P" style=""></myObserver>
    </div>
</template>

<script>
export default {
  data () {
    return {
      mOffsetInt: 0,
      mPageSize: 10,
      mAxiosQueue: [],
      mContsList: [],
      mCanLoadYn: true,
      mEndListYn: false
    }
  },
  props: {
    propUserKey: {},
    propTab: {}
  },
  methods: {
    makeNewContents (newContentData) {
      this.$emit('makeNewContents', newContentData)
    },
    openPop (openPopParam) {
      this.$emit('openPop', openPopParam)
    },
    async getMyContentsList (pageSize, offsetInput, loadingYn) {
      if (this.mAxiosQueue.length > 0 && this.mAxiosQueue.findIndex((item) => item === 'getPushContentsList') !== -1) return
      this.mAxiosQueue.push('getPushContentsList')
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.ownUserKey = this.propUserKey
      param.subsUserKey = this.propUserKey
      param.allYn = true

      if (offsetInput !== undefined && offsetInput !== null && offsetInput !== '') { param.offsetInt = offsetInput } else { param.offsetInt = this.mOffsetInt }

      if (pageSize !== undefined && pageSize !== null && pageSize !== '') { param.pageSize = pageSize } else { param.pageSize = this.mPageSize }
      var nonLoading = true
      if (loadingYn) {
        nonLoading = false
      }
      var result = await this.$getContentsList(param, nonLoading)
      var queueIndex = this.mAxiosQueue.findIndex((item) => item === 'getPushContentsList')
      this.mAxiosQueue.splice(queueIndex, 1)
      var resultList = result
      this.loadingYn = false
      return resultList
    },
    replaceArr (arr) {
      // var this_ = this
      if (!arr && arr.length === 0) return []
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex((item) => Number(item.contentsKey) === Number(current.contentsKey)) === -1) {
        /* if (data.findIndex(({ mccKey }) => mccKey === current.mccKey) === -1 && ((this_.viewMainTab === 'P' && current.jobkindId === 'ALIM') || (this_.viewMainTab === 'B' && current.jobkindId === 'BOAR'))) { */
          data.push(current)
        }
        data = data.sort(function (a, b) { // num으로 오름차순 정렬
          return b.contentsKey - a.contentsKey
          // [{num:1, name:'one'},{num:2, name:'two'},{num:3, name:'three'}]
        })
        return data
      }, [])
      return uniqueArr
    },
    async setContsList (resultList) {
      if (!resultList || resultList === '') return
      var newArr = []
      this.endListSetFunc(resultList)
      /* var cont
      var tempContentDetail
      var contentDetail */
      this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', resultList.content)
      // this.endListSetFunc(resultList)
      if (this.GE_DISP_CONTS_LIST.length > 0) {
        newArr = [
          ...this.GE_DISP_CONTS_LIST,
          ...resultList.content
        ]
      } else {
        newArr = resultList.content
      }
      this.mContsList = this.replaceArr(newArr)
      /* for (let i = 0; i < this.mContsList.length; i++) {
        cont = this.mContsList[i]

        tempContentDetail = await this.$getContentsDetail(null, cont.contentsKey, cont.creTeamKey)

        if (tempContentDetail) {
          contentDetail = tempContentDetail[0]
        } else {
          contentDetail = this.mContsList[i]
        }
        if (!contentDetail.D_MEMO_LIST) contentDetail.D_MEMO_LIST = []
        if (!cont.D_MEMO_LIST) {
          cont.D_MEMO_LIST = cont.memoList
          this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [cont])
        } else {
          // eslint-disable-next-line no-redeclare
          var newArr = [
            ...contentDetail.D_MEMO_LIST,
            ...cont.memoList
          ]
          var newList = this.replaceMemoArr(newArr)
          cont.D_MEMO_LIST = newList
          this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [cont])
        }
      } */
    },
    replaceMemoArr (arr) {
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex(({ memoKey }) => memoKey === current.memoKey) === -1) {
          data.push(current)
        }
        data = data.sort(function (a, b) { // num으로 오름차순 정렬
          return b.memoKey - a.memoKey
          // [{num:1, name:'one'},{num:2, name:'two'},{num:3, name:'three'}]
        })
        return data
      }, [])
      return uniqueArr
    },
    async loadMore (descYn) {
      console.log('this.mCanLoadYn : ' + this.mCanLoadYn + ' this.mEndListYn : ' + this.mEndListYn)
      if (this.mCanLoadYn && this.mEndListYn === false) {
        this.mCanLoadYn = false
        try {
          var resultList = await this.getMyContentsList(null, null, false)
          this.setContsList(resultList)
        } catch (e) {
          console.log(e)
        } finally {
          this.mCanLoadYn = true
        }
      } else {
      }
    },
    endListSetFunc (resultList) {
      if (resultList === undefined || resultList === null || resultList === '') return
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.mEndListYn = true
        if (this.mOffsetInt > 0) this.mOffsetInt -= 1
      } else {
        this.mEndListYn = false
        this.mOffsetInt += 1
      }
    }
  },
  created () {
    var this_ = this
    this.getMyContentsList().then((result) => {
      this_.setContsList(result)
    })
  },
  computed: {
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
    },
    GE_DISP_CONTS_LIST () {
      // console.log(this.ALIM_LIST_RELOAD_CONT)
      var idx1, idx2
      var returnContsList = []
      var chanDetail = null
      var dataList = null
      var i = 0
      if (!this.mContsList.length === 0) return []
      for (i = 0; i < this.mContsList.length; i++) {
        idx1 = this.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === this.mContsList[i].creTeamKey)
        if (idx1 === -1) {
          var this_ = this
          var teamKey = this.mContsList[i].creTeamKey
          // eslint-disable-next-line vue/no-async-in-computed-properties
          this.$addChanList(teamKey).then((res) => {
            idx1 = this_.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === teamKey)
            if (idx1 === -1) {
              returnContsList.push(this_.mContsList[i])
            } else {
              chanDetail = this_.GE_MAIN_CHAN_LIST[idx1]
              dataList = chanDetail.ELEMENTS.alimList
              idx2 = dataList.findIndex((item) => item.contentsKey === this_.mContsList[i].contentsKey)
              // eslint-disable-next-line vue/no-side-effects-in-computed-properties
              // this.mainBoardList[i] = chanDetail.ELEMENTS.boardList
              if (idx2 !== -1) {
                this.mContsList[i] = dataList[idx2]
                returnContsList.push(dataList[idx2])
              } else {
                returnContsList.push(this_.mContsList[i])
              }
            }
          })
        } else {
          chanDetail = this.GE_MAIN_CHAN_LIST[idx1]
          dataList = chanDetail.ELEMENTS.alimList
          idx2 = dataList.findIndex((item) => item.contentsKey === this.mContsList[i].contentsKey)
          if (idx2 !== -1) {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.mContsList[i] = dataList[idx2]
            returnContsList.push(dataList[idx2])
          } else {
            returnContsList.push(this.mContsList[i])
          }
        }
      }
      return this.replaceArr(returnContsList)
    }
  }

}
</script>

<style scoped>

</style>
