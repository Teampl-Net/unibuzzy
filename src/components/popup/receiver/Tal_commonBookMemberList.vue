<template>
<div class="receiverTeamMemberArea">
    <div style="width: 100%; height: calc(100% - 30px); margin-top: 10px; overflow: hidden scroll;">
        <draggable style="--webkit-tap-highlight-color: rgba(0,0,0,0);" ref="editableArea" class="ghostClass" :v-model="memberList" ghost-class="ghost" :disabled="dragable" delay="200" >
            <transition-group>
                <template v-for="(data, index) in listData" :key='data'>
                    <div class="receiverTeamMemberCard fl" :class="{foo:index === 0, selectLastMargin:selectPopYn=== true, selectedBox : data.selectedYn}" style="width:100%; height:60px; position: relative;" >
                    <!-- <div class="receiverTeamMemberCard fl" :class="{foo:index === 0, selectLastMargin:selectPopYn=== true }" style="width:100%; height:60px; margin-bottom:10px; position: relative;" > -->
                        <img src="../../../assets/images/main/main_subscriber.png" style="width: 20px; height: 20px; margin-left: 15px; margin-top: 10px;" class="fl"/>
                        <div @click="!selectPopYn? openModiPop(data,index): ''" class="fl" style="width: calc(100% - 100px); height: 100%;" >
                            <p class="fl font16 commonBlack mleft-1 receiverTeamText">{{this.$changeText(data.userDispMtext || data.userNameMtext)}}</p>
                        </div>
                        <div v-if=" !propData.selectMemberType === 'manager' || selectPopYn !== true" @click="deleteMemberClick(data,index)" class="fl" style="width:55px; height: 60px; line-height:60px; position:absolute; top:0; right: 0; ">
                            <img v-if="propData.value.creUserKey !== data.userKey" src="../../../assets/images/formEditor/trashIcon_gray.svg"  style="width: 20px;" alt="">
                            <img v-else src="../../../assets/images/channel/ownerChannel_crown.svg" alt="" style="width: 20px;  float: right; margin-right: 18px; margin-top: 20px;" class="fl">
                        </div>
                        <div v-if="selectPopYn === true" class="fr" style="position: relative; height: 100%; width: 60px;">
                            <img style="width: 30px;" src="../../../assets/images/common/plusoutline.svg" alt="" v-if="!data.selectedYn" @click="addSelectedList(data,index)" >
                            <img style="width: 30px;" src="../../../assets/images/common/Tal_checkImage.svg" alt="" v-else @click="checkClick(index)">
                        </div>
                    </div>
                </template>
            </transition-group>
        </draggable>
    </div>
    <!-- <addTeamMember v-if="addMemberPopYn" :newYn="newYn" @closePop='addMemberPopYn = false' :setEditMember='editMember' @updateMember='updateData' /> -->
</div>

</template>

