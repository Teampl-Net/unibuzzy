<template>
    <div style="width: 100%; min-height: 100px; float: left; display: flex; flex-direction: column; justify-content: center; align-items: center; padding-bottom: 40px; " :key="mReloadKey">
        <template v-for="(cont, index) in this.GE_DISP_CONTS_LIST" :key="index" >
            <gContentsBox :imgClickYn="true" :propDetailYn="false" :contentsEle="cont" @openPop="openPop" :propContIndex='index' @contDelete='contDelete'  />
            <myObserver v-if="this.GE_DISP_CONTS_LIST.length > 5 ?  index === this.GE_DISP_CONTS_LIST.length - 5 : index === this.GE_DISP_CONTS_LIST.length" @triggerIntersected="loadMore" id="observer" class="fl w-100P" style="float: left;"></myObserver>
        </template>
        <div style="width: 40px;height: 40px;border-radius: 100%;position: absolute;bottom: 6rem;right: 50px;">
            <img id='writeBtn' src="../../../assets/images/button/Icon_WriteAlimBtn.png" @click="openSelectWriteTypePop()" alt="알림 작성 버튼" style="" class="img-78 img-w66">
        </div>
        <div v-if="mSeleteWriteTypePopShowYn" @click="mSeleteWriteTypePopShowYn = false" style="width: 100%; height: 100%; position: absolute; z-index: 10; left: 0; top: 0; background: #00000030;"></div>
        <transition name="showUp">
            <div v-if="mSeleteWriteTypePopShowYn" style="width: 100%; min-height: 320px; left:0; background: #FFF; border-radius: 25px 25px 0px 0px; display: flex; flex-direction: column;padding: 20px 20px; position: absolute; bottom: 0; z-index: 11;">
                <div style="position: relative; width: 100%; min-height: 40px; margin-bottom: 10px; float: left;">
                    <p class="font20 fontBold textLeft">어디에 작성하실건가요?</p>
                    <img src="../../../assets/images/common/grayXIcon.svg" @click="mSeleteWriteTypePopShowYn = false" style="width: 20px; position: absolute; right: 8px;top: 5px;" alt="">
                </div>
                <div style="width: 100%; min-height: 100px;">
                    <div style="width: 100%; min-height: 100px; display: flex;  float: left; justify-content: space-between;">
                        <div @click="selectWriteType('ALIM')"  class="writeTypeBtnStyle" :style="this.mSelectedWriteType === 'ALIM' ? 'border: 3px solid #7678E2!important; ' : ''">
                            <img style="width: 36px;" src="../../../assets/images/main/main_contentsBellIcon.svg" alt="">
                            <img v-if="this.mSelectedWriteType === 'ALIM'" src="../../../assets/images/common/selectCheckIcon.svg" style="position: absolute; left: -15px; top: -10px;" alt="">
                            <p :class="{lightGray: this.mSelectedWriteType !== 'ALIM'}" class="font14 fontBold mtop-05">알림</p>
                        </div>
                        <div @click="selectWriteType('BOAR')" class="writeTypeBtnStyle" :style="this.mSelectedWriteType === 'BOAR' ? 'border: 3px solid #7678E2!important; ' : ''">
                            <img style="width: 36px;" src="../../../assets/images/main/baordIcon.svg" alt="">
                            <img v-if="this.mSelectedWriteType === 'BOAR'" src="../../../assets/images/common/selectCheckIcon.svg" style="position: absolute; left: -15px; top: -10px;" alt="">
                            <p :class="{lightGray: this.mSelectedWriteType !== 'BOAR'}" class="font14 fontBold mtop-05">게시글</p>
                        </div>
                    </div>
                </div>
                <div style="width: 100%; margin-top: 20px; min-height: 30px;">
                    <p class="font20 fontBold textLeft">채널을 선택해주세요</p>
                    <div class="lightGray cursorP font16 fontBold okScrollBar" style="border: 3px solid #F4F4F4!important; width: 100%; height: 160px!important; border-radius: 8px; overflow: hidden scroll; padding :15px 20px;" name="" id="">
                        <div style="width: 100%; height: 30px; padding: 0 5px; float: left;">
                            <div v-for="(chan, index) in mSelectChanList" style="position: relative; float: left; width: 100%; min-height: 100%;" :key="index">
                                <p @click="this.mSelectedChan = chan.teamKey"  class="font16 textLeft h-100P " :class="this.mSelectedChan === chan.teamKey? 'commonLightColor' : 'commonGray'" >{{this.$changeText(chan.nameMtext)}}</p>
                                <img src="../../../assets/images/common/listSelectCheck.svg" style="position: absolute; right: 10px; top: 5px; " v-if="this.mSelectedChan === chan.teamKey" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <gBtnLarge v-if="mSelectChanList.length > 0" :style="this.mSelectedChan === 0? 'background: #F4F4F4!important; color: #AAAAAA!important;': ''" class="mtop-2 fontBold" @click="this.mSelectedChan === 0? '' : openWritePushPop()" btnTitle="작성하기" />
                <gBtnLarge  v-else style="background: #F4F4F4!important; color: #AAAAAA!important;" class="mtop-2 fontBold" btnTitle="컨텐츠를 작성할 수 있는 채널이 없어요" />
            </div>
        </transition>
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
      mEndListYn: false,
      mSelectedWriteType: 'ALIM',
      mSelectChanList: [],
      mSelectedChan: 0,
      mSeleteWriteTypePopShowYn: false,

      // 첫 진입과 삭제 후 리스트를 다시 못 그려주기에 추가
      mReloadKey: 0
    }
  },
  props: {
    propUserKey: {},
    propTab: {}
  },
  methods: {
    contDelete (contentIndex) {
      console.log(contentIndex)
      console.log(this.GE_DISP_CONTS_LIST[contentIndex])
      this.GE_DISP_CONTS_LIST.splice(contentIndex, 1)

      // 삭제 후 리로드가 되지 않아 상위 div에 reload키를 넣어 다시 그려주었습니다. -- 스크롤 이동하지 않았음
      this.mReloadKey += 1
    },
    openPop (openPopParam) {
      this.$emit('openPop', openPopParam)
    },
    async getMyContentsList (pageSize, offsetInput, loadingYn) {
      if (this.mAxiosQueue.length > 0 && this.mAxiosQueue.findIndex((item) => item === 'getPushContentsList') !== -1) return
      this.mAxiosQueue.push('getPushContentsList')
      var param = {}
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
      if (this.mContsList.length > 0) {
        newArr = [
          ...this.mContsList,
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
    },
    selectWriteType (jobkindId) {
      this.mSelectedWriteType = jobkindId
      this.mSelectedChan = 0
      this.mSelectChanList = []
      this.getTeamList(false)
    },
    async getTeamList (loadingYn) {
      var paramMap = new Map()
      paramMap.set('userKey', this.GE_USER.userKey)
      paramMap.set('pageSize', 100)
      if (this.mSelectedWriteType === 'ALIM') {
        paramMap.set('canSendAlim', true)
      }
      var nonLoading = true
      if (loadingYn) {
        nonLoading = false
      }

      var resultList = await this.$getTeamList(paramMap, nonLoading)
      this.mSelectChanList = resultList.data.content
      this.mSelectedChan = this.mSelectChanList[0].teamKey
      console.log(resultList)
    },
    openWritePushPop () { // eslint-disable-next-line no-new-object
      var writeParam = new Object()
      writeParam.contentsJobkindId = this.mSelectedWriteType
      writeParam.targetKey = this.mSelectedChan
      writeParam.teamKey = this.mSelectedChan
      writeParam.currentTeamKey = this.mSelectedChan
      writeParam.targetType = 'writeContents'
      if (this.mSelectedWriteType === 'ALIM') {
        var index = this.mSelectChanList.findIndex((item) => item.teamKey === this.mSelectedChan)
        if (index !== -1) {
          writeParam.targetNameMtext = this.mSelectChanList[index].nameMtext
        }
      } else if (this.mSelectedWriteType === 'BOAR') {
        writeParam.selectBoardYn = true
      }
      this.openPop(writeParam)
      this.mSeleteWriteTypePopShowYn = false
    },
    openSelectWriteTypePop () {
      this.getTeamList()
      this.mSeleteWriteTypePopShowYn = true
    }
  },
  created () {
    var this_ = this
    this.getMyContentsList().then((result) => {
      this_.setContsList(result)
    })
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
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
              if (this.mContsList[i].jobkindId === 'ALIM') {
                dataList = chanDetail.ELEMENTS.alimList
              } else {
                dataList = chanDetail.ELEMENTS.boardList
              }
              idx2 = dataList.findIndex((item) => item.contentsKey === this_.mContsList[i].contentsKey)
              // eslint-disable-next-line vue/no-side-effects-in-computed-properties
              // this.mainBoardList[i] = chanDetail.ELEMENTS.boardList
              if (idx2 !== -1) {
                this.mContsList[i] = dataList[idx2]
              }
            }
          })
        } else {
          chanDetail = this.GE_MAIN_CHAN_LIST[idx1]
          if (this.mContsList[i].jobkindId === 'ALIM') {
            dataList = chanDetail.ELEMENTS.alimList
          } else {
            dataList = chanDetail.ELEMENTS.boardList
          }
          idx2 = dataList.findIndex((item) => item.contentsKey === this.mContsList[i].contentsKey)
          if (idx2 !== -1) {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.mContsList[i] = dataList[idx2]
          } else {
          }
        }
      }
      return this.replaceArr(this.mContsList)
    },
    GE_NEW_MEMO_LIST (state) {
      return this.$store.getters['D_CHANNEL/GE_NEW_MEMO_LIST']
    },
    GE_NEW_CONT_LIST () {
      return this.$store.getters['D_CHANNEL/GE_NEW_CONT_LIST']
    }
  },
  watch: {
    mContsList () {
      // 메인화면으로 처음 진입했을 때 리스트를 받아오고 다시 못 그려주기에 추가
      this.mReloadKey += 1
    },
    GE_NEW_CONT_LIST: {
      handler (value, old) {
        var newArr = []
        if (!value[0] || !value) return
        newArr = [
          value[0],
          ...this.GE_DISP_CONTS_LIST
        ]
        this.mContsList = this.replaceArr(newArr)
      },
      deep: true
    },
    GE_NEW_MEMO_LIST: {
      async handler (value, old) {
        var newArr = []
        if (!value || value.length === 0) return
        // var memoContents = value[0]
        var content = null
        var index
        index = this.GE_DISP_CONTS_LIST.findIndex((item) => Number(item.contentsKey) === Number(value[0].targetKey))
        if (index !== -1) {
          content = this.GE_DISP_CONTS_LIST[index]
          this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', this.GE_DISP_CONTS_LIST[index])
        }

        if (!content) return

        var memoAleadyIdx = content.D_MEMO_LIST.findIndex((item) => Number(item.memoKey) === Number(value[0].memoKey))
        if (memoAleadyIdx !== -1) {
          content.D_MEMO_LIST[memoAleadyIdx] = value[0]
          newArr = content.D_MEMO_LIST
        } else {
          newArr = [
            value[0],
            ...content.D_MEMO_LIST
          ]
        }
        var idx = this.mContsList.findIndex((item) => item.contentsKey === content.contentsKey)
        this.mContsList[idx].D_MEMO_LIST = this.replaceMemoArr(newArr)
        this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [this.mContsList[idx]])
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.writeTypeBtnStyle {
    float:left; width: calc(50% - 10px); height: 95px; cursor:pointer; border-radius: 6px;position: relative; border: 3px solid #F4F4F4; display: flex; flex-direction: column; justify-content: center; align-items: center;
}
option {
    min-height: 25px;
}
</style>
