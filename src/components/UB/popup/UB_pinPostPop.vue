<template>
  <div style="background: #fff; width: 80%; height: 60%; position: absolute; left: 10%; top: 20%; z-index: 9999; padding: 10px 20px 20px; border-radius: 20px;">
    <div class="headerShadow font20 fontBold" style="height: 40px; color: #6768a7; position: relative;">
      Pin a Post
      <img @click="pClosePop" style="width: 20px; position: absolute; top: 5px; right: 0;" class="cursorP" src="@/assets/images/common/popup_close.png">
    </div>
    <div style="padding-top: 10px; overflow: auto; height: calc(100% - 80px);" class="commonBoardListWrap" ref="commonBoardListWrapCompo">
      <div class="font12 CDeepColor textLeft" style="margin-bottom: 10px;">
        You can pin down important posts and show them at the top.
      </div>
      <div class="w100P fl commonBoardListContentBox" style="height:1px;" />
      <template  v-if="mCabContentsList && mCabContentsList.length > 0">
        <div class="w100P" style="height: 45px; margin-bottom: 10px;" v-for="(cont) in mCabContentsList" :key="cont.contentsKey">
          <div class="w100P" style="display: flex; align-items: center;">
            <div id="chanAlimListBG" ref="chanAlimListBG" class="chanImgRound" :style="'background-image: url(' + (cont.domainPath? cont.domainPath + cont.logoPathMtext : cont.logoPathMtext) + ');'" style="margin-right: 10px; width: 30px; height: 30px; background-repeat: no-repeat; background-size: cover; background-position: center;"></div>
            <div style="width: calc(100% - 100px);">
              <p class="w100P fontBold font16 textOverDot textLeft">{{ cont.title }}</p>
              <div class="font12" style="display: flex; align-items: center;">
                <p class="textOverdot" style="max-width: calc(100% - 75px);">{{ $changeText(cont.creUserName) }}</p>
                <p class="textLeft" style="width: 65px; margin-left: 10px;">{{ $changeSimpleDateFormat(cont.creDate) }}</p>
              </div>
            </div>
            <div style="width: 60px;">
              <gBtnSmall v-if="getPinYn(cont)" style="font-size: 12px; padding: 0 10px;" btnTitle="Pinned" @click="setPinBoard(true, cont)" />
              <gBtnSmall v-else class="CWhiteGrayBgColor CWDeepGrayColor" style="font-size: 12px;" btnTitle="Pin" @click="setPinBoard(false, cont)" />
            </div>
          </div>
        </div>
        <myObserver @triggerIntersected="loadMore" id="observer" class="fl w100P" style=""></myObserver>
      </template>
      <gEmpty v-else-if="mCabContentsList.length === 0" tabName="최신" contentName="게시판" option='EDIT' />
    </div>
    <div class="w100P" style="height: 40px; display: flex; align-items: center; gap: 10px; justify-content: center;">
      <gBtnSmall style="font-size: 12px;" btnTitle="OK" @click="pClosePop" />
    </div>
  </div>
</template>

