<template>
<div style="width: 100%;" class="">
    <!-- <div v-if="editYn" @click="newAddTeam"  class="fl receiverTeamMemberCard" style="width:100%; height:60px; line-height: 40px;margin-bottom: 10px;">
        <p class="font15 commonBlack">+</p>
    </div> -->
<div v-for="(data, index) in teamList" :key='index' :class="{widthPop:selectPopYn===true}" class="receiverTeamListCard fl"  style="width:100%; overflow: hidden; height:60px; position: relative; margin-bottom:10px; "  >
    <!-- {{data.data.reveiverTeamName}} -->

    <div :style="{background:data.receiverTeamColor}"  :class="{editmLeft:editYn === true}" class="fl receiverTeamColor"></div>
    <div @click="clickList(data)" class="fl h-100P">
        <p v-if="data.data.name" class="fl font15 commonBlack mleft-1 receiverTeamText">{{data.data.name}}</p>
        <p v-else class="fl font15 commonBlack mleft-1 receiverTeamText">{{data.data.reveiverTeamName + ' (' + data.data.team.length + ')'}}</p>

    </div>

    <div  @click="teamPlusClick(data, index)" class="fr" style="position: relative; width:20%">
        <div style="background-color:#a9aacd; width:40px; height: 40px; border-radius: 100%; line-height:40px; position:absolute; top:40px; right: 5px; transform: translateY(-40px)">
            <img style="width: 30px;" src="../../../assets/images/common/plusoutline.svg" alt="">
        </div>
    </div>



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
    // alert(JSON.stringify(this.teamList[0].data.name))
    // alert(JSON.stringify(this.teamList[0].data.reveiverTeamName))
    // alert(this.setTotalHeight.scrollHeight)
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
