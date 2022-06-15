<template>
<div style="width: 100%; min-height: 300px; background: #ccc; padding: 10px;" class="">
    <div class="mbottom-1" style="width: 100%; height: 30px;">
        <p class="textLeft fontBold font16 fl">선택된 리스트</p>
        <gBtnSmall class="fr" btnTitle='담기' @click="sendReceivers"  />
    </div>

    <!-- <div v-if="editYn" @click="newAddTeam"  class="fl receiverTeamMemberCard" style="width:100%; min-height: 60px; line-height: 40px;margin-bottom: 10px;">
        <p class="font15 commonBlack">+</p>
    </div> -->
    <div v-for="(team, index) in teamList.bookList" :key='index' class=" fl"  style="padding: 0 10px; margin-right: 5px; margin-bottom: 5px; backgrouhnd: #fff; border: 1px solid #000; border-radius: 5px;" >
        <p class="fl font15 commonBlack">{{'그룹: ' + team.cabinetNameMtext}}</p>
        <span class="fr" @click="removeSelectedYn('book',index)">x</span>
    </div>
    <div v-for="(member, index) in teamList.memberList" :key='index' class=" fl"  style="padding: 0 10px; margin-right: 5px; margin-bottom: 5px; backgrouhnd: #fff; border: 1px solid #000; border-radius: 5px;"  >
        <p class="fl font15 commonBlack">{{'개인: ' + this.$changeText(member.userDispMtext)}}</p>
    </div>
            <!-- <div v-for="(data, index) in listData" :key='index' class="receiverTeamListCard fl" @click="clickList(data)" style="width:100%; height:4rem; margin-bottom:10px; "  > -->
</div>
</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next'
/* eslint-disable */
// eslint-disable-next-line
export default {
    props:{
        listData:{},
    },
    data(){
        return{
            upTxt:'>',
            downTxt:'<',
            editTeamName:'',
            editNameYn:null,
            teamList: {},
            dragging: false
        }
    },
    created () {
        this.teamList = this.listData
    /* this.teamList = {
        bookList: [
            {cabinetNameMtext: '팀플 주소록', cabinetKey: 10, creTeamKey: 200},
            {cabinetNameMtext: '팀플 주소록', cabinetKey: 10, creTeamKey: 200},
            {cabinetNameMtext: '팀플 주소록', cabinetKey: 10, creTeamKey: 200},
            {cabinetNameMtext: '팀플 주소록', cabinetKey: 10, creTeamKey: 200}
        ],
        memeberList: [
            {userDispMtext: 'KO$^$수망고', userKey: 1},
            {userDispMtext: 'KO$^$수망고', userKey: 1},
            {userDispMtext: 'KO$^$수망고', userKey: 1},
            {userDispMtext: 'KO$^$수망고', userKey: 1}
        ]
    } */
    },
    components: {
        draggable: VueDraggableNext
    },
    // computed: {
    //     setTotalHeight () {
    //         return {
    //             '--scrollHeight' : this.teamList.length * 70 + 20 + 'px'
    //         }
    //     }
    // },
    methods:{
        sendReceivers() {
            this.$emit('btnClick', this.teamList)
        },
        removeSelectedYn(type, index) {
            if(type === 'book') {
                this.teamList.bookList.splice(index, 1)
            } else if(type === 'member') {
                this.teamList.memberList.splice(index, 1)
            }
            this.$emit('changeSelectedList', this.teamList)
        },
        teamPlusClick(data, index){
            // const obj = new Object();
            // obj.data = data;
            // obj.index = index
            // this.teamList.splice(index, 1)
            // this.$emit('selectTeam', obj);
        },
        clickList(data){
            // if(this.selectPopYn !== true)
            // this.$emit('openDetail',data) // alert(data.reveiverTeamName)
        },
        deleteTeamClick(data,index){

            // this.teamList.splice(index, 1)
        },
        editClick(data, index){
            // var editTeamName = document.getElementById(index)
            // if(this.editNameYn === index){
            //     this.editNameYn = null
            //     data.reveiverTeamName = editTeamName.value
            // }else{
            //     this.editNameYn = index
            //     editTeamName.value = data.reveiverTeamName
            // }
        },
        newAddTeam(){
            // this.editNameYn = null
            // var addlistData = []

            // const newList = [
            //     ...addlistData,
            //     ...this.teamList
            // ]
            // this.memberList.team.unshift({ name: '새로운 구성원', grade: '구성원', creDate: undefined, email: '', phone: '' })
            // this.teamList.unshift({receiverTeamColor:'#ff9999', reveiverTeamName: '새로운 그룹',team:[]})
            // this.editNameYn = 0
            // document.getElementById(0).focus()
        }
    }

}
</script>

<style >
/* .receiverTeamListCard{display: flex; flex-direction: row; align-items: center; justify-content: space-between; border-bottom:1px solid #eee;  padding: 0.7rem 0} */

.receiverTeamText{ height:40px; line-height:40px;}
.receiverTeamSubscImg{width: 12px;}

.fontBold{font-weight: bold;}
.trans90{transform:rotate(270deg)}
/* .movePointerArea{
    transform: scaleY(1.7);
        margin-top: 0.1rem;
} */

/* .widthPop{
    width:80% !important;
} */
.editmLeft{
    margin-left: 30px;
}
.selPopFl{
    float:left;
    margin-left: 1rem;
}
</style>
