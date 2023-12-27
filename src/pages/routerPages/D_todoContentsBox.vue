<template>
    <div
        @click="goDetail(CONT_DETAIL)"
        :class="CONT_DETAIL.strikeOnOff ? 'fade-out-box' : ''"
        v-if="!pGroup || (CONT_DETAIL && pGroup.listName === this.$t('COMMON_TODO_COMPLETED') && CONT_DETAIL.contStatus === '99') || (pGroup.listName !== this.$t('COMMON_TODO_COMPLETED') && CONT_DETAIL.contStatus !== '99')"
        class="w100P cursorP DTodoBox"
        style="
        background-color: white;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 10px 10px 10px 0px;
        "
        :style="
        pGroup && pGroup.list.content.length - 1 === todoIndex
            ? ''
            : 'border-bottom:1px solid #acacac;'
        "
    >
        <div
        style="
            width: 100%;
            height: 100%;
            display: flex;
            align-items: start;
            justify-content: space-between;
        "
        >
        <div
            style="width: 45px; height: 30px;display: flex; justify-content: center; align-items: center; text-align: left"
            @click.stop="
            pGroupIndex !== undefined && pGroupIndex !== 2 ? setCompleteTodo(CONT_DETAIL, 'myTodoList', pGroupIndex, todoIndex) : ''
            "
        >
            <img
            v-if="CONT_DETAIL.contTarget === 'myRef'"
            src="../../assets/images/todo/checkboxRef.svg"
            width="25"
            height="25"
            style="margin-top: -0.5rem; opacity: 0.5"
            />
            <img
            v-else-if="CONT_DETAIL.contStatus === '99'"
            src="../../assets/images/todo/checkboxCheck.png"
            width="26"
            height="26"
            style="margin-top: -0.5rem; opacity: 0.5"
            />
            <img
            v-else
            src="../../assets/images/todo/checkboxBlank.png"
            width="26"
            height="26"
            style="margin-top: -0.5rem; opacity: 0.5"
            />
        </div>
        <div style="width: 100%">
            <!-- 제목, 태그 1-->
            <div style="width: 100%" >
            <div
                class="todoImportantInfo"
                style="display: flex; align-items: center"
            >
                <div
                style="text-align: left; white-space: wrap"
                >
                <div
                    class="todoImportantInfoTitle fontBold todoTitleFontSize CTodoTitleColor"
                    style="display: flex; justify-content: center; align-items: center;"
                    :style="{'color' : CONT_DETAIL.contStatus === '99' ? 'gray !important' : '#060505 !important'}"
                >
                    <span class="realTitle mright-03" :style="CONT_DETAIL.contStatus === '99'? 'text-decoration: line-through;' : ''">{{
                    CONT_DETAIL.title
                    }}</span>
                    <span
                    v-if="CONT_DETAIL.memoCount"
                    class="todoImportantInfoMemo mright-03" style="color:gray; font-size:14px;"
                    >
                    ({{
                        CONT_DETAIL.memoCount
                    }})
                    </span>
                    <!-- v-if="index === 0 || sticker.showAllStickerYn" -->
                    <template v-for="(sticker, index) in CONT_DETAIL.stickerList" :key="index">
                    <span @click.stop="clickSticker(sticker)"
                        class="todoTag mright-03 fontBold"
                        :class="{tagColorBlack : sticker.picBgPath === '#91BDFF' || sticker.picBgPath === '#C2DAFF' || sticker.picBgPath === '#FFC58F' || sticker.picBgPath === '#FFE0C4' || sticker.picBgPath === '#A8FFA1' || sticker.picBgPath === '#CDFFC9' || sticker.picBgPath === '#DAB5FF' || sticker.picBgPath === '#EAD5FF' || sticker.picBgPath === '#95E6FF' || sticker.picBgPath === '#C8F5FF' || sticker.picBgPath === '#FF86CF' || sticker.picBgPath === '#FFC3E4' || sticker.picBgPath === '#CCCCCC' || sticker.picBgPath === '#E3E3E3'}"
                        :style="`background: ${sticker.picBgPath}`"
                    >
                        {{ $changeText(sticker.nameMtext) }}
                    </span>
                    </template>
                    <!-- <span class="todoTag mright-03" @click="todo.showAllStickerYn = !todo.showAllStickerYn" style="background: #5f61bd !important;" v-if="todo.stickerList && todo.stickerList.length > 1">
                    {{ `(+${todo.stickerList.length - 1})` }}
                    </span> -->
                    <div
                    v-if="CONT_DETAIL.fileCount"
                    style="display: inline-block"
                    >
                    <img
                        :src="
                        require(`@/assets/images/todo/attachIcon.svg`)
                        "
                        style="width: 15px; opacity: 0.7"
                        alt="attached file"
                    />
                    </div>
                </div>
                </div>
            </div>
            </div>
            <!--//-->
            <!-- 이력, 담당자-->
            <div class="todoOtherInfos">
            <!-- 내 일 -이력 -->
              <div class="todoOtherInfosDueDate">
                <div
                class="CLDeepGrayColor todoFontSize"
                style="line-height: 23px"
                >
                  <span
                  @click.stop="clickPriority(CONT_DETAIL.priority)"
                    v-if="CONT_DETAIL.priority"
                    class="todoPriority mright-03 fontBold"
                    :class="{
                    todoPriorityHigh: CONT_DETAIL.priority === '00',
                    todoPriorityMiddle: CONT_DETAIL.priority === '01',
                    todoPriorityLow: CONT_DETAIL.priority === '02',
                    }"
                  >
                    {{
                    CONT_DETAIL.priority === "00"
                        ? $t('COMMON_TODO_HIGH')
                        : CONT_DETAIL.priority === "01"
                        ? $t('COMMON_TODO_MID')
                        : $t('COMMON_TODO_LOW')
                    }}
                  </span>
                  <div
                    class="middleBgColor imgCircle profileImg mright-03"
                    style="
                    display: inline-block;
                    vertical-align: middle;
                    "
                    :style="`background-image: url('${
                    CONT_DETAIL.userDomainPath
                        ? CONT_DETAIL.userDomainPath + CONT_DETAIL.userProfileImg
                        : require(`@/assets/images/channel/chanImg.png`)
                    }')`"
                  ></div>
                  <span
                    :class="{
                    delayedTodo:
                        new Date(CONT_DETAIL.workToDate) < new Date() &&
                        getHowLate(CONT_DETAIL.workToDate) > 0,
                    }"
                    >{{
                    compareSameDate(
                        $dayjs(CONT_DETAIL.workFromDate).add(9, 'hour').format('MM/DD'),
                        $dayjs(CONT_DETAIL.workToDate).add(9, 'hour').format('MM/DD')
                    )
                    }}</span
                  >
                <!-- <span v-if="new Date(todo.workToDate) < new Date() && getHowLate(todo.workToDate) > 0"> ({{ getHowLate(todo.workToDate) }}일 지연됨)</span> -->
                </div>
              </div>
              <!--//-->
              <!-- 내 일 - 담당자 -->
              <div class="todoOtherInfosAsignee" v-if="!(CONT_DETAIL && CONT_DETAIL.actorList.length === 2 && CONT_DETAIL.actorList[0].accessKey === GE_USER.userKey && CONT_DETAIL.actorList[1].accessKey === GE_USER.userKey)">
                <div
                class="w100P actorImgList"
                @click.stop="openActorList(pTodoIndex)"
                >
                <template
                    v-for="(each, index) in CONT_DETAIL.actorList"
                    :key="index"
                >
                    <div v-if="index < 3" style="display: flex">
                    <img
                        v-if="each.accessKind === 'U' && each.actType === 'RV'"
                        class="actorImg"
                        :src="
                        each.domainPath
                            ? each.domainPath + each.pathMtext
                            : require(`@/assets/images/todo/defaultImg.png`)
                        "
                        style=""
                        :alt="each.userDispMtext"
                    />
                    <img
                        v-else-if="each.accessKind === 'C' && each.actType === 'RV'"
                        class="actorImg"
                        :src="
                        require(`@/assets/images/todo/channer_addressBook.svg`)
                        "
                        style=""
                        :alt="each.userDispMtext"
                    />
                    <div
                        class="moreActorImg"
                        style=""
                        v-if="CONT_DETAIL.actorList.length > 0 && index === 2"
                    >
                        <span>+{{ CONT_DETAIL.actorList.length }}</span>
                    </div>
                    <div
                        class="moreActorImg"
                        style=""
                        v-else-if="(CONT_DETAIL.actorList.length === 1 && CONT_DETAIL.actorList[0].actType === 'CK') || (CONT_DETAIL.actorList.length === 2 && CONT_DETAIL.actorList[1].actType === 'CK') && index === 1"
                    >
                        <span>+{{ CONT_DETAIL.actorList.length }}</span>
                    </div>
                    </div>
                    <div
                    class="actorNameListWrap"
                    v-if=" mGetWhichTodoIndex === pTodoIndex && mOpenActorListYn ">
                      <div class="actorNameList">
                        <p
                        @click="goUserProfile(each)"
                        class="todoFontSize" style="white-space:nowrap; display:flex; align-items:center;"
                        v-for="(each, index) in CONT_DETAIL.actorList"
                        :key="index"
                        >
                        <template v-if="each">
                        <img class="moreActorImg" style="border:2px solid #e7edff;" :src="each.domainPath + each.pathMtext" />
                        </template>
                        {{
                            each.userDispMtext ? $changeText(each.userDispMtext) : $changeText(each.cabinetNameMtext)
                        }}
                        {{
                        each.actType === 'CK'? '(검토) ' : each.actType === 'RV'? '(담당) ' : each.actType === 'RF'? '(공개) ' : ''
                        }}
                        </p>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <!--//-->
        </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    pGroup: {},
    pOpenDetail: {},
    pTodoIndex: {},
    pTodoElement: {},
    pGroupIndex: {},
    pSetCompleteTodo: {},
    pClickSticker: {},
    pClickPriority: {},
    pOpenActorList: {},
    pGoUserProfile: {}
  },
  data () {
    return {
      mOpenActorListYn: false,
      mGetWhichTodoIndex: -1
    }
  },
  created () {
    if (this.CONT_DETAIL && this.CONT_DETAIL.stickerList && this.CONT_DETAIL.stickerList.length > 0) {
      if (this.CONT_DETAIL.stickerList.picBgPath === '#91BDFF' || this.CONT_DETAIL.stickerList.picBgPath === '#C2DAFF' || this.CONT_DETAIL.stickerList.picBgPath === '#FFC58F' || this.CONT_DETAIL.stickerList.picBgPath === '#FFE0C4' || this.CONT_DETAIL.stickerList.picBgPath === '#A8FFA1' || this.CONT_DETAIL.stickerList.picBgPath === '#CDFFC9' || this.CONT_DETAIL.stickerList.picBgPath === '#DAB5FF' || this.CONT_DETAIL.stickerList.picBgPath === '#EAD5FF' || this.CONT_DETAIL.stickerList.picBgPath === '#95E6FF' || this.CONT_DETAIL.stickerList.picBgPath === '#C8F5FF' || this.CONT_DETAIL.stickerList.picBgPath === '#FF86CF' || this.CONT_DETAIL.stickerList.picBgPath === '#FFC3E4' || this.CONT_DETAIL.stickerList.picBgPath === '#CCCCCC' || this.CONT_DETAIL.stickerList.picBgPath === '#E3E3E3') {
        this.CONT_DETAIL.stickerList.push({ blackYn: true })
      }
    }
  },
  methods: {
    openActorList (index) {
      this.mGetWhichTodoIndex = index
      this.mOpenActorListYn = !this.mOpenActorListYn
    },
    closeActorList () {
      this.$emit('closeActorList')
    },
    goDetail (data) {
      if (this.pOpenDetail) {
        this.pOpenDetail(data)
      }
    },
    setCompleteTodo (data) {
      if (this.pSetCompleteTodo) {
        this.pSetCompleteTodo(data)
      }
    },
    clickSticker (data) {
      if (this.pClickSticker) {
        this.pClickSticker(data)
      }
    },
    clickPriority (data) {
      if (this.pClickPriority) {
        this.pClickPriority(data)
      }
    },
    // openActorList (data) {
    //   console.log('data', data)
    //   if (this.pOpenActorList) {
    //     this.pOpenActorList(data)
    //     this.mOpenActorListYn = !this.mOpenActorListYn
    //   }
    // },
    goUserProfile (data) {
      if (this.pGoUserProfile) {
        this.pGoUserProfile(data)
      }
    },
    compareSameDate (from, to) {
      if (from === to) {
        return from
      } else {
        return `${from} ~ ${to}`
      }
    },
    getHowLate (toDate, endDate = new Date()) {
      const howLate = new Date(endDate).getTime()
      const toDateNew = new Date(toDate).getTime()
      const timeDifference = howLate - toDateNew
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
      return daysDifference
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    CHANNEL_DETAIL () {
      var detail = this.$getDetail('TEAM', 0)
      if (detail && detail.length > 0) {
        if (
          !detail[0].D_CHAN_AUTH ||
            detail[0].D_CHAN_AUTH === true ||
            (detail[0].D_CHAN_AUTH.followYn && !detail[0].D_CHAN_AUTH.settingYn)
        ) {
          return this.CHANNEL_DETAIL
        } else {
          return detail[0]
        }
      } else {
        if (this.CHANNEL_DETAIL) {
          return this.CHANNEL_DETAIL
        } else {
          return null
        }
      }
    },
    CONT_DETAIL () {
      if (!this.pTodoElement) return
      // console.log(this.CHANNEL_DETAIL)
      var cont = this.$getContentsDetail(
        null,
        this.pTodoElement.contentsKey,
        0,
        this.pTodoElement.jobkindId
      )
      // console.log(cont)
      if (!cont) {
        cont = [this.pTodoElement]
      }
      if (cont && cont.length > 0) {
        return cont[0]
      } else {
        return this.pTodoElement
      }
    }
  },
  watch: {
  }
}
</script>

