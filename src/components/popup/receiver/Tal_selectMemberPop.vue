<template>
<div style="height: 100%; width:100%;">
    <div class="" style="width:100%; height:calc(100% - 50px); margin-top:50px" >
        <memberListCompo :listData="memberList" ref="memberListCompo" class="fl" style="height:50%; background-color:white;" :parentSelectList="pList" :selectPopYn="true" @changeSelectMemberList="changeSelectMemberList" :teamInfo="propData" :propData="propData" />
        <selectedListCompo @openAddPop="openNewMemberPop" :selectMemberPopYn="true" ref="selectedListCompo" :currentTeamKey="this.propData.currentTeamKey" class="fl" style="height:50%;" @changeSelectedList="changeSelectedList" :listData='selectedList' :btnVisible='true' @btnClick='setManager' />
    </div> <!-- this.propData.selectMemberType==='member'? true:false -->

    <gConfirmPop :confirmText="this.propData.selectMemberType === 'member'? '구성원을 추가하시겠습니까?': '매니저를 추가하시겠습니까?'" confirmType='two' @no='confirmPopShowYn = false' @ok="saveMember" v-if="confirmPopShowYn"/>

</div>
</template>

<script>
/* eslint-disable */
// eslint-disable-next-line
import memberListCompo from './Tal_commonBookMemberList.vue'
import selectedListCompo from './Tal_selectedReceiverList.vue'
export default {
    props : {
        propData:{},
        pSelectedList:{},
    },
    data () {
        return{
            memberList: [],
            selectedList:[{memberList:[],}],
            pList:[{memberList:[]}],
            receiverTitle:'신청 목록',
            confirmPopShowYn:false,
            confirmText : '',
            directAddMemList: []

        }
    },
    created () {

        var a = {}
        this.getFollowerList()
        a.memberList = this.pSelectedList
        this.propData.memberListOpen = true
        this.pList = a
        // alert(JSON.stringify(this.pList))
    },
    components:{memberListCompo,selectedListCompo},
    methods : {
        changeDirectMemList (data) {
            this.directAddMemList.push(data)
            if(this.selectedList.memberList) {
            } else {
                this.selectedList.memberList = []
            }
            this.selectedList.memberList.push(data)
            this.$refs.selectedListCompo.upDatePage()
        },
        async getFollowerList () {
            var paramMap = new Map()

            paramMap.set('teamKey', this.propData.currentTeamKey)
            paramMap.set('memberYn', true)
            // paramMap.set('followerType', 'M')
            var result = await this.$commonAxiosFunction({
                url: '/tp.getFollowerList',
                param: Object.fromEntries(paramMap)
            })
            this.memberList = result.data.content
            if (this.memberList) { 
                for (var i = this.memberList.length - 1; i >= 0; i --) {
                    var tttt = this.memberList[i]
                    if(this.propData.selectMemberType === 'manager') {
                        if (this.memberList[i].managerKey !== undefined && this.memberList[i].managerKey !== null && this.managerKey !== ''){
                            this.memberList.splice(i, 1)
                        }
                    } else if (this.propData.selectMemberType === 'member') {
                        var tttt = this.pSelectedList 
                        debugger
                        if (this.pSelectedList && this.pSelectedList.length > 0) {
                            for (var p = 0; p < this.pSelectedList.length; p ++) {
                                if(this.pSelectedList[p].userKey === this.memberList[i].userKey) {
                                    this.memberList.splice(i, 1)
                                }
                            }
                        }
                    }

                    if(this.memberList[i] !== undefined && this.memberList[i] !== null && this.memberList[i] !== '') {
                        this.memberList[i].selectedYn = false
                        if(this.memberList[i].userDispMtext !== undefined && this.memberList[i].userDispMtext !== null && this.memberList[i].userDispMtext !== '') {
                        } else {
                            this.memberList[i].userDispMtext = this.memberList[i].userNameMtext
                        }
                    }
                }
            }
        },
        openNewMemberPop () {
            this.newYn = true
            var param = {}
            param.targetType = 'bookMemberDetail'

            param.currentCabinetKey = this.propData.cabinetKey
            param.currentTeamKey = this.propData.currentTeamKey
            param.newMemYn = true
            this.$emit('openPop', param)
        },
        changeSelectMemberList (data) {
            // alert(JSON.stringify(data))
            this.selectedList.memberList = data
            if (this.directAddMemList && this.directAddMemList.length > 0) {
                const newArr = [
                ...this.selectedList.memberList,
                ...this.directAddMemList
                ]
                this.selectedList.memberList = newArr
            }
            this.$refs.selectedListCompo.upDatePage()
        },
        changeSelectedList (data) {
            var changeList = data.memberList
            for(var m = 0; m < this.memberList.length; m ++) {
                this.memberList[m].selectedYn = false
                for(var c = 0; c < changeList.length; c++) {
                    if (changeList[c].userKey === this.memberList[m].userKey) {
                        this.memberList[m].selectedYn = true
                    }
                }
            }
            // this.$refs.memberListCompo.deSelectList(data.index)
        },
        refresh () {
            this.getFollowerList()
        },
        
        async saveMember () {
            var userKeyList = []
            var param = new Object()
            var result
            for (var i =0; i < this.memberList.length; i ++) {
                if(this.memberList[i].selectedYn) {
                    userKeyList.push(this.memberList[i].userKey)
                }
            }
        
            if (this.propData.selectMemberType === 'manager') {
                param.teamKey = this.propData.currentTeamKey
                if (userKeyList && userKeyList.length > 0) {
                    param.userKeyList = userKeyList
                    result = await this.$commonAxiosFunction({
                        url: '/tp.saveManager',
                        param: param
                    })
                }
                debugger
                if(this.directAddMemList && this.directAddMemList.length > 0) {
                    var follower = null
                    for (var u = 0; u < this.directAddMemList.length; u ++) {
                        follower = new Object()
                        param = new Object()
                        follower.teamKey = this.propData.currentTeamKey

                        follower.inEmail = this.directAddMemList[u].userEmail
                        follower.inPhone = this.directAddMemList[u].userPhone
                        follower.inUserName = this.$changeText(this.directAddMemList[u].userDispMtext)
                        param.follower = follower
                        console.log(param)
                        result = await this.$commonAxiosFunction({
                            url: '/tp.saveManager',
                            param: param
                        })
                    }
                }
                
                
            } else {
                var mCabContents = null 
                if (userKeyList && userKeyList.length > 0) {
                    param.userKeyList = userKeyList
                    param.cabinetKey = this.propData.cabinetKey
                    param.targetKey = this.propData.currentTeamKey
                    await this.$saveMCabContents(param)
                }
                /* if(userKeyList && userKeyList.length > 0) {
                    for (var i = 0; i < userKeyList.length; i++) {
                        param = new Object()
                
                        mCabContents = new Object()
                        mCabContents.jobkindId = 'USER'
                        mCabContents.cabinetKey = this.propData.cabinetKey
                        mCabContents.targetKey = this.propData.currentTeamKey
                        mCabContents.ownUserKey = userKeyList[i]
                        param.mCabContents = mCabContents
                        result = await this.$saveMCabContents(param)
                    }
                } */
                if(this.directAddMemList && this.directAddMemList.length > 0) {
                    for (var u = 0; u < this.directAddMemList.length; u ++) {
                        mCabContents = new Object()
                        param = new Object()
                        mCabContents.jobkindId = 'USER'
                        mCabContents.cabinetKey = this.propData.cabinetKey
                        mCabContents.targetKey = this.propData.currentTeamKey

                        mCabContents.inEmail = this.directAddMemList[u].userEmail
                        mCabContents.inPhone = this.directAddMemList[u].userPhone
                        mCabContents.inUserName = this.$changeText(this.directAddMemList[u].userDispMtext)
                        param.mCabContents = mCabContents
                        console.log(param)
                        var result = await this.$saveMCabContents(param)
                    }
                }
                
            }
            
            this.confirmPopShowYn = false
            this.$emit('closeXPop', true)
            /* if (result.data.result === true && result.data.message === 'OK') {
                this.$emit('closeXPop', true)
            } */
        },
        backClick(){
            hStack = hStack.filter((element, index) => index < hStack.length - 1)
            this.$store.commit('setRemovePage', removePage)
            this.$store.commit('updateStack', hStack)
            this.$emit('closeXPop', true)
        },
        async setManager (list) {
            this.confirmPopShowYn = true
        },

    }
}
</script>

<style>

</style>