<template>
    <div style="width: 100%; height: 100%;"  class="">
        <pageTopCompo :btnTitle="pageTopBtnTitle" :titleText="propObject.teamNameMtext" @btnClick="editClick" :selectPopYn="selectPopYn" :dataLength="cabinetList.length" />
        <!-- <div v-if="editYn" @click="addNewBook"  class="fl receiverTeamMemberCard" style="width:100%; height:60px; line-height: 40px;margin-bottom: 10px;">
            <p class="font15 commonBlack">+</p>
        </div> -->
        <div style="width: 100%; padding: 0 5px; height: calc(100% - 60px); overflow: hidden scroll;">
            <draggable  ref="editableArea" class="ghostClass" :v-model="boardList" ghost-class="ghost" style="margin-top: 10px; " :disabled="!editYn" delay="200" >
                <transition-group>
                    <template  v-for="(data, index) in cabinetList" :key='index'>
                        <div :class="{foo:index === 0}" v-if="data.selectedYn !== true" :id="'book'+ index" class="receiverTeamListCard fl" style="" >
                            <div @click="clickList(data)" style="width: calc(100% - 100px); height: 100%;" class="fl">
                            <!-- <div v-for="(data, index) in listData" :key='index' class="receiverTeamListCard fl" @click="clickList(data)" style="width:100%; height:4rem; margin-bottom:10px; "  > -->
                                <div class="fl movePointerArea" style="width:30px; height: 100%; position: absolute; top: 0; left: 0; display: flex; algin-items: center; background-color: rgb(242, 242, 242);" v-if="editYn">
                                    <img src="../../../assets/images/formEditor/scroll.svg" style="width: 100%;"  alt="">
                                </div>
                                <!-- <div :style="{background:data.receiverTeamColor}"  :class="{editmLeft:editYn === true}" class="fl receiverTeamColor"></div> -->
                                <div :class="{editmLeft:editYn === true}" class="fl receiverTeamColor"></div>
                                <input v-if="editYn" :id="index" v-model="data.cabinetNameMtext" style="border:none; float: left; height: 100%; border-bottom: 0.5px solid #ccc;"/>
                                <!-- <p v-else class="fl font15 commonBlack  receiverTeamText">{{data.cabinetNameMtext + ' (' + data.team.length + ')'}}</p> -->
                                <p v-else class="fl font15 commonBlack  receiverTeamText">{{data.cabinetNameMtext}}</p>

                                <div v-if="editYn" @click="deleteCabinet(data,cabinetKey)" class="fl " style="background-color: rgb(242, 242, 242);  width:55px; height: 60px; line-height:60px; position:absolute; top:0; right: 0; ">
                                    <img src="../../../assets/images/formEditor/trashIcon_gray.svg" style="width: 20px;" alt="">
                                </div>
                            </div>
                            <div v-if="editYn" @click="deleteCabinet(data,cabinetKey)" class="fl " style="background-color: rgb(242, 242, 242);  width:55px; height: 60px; line-height:60px; position:absolute; top:0; right: 0; ">
                                <img src="../../../assets/images/formEditor/trashIcon_gray.svg" style="width: 20px;" alt="">
                            </div>
                            <div @click="addSelectedList(data, index)" v-if="selectPopYn" class="fr" style="position: relative; height: 100%;">
                                <div style="background-color:#a9aacd; width:40px; height: 40px; border-radius: 100%; line-height:40px; position:absolute; top:40px; right: 5px; transform: translateY(-40px)">
                                    <img style="width: 30px;" src="../../../assets/images/common/plusoutline.svg" alt="">
                                </div>
                            </div>
                        </div>
                    </template>
                </transition-group>
            </draggable>
        </div>
    </div>
    <div class="btnPlus" btnTitle="추가" @click="this.addNewBook" v-if="editYn">
        <p style="font-size:40px;">+</p>
    </div>
</template>

