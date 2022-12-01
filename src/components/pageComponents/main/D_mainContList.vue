<template>
  <div style="width: 100%; min-height: 100px; float: left; display: flex; flex-direction: column; justify-content: center; align-items: center; padding-bottom: 40px; " :key="mReloadKey" >
    <template v-for="(cont, index) in this.GE_DISP_CONTS_LIST" :key="index" >
      <gContentsBox :imgClickYn="true" :propDetailYn="false" :contentsEle="cont" @openPop="openPop" :propContIndex='index' @contDelete='contDelete' @fileDownload="fileDownload" />
      <myObserver v-if="this.GE_DISP_CONTS_LIST.length > 5 ?  index === this.GE_DISP_CONTS_LIST.length - 5 : index === this.GE_DISP_CONTS_LIST.length" @triggerIntersected="loadMore" id="observer" class="fl w-100P" style="float: left;"></myObserver>
    </template>
    <div style="width: 40px;height: 40px;border-radius: 100%;position: absolute;bottom: 6rem;right: 50px;">
      <img id='writeBtn' src="../../../assets/images/button/Icon_WriteAlimBtn.png" @click="openSelectWriteTypePop()" alt="알림 작성 버튼" style="" class="img-78 img-w66">
    </div>
    <div v-if="mSeleteWriteTypePopShowYn" @click="mSeleteWriteTypePopShowYn = false" style="width: 100%; height: 100%; position: absolute; z-index: 10; left: 0; top: 0; background: #00000030;"></div>
    <transition name="showUp">
      <writeBottSheet v-if="mSeleteWriteTypePopShowYn" @openPop='openPop' @closePop='mSeleteWriteTypePopShowYn = false' />
    </transition>
  </div>

  <attatchFileListPop :propFileData="this.mFilePopData" v-if="mFilePopYn === true" @closePop="mFilePopYn = false"/>
</template>

<script>
import attatchFileListPop from './unit/D_commonAttatchFileListPop.vue'
import writeBottSheet from './unit/D_contentsWriteBottSheet.vue'

export default {
  components: { attatchFileListPop, writeBottSheet },
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

      // 첫 진입과 삭제 후 리스트를 다시 못 그려주기에 watch 추가
      mReloadKey: 0,
      mCreateYn: true,
      mFilePopYn: false,
      mFilePopData: {}
      //
    }
  },
  props: {
    propUserKey: {},
    propTab: {},
    pMainAlimList: {}
  },
  methods: {
    async fileDownload (index) {
      this.mFilePopData = await this.GE_DISP_CONTS_LIST[index]
      console.log('ddddddddddddddddddddddddddddddddddddddddddd')

      await this.getContentsDetail()
      await this.settingFileList()

      if (this.mFilePopData.attachFileList.length > 0) {
        this.mFilePopYn = true
      }
    },
    async getContentsDetail () {
      var param = {}
      param.contentsKey = this.mFilePopData.contentsKey
      param.targetKey = this.mFilePopData.contentsKey
      param.jobkindId = this.mFilePopData.jobkindId
      param.userKey = this.GE_USER.userKey
      param.ownUserKey = this.GE_USER.userKey
      var resultList = await this.$getContentsList(param)
      var detailData = resultList.content[0]
      this.mFilePopData = detailData
      this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [detailData])
    },
    async settingFileList () {
      try {
        if (this.mFilePopData && this.mFilePopData.attachFileList !== undefined && this.mFilePopData.attachFileList.length > 0) {
          var attachFileList = []
          var bodyImgFileList = []
          for (var a = 0; a < this.mFilePopData.attachFileList.length; a++) {
            if (this.mFilePopData.attachFileList[a].attachYn === true) {
              attachFileList.push(this.mFilePopData.attachFileList[a])
            } else if (this.mFilePopData.attachFileList[a].attachYn === false) {
              bodyImgFileList.push(this.mFilePopData.attachFileList[a])
            }
          }
          // var addFalseImgList = document.querySelectorAll('#contentsBodyArea .formCard .addFalse')
          // if (addFalseImgList) {
          //   for (var s = 0; s < this.mFilePopData.attachFileList.length; s++) {
          //     var attFile = this.mFilePopData.attachFileList[s]
          //     for (var i = 0; i < addFalseImgList.length; i++) {
          //       if (Number(addFalseImgList[i].attributes.filekey.value) === Number(attFile.fileKey)) {
          //         addFalseImgList[i].setAttribute('mmFilekey', attFile.mmFilekey)
          //         bodyImgFileList.push(attFile)
          //         break
          //       }
          //     }
          //   }
          // }
          var cont = this.mFilePopData
          cont.D_ATTATCH_FILE_LIST = attachFileList
          cont.D_BODY_IMG_FILE_LIST = bodyImgFileList
          this.mFilePopData.D_ATTATCH_FILE_LIST = attachFileList
          this.mFilePopData.D_BODY_IMG_FILE_LIST = bodyImgFileList
          this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont])
        }
      } catch (error) {
        console.log(error)
      }
    },
    contDelete (contentIndex) {
      // console.log(contentIndex)
      // console.log(this.GE_DISP_CONTS_LIST[contentIndex])
      this.GE_DISP_CONTS_LIST.splice(contentIndex, 1)

      // 삭제 후 리로드가 되지 않아 상위 div에 reload키를 넣어 다시 그려주었습니다. -- 다시 그려도 스크롤 이동하지 않았음
      this.mReloadKey += 1
    },
    openPop (openPopParam) {
      // 바텀시트 ( 컨텐츠 작성 버튼을 누른 후 아래에서 올라오는 팝업으로 컨텐츠 작성을 누를 시 바텀시트를 닫아주는 중! )
      if (this.mSeleteWriteTypePopShowYn === true) this.mSeleteWriteTypePopShowYn = false
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
    },
    replaceMemoArr (arr) {
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex(({ memoKey }) => memoKey === current.memoKey) === -1) {
          data.push(current)
        }
        data = data.sort(function (a, b) { // num으로 오름차순 정렬
          return b.memoKey - a.memoKey
        })
        return data
      }, [])
      return uniqueArr
    },
    async loadMore (descYn) {
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
      // console.log(resultList)
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
    if (this.pMainAlimList) {
      this.mContsList = this.pMainAlimList
    }
    if (this.mContsList.length === 0) {
      this.getMyContentsList().then((result) => {
        this_.setContsList(result)
      })
    }
  },
  mounted () {
    // this.$delayAfterFunc(6000, this.check)
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
    },
    // eslint-disable-next-line vue/return-in-computed-property
    GE_DISP_CONTS_LIST () {
      try {
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
            returnContsList.push(this_.mContsList[i])
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
              // this.mContsList[i] = dataList[idx2]
              returnContsList.push(dataList[idx2])
            } else {
              returnContsList.push(this.mContsList[i])
            }
          }
        }

        return this.replaceArr(returnContsList)
      } catch (error) {
        console.log(error)
      }
    },
    GE_NEW_MEMO_LIST (state) {
      return this.$store.getters['D_CHANNEL/GE_NEW_MEMO_LIST']
    },
    GE_NEW_CONT_LIST () {
      return this.$store.getters['D_CHANNEL/GE_NEW_CONT_LIST']
    }
  },
  watch: {
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

option {
    min-height: 25px;
}
</style>
