<template>
<div class="receiverTeamMemberArea">
    <div v-if="editYn" @click="newAddMember" class="fl receiverTeamMemberCard" style="width:100%; height:60px; line-height: 40px;margin-bottom: 10px;">
        <p class="font15 commonBlack">+</p>
    </div>

    <div v-for="(data, index) in memberList.team" :key='index' class="receiverTeamMemberCard fl" style="width:100%; height:60px; margin-bottom:10px;" >

        <div class="fl" @click="editClick(data)" >
            <div class="fl movePointerArea" style="width:30px; background-color:#ddd" v-if="editYn"><p class="tB trans90 commonBlack " >{{upTxt}}</p><p class="tB trans90 commonBlack">{{downTxt}}</p> </div>
            <!-- <div class="fl receiverTeamColor" :style="{background:teamColor}"></div> -->
            <p class="fl font15 commonBlack mleft-1 receiverTeamText">{{data.name}}</p>
        </div >

        <div v-if="selectPopYn" class="fr" style="position: relative;">
            <div @click="memberPlusClick(data, index)" style="background-color: #a9aacd; width:40px; height: 40px; z-index: 9999; border-radius: 100%; line-height:40px; position:absolute; top:40px; right: 15px; transform: translateY(-40px)">
                <img style="width: 30px;" src="../../../assets/images/common/plusoutline.svg" alt="">
            </div>
        </div>

        <!-- <div class="fr"> -->
        <div class="fr mright-1" v-if="!editYn" style="" :class="{selPopFr: selectPopYn === true}" >
            <p class="fr font14 commonBlack" style="margin-right:10px; padding:0 5px; background-color:#BABBD780; border-radius:5px;">{{data.grade}}</p><br>
            <p class="fr font12 commonBlack " style="margin-right:10px">등록일 : {{this.$dayjs(data.creDate).format('YYYY-MM-DD')}}</p>
        </div>

        <div class="fr " v-else style="position: relative; ">
            <div @click="editClick(data,index)" class="fl" style="background-color:#ddd;  width:55px; height: 60px; line-height:60px; position:absolute; top:-0.7rem; right: 55px;">
                <img  src="../../../assets/images/common/editbtn.svg" >
            </div>
            <div @click="deleteTeamClick(data)" class="fl " style="background-color:#a9aacd;  width:55px; height: 60px; line-height:60px; position:absolute; top:-0.7rem; right: 0; ">
                <p class="cBlack tB">삭제</p>
            </div>
        </div>

    </div>

    <addTeamMember v-if="addMemberPopYn" @closePop='addMemberPopYn = false' :setEditMember='editMember' />
</div>

</template>

<script>
/* eslint-disable */
// eslint-disable-next-line
import addTeamMember from './Tal_addReceiverTeamMember.vue'
export default {
    components: {addTeamMember},
    props: {
        listData: {},
        editYn: {},
        selectPopYn: {}
    },
    data () {
        return {
            memberList: [],
            teamColor : '',
            upTxt: '>',
            downTxt: '<',
            addMemberPopYn: false,
            editMember: {},
        }
    },
    created(){
        this.memberList = this.listData
        // alert(this.selectPopYn)
        // this.memberList = listData.team
        // this.teamColor = this.listData.receiverTeamColor;
        // alert(this.listData.team)
    },
    methods:{
        clickMemberList(data){
            this.$emit('openMemberDetail',data) // alert(data.reveiverTeamName)
        },
        editClick(data,index){
            // alert(data)
            this.editMember = data
            this.addMemberPopYn = true

        },
        newAddMember(){
            this.memberList.team.unshift({ name: '새로운 구성원', grade: '구성원', creDate: undefined, email: '', phone: '' })

        },
        openModiMemberPop(){
            this.editMember=''
            this.addMemberPopYn = true

        },
        memberPlusClick(data, index){
            const obj = new Object();
            obj.group = this.listData.reveiverTeamName
            obj.data = data;
            obj.index = index
            this.listData.team.splice(index, 1)
            // alert(obj.data.reveiverTeamName)
            this.$emit('selectMember', obj);
        },
    }
}
</script>

<style >

.receiverTeamMemberArea{float: left; margin-top: 10px;}
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
