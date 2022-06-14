<template>
<div class="receiverTeamMemberArea">
    <pageTopCompo :titleText="this.$changeText(teamInfo.value.nameMtext) + ' > ' + propData.cabinetNameMtext" :btnTitle="'편집'" @btnClick="changeEdit" :dataLength="memberList.length" />
    <!-- <div v-if="editYn" @click="newAddMember" class="fl receiverTeamMemberCard" style="width:100%; height:60px; line-height: 40px;margin-bottom: 10px;">
        <p class="font15 commonBlack">+</p>
    </div> -->
    <div style="width: 100%; height: calc(100% - 60px); padding: 0 10px; margin-top: 10px;">
        <draggable  ref="editableArea" class="ghostClass" :v-model="memberList" ghost-class="ghost" :disabled="dragable" delay="200" >
            <transition-group>
                <div @click="openModiPop(data,index)" v-for="(data, index) in memberList" :key='index' class="receiverTeamMemberCard fl" style="width:100%; height:60px; margin-bottom:10px; position: relative;" >
                    <p class="fl font15 commonBlack mleft-1 receiverTeamText">{{this.$changeText(data.userDispMtext)}}</p>
                    <div v-if="editYn" @click="deleteMemberClick(data,index)" class="fl" style="background-color: rgb(242, 242, 242);  width:55px; height: 60px; line-height:60px; position:absolute; top:0; right: 0; ">
                        <img src="../../../assets/images/formEditor/trashIcon_gray.svg" style="width: 20px;" alt="">
                    </div>
                </div>
            </transition-group>
        </draggable>
    </div>
    <div class="btnPlus" btnTitle="추가" @click="newAddMember" ><p style="font-size:40px;">+</p></div>
    <addTeamMember v-if="addMemberPopYn" :newYn="newYn" @closePop='addMemberPopYn = false' :setEditMember='editMember' @updateMember='updateData' />
</div>

</template>

<script>
import pageTopCompo from './Tal_commonBookTitle.vue'
/* eslint-disable */
// eslint-disable-next-line
import addTeamMember from './Tal_addReceiverTeamMember.vue'
export default {
    components: {addTeamMember,pageTopCompo},
    props: {
        teamInfo: {},
        listData: {},
        propData: {}
    },
    data () {
        return {
            memberList: [],
            teamColor : '',
            editYn: false,
            addMemberPopYn: false,
            editMember: {},
            dragable: false,
            newYn: true
        }
    },
    watch:{
    },
    created(){
        // alert(JSON.stringify(this.teamInfo ))
        this.memberList = this.propData.mCabUserList
        if (this.memberList) { // dispName이 없을시 userName으로 대체
            for (var i =0; i < this.memberList.length; i ++) {
                if(this.memberList[i].userDispMtext !== undefined && this.memberList[i].userDispMtext !== null && this.memberList[i].userDispMtext !== '') {

                } else {
                    this.memberList[i].userDispMtext = this.memberList[i].userNameMtext
                }
            }
        }
        // this.memberList = this.listData
    },
    methods:{
        changeEdit () {
            if(this.editYn) {
                this.editYn = false
            } else {
                this.editYn = true
            }
        },
        deleteMemberClick(data, index){
            // alert(index)
            this.memberList.team.splice(index, 1)
        },
        openModiPop (data,index){
            // debugger
            data.index = index
            this.editMember = data
            // alert(JSON.stringify(this.editMember))
            this.newYn = false
            this.addMemberPopYn = true
        },
        newAddMember(){
            this.newYn = true
            this.addMemberPopYn = true
            /* this.memberList.team.unshift({ name: '새로운 구성원', grade: '구성원', creDate: undefined, email: '', phone: '' })

            document.getElementsByClassName('foo')[0].style.backgroundColor = 'rgba(186, 187, 215, 0.5)'
            setTimeout(() => {
                document.getElementsByClassName('foo')[0].style.backgroundColor = ''

            }, 800); */
        },

        updateData(obj){
            // obj -> prop으로 보낸 data에 수정을 직접해서 다시 $emit으로 받음
            this.addMemberPopYn = false
        }

    }
}
</script>

<style >

.receiverTeamMemberArea{float: left; margin-top: 10px; width: 100%; }
/* .receiverTeamMemberCard{display: flex; flex-direction: row; align-items: center; justify-content: space-between; border-bottom:1px solid #eee;  padding: 0.7rem 0} */
.receiverTeamMemberCard {border-bottom:1px solid #eee; background: #6768a712; border-radius: 8px; padding: 0.7rem 0;box-shadow: 0px 1px 5px 0px #ccc;}




.cBlack{
    color: black;
}

.selPopFr{
    float:right;
    margin-right: 4rem;

}

</style>
