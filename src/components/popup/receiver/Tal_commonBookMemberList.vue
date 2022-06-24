<template>
<div class="receiverTeamMemberArea">
    <pageTopCompo v-if="this.propData.managerOpenYn" :titleText="teamInfo.teamNameMtext + ' 채널 매니저'" :selectPopYn="true" />
    <pageTopCompo v-else :titleText="teamInfo.teamNameMtext || this.$changeText(teamInfo.nameMtext) + ' > ' + propData.cabinetNameMtext" :selectPopYn="selectPopYn" :btnTitle="pageTopBtnTitle" @btnClick="changeEdit"  />
    <!-- <div v-if="editYn" @click="newAddMember" class="fl receiverTeamMemberCard" style="width:100%; height:60px; line-height: 40px;margin-bottom: 10px;">
        <p class="font15 commonBlack">+</p>
    </div> -->
    <div style="width: 100%; height: calc(100% - 30px); padding: 0 10px; margin-top: 10px; overflow: hidden scroll;">
        <draggable  ref="editableArea" class="ghostClass" :v-model="memberList" ghost-class="ghost" :disabled="dragable" delay="200" >
            <transition-group>
                <template v-for="(data, index) in memberList" :key='data'>
                    <div v-if="data.selectedYn !== true && (propData.managerOpenYn && data.managerKey) " class="receiverTeamMemberCard fl" :class="{foo:index === 0, selectLastMargin:selectPopYn=== true }" style="width:100%; height:60px; margin-bottom:10px; position: relative;" >
                        <div @click="!selectPopYn? openModiPop(data,index): ''" class="fl" style="width: calc(100% - 60px); height: 100%" >
                            <p class="fl font15 commonBlack mleft-1 receiverTeamText">{{this.$changeText(data.userDispMtext || data.userNameMtext)}}</p>
                            <div v-if="editYn || propData.managerOpenYn" @click="deleteMemberClick(data,index)" class="fl" style="background-color: rgb(242, 242, 242);  width:55px; height: 60px; line-height:60px; position:absolute; top:0; right: 0; ">
                                <img src="../../../assets/images/formEditor/trashIcon_gray.svg" style="width: 20px;" alt="">
                            </div>
                        </div>
                        <div @click="addSelectedList(data,index)" v-if="selectPopYn" class="fr" style="position: relative; height: 100%; width: 60px;">
                            <div style="background-color:#a9aacd; width:40px; height: 40px; border-radius: 100%; line-height:40px; position:absolute; top:40px; right: 5px; transform: translateY(-40px)">
                                <img style="width: 30px;" src="../../../assets/images/common/plusoutline.svg" alt="">
                            </div>
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
            pageTopBtnTitle: '편집'
        }
    },
    watch:{
    },
    async created(){
        console.log("#!@#!@#!!@# memberList")
        console.log(this.propData)

        var history = this.$store.getters.hStack
        history.push(this.popId)
        this.$store.commit('updateStack', history)

        if(this.propData.managerOpenYn === null || this.propData.managerOpenYn === undefined || this.propData.managerOpenYn === ''){

            await this.getBookMemberList()
            if(this.parentSelectList !== '' && this.parentSelectList.memberList) {
                this.selectedMemberList = this.parentSelectList.memberList
            }

        // this.memberList = this.propData.mCabUserList
            this.setParentSelectList()
        }else{
            await this.getFollowerList()
        }
        // this.memberList = this.listData
    },
    methods:{
        async refresh () {
            if(this.propData.managerOpenYn) 
                await this.getFollowerList()
            else
                await this.getBookMemberList()
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
        async getBookMemberList () {
            var paramMap = new Map()
            paramMap.set('cabinetKey', this.propData.cabinetKey)
            paramMap.set('jobkindId', 'USER')
            var result = await this.$commonAxiosFunction({
                url: '/tp.getMCabContentsList',
                param: Object.fromEntries(paramMap)
            })
            this.memberList = result.data
            this.dispNameChangeUserName()// dispName이 없을시 userName으로 대체
            // debugger
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
        async getFollowerList () {
            var paramMap = new Map()
            paramMap.set('teamKey', this.propData.currentTeamKey)
            // paramMap.set('followerType', 'M')
            var result = await this.$commonAxiosFunction({
                url: '/tp.getFollowerList',
                param: Object.fromEntries(paramMap)
            })
            console.log(result)
            this.memberList = result.data.content
            this.dispNameChangeUserName()// dispName이 없을시 userName으로 대체
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
            if(this.propData.managerOpenYn) {
                var param = {}
                console.log(data)
                param.userKey = data.userKey
                param.teamKey = data.teamKey
                var result = await this.$commonAxiosFunction({
                    url: '/tp.deleteManager',
                    param: param
                })    
            } else {
                var param = {}
                console.log(data)
                param.mccKey = data.mccKey
                param.jobkindId = data.jobkindId
                var result = await this.$commonAxiosFunction({
                    url: '/tp.deleteMCabContents',
                    param: param
                })
            }
            

            console.log(result)
            if(result.data === 'true' || result.data === true){
                this.memberList = []
                this.getBookMemberList()
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
        newAddMember(){
            this.newYn = false
            var data = new Object()
            data.targetType = 'bookMemberDetail'
            data.currentCabinetKey = this.propData.cabinetKey
            data.currentTeamKey = this.teamInfo.teamKey
            this.$emit('openAddPop',data)
            /* this.memberList.unshift({ userDispMtext: 'KO$^$새로운 구성원', grade: '구성원', creDate: undefined, email: '', phone: '' })

            // document.getElementsByClassName('foo')[0].style.backgroundColor = 'rgba(186, 187, 215, 0.5)'
            document.getElementsByClassName('foo')[0].style.backgroundColor = 'black'
            // debugger
            setTimeout(() => {
                document.getElementsByClassName('foo')[0].style.backgroundColor = ''
                // document.getElementsByClassName('foo')[0].classList.remove('foo')
            }, 800); */

        },
        addSelectedList (data,index) {
            this.memberList[index].selectedYn = true
            // data.shareSeq = ''+data.cabinetKey + data.userKey
            data.shareSeq = data.userKey
            this.selectedMemberList.push(data)
            this.$emit('changeSelectMemberList', this.selectedMemberList)
        },

        updateData(obj){
            // obj -> prop으로 보낸 data에 수정을 직접해서 다시 $emit으로 받음
            this.addMemberPopYn = false
        }

    }
}
</script>

<style >

.receiverTeamMemberArea{float: left;  width: 100%; }
/* .receiverTeamMemberCard{display: flex; flex-direction: row; align-items: center; justify-content: space-between; border-bottom:1px solid #eee;  padding: 0.7rem 0} */
.receiverTeamMemberCard {border-bottom:1px solid #eee; background: #6768a712; border-radius: 8px; padding: 0.7rem 0;box-shadow: 0px 1px 5px 0px #ccc;}
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
