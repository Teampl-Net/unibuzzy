<template>
  <div
    class="followListWrap"
    :style="`padding-top: ${this.$STATUS_HEIGHT + 50}px !important;`"
  >
  <PopHeader
      @closeXPop="checkClosePop"
      style="top: 0"
      class="headerShadow"
      :headerTitle="mHeaderTitle"
    />
    <div style=" padding: 0 1.5rem; width: 100%; height: 100%; overflow: hidden;">
      <TargetList
        class="targetListWrap"
        ref="targetList"
        @closeXPop="closeXPop"
        @addTarget="addTarget"
        @changeTab="changeTab"
        @editBook="editBook"
        @childCheck="childCheck"
        @openPop="openPop"
        :pReloadList="getCabList"
        :pSubOption="mSubOption"
        :pSelectData="mFollowDataList"
        :pSelectedTargetList="[]"
        pOption="FOLLOW"
      />
    </div>
    <div>
      <div v-if="mPlusMenuShowYn" class="editMenu">
        <template v-for="(plusBtn, index) in mPlusBtnList" :key="plusBtn.key">
          <div  v-if="plusBtn.showYn || (parentData.accessKind === 'F' && index === 5) || ((parentData.accessKind === 'C' || parentData.accessKind !== 'F') && index === 1)" class="btnPlus" :style="`bottom: ${plusBtn.bottomStyle}`" style="z-index: 999; width: 3.5rem; right: 10.5%; height: 3.5rem;" @click="plusBtn.function(plusBtn.tabName)"><p style="font-size:12px;" v-html="plusBtn.btnText"></p></div>

        </template>
      </div>
      <img src="@/assets/images/button/Icon_AddMemberBtn.png" @click="mPlusMenuShowYn = !mPlusMenuShowYn" v-if="!mPlusMenuShowYn && mChildOpenYn === true && parentData.accessKind ==='F' && parentData.accessKey === 1" alt="팔로워 추가 버튼" style="position: absolute; bottom: 2rem; right: 10%;" class="img-78 img-w66">
      <img src="@/assets/images/button/Icon_AddMemberBtn.png" @click="mPlusMenuShowYn = !mPlusMenuShowYn" v-else-if="!mPlusMenuShowYn && mChildOpenYn === true && parentData.accessKind !=='F'" alt="주소 추가 버튼" style="position: absolute; bottom: 2rem; right: 10%;" class="img-78 img-w66">
      <img src="@/assets/images/button/Icon_AddressBookBtn.png" @click="creAddressPop()" v-else-if="mChildOpenYn === false" alt="주소록 만들기 버튼" style="position: absolute; bottom: 2rem; right: 10%;" class="img-78 img-w66">
      <div class="btnPlus" style="z-index: 999; background:rgb(144 144 189);" @click="mPlusMenuShowYn = !mPlusMenuShowYn" v-if="mPlusMenuShowYn" >
        <img style="width: 20px; margin-bottom: 5px;" src="@/assets/images/common/popup_close.png" alt="">
      </div>
    </div>
    <transition name="show_left">
      <SelectTargetPop v-if="mSelectTargetPopShowYn" pSubOption="USER" :pSelectedTargetList="GE_SELECTED_LIST" :pChildYn="mChildYn" @saveTarget="saveTarget" :pSelectData="mSelectPopData" @closeXPop="closeSelectTargetPop" />
    </transition>
  </div>
</template>