<style scoped>
.tagColorBlack{
  color:#222 !important;
}
.DTodoBox:last-child{
  border-bottom:none !important;
}
.profileImg {
  width: 23px;
  height: 23px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  display: inline-block;
  vertical-align: middle;
  border: 2px solid #e7edff;
}

.actorImg {
  width: 23px;
  height: 23px;
  border-radius: 50%;
  margin-left: -7px;
  border: 2px solid #e7edff;
  box-shadow: 0 5px 6px 0 rgba(255, 255, 255, 0.6);
  background-color: #fff;
}

.moreActorImg {
  margin-left: -10px;
  font-size: 12px !important;
  font-weight: bold;
  width: 23px;
  height: 23px;
  border-radius: 50%;
  background-color: #e7edff !important;
  color: #5f61bd !important;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 23px;
}
.actorImgList {
  display: flex;
  justify-content: end;
  align-items: center;
  position: relative;
}
.actorNameListWrap{
  transition:all .5s;
  position:absolute;
  right:-10px;
  top:130%;
  z-index:13;
}
.actorNameListWrap.wrapOpen {
  display: block !important;
}
.actorNameListWrap:before {
  content: "";
  position: absolute;
  top: -10px;
  right: 10px;
  transform: translateX(-50%);
  border-top: 0px solid transparent;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 16px solid #e7edff;
}
.actorNameList {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap:0.2rem;
  background-color: #e7edff !important;
  box-shadow: 0 5px 8px 0 #3c3c3c1a;
  border-radius: 10px;
  padding: 5px 17px;
  color: #7e7e7e;
  width: auto;
  height: auto;
}
.todoFontSize {
  font-size: 15px;
}
.todoImportantInfoTitle {
  line-height: 1.5;
}
.infoTitle {
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: normal;
}
.todoImportantInfoMemo {
  font-size: 14px;
  font-weight: normal !important;
  /* margin-top: -4px; */
}

