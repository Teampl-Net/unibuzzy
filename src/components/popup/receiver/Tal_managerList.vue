<template>
<div style="height: 100vh; background-color:white; width:100vw; z-index:9999; position:absolute; top:0; left:0">

    <popHeader @closeXPop="backClick" class="headerShadow" :headerTitle="receiverTitle" :managerBtn='true' @sendOk='setManager' />
    <div class="" style="width:100%; height:calc(100% - 50px); margin-top:50px" >
        <memberList ref="memberListCompo" class="fl" style="height:50%; background-color:white;" :parentSelectList="pList" :selectPopYn="true" @changeSelectMemberList="changeSelectMemberList" :teamInfo="propData" :propData="propData" />
        <selectedListCompo ref="selectedListCompo" class="fl" style="height:50%;" @changeSelectedList="changeSelectedList" :listData='selectedList' :btnVisible='false' />
    </div>

    <gConfirmPop :confirmText='confirmText' confirmType='timeout' @no='confirmPopShowYn = false' @ok='saveMember' v-if="confirmPopShowYn"/>

</div>
</template>

<script>
/* eslint-disable */
// eslint-disable-next-line
import memberList from './Tal_commonBookMemberList.vue'
import selectedListCompo from './Tal_selectedReceiverList.vue'
export default {
    props : {
        propData:{},
        pSelectedList:{},
    },
    data () {
        return{
            selectedList:[{memberList:[],}],
            pList:[{memberList:[]}],
            receiverTitle:'신청 목록',
            confirmPopShowYn:false,
            confirmText : ''

        }
    },
    created () {
        var a = {}
        a.memberList = this.pSelectedList
        this.propData.managerListOpen = true
        this.pList = a
        // alert(JSON.stringify(this.pList))
    },
    components:{memberList,selectedListCompo},
    methods : {
        changeSelectMemberList (data) {
            // alert(JSON.stringify(data))
            this.selectedList.memberList = data
            this.$refs.selectedListCompo.upDatePage()
        },
        changeSelectedList (data) {
            alert(JSON.stringify(data.index))
            this.$refs.memberListCompo.deSelectList(data.index)

        },
        backClick(){
            this.$emit('closeXPop')
        },
        async setManager () {
            var param = {}
            var mCabContents = new Object()
            console.log(this.propData)
            console.log(this.selectedList.memberList)
            param.teamKey = this.propData.currentTeamKey
            param.userKey = this.selectedList.memberList[0].userKey
            param.followerKey = this.selectedList.memberList[0].followerKey
            param.memberYn = this.selectedList.memberList[0].memberYn
            // param.inUserName = this.$changeText(this.selectedList.memberList[0].userDispMtext)
            // console.log("$$$$$$")
            // console.log(this.selectedList)
            // console.log("######")
            // console.log(param)
            var result = await this.$commonAxiosFunction({
                url: '/tp.saveManager',
                param: param
            })
            if (result.data.result === true) {
                if(result.data.message === 'OK') {
                    this.$emit('closeXPop', true)
                } else {
                    this.confirmText = result.data.message
                    this.confirmPopShowYn = true
                }
            }
            console.log(result)
            this.$emit('end',this.selectedList)
        },

    }
}
</script>

<style>

</style>