<script>
export default {
  created () {
    console.log('12341234')
    console.log(this.pTVList)
    this.getContentsList().then((result) => {
      this.mCabContentsList = result.content
    })
  },
  components: {
  },
  data () {
    return {
      mCabContentsList: [],
      endListYn: false,
      offsetInt: 0
    }
  },
  props: {
    pChanDetail: {},
    pBoardDetail: {},
    pClosePop: Function,
    pTVList: Array,
    pUpdateTopview: Function
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  },
  methods: {
    async setPinBoard (pinYn, board) {
      let result = {}
      if (pinYn) {
        result = await this.$commonAxiosFunction({
          url: 'https://www.unibuzzy.com/sUniB/tp.deleteTopview ',
          param: {
            tvKey: board.tvKey
          }
        })
        if (result.data.result) {
          board.tvKey = result.data.tvKey
          this.pUpdateTopview('delete', board)
        }
      } else {
        const param = {
          topview: {
            cabinetKey: board.cabinetKey,
            targetKind: 'C',
            targetKey: board.contentsKey,
            priority: 0,
            creUserKey: this.GE_USER.userKey
          }
        }
        result = await this.$commonAxiosFunction({
          url: 'https://www.unibuzzy.com/sUniB/tp.saveTopview',
          param: param
        })
        if (result.data.result) {
          board.tvKey = result.data.tvKey
          this.pUpdateTopview('add', board)
        }
      }
    },
    getPinYn (board) {
      if (!this.pTVList) {
        return false
      }
      const index = this.pTVList.findIndex(item => {
        return item.contentsKey === board.contentsKey
      })
      if (index !== -1) {
        return true
      } else {
        return false
      }
    },
    async getContentsList (pageSize, offsetInput) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      /* if (this.chanDetailKey !== undefined && this.chanDetailKey !== null && this.chanDetailKey !== '') {
        param.creTeamKey = this.chanDetailKey
      } */
      this.$emit('closeLoading')
      if (!this.mPropParams) {
        param.cabinetKey = this.$route.params.targetKey
      } else {
        param.cabinetKey = this.mPropParams.targetKey
      }
      if (this.offsetInt === 0 && this.mCabContentsList && this.mCabContentsList.length > 0) this.offsetInt += 1
      param.offsetInt = this.offsetInt
      if (offsetInput !== undefined) {
        param.offsetInt = offsetInput
      // } else {
        // param.offsetInt = this.offsetInt
      }
      console.log(param.offsetInt)
      if (pageSize) {
        param.pageSize = pageSize
      } else {
        pageSize = 10
      }

      param.jobkindId = 'BOAR'

      if (this.readCheckBoxYn) {
        param.findLogReadYn = false
      }
      if (this.mOnlyMineYn) {
        param.creUserKey = this.GE_USER.userKey
        param.ownUserKey = this.GE_USER.userKey
      }

      var resultList = await this.$getContentsList(param)
      if (this.viewTab === 'N') {
        this.totalElements = resultList.totalElements
      }
      for (var i = 0; i < resultList.length; i++) {
        // resultList.
      }
      // this.$emit('changePageHeader', resultList.cabinetNameMtext)

      return resultList
    },
    replaceArr (arr) {
      if (!arr || arr.length === 0) return
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex(({ mccKey }) => mccKey === current.mccKey) === -1) {
          data.push(current)
        }
        data = data.sort(function (a, b) { // num으로 오름차순 정렬
          return b.mccKey - a.mccKey
          // [{num:1, name:'one'},{num:2, name:'two'},{num:3, name:'three'}]
        })
        return data
      }, [])
      return uniqueArr
    },
    async loadMore (pageSize) {
      if (this.endListYn === false) {
        if (this.mCabContentsList && (!this.pBoardDetail.totalContentsCount > this.mCabContentsList.length)) return

        var resultList = await this.getContentsList()
        if (!resultList) {
          resultList = {}
          resultList.content = []
        }
        this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', resultList.content)

        // const newArr = [
        //   ...this.CAB_DETAIL.boardList,
        //   ...resultList.content
        // ]

        // 더 불러온 컨텐츠에 D_MEMO_LIST가 없어 넣어주고 있음
        const newArr = [
          ...this.mCabContentsList,
          ...resultList.content
        ]

        var uniqueArr = this.replaceArr(newArr)
        var tempCabData = this.pBoardDetail
        // tempCabData.boardList
        this.mCabContentsList = uniqueArr
        if (this.viewTab === 'N') {
          tempCabData.totalContentsCount = resultList.totalElements
        }
        console.log(resultList)
        if (!resultList || resultList === '') {
          this.endListYn = false
        } else {
          if (resultList.pageable) {
            if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
              this.endListYn = true
            } else {
              this.offsetInt += 1
              this.endListYn = false
            }
          }
        }
      } else {
      }
    }
  }
}
</script>

<style scoped>
</style>
