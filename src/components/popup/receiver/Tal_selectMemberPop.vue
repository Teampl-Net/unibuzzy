<template>
<div style="height: 100vh; background-color:white; width:100vw; z-index:9999; position:absolute; top:0; left:0">

    <div class="" style="width:100%; height:calc(100% - 50px); margin-top:50px" >
        <memberListCompo :listData="memberList" ref="memberListCompo" class="fl" style="height:50%; background-color:white;" :parentSelectList="pList" :selectPopYn="true" @changeSelectMemberList="changeSelectMemberList" :teamInfo="propData" :propData="propData" />
        <selectedListCompo ref="selectedListCompo" class="fl" style="height:50%;" @changeSelectedList="changeSelectedList" :listData='selectedList' :btnVisible='true' @btnClick='setManager' />
    </div>

    <gConfirmPop confirmText='구성원을 추가하시겠습니까?' confirmType='two' @no='confirmPopShowYn = false' @ok='saveManager' v-if="confirmPopShowYn"/>

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
            confirmText : ''

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
                    debugger
                    if (this.memberList[i].memberYn !== undefined && this.memberList[i].memberYn !== null && (this.memberList[i].memberYn === 1 || this.memberList[i].memberYn === '0')){
                        /* this.memberList.splice(i, 1) */
                    }
                    else {
                        this.memberList[i].selectedYn = false
                        if(this.memberList[i].userDispMtext !== undefined && this.memberList[i].userDispMtext !== null && this.memberList[i].userDispMtext !== '') {
                        } else {
                            this.memberList[i].userDispMtext = this.memberList[i].userNameMtext
                        }
                    }
                }
            }
        },
        changeSelectMemberList (data) {
            // alert(JSON.stringify(data))
            this.selectedList.memberList = data
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
        /* teamKey,
			userKey,
			grantUserKey,
			ownerYn,
			grantDate */
        async saveManager () {
            var userKeyList = []
            var param = null
            var mCabContents = null 
            for (var i =0; i < this.memberList.length; i ++) {
                if(this.memberList[i].selectedYn) {
                    userKeyList.push(this.memberList[i].userKey)
                }
            }
            for (var i = 0; i < userKeyList.length; i++) {
                param = new Object()
        
                mCabContents = new Object()
                mCabContents.jobkindId = 'USER'
                mCabContents.cabinetKey = this.propData.currentCabinetKey
                mCabContents.targetKey = userKeyList[i]
                param.mCabContents = mCabContents
                var result = await this.$saveMCabContents(param)
                
                console.log(result)
                if (result.data.result === true) {
                    if (result.data.message === 'OK') {
                        
                    } else {
                        alert('ERROR')
                    }
                }
            }
            
            this.confirmPopShowYn = false

            this.$emit('closeXPop')
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