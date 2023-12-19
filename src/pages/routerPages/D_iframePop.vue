<template>
  <div id="DCommonTargetFrame" style="width: 100%; height: 100%; overflow: hideen;" :style="`padding-top: ${this.$STATUS_HEIGHT + 60}px !important;`">
  </div>
</template>

<script>
import { iframeService } from '../../assets/js/D_iframeService'
export default {
  props: {
    // 부모 컴포넌트에서 전달된 prop
    pPopId: {
      type: String
    },
    propData: {}
  },
  data () {
    return {
      calDataList: {},
      iframeDom: null
    }
  },
  created () {
    const date = new Date()
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    this.getTodoList(firstDay, lastDay)
  },
  mounted () {
    this.$nextTick(() => {
      if (this.propData && this.propData.targetUrl) {
        const url = this.propData.targetUrl
        const id = this.propData.targetId ? this.propData.targetId : 'D_iframe'
        const targetId = 'DCommonTargetFrame'
        const initData = this.propData.initData ? this.calDataList : {}
        if (this.propData.initData.searchToDateStr) {
          initData.targetDate = this.propData.initData.searchToDateStr
        }
        const data = {
          initData: initData
        }
        iframeService.createTargetIframe(id, url, targetId, data, this.callFuncFromFrame)
      }
    })
  },
  methods: {
    isJsonString (str) {
      try {
        JSON.parse(str)
      } catch (e) {
        return false
      }
      return true
    },
    callFuncFromFrame (message) {
      if (message.req === 'SET_IFRAME_DOM') {
        console.log(message.content)
        if (message.content) {
          this.iframeDom = message.content
        }
      } else if (message.req === 'OPEN_CONT_DETAIL') {
        console.log(message.content)
        if (message.content) {
          this.goDetail(message.content)
        }
      } else if (message.req === 'REQUEST_CAL_EVENTS') {
        console.log(message.content)
        if (message.content) {
          const searchObj = message.content
          if (searchObj.searchFromDate && searchObj.searchToDate) {
            this.getTodoList(searchObj.searchFromDate, searchObj.searchToDate)
          }
        }
      }
    },
    async getTodoList (searchFromDate, searchToDate) {
      const param = {
        userKey: this.GE_USER.userKey,
        jobkindId: 'TODO',
        todoType: 'A',
        onlyContentsYn: true,
        searchFromDateStr: this.$dayjs(searchFromDate).format('YYYY-MM-DD'),
        searchToDateStr: this.$dayjs(searchToDate).format('YYYY-MM-DD'),
        nowDateStr: this.$dayjs(new Date()).format('YYYY-MM-DD'),
        orderbyStr: 'c.contStatus, c.priority, c.contentsKey DESC',
        pageSize: 1000
        // stickerKeyList: this.mParamStickerList
      }
      const myContents = await this.$commonAxiosFunction(
        {
          url: '/sUniB/tp.getMyTodoList',
          param: param
        },
        false
      )
      if (myContents.data) {
        this.calDataList = this.getCalenderData(myContents.data)
        if (this.iframeDom && this.iframeDom.contentWindow && this.iframeDom.contentWindow.postMessage) {
          this.iframeDom.contentWindow.postMessage(JSON.stringify({ sender: 'D', type: 'initData', data: this.calDataList }), '*')
        }
      }
    },
    splitList (todoList) {
      if (!todoList || todoList.length === 0) return []
      const returnMyTodoList = []
      const returnCheckTodoList = []
      const returnRefTodoList = []
      todoList.forEach(todo => {
        if (todo.contStatus !== '99' && todo.actorList) {
          let myTodoYn = false
          let checkTodoYn = false
          let refTodoYn = false
          for (let i = 0; i < todo.actorList.length; i++) {
            const actor = todo.actorList[i]

            if (actor.accessKind === 'U' && actor.accessKey === this.GE_USER.userKey) {
              if (actor.actType === 'RV') {
                myTodoYn = true
                break
              } else if (actor.actType === 'CK') {
                checkTodoYn = true
              } else if (actor.actType === 'RF') {
                refTodoYn = true
              }
            } else if (actor.accessKind === 'C') {
              let haveYn = false
              if (actor.mUserList) {
                // eslint-disable-next-line no-debugger
                debugger
                actor.mUserList.forEach(user => {
                  if (user.userKey === this.GE_USER.userKey) {
                    haveYn = true
                  }
                })
                if (haveYn) {
                  if (actor.actType === 'RV') {
                    myTodoYn = true
                    break
                  } else if (actor.actType === 'CK') {
                    checkTodoYn = true
                  } else if (actor.actType === 'RF') {
                    refTodoYn = true
                  }
                }
              }
            }

            // if (actor.actType === 'RV') {
            //   if (actor.accessKind === 'U' && actor.accessKey === this.GE_USER) {
            //     myTodoYn = true
            //     break
            //   } else if (actor.accessKind)
            // }

            // else if (actor.actType === 'CK' && actor.accessKey === this.GE_USER) {
            //   checkTodoYn = true
            // } else if (actor.actType === 'RF' && actor.accessKey === this.GE_USER) {
            //   refTodoYn = true
            // }
          }

          if (myTodoYn) {
            todo.contTarget = 'myTodo'
            console.log('todo')
            console.log(todo)
            returnMyTodoList.push(todo)
          } else if (checkTodoYn) {
            todo.contTarget = 'check'
            returnCheckTodoList.push(todo)
          } else if (refTodoYn) {
            todo.contTarget = 'myRef'
            returnRefTodoList.push(todo)
          }
        }
      })
      console.log({ my: returnMyTodoList, check: returnCheckTodoList, ref: returnRefTodoList })
      return { my: returnMyTodoList, check: returnCheckTodoList, ref: returnRefTodoList }
    },
    getCalenderData (data) {
      // const raw = {
      //   contentsKey: null,
      //   title: null,
      //   status: null,
      //   iconPath: null,
      //   fromDate: null,
      //   toDate: null,
      //   creUserName: null,
      //   workUserName: null,
      //   priority: null
      // }
      let content = {
        id: null,
        title: null,
        start: null,
        end: null,
        done: null,
        raw: null
      }
      let eventGroupObj = {
        groupKey: null,
        groupName: null,
        color: null,
        content: null
      }
      data.refTodo = { content: [] }
      const groupList = []
      // 내 할일
      let contList = []
      let myTodoList = null
      if (data.myTodo && data.myTodo.content) {
        myTodoList = data.myTodo.content
        const returnList = this.splitList(myTodoList)
        // for (let i = data.myTodo.content.length - 1; i > -1; i--) {
        //   let dupYn = false
        //   const cont = data.myTodo.content[i]
        //   if (cont.contStatus === '99') {
        //     data.myTodo.content.splice(i, 1)
        //     continue
        //   }
        //   const refList = cont.refList
        //   if (refList && refList.length > 0) {
        //     let checkYn = false
        //     refList.forEach(element => {
        //       console.log(element)
        //       if (element.accessKind && element.accessKind === 'U') {
        //         if (element.accessKey === this.GE_USER.userKey) {
        //           checkYn = true
        //         }
        //       } else if (element.accessKind && element.accessKind === 'C') {
        //         if (element.mUserList) {
        //           element.mUserList.forEach(user => {
        //             if (user.userKey === this.GE_USER.userKey) {
        //               checkYn = true
        //             }
        //           })
        //         }
        //       }
        //       if (checkYn) {
        //         cont.contTarget = 'myRef'
        //         data.refTodo.content.unshift(cont)
        //         dupYn = true
        //       }
        //     })
        //   }
        //   console.log('dupYn' + dupYn)
        //   if (dupYn) continue
        //   content = this.setCalData(cont, i)
        //   contList.push(content)
        // }
        if (returnList && returnList.my) {
          returnList.my.forEach((myTodo, index) => {
            content = this.setCalData(myTodo, index)
            contList.push(content)
          })
        }
        eventGroupObj = {
          groupKey: 0,
          groupName: '내일',
          color: 'rgb(247 161 120)',
          contents: contList
        }
        groupList.push(eventGroupObj)

        contList = []
        if (returnList && returnList.ref) {
          returnList.ref.forEach((refTodo, index) => {
            content = this.setCalData(refTodo, index)
            contList.push(content)
          })
        }
        eventGroupObj = {
          groupKey: 1,
          groupName: '공개된일',
          color: 'rgb(198, 106, 106)',
          contents: contList
        }
        groupList.push(eventGroupObj)

        contList = []
        if (returnList && returnList.check) {
          returnList.check.forEach((checkTodo, index) => {
            content = this.setCalData(checkTodo, index)
            contList.push(content)
          })
        }
        eventGroupObj = {
          groupKey: 3,
          groupName: '검토할일',
          color: 'rgb(99 203 223)',
          contents: contList
        }
        groupList.push(eventGroupObj)
      }

      // // 참조된 일
      // contList = []
      // console.log(data.refTodo)
      // if (data.refTodo && data.refTodo.content) {
      //   for (let i = 0; i < data.refTodo.content.length; i++) {
      //     const cont = data.refTodo.content[i]
      //     content = this.setCalData(cont, i)
      //     contList.unshift(content)
      //   }
      // }
      // eventGroupObj = {
      //   groupKey: 3,
      //   groupName: '공개된일',
      //   color: 'rgb(198, 106, 106)',
      //   contents: contList
      // }
      // groupList.push(eventGroupObj)

      // // 요청한 일
      // contList = []
      // if (data.reqTodo && data.reqTodo.content) {
      //   for (let i = data.reqTodo.content.length - 1; i > -1; i--) {
      //     const cont = data.reqTodo.content[i]
      //     if (cont.contStatus === '99') {
      //       data.reqTodo.content.splice(i, 1)
      //       continue
      //     }
      //     if (myTodoList) {
      //       let dupYn = false
      //       for (let m = 0; m < myTodoList.length; m++) {
      //         const mCont = myTodoList[m]
      //         if (mCont.contentsKey === cont.contentsKey) {
      //           dupYn = true
      //           break
      //         }
      //       }
      //       if (dupYn) {
      //         console.log(data.reqTodo.content[i])
      //         data.reqTodo.content.splice(i, 1)
      //         continue
      //       }
      //     }
      //     content = this.setCalData(cont, i)
      //     contList.unshift(content)
      //   }
      // }

      // eventGroupObj = {
      //   groupKey: 1,
      //   groupName: '요청한일',
      //   color: 'rgb(99 203 223)',
      //   contents: contList
      // }
      // groupList.push(eventGroupObj)

      // 완료한 일
      contList = []
      if (data.compTodo && data.compTodo.content) {
        for (let i = 0; i < data.compTodo.content.length; i++) {
          const cont = data.compTodo.content[i]
          content = this.setCalData(cont, i)
          contList.push(content)
        }
      }
      eventGroupObj = {
        groupKey: 2,
        groupName: '완료된일',
        color: 'rgb(109 109 109)',
        contents: contList
      }
      groupList.push(eventGroupObj)

      const eventGroup = {
        isSummary: true,
        groups: groupList
      }
      console.log(eventGroup)
      return eventGroup
    },
    setCalData (cont, index) {
      if (!cont) return
      const start = this.$dayjs(cont.workFromDate).format('YYYY-MM-DD')
      const end = this.$dayjs(cont.workToDate).format('YYYY-MM-DD')
      let done = null
      if (cont.contStatus === '99') {
        done = this.$dayjs(cont.workEndDate).format('YYYY-MM-DD')
      }
      // const toDate = this.$dayjs(new Date()).format('YYYY-MM-DD')
      // if (toDate > end && (cont.contStatus && cont.contStatus === '00')) {
      //   end = toDate
      // }
      const id = cont.contentsKey
      const title = cont.title
      const raw = {
        contentsKey: cont.contentsKey,
        title: cont.title,
        status: cont.contStatus,
        workDate: cont.workDate,
        iconPath: cont.userDomainPath
          ? cont.userDomainPath + cont.userProfileImg
          : cont.userProfileImg,
        workEndDate: cont.workEndDate,
        fromDate: this.$dayjs(cont.workFromDate).format('YYYY-MM-DD'),
        toDate: this.$dayjs(cont.workToDate).format('YYYY-MM-DD'),
        creUserName: cont.userDispMtext,
        workUserName: '',
        priority: index
      }
      return {
        id: id,
        title: title,
        start: start,
        end: end,
        done: done,
        raw: raw
      }
    },
    goDetail (value) {
      var param = {}
      param.targetType = 'contentsDetail'
      param.targetKey = value.contentsKey
      param.popHeaderText = '오늘의 일'
      param.teamKey = 0
      param.creTeamKey = 0
      param.jobkindId = 'TODO'
      // param.creTeamKey = value.creTeamKey
      param.value = value
      value.readYn = 1
      param.readYn = value.readYn
      this.$emit('openPop', param)
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  },
  setup (props) {
    // const errorText = ref('')
    // const iframeUrl = props.propData.targetUrl

    return {
      // iframeUrl
    }
  }
}

</script>
<style scoped>

</style>
