<template>
<div style="width: 100%;" class="">
    <!-- <div v-if="editYn" @click="newAddTeam"  class="fl receiverTeamMemberCard" style="width:100%; height:60px; line-height: 40px;margin-bottom: 10px;">
        <p class="font15 commonBlack">+</p>
    </div> -->
    <draggable  ref="editableArea" class="ghostClass" :v-model="boardList" ghost-class="ghost" style="padding-top: 10px; " :disabled="!editYn" delay="200" >
        <transition-group>
            <div v-for="(data, index) in cabinetList" :id="'book'+ index" :key='index' :class="{widthPop:selectPopYn===true, foo: editYn === true && index === 0}" class="receiverTeamListCard fl"  style="width:100%; overflow: hidden; height:60px; position: relative; margin-bottom:10px; "  >
            <!-- <div v-for="(data, index) in listData" :key='index' class="receiverTeamListCard fl" @click="clickList(data)" style="width:100%; height:4rem; margin-bottom:10px; "  > -->
                <div @click="clickList(data)" class="fl movePointerArea" style="width:30px; height: 100%; position: absolute; top: 0; left: 0; display: flex; algin-items: center; background-color: rgb(242, 242, 242);" v-if="editYn">
                    <img src="../../../assets/images/formEditor/scroll.svg" style="width: 100%;"  alt="">
                </div>
                <!-- <div :style="{background:data.receiverTeamColor}"  :class="{editmLeft:editYn === true}" class="fl receiverTeamColor"></div> -->
                <div :class="{editmLeft:editYn === true}" class="fl receiverTeamColor"></div>
                <div @click="clickList(data)" class="fl h-100P">
                    <input v-if="editYn" :id="index" v-model="data.cabinetNameMtext" style="border:none; height: 100%; border-bottom: 0.5px solid #ccc;"/>
                    <!-- <p v-else class="fl font15 commonBlack  receiverTeamText">{{data.cabinetNameMtext + ' (' + data.team.length + ')'}}</p> -->
                    <p v-else class="fl font15 commonBlack  receiverTeamText">{{data.cabinetNameMtext}}</p>
                </div>

                <div v-if="editYn" @click="deleteTeamClick(data,cabinetKey)" class="fl " style="background-color: rgb(242, 242, 242);  width:55px; height: 60px; line-height:60px; position:absolute; top:0; right: 0; ">
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
        selectPopYn:{},
        chanAlimListTeamKey: {}
    },
    data(){
        return{
            cabinetList: [],
            upTxt:'>',
            downTxt:'<',
            editTeamName:'',
            editNameYn:null,
            teamList: {},
            dragging: false
        }
    },
    created () {
        this.getTeamCabList()
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
        async getTeamCabList () {
            var paramMap = new Map()
            paramMap.set('creTeamKey', this.chanAlimListTeamKey)
            paramMap.set('sysCabinetCode', 'USER')
            var result = await this.$commonAxiosFunction({
                url: '/tp.getBookList',
                param: Object.fromEntries(paramMap)
            })
            this.cabinetList = result.data
            for(var i = 0; i < this.cabinetList.length; i ++) {
                var changeT = this.cabinetList[i].cabinetNameMtext
                this.cabinetList[i].cabinetNameMtext = this.$changeText(changeT)
            }
            // debugger
        },
        checkMove(){
            return this.editYn;
        },
        teamPlusClick(data, index){
            // debugger
            const obj = new Object();
            obj.data = data;
            obj.index = index
            this.teamList.splice(index, 1)
            this.$emit('selectTeam', obj);
        },
        clickList(data){
            // alert(true)
            // if(this.selectPopYn !== true)
            this.$emit('openMCabUserList',data) // alert(data.reveiverTeamName)
        },
        deleteTeamClick(data,index){

            this.teamList.splice(index, 1)
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
            // var addlistData = []

            // const newList = [
            //     ...addlistData,
            //     ...this.teamList
            // ]
            // this.memberList.team.unshift({ name: '새로운 구성원', grade: '구성원', creDate: undefined, email: '', phone: '' })
            this.teamList.unshift({receiverTeamColor:'#ff9999', reveiverTeamName: '새로운 그룹',team:[]})
            // this.editNameYn = 0
            document.getElementsByClassName('foo')[0].style.backgroundColor = 'rgba(186, 187, 215, 0.5)'
            // debugger
            setTimeout(() => {
                document.getElementsByClassName('foo')[0].style.backgroundColor = ''
                // document.getElementsByClassName('foo')[0].classList.remove('foo')
            }, 800);
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

/* .foo {
   transition : background-color 0.5s ease-in;
} */

.receiverTeamListCard {
   transition : background-color 0.5s ease-in !important;
}
input {
    background: none;
}
</style>
