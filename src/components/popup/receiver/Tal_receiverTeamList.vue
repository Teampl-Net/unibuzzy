<template>
<div class="receiverTeamListArea">
    <div v-if="editYn" @click="newAddTeam"  class="fl receiverTeamMemberCard" style="width:100%; height:60px; line-height: 40px;margin-bottom: 10px;">
        <p class="font15 commonBlack">+</p>
    </div>

    <div v-for="(data, index) in teamList" :key='index' class="receiverTeamListCard fl"  style="width:100%; height:60px; margin-bottom:10px; "  >
    <!-- <div v-for="(data, index) in listData" :key='index' class="receiverTeamListCard fl" @click="clickList(data)" style="width:100%; height:4rem; margin-bottom:10px; "  > -->
        <div @click="clickList(data)" class="fl" style="width:80%; height:60px;" >
            <div class="fl h-100P">
                <div class="fl movePointerArea" style="width:30px; background-color:#ddd" v-if="editYn"><p class="fontBold trans90 commonBlack " >{{upTxt}}</p><p class="fontBold trans90 commonBlack">{{downTxt}}</p> </div>
                <div class="fl receiverTeamColor" :style="{background:data.receiverTeamColor}"></div>

            <p v-if='editNameYn !== index' @click="editClick(data,index)" class="fl font15 commonBlack  receiverTeamText">{{data.reveiverTeamName}}</p>
            <input v-show='editNameYn === index && editYn == true' :id="index" style="border:none; border-bottom: 0.5px solid #ccc;"/>
        </div>

        <div @click="clickList(data)" class="fr mright-1 mtop-05" v-if="!editYn" :class="{selPopFl: selectPopYn === true}">
            <p class="fr font15 commonBlack" style="margin-right:10px">{{data.team.length}}</p>
            <div style="width: 20px; float: left; height: 20px; border-radius: 100%; display: flex; justify-content: center; align-items: center; margin-right: 3px; border: 1.5px solid #6768A7;">
                <img src="../../../assets/images/main/main_subscriber.png"  class="receiverTeamSubscImg"  >
            </div>
        </div>

            <div class="fr mtop-05" v-else style="position: relative; ">
                <div @click="editClick(data,index)" class="fl" style="background-color:#ddd;  width:55px; height: 60px; line-height:60px; position:absolute; top:-1.2rem; right: 55px;">
                    <img src="../../../assets/images/common/editbtn.svg" >
                </div>
                <div @click="deleteTeamClick(data)" class="fl " style="background-color:#a9aacd;  width:55px; height: 60px; line-height:60px; position:absolute; top:-1.2rem; right: 0; ">
                    <p class="cBlack tB">삭제</p>
                </div>
            </div>
        </div>
        <div v-if="selectPopYn" class="fr" style="position: relative; width:20%">
            <div @click="teamPlusClick(data, index)" style="background-color:#ccc; width:40px; height: 40px; line-height:40px; position:absolute; top:40px; right: 15px; transform: translateY(-40px)">
                <p style="font-size:35px; color:black">+</p>
            </div>
        </div>
    </div>

</div>
</template>

<script>
/* eslint-disable */
// eslint-disable-next-line
export default {
    props:{
        listData:{},
        editYn:{},
        selectPopYn:{}
    },
    data(){
        return{
            upTxt:'>',
            downTxt:'<',
            editTeamName:'',
            editNameYn:null,
            teamList: {}
        }
    },
    mounted () {
    this.teamList = this.listData
    },

    methods:{
        teamPlusClick(data, index){
            const obj = new Object();
            obj.data = data;
            obj.index = index
            this.teamList.splice(index, 1)
            this.$emit('selectTeam', obj);
        },
        clickList(data){
            // if(this.selectPopYn !== true)
            this.$emit('openDetail',data) // alert(data.reveiverTeamName)
        },
        deleteTeamClick(data){

        },
        editClick(data, index){
            var editTeamName = document.getElementById(index)
            if(this.editNameYn === index){
                this.editNameYn = null
                data.reveiverTeamName = editTeamName.value
            }else{
                this.editNameYn = index
                editTeamName.value = data.reveiverTeamName

            }
        },
        newAddTeam(){
            this.editNameYn = null
            var addlistData = [{receiverTeamColor:'#ff9999', reveiverTeamName: '',team:[]}]

            const newList = [
                ...addlistData,
                ...this.teamList
            ]
            this.teamList = newList
            this.editNameYn = 0
            document.getElementById(0).focus()
        }
    }

}
</script>

<style >
.receiverTeamListArea{width: 100%; float: left;}
/* .receiverTeamListCard{display: flex; flex-direction: row; align-items: center; justify-content: space-between; border-bottom:1px solid #eee;  padding: 0.7rem 0} */

.receiverTeamText{font-weight: bold; height:40px; line-height:40px;}
.receiverTeamSubscImg{width: 12px;}

.fontBold{font-weight: bold;}
.trans90{transform:rotate(270deg)}
/* .movePointerArea{
    transform: scaleY(1.7);
        margin-top: 0.1rem;
} */

.selPopFl{
    float:left;
    margin-left: 1rem;
}
</style>