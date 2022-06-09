<template>
<div style="width: 100%;" class="">
    <!-- <div v-if="editYn" @click="newAddTeam"  class="fl receiverTeamMemberCard" style="width:100%; height:60px; line-height: 40px;margin-bottom: 10px;">
        <p class="font15 commonBlack">+</p>
    </div> -->
    <draggable ref="editableArea" class="ghostClass" :v-model="boardList" ghost-class="ghost" style="padding-top: 10px; 0" :dragging="editYn? dragging: 'none'">
        <transition-group>
            <div v-for="(data, index) in teamList" :key='index' :class="{widthPop:selectPopYn===true}" class="receiverTeamListCard fl"  style="width:100%; overflow: hidden; height:60px; position: relative; margin-bottom:10px; "  >
            <!-- <div v-for="(data, index) in listData" :key='index' class="receiverTeamListCard fl" @click="clickList(data)" style="width:100%; height:4rem; margin-bottom:10px; "  > -->
                <div @click="clickList(data)" class="fl movePointerArea" style="width:30px; height: 100%; position: absolute; top: 0; left: 0; display: flex; algin-items: center; background-color: rgb(242, 242, 242);" v-if="editYn">
                    <img src="../../../assets/images/formEditor/scroll.svg" style="width: 100%;" alt="">
                </div>
                <div :style="{background:data.receiverTeamColor}" class="fl receiverTeamColor"></div>
                <div @click="clickList(data)" class="fl h-100P">
                    <input v-if="editYn" :id="index" v-model="data.reveiverTeamName" style="border:none; height: 100%; border-bottom: 0.5px solid #ccc;"/>
                    <p v-else class="fl font15 commonBlack  receiverTeamText">{{data.reveiverTeamName + ' (' + data.team.length + ')'}}</p>
                </div>

                <!-- <div @click="clickList(data)" class="fr mright-1 mtop-05" v-if="!editYn" :class="{selPopFl: selectPopYn === true}">
                    <p class="fr font15 commonBlack" style="margin-right:10px">{{data.team.length}}</p>
                    <div style="width: 20px; float: left; height: 20px; border-radius: 100%; display: flex; justify-content: center; align-items: center; margin-right: 3px; border: 1.5px solid #6768A7;">
                        <img src="../../../assets/images/main/main_subscriber.png"   class="receiverTeamSubscImg"  >
                    </div>
                </div> -->

                <div v-if="editYn" @click="deleteTeamClick(data)" class="fl " style="background-color: rgb(242, 242, 242);  width:55px; height: 60px; line-height:60px; position:absolute; top:0; right: 0; ">
                    <img src="../../../assets/images/formEditor/trashIcon_gray.svg" style="width: 20px;" alt="">
                </div>
                <div  @click="teamPlusClick(data, index)" v-if="selectPopYn" class="fr" style="position: relative; width:20%">
                    <div style="background-color:#a9aacd; width:40px; height: 40px; border-radius: 100%; line-height:40px; position:absolute; top:40px; right: 5px; transform: translateY(-40px)">
                        <img style="width: 30px;" src="../../../assets/images/common/plusoutline.svg" alt="">
                    </div>
                </div>
            </div>
        </transition-group>
    </draggable>

</div>
</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next'
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
            teamList: {},
            dragging: false
        }
    },
    mounted () {
    this.teamList = this.listData
    // alert(this.setTotalHeight.scrollHeight)
    },
    components: {
        draggable: VueDraggableNext
    },
    computed: {
        setTotalHeight () {
            return {
                '--scrollHeight' : this.teamList.length * 70 + 20 + 'px'
            }
        }
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

.selPopFl{
    float:left;
    margin-left: 1rem;
}
</style>
