<template>
    <div
                  :class="CONT_DETAIL.strikeOnOff ? 'fade-out-box' : ''"
                  v-if="(pTabGroup.listName === '완료된' && CONT_DETAIL.contStatus === '99') || (pTabGroup.listName !== '완료된' && CONT_DETAIL.contStatus !== '99')"
                  @click="goDetail(todo)"
                  :key="todoIndex"
                  class="w100P cursorP"
                  style="
                    background-color: white;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    padding: 10px 10px 10px 0px;
                  "
                  :style="
                    pTabGroup.list.content.length - 1 === todoIndex
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
                      style="width: 45px; text-align: left"
                      @click.stop="
                        setCompleteTodo(todo, 'myTodoList', groupIndex, todoIndex)
                      "
                    >
                      <img
                        v-if="CONT_DETAIL.contStatus === '99'"
                        src="../../assets/images/todo/checkboxCheck.png"
                        width="30"
                        height="30"
                        style="margin-top: -0.3rem; opacity: 0.6"
                      />
                      <img
                        v-else
                        src="../../assets/images/todo/checkboxBlank.png"
                        width="30"
                        height="30"
                        style="margin-top: -0.3rem; opacity: 0.6"
                      />
                    </div>
                    <div style="width: 100%">
                      <!-- 제목, 태그 1-->
                      <div style="width: 100%">
                        <div
                          class="todoImportantInfo"
                          style="display: flex; align-items: center"
                        >
                          <div
                            style="text-align: left; white-space: wrap"
                          >
                            <div
                              class="todoImportantInfoTitle fontBold todoTitleFontSize CTodoTitleColor"
                              style=""
                              :style="{'color' : CONT_DETAIL.contStatus === '99' ? 'gray !important' : '#060505 !important'}"
                            >
                              <span class="realTitle mright-03" :style="CONT_DETAIL.contStatus === '99'? 'text-decoration: line-through;' : ''">{{
                                CONT_DETAIL.title
                              }}</span>
                              <span
                                v-if="CONT_DETAIL.D_MEMO_LIST && CONT_DETAIL.D_MEMO_LIST.length > 0"
                                class="todoImportantInfoMemo CTodoTitleColor"
                              >
                                ({{
                                  CONT_DETAIL.D_MEMO_LIST.length === 0
                                    ? "0"
                                    : CONT_DETAIL.D_MEMO_LIST.length
                                }})
                              </span>
                              <span
                                v-if="CONT_DETAIL.stickerList.length > 0"
                                class="todoTag mright-03"
                                :style="`background: ${CONT_DETAIL.stickerList[0].picBgPath}`"
                              >
                                {{ $changeText(CONT_DETAIL.stickerList[0].nameMtext) }}
                              </span>
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
                      <div class="todoOtherInfos mtop-01">
                        <!-- 내 일 -이력 -->
                        <div class="todoOtherInfosDueDate">
                          <div
                            class="CLDeepGrayColor todoFontSize"
                            style="line-height: 23px"
                          >
                            <span
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
                                  ? "높음"
                                  : CONT_DETAIL.priority === "01"
                                  ? "보통"
                                  : "낮음"
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
                                  : CONT_DETAIL.userProfileImg
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
                                  getMonthDate(CONT_DETAIL.workFromDate),
                                  getMonthDate(CONT_DETAIL.workToDate)
                                )
                              }}</span
                            >
                            <!-- <span v-if="new Date(CONT_DETAIL.workToDate) < new Date() && getHowLate(CONT_DETAIL.workToDate) > 0"> ({{ getHowLate(CONT_DETAIL.workToDate) }}일 지연됨)</span> -->
                          </div>
                        </div>
                        <!--//-->
                        <!-- 내 일 - 담당자 -->
                        <div class="todoOtherInfosAsignee">
                          <div
                            class="w100P actorImgList"
                            @click.stop="openActorList(todoIndex, 0)"
                          >
                            <template
                              v-for="(each, index) in CONT_DETAIL.actorList"
                              :key="index"
                            >
                              <div v-if="each.actType === 'RV' && index < 3" style="display: flex">
                                <img
                                  v-if="each.accessKind === 'U'"
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
                                  v-else
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
                                  v-if="CONT_DETAIL.actorList.length > 3 && index === 2"
                                >
                                  <span>+{{ CONT_DETAIL.actorList.length - 2 }}</span>
                                </div>
                              </div>
                              <div
                                class="actorNameListWrap"
                                v-if="
                                  mGetWhichTodoIndex === 0 &&
                                  mOpenActorListIndex === todoIndex &&
                                  mOpenActorListYn
                                "
                              >
                                <div class="actorNameList">
                                  <p
                                    class="todoFontSize"
                                    v-for="(each, index) in CONT_DETAIL.actorList"
                                    :key="index"
                                  >
                                    {{
                                      each ? $changeText(each.userDispMtext) : "X"
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
    pContents: {},
    pTabGroup: {}
  },
  data () {
    // mContentsEle = {}
  },
  created () {
    alert(true)
  },
  computed: {
    CONT_DETAIL () {
      if (!this.pContents) return
      const teamKey = 0
      var cont = this.$getContentsDetail(
        null,
        this.pContents.contentsKey,
        teamKey,
        this.pContents.jobkindId
      )
      if (!cont) {
        cont = [this.pContents]
        // this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [this.contentsEle])
      }

      return cont
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
      // return this.$store.getters['D_USER/GE_USER']
    }

  }
}
</script>

<style scoped>

</style>