<script>
import pageTopCompo from './Tal_commonBookTitle.vue'
/* eslint-disable */
// eslint-disable-next-line
// import addTeamMember from './Tal_addReceiverTeamMember.vue'
export default {
    components: {pageTopCompo},
    props: {
        teamInfo: {},
        listData: {},
        propData: {},
        selectPopYn: {},
        parentSelectList: {}
    },
    data () {
        return {
            popId: null,
            memberList: [],
            teamColor : '',
            editYn: false,
            addMemberPopYn: false,

            dragable: false,
            newYn: true,
            selectedMemberList: [],
            pageTopBtnTitle: '편집',
            selectIndex:[]
        }
    },
    beforeUnmount(){
        this.propData.managerListOpen = false
        this.propData.managerOpenYn = true
    },
    async created(){
        console.log('this.selectPopYn');
        console.log(this.selectPopYn);
        console.log('this.propData');
        console.log(this.propData);
        if(!this.propData.value)this.propData.value={}
        /* if(this.propData.managerOpenYn === null || this.propData.managerOpenYn === undefined || this.propData.managerOpenYn === ''){

            if(this.parentSelectList !== '' && this.parentSelectList.memberList) {
                this.selectedMemberList = this.parentSelectList.memberList
            }

        // this.memberList = this.propData.mCabUserList
            this.setParentSelectList()
        }else{
        } */
        // this.memberList = this.listData
    },
    methods:{
        async refresh () {
            if(this.propData.selectMemberType === 'manager')
                await this.getFollowerList()
            else
                this.$emit('refreshList')
        },
        setParentSelectList() {
            if(this.parentSelectList) {
                if (this.parentSelectList.memberList) {
                    for (var i = 0; i < this.memberList.length; i ++) {
                        this.memberList[i].selectedYn = false
                        for (var s = 0; s < this.parentSelectList.memberList.length; s ++) {
                            if (this.parentSelectList.memberList[s].userKey === this.memberList[i].userKey) {
                                this.memberList[i].selectedYn = true
                                break
                            }
                        }
                    }
                }
            }
        },
        dispNameChangeUserName(){
            if (this.memberList) { // dispName이 없을시 userName으로 대체
            for (var i =0; i < this.memberList.length; i ++) {
                if(this.memberList[i].userDispMtext !== undefined && this.memberList[i].userDispMtext !== null && this.memberList[i].userDispMtext !== '') {

                    } else {
                        this.memberList[i].userDispMtext = this.memberList[i].userNameMtext
                    }
                }
            }
        },
        changeEdit () {
            if(this.editYn) {
                this.editYn = false
                this.pageTopBtnTitle = '편집'
                this.$emit('editYn',this.editYn)
            } else {
                this.editYn = true
                this.pageTopBtnTitle = '닫기'
                this.$emit('editYn',this.editYn)
            }
        },
        async deleteMemberClick(data, index){
            if(this.propData.value.creUserKey !== data.userKey){
                if(this.propData.selectMemberType === 'manager') {
                    this.$emit('deleteManager', data)
                } else {
                    var param = {}
                    console.log(data)
                    param.mccKey = data.mccKey
                    param.jobkindId = data.jobkindId
                    var result = await this.$commonAxiosFunction({
                        url: '/api/tp.deleteMCabContents',
                        param: param
                    })
                    console.log(result)
                    if(result.data === 'true' || result.data === true){
                        this.memberList = []
                        this.$emit('refreshList')
                    }
                }



            }else{

            }
            // param.cabinetKey = data.cabinetKey

            // param.currentTeamKey = this.propData.currentTeamKey
            // param.menuType = data.menuType
            // this.memberList.splice(index, 1)

        },
        openModiPop (data,index){
            if(!this.editYn){
                this.newYn = false
                // this.addMemberPopYn = true
                data.targetType = 'bookMemberDetail'
                data.currentCabinetKey = this.propData.cabinetKey
                data.currentTeamKey = this.teamInfo.teamKey
                this.$emit('openAddPop',data)
            }
            // debugger
            // data.index = index
            // this.editMember = data
        },
        addSelectedList (data,index) {

            data.shareSeq = data.userKey
            this.selectedMemberList.push(data)
            this.$emit('changeSelectMemberList', this.selectedMemberList)
            this.listData[index].selectedYn = true
            // var tt = this.listData
            // debugger

        },
        checkClick () {
            alert('중복선택입니다.')
        },
        deSelectList (index) {
            this.listData[index].selectedYn = false
        },
        updateData(obj){

            this.addMemberPopYn = false
        }

    }
}
</script>

<style >
.selectedBox{background-color:#6768A720;}
.receiverTeamMemberArea{float: left;  width: 100%; }
/* .receiverTeamMemberCard{display: flex; flex-direction: row; align-items: center; justify-content: space-between; border-bottom:1px solid #eee;  padding: 0.7rem 0} */
.receiverTeamMemberCard {border-bottom:1px solid #ddd; padding: 0.7rem 0;}
/* .selectLastMargin :last-child{
    margin-bottom: 30px;
} */
.cBlack{
    color: black;
}

.selPopFr{
    float:right;
    margin-right: 4rem;

}

</style>