.todoTag {
  height: 19px;
  margin-bottom: 3px;
  line-height: 19px;
  padding: 0px 8px;
  border-radius: 5px;
  font-size: 11px;
  width: auto;
  display: inline-block;
  vertical-align: middle;
  white-space:nowrap;
  border-radius:19px;
}
.todoPriority {
  /* height: 18px; */
  /* line-height: 16px; */
  border-radius: 20px;
  font-size: 12px;
  width: auto;
  padding: 0px 9px;
}
.todoPriorityHigh {
  border:1px solid #FF0000;
  color:#FF0000;
}
.todoPriorityMiddle {
  border:1px solid #0066FF;
  color:#0066FF;
}
.todoPriorityLow {
  border:1px solid #FFA800;
  color:#FFA800;
}
.todoPriorityLowMore {
  background-color: rgb(250, 251, 254);
  color: #000 !important;
}
.todoTitleFontSize {
  font-size: 16px;
}
.fontSize {
  font-size: 18px;
}
@media screen and (max-width: 650px) {
  .todoImportantInfoTitle {
    line-height: 1.2 !important;
    /* margin-top:0.2rem !important; */
    margin-bottom: 0.3rem !important;
  }
}

@media screen and (max-width: 500px){
    .moreActorImg {
    font-size: 11px !important;
  }
  .todoFontSize {
    font-size: 13px;
  }

  .fontSize {
    font-size: 14px !important;
  }
}
</style>
