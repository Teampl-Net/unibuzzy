<template>
  <div class="pinPopWrap">
    <div class="headerShadow font20 fontBold pinPopHeader">
      Pin a Post
      <img
        @click="pClosePop"
        class="cursorP"
        src="@/assets/images/common/popup_close.png"
      />
    </div>
    <div
      class="commonBoardListWrap pinPostContentsWrap"
      ref="commonBoardListWrapCompo"
    >
      <div class="font12 CDeepColor textLeft mBottom10">
        You can pin down important posts and show them at the top.
      </div>
      <div class="w100P fl commonBoardListContentBox contentsLine" />
      <template v-if="mCabContentsList && mCabContentsList.length > 0">
        <div
          class="w100P pinContentsBox"
          v-for="cont in mCabContentsList"
          :key="cont.contentsKey"
        >
          <div class="w100P flexAlignCenter">
            <div
              id="chanAlimListBG"
              ref="chanAlimListBG"
              class="chanImgRound chanImgBox"
              :style="
                'background-image: url(' +
                (cont.domainPath
                  ? cont.domainPath + $changeUrlBackslash(cont.logoPathMtext)
                  : cont.logoPathMtext) +
                ');'
              "
            ></div>
            <div class="contentsItem">
              <p class="w100P fontBold font16 textOverdot textLeft">
                {{ cont.title }}
              </p>
              <div class="font12 flexAlignCenter">
                <p class="textOverdot">{{ $changeText(cont.creUserName) }}</p>
                <p class="textLeft">
                  {{ $changeSimpleDateFormat(cont.creDate) }}
                </p>
              </div>
            </div>
            <div class="contentsBtnBox">
              <gBtnSmall
                v-if="getPinYn(cont)"
                class="pinnedBtn font12"
                btnTitle="Pinned"
                @click="setPinBoard(true, cont)"
              />
              <gBtnSmall
                v-else
                class="CWhiteGrayBgColor CWDeepGrayColor font12"
                btnTitle="Pin"
                @click="setPinBoard(false, cont)"
              />
            </div>
          </div>
        </div>
        <myObserver
          @triggerIntersected="loadMore"
          id="observer"
          class="fl w100P"
          style=""
        ></myObserver>
      </template>
      <gEmpty
        v-else-if="mCabContentsList.length === 0"
        tabName="최신"
        contentName="게시판"
        option="EDIT"
      />
    </div>
    <div class="w100P closeBtn">
      <gBtnSmall class="font12" btnTitle="OK" @click="pClosePop" />
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getContentsList().then((result) => {
      this.mCabContentsList = result.content
    })
  },
  data() {
    return {
      mCabContentsList: [],
      endListYn: false,
      offsetInt: 0
    }
  },
  props: {
    pBoardDetail: {},
    pClosePop: Function,
    pTVList: Array,
    pUpdateTopview: Function
  },
  computed: {
    GE_USER() {
      return this.$store.getters['UB_USER/GE_USER']
    }
  },
  methods: {
    async setPinBoard(pinYn, board) {
      let result = {}
      if (pinYn) {
        result = await this.$commonAxiosFunction({
          url: '/tp.deleteTopview ',
          param: {
            tvKey: board.tvKey
          }
        })
        if (result && result.data && result.data.result) {
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
          url: '/tp.saveTopview',
          param: param
        })
        if (result && result.data && result.data.result) {
          board.tvKey = result.data.tvKey
          this.pUpdateTopview('add', board)
        }
      }
    },
    getPinYn(board) {
      if (!this.pTVList) {
        return false
      }
      const index = this.pTVList.findIndex((item) => {
        return item.contentsKey === board.contentsKey
      })
      if (index !== -1) {
        return true
      } else {
        return false
      }
    },
    async getContentsList(pageSize, offsetInput) {
      var param = {}
      this.$emit('closeLoading')
      if (!this.mPropParams) {
        param.cabinetKey = this.$route.params.targetKey
      } else {
        param.cabinetKey = this.mPropParams.targetKey
      }
      if (
        this.offsetInt === 0 &&
        this.mCabContentsList &&
        this.mCabContentsList.length > 0
      ) {
        this.offsetInt += 1
      }
      param.offsetInt = this.offsetInt
      if (offsetInput !== undefined) {
        param.offsetInt = offsetInput
      }
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

      return resultList
    },
    replaceArr(arr) {
      if (!arr || arr.length === 0) return
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex(({ mccKey }) => mccKey === current.mccKey) === -1) {
          data.push(current)
        }
        data = data.sort(function (a, b) {
          // num으로 오름차순 정렬
          return b.mccKey - a.mccKey
        })
        return data
      }, [])
      return uniqueArr
    },
    async loadMore(pageSize) {
      if (this.endListYn === false) {
        if (
          this.mCabContentsList &&
          !this.pBoardDetail.totalContentsCount > this.mCabContentsList.length
        ) {
          return
        }

        var resultList = await this.getContentsList()
        if (!resultList) {
          resultList = {}
          resultList.content = []
        }
        this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', resultList.content)

        const newArr = [...this.mCabContentsList, ...resultList.content]

        var uniqueArr = this.replaceArr(newArr)
        var tempCabData = this.pBoardDetail
        this.mCabContentsList = uniqueArr
        if (this.viewTab === 'N') {
          tempCabData.totalContentsCount = resultList.totalElements
        }
        if (!resultList || resultList === '') {
          this.endListYn = false
        } else {
          if (resultList.pageable) {
            if (
              resultList.totalElements <
              resultList.pageable.offset + resultList.pageable.pageSize
            ) {
              this.endListYn = true
            } else {
              this.offsetInt += 1
              this.endListYn = false
            }
          }
        }
      }
    }
  }
}
</script>
<style scoped>
.pinPopWrap {
  background: #fff;
  width: 80%;
  height: 60%;
  position: absolute;
  left: 10%;
  top: 20%;
  z-index: 9999;
  padding: 10px 20px 20px;
  border-radius: 20px;
}
.pinPopHeader {
  height: 40px;
  color: #6768a7;
  position: relative;
}
.pinPopHeader > img {
  width: 20px;
  position: absolute;
  top: 5px;
  right: 0;
}
.pinPostContentsWrap {
  padding-top: 10px;
  overflow: auto;
  height: calc(100% - 80px);
}
.contentsLine {
  height: 1px;
}
.pinContentsBox {
  height: 45px;
  margin-bottom: 10px;
}
.chanImgBox {
  margin-right: 10px;
  width: 30px;
  height: 30px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.contentsItem {
  width: calc(100% - 100px);
}
.contentsItem > div > p:first-child {
  max-width: calc(100% - 75px);
}
.contentsItem > div > p:last-child {
  width: 65px;
  margin-left: 10px;
}
.contentsBtnBox {
  width: 60px;
}
.pinnedBtn {
  padding: 0 10px;
}
.closeBtn {
  height: 40px;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
}
</style>
