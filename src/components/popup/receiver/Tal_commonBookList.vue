<template>
    <div style="width: 100%; height: 100%;" class="">
        <pageTopCompo :btnTitle="pageTopBtnTitle" :titleText="propData.teamNameMtext" @btnClick="editClick"  :dataLength="cabinetList.length" />
        <!-- <div v-if="editYn" @click="addNewBook"  class="fl receiverTeamMemberCard" style="width:100%; height:60px; line-height: 40px;margin-bottom: 10px;">
            <p class="font15 commonBlack">+</p>
        </div> -->
        <div style="width: 100%; padding: 0 5px; height: calc(100% - 60px); overflow: hidden scroll;">
            <draggable  ref="editableArea" class="ghostClass" :v-model="boardList" ghost-class="ghost" style="margin-top: 10px; " :disabled="!editYn" delay="200" >
                <transition-group>
                    <div @click="editYn? '' : clickList(data)" v-for="(data, index) in cabinetList" :id="'book'+ index" :key='index' :class="{foo:index === 0}" class="receiverTeamListCard fl"  style="width:100%; overflow: hidden; height:60px; position: relative; margin-bottom:10px; "  >
                    <!-- <div v-for="(data, index) in listData" :key='index' class="receiverTeamListCard fl" @click="clickList(data)" style="width:100%; height:4rem; margin-bottom:10px; "  > -->
                        <div class="fl movePointerArea" style="width:30px; height: 100%; position: absolute; top: 0; left: 0; display: flex; algin-items: center; background-color: rgb(242, 242, 242);" v-if="editYn">
                            <img src="../../../assets/images/formEditor/scroll.svg" style="width: 100%;"  alt="">
                        </div>
                        <!-- <div :style="{background:data.receiverTeamColor}"  :class="{editmLeft:editYn === true}" class="fl receiverTeamColor"></div> -->
                        <div :class="{editmLeft:editYn === true}" class="fl receiverTeamColor"></div>
                            <input v-if="editYn" :id="index" v-model="data.cabinetNameMtext" style="border:none; float: left; height: 100%; border-bottom: 0.5px solid #ccc;"/>
                            <!-- <p v-else class="fl font15 commonBlack  receiverTeamText">{{data.cabinetNameMtext + ' (' + data.team.length + ')'}}</p> -->
                            <p v-else class="fl font15 commonBlack  receiverTeamText">{{data.cabinetNameMtext}}</p>

                        <div v-if="editYn" @click="deleteTeamClick(data,cabinetKey)" class="fl " style="background-color: rgb(242, 242, 242);  width:55px; height: 60px; line-height:60px; position:absolute; top:0; right: 0; ">
                            <img src="../../../assets/images/formEditor/trashIcon_gray.svg" style="width: 20px;" alt="">
                        </div>
                    </div>
                </transition-group>
            </draggable>
        </div>
        <div class="btnPlus" btnTitle="추가" @click="addNewBook" ><p style="font-size:40px;">+</p></div>
    </div>
</template>

<script>
import pageTopCompo from './Tal_commonBookTitle.vue'
import { VueDraggableNext } from 'vue-draggable-next'
/* eslint-disable */
// eslint-disable-next-line
export default {
    props:{
        listData:{},
        propData: {},
        chanAlimListTeamKey: {}
    },
    data(){
        return{
            cabinetList: [],
            editTeamName:'',
            teamList: {},
            dragging: false,
            editYn : false,
            pageTopBtnTitle: '편집'
        }
    },
    created () {
        // alert(JSON.stringify(this.propData))
        this.getTeamCabList()
    this.teamList = this.listData
    // alert(this.setTotalHeight.scrollHeight)
    },
    components: {
        draggable: VueDraggableNext,
        pageTopCompo
    },
    computed: {
        setTotalHeight () {
            return {
                '--scrollHeight' : this.teamList.length * 70 + 20 + 'px'
            }
        }
    },
    methods:{
        editClick () {
            if(this.editYn) {
                this.editYn = false
                this.pageTopBtnTitle = '편집'
            }
            else {
                this.editYn = true
                this.pageTopBtnTitle = '저장'
            }
        },
        async getTeamCabList () {
            var paramMap = new Map()
            paramMap.set('creTeamKey', this.propData.currentTeamKey)
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
        clickList(data){
            this.$emit('openMCabUserList',data) // alert(data.reveiverTeamName)
        },
        deleteTeamClick(data,index){

            this.teamList.splice(index, 1)
        },
        async addNewBook(){

            var param = new Object()
            param.creMenuYn = true
            var cabinet = new Object()
            var defaultAddBoardName = this.$checkSameName(this.cabinetList, '주소록')
            cabinet.cabinetNameMtext = 'KO$^$' + defaultAddBoardName
            cabinet.currentTeamKey = this.propData.currentTeamKey
            cabinet.sysCabinetCode = 'USER'
            cabinet.creTeamKey = this.propData.currentTeamKey
            param.cabinet = cabinet
            var result = await this.$saveCabinet(param)
            if (result.result === true && result.cabinetKey !== undefined && result.cabinetKey !== null && result.cabinetKey !== 0) {
                var addBoard = {'cabinetNameMtext': defaultAddBoardName, 'idNum':2, 'cabinetKey': result.cabinetKey}

            }
            this.cabinetList.unshift(addBoard)
            document.getElementsByClassName('foo')[0].style.backgroundColor = 'rgba(186, 187, 215, 0.5)'
            // debugger
            setTimeout(() => {
                document.getElementsByClassName('foo')[0].style.backgroundColor = ''
                // document.getElementsByClassName('foo')[0].classList.remove('foo')
            }, 800);
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