<script>
import pageTopCompo from './Tal_commonBookTitle.vue'
import { VueDraggableNext } from 'vue-draggable-next'
/* eslint-disable */
// eslint-disable-next-line
export default {
    props:{
        // listData:{},
        propData: {},
        chanAlimListTeamKey: {},
        parentSelectList: {},
        selectPopYn: Boolean
    },
    data(){
        return{
            propObject: {},
            cabinetList: [],
            editTeamName:'',
            cabinetList: {},
            dragging: false,
            editYn : false,
            pageTopBtnTitle: '편집',
            selectedBookList: [],
        }
    },
    async created () {
        // alert(JSON.stringify(this.propData))
        this.propObject = this.propData

        if(this.propObject.targetNameMtext !== undefined && this.propObject.targetNameMtext !== null && this.propObject.targetNameMtext !== '') {
            this.propObject.teamNameMtext = this.$changeText(this.propObject.targetNameMtext)
            // alert(this.propObject.teamNameMtext)
        }else if(this.propObject.value.nameMtext !== undefined && this.propObject.value.nameMtext !== null && this.propObject.value.nameMtext !== ''){
            this.propObject.teamNameMtext = this.$changeText(this.propObject.value.nameMtext)
        }else{
            this.propObject.teamNameMtext = this.$changeText(this.propObject.value.value.nameMtext)
        }


        if(this.selectPopYn){
            this.selectedBookList = []
            if(this.parentSelectList.bookList) {
                this.selectedBookList = this.parentSelectList.bookList
            }
        }
        await this.getTeamCabList()
        this.changeSelectedList()
        // this.cabinetList = this.listData
    // alert(this.setTotalHeight.scrollHeight)
    },
    updated () {
        this.changeSelectedList()
    },
    watch: {
        parentSelectList: function () {
            // alert(true)
            if(this.parentSelectList) {
                if (this.parentSelectList.bookList) {
                    for (var i = 0; i < this.cabinetList.length; i ++) {
                        this.cabinetList[i].selectedYn = false
                        for (var s = 0; s < this.parentSelectList.bookList.length; s ++) {
                            if (this.parentSelectList.bookList[s].cabinetKey === this.cabinetList[i].cabinetKey) {
                                this.cabinetList[i].selectedYn = true
                                break
                            }
                        }
                    }
                }
            }
        }
    },
    components: {
        draggable: VueDraggableNext,
        pageTopCompo
    },
    computed: {
        setTotalHeight () {
            return {
                '--scrollHeight' : this.cabinetList.length * 70 + 20 + 'px'
            }
        }
    },
    methods:{
        changeSelectedList () {
            if(this.parentSelectList) {
                if (this.parentSelectList.bookList) {
                    for (var i = 0; i < this.cabinetList.length; i ++) {
                        this.cabinetList[i].selectedYn = false
                        for (var s = 0; s < this.parentSelectList.bookList.length; s ++) {
                            if (this.parentSelectList.bookList[s].cabinetKey === this.cabinetList[i].cabinetKey) {
                                this.cabinetList[i].selectedYn = true
                                break
                            }
                        }
                    }
                }
            }
        },
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
            paramMap.set('creTeamKey', this.propObject.currentTeamKey)
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
            if(!this.editYn){
                this.$emit('openMCabUserList',data) // alert(data.reveiverTeamName)
            }

        },
        async deleteCabinet(data,index){
            var param = new Object()
            param.currentTeamKey = this.propObject.currentTeamKey
            param.cabinetKey = data.cabinetKey
            this.cabinetList.splice(index, 1)
            var result = await this.$deleteCabinet(param)
            debugger
        },
        //유민참고
        addSelectedList(data, index) {
            // alert(true)
            this.cabinetList[index].selectedYn = true

            this.selectedBookList.push(data)

            this.$emit('changeSelectBookList', this.selectedBookList)
        },

        async addNewBook(){

            var param = new Object()
            param.creMenuYn = true
            var cabinet = new Object()
            var defaultAddBoardName = this.$checkSameName(this.cabinetList, '주소록')
            cabinet.cabinetNameMtext = 'KO$^$' + defaultAddBoardName
            cabinet.currentTeamKey = this.propObject.currentTeamKey
            cabinet.sysCabinetCode = 'USER'
            cabinet.creTeamKey = this.propObject.currentTeamKey
            param.cabinet = cabinet
            var result = await this.$saveCabinet(param)
            if (result.result === true && result.cabinetKey !== undefined && result.cabinetKey !== null && result.cabinetKey !== 0) {
                var addBoard = {'cabinetNameMtext': defaultAddBoardName, 'idNum':2, 'cabinetKey': result.cabinetKey}

            }
            // alert(JSON.stringify(result))
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
    width: 100%; padding: 10px; overflow: hidden; height:60px; position: relative; margin-bottom:10px;
    transition : background-color 0.5s ease-in !important;
}

input {
    background: none;
}
</style>