<script>
import SelectTargetPop from '../../components/write/selectTarget/SelectTargetPop.vue'
import TargetList from '../../components/write/selectTarget/TargetList.vue'
import PopHeader from '../../components/write/selectTarget/PopHeader.vue'
export default {
  components: {
    TargetList,
    PopHeader,
    SelectTargetPop
  },
  props: {
    propData: {}
  },
  created () {
    this.getCabList()
  },
  data () {
    return {
      mChildYn: true,
      mHeaderTitle: this.$t('COMMON_NAME_MY_ADDERSS'),
      mSubOption: '',
      parentData: {},
      mSelectTargetPopShowYn: false,
      mPlusBtnList: [
        { btnText: '팔로워<br>찾기', bottomStyle: '14.5rem', function: this.openSelectFollowPop, key: 2 },
        { btnText: '팔로잉<br>찾기', bottomStyle: '10.5rem', function: this.openSelectFollowPop, key: 1 },
        { btnText: '채널<br>찾기', bottomStyle: '6.5rem', function: this.getMyChannel, showYn: true, key: 3 }
      ],
      mSelectPopData: [],
      mPlusMenuShowYn: false,
      mSelectedTab: '주소록',
      mChildOpenYn: false,
      mFollowDataList: [
        // {
        //   tabName: '팔로잉',
        //   tabType: 'ING',
        //   func: this.getFollowerList,
        //   clickEvent: this.followTarget,
        //   tabIndex: 0,
        //   targetList: [
        //     // {
        //     //   accessKind: 'U',
        //     //   accessKey: 584,
        //     //   iconFullYn: true,
        //     //   iconPath: 'https://mzoin.com/fileServer/image/2023/07/10/c5daf925-d86d-4139-a744-ab4cafb18013_true',
        //     //   accessName: '백지수'
        //     // }
        //   ]
        // },
        // {
        //   tabName: '팔로워',
        //   tabIndex: 1,
        //   tabType: 'ER_',
        //   func: this.getFollowerList,
        //   clickEvent: this.followTarget,
        //   targetList: [
        //     // {
        //     //   accessKind: 'U',
        //     //   accessKey: 584,
        //     //   iconFullYn: true,
        //     //   iconPath: 'https://mzoin.com/fileServer/image/2023/07/10/c5daf925-d86d-4139-a744-ab4cafb18013_true',
        //     //   accessName: '백지수'
        //     // }
        //   ]
        // },
        // {
        //   tabIndex: 2,
        //   tabType: 'CAB',
        //   func: this.getUserCabinetList,
        //   tabName: '주소록',
        //   targetList: [
        //   ]
        // }
      ]
    }
  },
  methods: {
    saveTarget (data) {
      if (this.parentData.accessKind === 'F') {
        this.followTargetList(data)
      } else {
        this.saveMCabinetUser(data)
      }
    },
    async saveMCabinetUser (data) {
      const param = {}
      const targetKeyList = []
      data.forEach(async (value) => {
        targetKeyList.push(value.accessKey)
      })
      param.userKeyList = targetKeyList
      param.cabinetKey = this.parentData.accessKey
      param.targetKind = 'U'
      param.targetKey = this.GE_USER.userKey
      param.jobkindId = 'USER'
      param.sysCabinetCode = 'USER'
      const result = await this.$saveMCabContents(param)
      console.log(result)
      const returnList = await this.getMCabContentsList()
      console.log(returnList)
      if (returnList) {
        this.$refs.targetList.openChild({ accessKey: this.parentData.accessKey, accessKind: this.parentData.accessKind, cList: returnList })
      }
      if (this.propData.selectPopYn) {
        if (this.propData.callbackFn) {
          this.propData.callbackFn()
        }
      }
    },
    checkClosePop () {
      this.$refs.targetList.checkClosePop()
    },
    closeXPop () {
      this.$emit('closeXPop', true)
    },
    addTarget (data) {
      console.log(data)
      if (data.accessKind && data.accessKind === 'U') { this.goProfile(data.accessKey) }
    },
    goProfile (userKey) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetType = 'bookMemberDetail'
      param.readOnlyYn = true
      param.userKey = userKey
      param.popHeaderText = '프로필'
      param.callbackFn = this.getCabList
      this.$emit('openPop', param)
    },
    updateFollower (data) {
      // this.
    },
    openPop (params) {
      this.$emit('openPop', params)
    },
    async getMCabContentsList () {
      var paramMap = new Map()
      var orderText = 'mcc.creDate DESC'
      paramMap.set('orderbyStr', orderText)
      paramMap.set('cabinetKey', this.parentData.accessKey)
      paramMap.set('jobkindId', 'USER')
      const result = await this.$commonAxiosFunction({
        url: 'https://www.hybric.net:9443/service/tp.getMCabContentsList',
        param: Object.fromEntries(paramMap)
      })
      const returnList = []
      result.data.forEach(element => {
        returnList.push(this.changeAccessObj(element))
      })
      return returnList
    },
    async getCabList () {
      if (this.propData.selectPopYn && this.mFollowDataList && this.mFollowDataList.length > 0) {
        if (this.propData.callbackFn) {
          this.propData.callbackFn()
        }
      }
      var paramMap = {}
      this.mFollowDataList = []
      paramMap.userKey = this.GE_USER.userKey
      // paramMap.searchDate = this.getDate(1)
      paramMap.sysCabinetCode = 'USER'
      var result = await this.$getTodoListGroupCab(paramMap, true)
      if (result.result) {
        console.log('result - todoList', result)

        const tempList = this.convertTargetData(result.user)
        const frList = this.convertTargetData(result.follower)
        const fList = this.convertTargetData(result.follow, true)
        // eslint-disable-next-line no-debugger
        debugger
        let fDispText = ''
        if (fList && fList.length > 0) {
          fList.forEach((element, index) => {
            fDispText += this.$changeText(element.accessName)
            if (index !== fList.length - 1) fDispText += ', '
          })
        }
        let frDispText = ''
        if (frList && frList.length > 0) {
          frList.forEach((element, index) => {
            frDispText += this.$changeText(element.accessName)
            if (index !== frList.length - 1) frDispText += ', '
          })
        }
        tempList.unshift(
          {
            accessKey: 0,
            accessKind: 'F',
            iconPath: require('@/assets/images/common/DFollowerIcon.svg'),
            accessName: 'KO$^$팔로워$#$EN$^$follower',
            accessDispComment: frDispText,
            cList: frList
          }
        )
        tempList.unshift(
          {
            accessKey: 1,
            accessKind: 'F',
            iconPath: require('@/assets/images/common/DFollowerIcon.svg'),
            accessName: 'KO$^$팔로잉$#$EN$^$following',
            accessDispComment: fDispText,
            cList: fList
          }
        )
        this.mFollowDataList.unshift(
          {
            tabIndex: 1,
            tabType: 'USER',
            tabName: '내주소록',
            targetList: tempList
          }
        )
        if (this.mChildOpenYn) {
          if (this.parentData) {
            const index = this.mFollowDataList[0].targetList.findIndex((item) => item.accessKind === this.parentData.accessKind && item.accessKey === this.parentData.accessKey)
            this.$refs.targetList.openChild({ accessKey: this.parentData.accessKey, accessKind: this.parentData.accessKind, cList: this.mFollowDataList[0].targetList[index].cList })
          }
        }
      }
    },
    convertTargetData (target, followYn) {
      console.log(target)
      if (target && target.length > 0) {
        const tempList = []
        target.forEach((value) => {
          const tempObj = {}
          if (!value.cabinetKey && value.userKey) {
            if (followYn) {
              tempList.push({
                accessKind: 'U',
                accessKey: value.targetKey,
                accessName: value.targetDispMtext,
                iconFullYn: true,
                iconPath: value.targetDomainPath
                  ? this.$changeUrlBackslash(
                    value.targetDomainPath + value.targetProfileImg
                  )
                  : value.targetProfileImg
              })
            } else {
              tempList.push({
                accessKind: 'U',
                accessKey: value.userKey,
                accessName: value.userDispMtext,
                iconFullYn: true,
                iconPath: value.domainPath
                  ? this.$changeUrlBackslash(
                    value.domainPath + value.userProfileImg
                  )
                  : value.userProfileImg
              })
            }
          } else {
            tempObj.accessKind = 'C'
            tempObj.accessKey = value.cabinetKey
            tempObj.iconPath = require('@/assets/images/editChan/icon_addressBook.svg')
            // targetList에 나타나는 아이콘을 원 안에 가득 채울지, 아닐지 결정하는 변수
            tempObj.iconFullYn = false
            tempObj.accessName = value.cabinetNameMtext
            if (value.mCabUserList && value.mCabUserList.length > 0) {
              const childTempList = []
              value.mCabUserList.forEach((value2) => {
                const childTempObj = {}
                childTempObj.accessKind = 'U'
                childTempObj.accessKey = value2.userKey
                childTempObj.iconFullYn = true

                childTempObj.mccKey = value2.mccKey
                childTempObj.iconPath = value2.domainPath
                  ? this.$changeUrlBackslash(
                    value2.domainPath + value2.userProfileImg
                  )
                  : value2.userProfileImg
                childTempObj.accessName = this.$changeText(value2.userDispMtext)
                childTempList.push(childTempObj)
              })
              tempObj.cList = childTempList
            } else {
              tempObj.cList = []
            }
            tempList.push(tempObj)
          }
        })
        return tempList
      }
    },
    // 채널 내 구독자를 개인 주소록에 추가하기 위한 팝업
    async getMyChannel () {
      this.mPlusMenuShowYn = false
      let tempList = []
      const param = {
        fUserKey: this.GE_USER.userKey,
        userKey: this.GE_USER.userKey,
        pageSize: 1000
      }
      const result = await this.$commonAxiosFunction({
        url: 'https://www.hybric.net:9443/service/tp.getUserTeamList',
        param: param
      })

      if (result.request.status !== 200) {
        this.$showToastPop('오류가 발생했습니다. 다시 시도해주세요.')
        return
      } else {
        // selectTargetPop에 필요한 데이터 형태로 만들기 위한 작업
        const resultData = result.data.content
        tempList = resultData.map(value => {
          return {
            accessKind: 'T',
            accessKey: value.teamKey,
            iconPath: value.logoDomainPath ? this.$changeUrlBackslash(value.logoDomainPath + value.logoPathMtext) : value.logoPathMtext,
            accessName: this.$changeText(value.nameMtext),
            cListCount: value.followerCount,
            iconFullYn: true
          }
        })
        this.mChildYn = false
        this.mSelectPopData = [
          {
            targetList: tempList
          }
        ]
      }

      this.mSelectTargetPopShowYn = true
    },
    async followTargetList (data) {
      const mSaveFollowerParam = {}
      const targetKeyList = []
      data.forEach(async (value) => {
        targetKeyList.push(value.accessKey)
      })
      mSaveFollowerParam.targetKeyList = targetKeyList
      mSaveFollowerParam.targetKind = 'U'
      mSaveFollowerParam.userKey = this.GE_USER.userKey
      mSaveFollowerParam.userName = this.$changeText(this.GE_USER.userDispMtext)
      const result = await this.$changeFollower({ follower: mSaveFollowerParam, doType: 'FL' }, 'save')
      if (result.result) {
        if (this.propData.selectPopYn) {
          if (this.propData.callbackFn) {
            this.propData.callbackFn()
          }
        }
        const returnList = await this.getFollowerList(1)
        if (returnList) {
          this.$refs.targetList.openChild({ accessKey: this.parentData.accessKey, accessKind: this.parentData.accessKind, cList: returnList })
        }
      }
    },
    async followTarget (fYn) {
      const mSaveFollowerParam = {}
      mSaveFollowerParam.targetKey = this.mUserInfo.userKey
      mSaveFollowerParam.targetKind = 'U'
      mSaveFollowerParam.userKey = this.GE_USER.userKey
      mSaveFollowerParam.userName = this.$changeText(this.GE_USER.userDispMtext)
      let result = null
      if (fYn) {
        result = await this.$changeFollower({ follower: mSaveFollowerParam, doType: 'FL' }, 'save')
      } else {
        result = await this.$changeFollower({ follower: mSaveFollowerParam, doType: 'FL' }, 'del')
      }
      console.log(result)
      if (result) {
        const returnList = await this.getFollowerList(1)
        this.$refs.targetList.openChild({ accessKey: this.parentData.accessKey, accessKind: this.parentData.accessKind, cList: returnList })
        if (this.propData.selectPopYn) {
          if (this.propData.callbackFn) {
            this.propData.callbackFn()
          }
        }
      }
    },
    changeAccessObj (data) {
      if (data.accessKey && data.accessKind) return data
      let accessObj = {
        accessKey: null,
        accessKind: null,
        iconPath: null,
        accessName: null,
        cList: [
          /* {
            accessKind: 'U',
            accessKey: 1,
            iconPath: require('../../assets/images/push/userIcon.svg'),
            accessName: '백지수'
          } */
        ]
      }
      if (data.cabinetKey && !data.userKey) {
        if (data.mCabUserList) {
          if (data.mCabUserList && data.mCabUserList.length > 0) {
            const childTempList = []
            data.mCabUserList.forEach((value2) => {
              const childTempObj = {}
              childTempObj.accessKind = 'U'
              childTempObj.accessKey = value2.userKey
              childTempObj.iconFullYn = true
              childTempObj.mccKey = value2.mccKey
              childTempObj.iconPath = value2.domainPath
                ? this.$changeUrlBackslash(
                  value2.domainPath + value2.userProfileImg
                )
                : value2.userProfileImg
              childTempObj.accessName = this.$changeText(value2.userDispMtext)
              childTempList.push(childTempObj)
            })
            data.mCabUserList = childTempList
          } else {
            data.mCabUserList = []
          }
        }
        accessObj = {
          accessKey: data.cabinetKey,
          accessKind: 'C',
          iconPath: require('@/assets/images/editChan/icon_addressBook.svg'),
          accessName: this.$changeText(data.cabinetNameMtext),
          cList: data.mCabUserList
        }
      } else {
        if (this.parentData.accessKey === 1 || data.followerYn !== undefined) {
          accessObj = {
            accessKey: data.targetKey,
            accessKind: 'U',
            mccKey: data.mccKey,
            iconFullYn: true,
            accessDispComment: data.followerYn ? '서로 팔로우하는 사람' : '내가 팔로우하는 사람',
            accessType: this.parentData.accessKey,
            iconPath: data.targetDomainPath
              ? this.$changeUrlBackslash(
                data.targetDomainPath + data.targetProfileImg
              )
              : data.targetProfileImg,
            accessName: this.$changeText(data.targetDispMtext)
          }
        } else if (this.parentData.accessKey === 0 || data.followerYn === undefined) {
          accessObj = {
            accessKey: data.userKey,
            accessKind: 'U',
            mccKey: data.mccKey,
            iconFullYn: true,
            accessDispComment: data.followingYn ? '서로 팔로우하는 사람' : '나를 팔로우하는 사람',
            accessType: data.followingYn ? 1 : this.parentData.accessKey,
            iconPath: data.domainPath
              ? this.$changeUrlBackslash(
                data.domainPath + data.userProfileImg
              )
              : data.userProfileImg,
            accessName: this.$changeText(data.userDispMtext)
          }
        }
      }
      return accessObj
    },
    async getUserCabinetList () {
      const param = {}
      // param.creUserKey = this.GE_USER.userKey
      param.targetKind = 'U'
      param.targetKey = this.GE_USER.userKey
      const result = await this.$gGetUserCabinetList(param)
      if (result.result) {
        if (result.cabinet) {
          const returnList = []
          result.cabinet.forEach(element => {
            returnList.push(this.changeAccessObj(element))
          })
          returnList.unshift({
            accessKey: 0,
            accessKind: 'F',
            iconPath: require('@/assets/images/common/DFollowerIcon.svg'),
            accessName: 'KO$^$팔로워$#$EN$^$follower',
            cList: []
          })
          returnList.unshift({
            accessKey: 1,
            accessKind: 'F',
            iconPath: require('@/assets/images/common/DFollowerIcon.svg'),
            accessName: 'KO$^$팔로잉$#$EN$^$following',
            cList: []
          })
          this.mFollowDataList[0].targetList = returnList
        }
      }
    },
    async getFollowerList (accessType) {
      const param = new Map()
      param.set('targetKind', 'U')
      if (accessType === 0) {
        param.set('targetKey', this.GE_USER.userKey)
      } else if (accessType === 1) {
        param.set('userKey', this.GE_USER.userKey)
      }
      const result = await this.$gGetOnlyFollowerList(param)
      if (result && result.content) {
        const returnData = []
        result.content.forEach(element => {
          returnData.push(this.changeAccessObj(element))
        })
        if (this.mSelectedTab === '팔로워') {
          returnData.forEach(f => {
            console.log(f)
            if (!f.followingYn) f.accessType = 0
          })
          // this.mFollowDataList[1].targetList = returnData
        } else if (this.mSelectedTab === '팔로잉') {
          returnData.forEach(f => {
            console.log(f)
            if (!f.followerYn) f.accessType = 1
          })
          // this.mFollowDataList[0].targetList = returnData
        }
        return returnData
      }
    },
    getSelectTabObj () {
      this.mFollowDataList.forEach(value => {
        if (value.tabName === this.mSelectedTab) {
          return value
        }
      })
    },
    async openSelectFollowPop (type) {
      // this.mFollowDataList.forEach(value => {
      //   if (value.tabName === type) {
      //     this.mSelectPopData = [
      //       {
      //         targetList: value.targetList
      //       }
      //     ]
      //   }
      // })
      this.mChildYn = true
      this.mSelectPopData = await this.getFollowerList(1)
      this.mSelectTargetPopShowYn = true
    },
    closeSelectTargetPop () {
      this.mSelectTargetPopShowYn = false
    },
    creAddressPop () {
      var cabinet = {}
      var param = {}
      param.targetType = 'creAddressBook'
      param.popHeaderText = '주소록 생성'
      param.newAddressYn = true
      // cabinet.cabinetNameMtext = await this.$checkSameName(this.mEditBookList, this.$t('COMMON_NAME_ADDRBOOK'))
      cabinet.cabinetNameMtext = '개인 주소록'
      cabinet.sysCabinetCode = 'USER'
      cabinet.targetKind = 'U'
      cabinet.targetKey = this.GE_USER.userKey
      cabinet.menuType = 'G'
      param.cabinet = cabinet
      this.$emit('openPop', param)
    },
    editBook (params) {
      var param = {}
      param.targetType = 'creAddressBook'
      param.popHeaderText = '주소록 수정'
      param.newAddressYn = false
      // param.cabinet = data
      this.$emit('openPop', param)
    },
    // 주소록 클릭 시 보여지는 유저 리스트가 화면에 있는지 없는지 판단하여 유저 추가 버튼을 보여줄지 여부를 판단
    childCheck (data) {
      if (!data || (data !== undefined && data === false)) {
        this.mChildOpenYn = false
        this.mSubOption = ''
        this.mPlusMenuShowYn = false
      } else {
        this.mChildOpenYn = true
        console.log(data)
        this.parentData = data
        const index = this.mFollowDataList[0].targetList.findIndex((item) => item.accessKind === data.accessKind && item.accessKey === data.accessKey)
        this.mFollowDataList[0].targetList[index].cList = data.cList
        if (data && data.accessKind !== 'F') {
          this.mSubOption = 'EDIT'
        }
      }
    },
    changeTab (tab) {
      this.mSelectedTab = tab
      this.mFollowDataList.forEach(value => {
        if (value.tabName === tab) {
          if (value.func) {
            value.func()
          }
        }
      })

      this.mChildOpenYn = false
      this.mSubOption = ''
      this.mPlusMenuShowYn = false
    }
  },
  watch: {
    mChildOpenYn: {
      immediate: true,
      handler (val) {
        this.mHeaderTitle = this.$t('COMMON_NAME_MY_ADDERSS')
        if (val) {
          this.mHeaderTitle = this.parentData.accessName
        }
      },
      deep: true
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    GE_SELECTED_LIST () {
      if (this.parentData.accessKind === 'F') {
        return this.GE_FOLLOWING_LIST
      } else if (this.parentData.accessKind === 'C') {
        console.log(this.mFollowDataList)
        const index = this.mFollowDataList[0].targetList.findIndex((item) => item.accessKey === this.parentData.accessKey)
        if (index !== -1) {
          console.log(this.mFollowDataList[0].targetList[index])
          return this.mFollowDataList[0].targetList[index].cList ? this.mFollowDataList[0].targetList[index].cList : []
        }
      }
      return []
    },
    GE_FOLLOWING_LIST () {
      const returnData = []
      if (this.mFollowDataList && this.mFollowDataList.length > 0) {
        if (this.mFollowDataList[0].targetList && this.mFollowDataList[0].targetList.length > 0) {
          return this.mFollowDataList[0].targetList[0].cList
        } else {
          return returnData
        }
      } else {
        return returnData
      }
    }
  }
}
</script>
<style scoped>
.followListWrap {
  width: 100%;
  height: 100%;
}
.targetListWrap {
  position: relative;
}
</style>
