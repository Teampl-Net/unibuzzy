<template>
<div class="receiverTeamMemberArea">
    <!-- <div v-if="editYn" @click="newAddMember" class="fl receiverTeamMemberCard" style="width:100%; height:60px; line-height: 40px;margin-bottom: 10px;">
        <p class="font15 commonBlack">+</p>
    </div> -->
    <div v-for="(data, index) in memberList.team" :key='index' class="receiverTeamMemberCard fl" style="width:100%; height:60px; margin-bottom:10px; position: relative;" >

        <div class="fl" @click="editClick(data,index)" >
            <!-- <div class="fl movePointerArea" style="width:30px; background-color:#ddd" v-if="editYn"><p class="tB trans90 commonBlack " >{{upTxt}}</p><p class="tB trans90 commonBlack">{{downTxt}}</p> </div> -->
            <!-- <div class="fl receiverTeamColor" :style="{background:teamColor}"></div> -->
            <p class="fl font15 commonBlack mleft-1 receiverTeamText">{{data.name}}</p>
        </div >

        <div v-if="selectPopYn" class="fr" style="position: relative;">
            <div @click="memberPlusClick(data, index)" style="background-color: #a9aacd; width:40px; height: 40px; z-index: 9999; border-radius: 100%; line-height:40px; position:absolute; top:40px; right: 15px; transform: translateY(-40px)">
                <img style="width: 30px;" src="../../../assets/images/common/plusoutline.svg" alt="">
            </div>
        </div>

        <!-- <div class="fr"> -->
        <div class="fr mright-1" style="" :class="{selPopFr: selectPopYn === true || editYn === true}" >
            <p class="fr font14 commonBlack" style="margin-right:10px; padding:0 5px; background-color:#BABBD780; border-radius:5px;">{{data.grade}}</p><br>
            <p class="fr font12 commonBlack " style="margin-right:10px">등록일 : {{this.$dayjs(data.creDate).format('YYYY-MM-DD')}}</p>
            <div v-if="editYn" @click="deleteTeamClick(data)" class="fl " style="background-color: rgb(242, 242, 242);  width:55px; height: 60px; line-height:60px; position:absolute; top:0; right: 0; ">
                <img src="../../../assets/images/formEditor/trashIcon_gray.svg" style="width: 20px;" alt="">
            </div>
        </div>

        <!-- <div class="fr " v-else style="position: relative; ">
            <div @click="editClick(data,index)" class="fl" style="background-color:#ddd;  width:55px; height: 60px; line-height:60px; position:absolute; top:-0.7rem; right: 55px;">
                <img  src="../../../assets/images/common/editbtn.svg" >
            </div>
            <div @click="deleteTeamClick(data)" class="fl " style="background-color:#a9aacd;  width:55px; height: 60px; line-height:60px; position:absolute; top:-0.7rem; right: 0; ">
                <p class="cBlack tB">삭제</p>
            </div>
        </div> -->
         <div v-if="editYn" @click="deleteMemberClick(data,index)" class="fl" style="background-color: rgb(242, 242, 242);  width:55px; height: 60px; line-height:60px; position:absolute; top:0; right: 0; ">
            <img src="../../../assets/images/formEditor/trashIcon_gray.svg" style="width: 20px;" alt="">
        </div>
    </div>

    <addTeamMember v-if="addMemberPopYn" @closePop='addMemberPopYn = false' :setEditMember='editMember' @updateMember='updateData' />
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
        selectPopYn: {},
        addPopOpenYn: {}
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
    watch:{
        addPopOpenYn() {
            // alert(this.addPopOpenYn)
            if(this.addPopOpenYn === false){
                this.addMemberPopYn = false
            }
        }
    },
    created(){
        this.memberList = this.listData
    },
    methods:{
        deleteMemberClick(data, index){
            // alert(index)
            this.memberList.team.splice(index, 1)
        },
        editClick(data,index){
            if(!this.selectPopYn){
                data.index = index
                this.editMember = data
                // alert(JSON.stringify(this.editMember))
                this.addMemberPopYn = true
                this.$emit('openAddPop',this.addMemberPopYn)
            }


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
        newAddMember(){
            this.memberList.team.unshift({ name: '새로운 구성원', grade: '구성원', creDate: undefined, email: '', phone: '' })

            document.getElementsByClassName('foo')[0].style.backgroundColor = 'rgba(186, 187, 215, 0.5)'
            setTimeout(() => {
                document.getElementsByClassName('foo')[0].style.backgroundColor = ''

            }, 800);
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
