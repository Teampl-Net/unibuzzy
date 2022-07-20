<template>
        <!-- <pageTopCompo :btnTitle="pageTopBtnTitle" :titleText="propObject.teamNameMtext || propObject.nameMtext" @btnClick="editClick" :selectPopYn="selectPopYn" /> -->
        <div v-if="cabinetList.length > 0" style="width: 100%; height: calc(100% - 60px); overflow: hidden scroll;">

            <draggable  ref="editableArea" class="ghostClass" v-model="addressBookList" @end="changePosTeamMenu" ghost-class="ghost" style="margin-top: 10px; --webkit-tap-highlight-color: rgba(0,0,0,0);" delay="200"    >
                <transition-group>
                    <template  v-for="(data, index) in addressBookList" :key='index'>
                        <div :class="{foo:index === 0}" :id="'book'+ index" class="commonBookCard fl" :index="index" >
                            <div v-if="editIndex === index" class="fl" style="width: calc(100% - 100px); height: 100%;">
                                <div style="width:40px; height:100%; line-height:40px" class="fl mright-05">
                                    <img src="../../../assets/images/channel/channer_addressBook.svg" style="width:30px" alt="">
                                </div>
                                <input  :id="index" v-model="cabinetInputText"   style="border:none;width:calc(100% - 150px); min-width:70px; float: left; height: 100%; border-bottom: 0.5px solid #ccc; position: relative;"/>
                                <div class="fl" style="height: 100%; display: flex; flex-direction: row; justify-content: space-around; align-items: center;" v-if="editIndex === index" >
                                    <p class="fl font14" style=" margin: 0 5px;" @click="updateCabinet(data,index)">확인</p>
                                    <p class="fl font14" style=" margin: 0 5px;" @click="changedText(data,null)" >취소</p>
                                </div>
                            </div>
                            <div v-else @click="data.selectedYn !== true ? clickList(data,index) : ''" style="width: calc(100% - 100px); height: 100%;" class="fl" >
                                <img src="../../../assets/images/channel/channer_addressBook.svg"  class="fl" style="width:23px; margin-left: 10px; margin-top: 10px;" >
                                <p v-if="editIndex !== index" class="fl font16 commonBlack  receiverTeamText mleft-1"  >{{data.cabinetNameMtext}}</p>
                            </div>
                            <div v-if="!selectPopYn" class="fl " style="width:100px; height: 100%;position:absolute; top:0; right: 0; display: flex;flex-direction: row; justify-content: space-around; align-items: center;">
                                <img src="../../../assets/images/push/noticebox_edit.png" style="width: 20px; margin: 0 10px;" class="fr" @click="changedText(data,index)" >
                                <img src="../../../assets/images/formEditor/trashIcon_gray.svg" style="width: 20px; margin: 0 10px;" class="fr" @click="deleteCabinet(data,index)" >
                            </div>
                            <div @click="addSelectedList(data, index)" v-if="selectPopYn" class="fr mright-1" style="position: relative; height: 100%;">
                                <img style="width: 30px;" src="../../../assets/images/common/plusoutline.svg" alt="" v-if="!data.selectedYn">
                                <img style="width: 30px;" src="../../../assets/images/common/Tal_checkImage.svg" alt="" v-else>
                            </div>
                        </div>
                    </template>
                </transition-group>
            </draggable>
        </div>
        <div v-else>
            <p class="textLeft font15 textCenter mtop-1">{{'주소록이 없습니다.'}}</p>
        </div>
</template>

<script>
// import loadingCompo from '../../../components/Tal_loading.vue'
// import pageTopCompo from './Tal_commonBookTitle.vue'
import { VueDraggableNext } from 'vue-draggable-next'
/* eslint-disable */
// eslint-disable-next-line
export default {
    props:{
        listData:{},
        propData: {},
        chanAlimListTeamKey: {},
        parentSelectList: {},
        selectPopYn: Boolean
    },
    data(){
        return {
            addressBookList: {},
            propObject: {},
            cabinetList: [],
            dragging: false,
            editYn : false,
            pageTopBtnTitle: '편집',
            selectedBookList: [],
            selectedMemberList: [],
            editIndex:null,
            cabinetInputText:''
        }
    },
    async created () {
        this.propObject = this.propData
        if(this.selectPopYn){
            this.selectedBookList = []
            if(this.parentSelectList) {
                this.selectedBookList = this.parentSelectList.bookList
            }
        }
        await this.getTeamCabList()
        this.changeSelectedList()
        this.addressBookList = this.listData
    },
    updated () {
        this.changeSelectedList()
    },
    watch: {
        parentSelectList: function () {
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
        listData () {
            this.addressBookList = this.listData
        }
    },
    components: {
        // loadingCompo,
        draggable: VueDraggableNext,
        // pageTopCompo
    },
    computed: {
        setTotalHeight () {
            return {
                '--scrollHeight' : this.cabinetList.length * 70 + 20 + 'px'
            }
        }
    },
    methods:{
        changedText(data, index){
            // this.editYn = true
            this.cabinetInputText = data.cabinetNameMtext
            this.editIndex = index
        },
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
                this.$emit('editYn',this.editYn)
            }
            else {
                this.editYn = true
                this.pageTopBtnTitle = '닫기'
                this.$emit('editYn',this.editYn)
            }
        },
        async getTeamCabList () {
            var paramMap = new Map()
            var te = this.propObject
            paramMap.set('teamKey', this.propObject.currentTeamKey || this.propObject.teamKey || this.propObject.targetKey)
            paramMap.set('sysCabinetCode', 'USER')
            paramMap.set('adminYn', true)
            var result = await this.$commonAxiosFunction({
                url: '/tp.getTeamMenuList',
                param: Object.fromEntries(paramMap)
            })
            this.cabinetList = result.data
            for(var i = 0; i < this.cabinetList.length; i ++) {
                var changeT = this.cabinetList[i].cabinetNameMtext
                this.cabinetList[i].cabinetNameMtext = this.$changeText(changeT)
            }
        },
        clickList(data, index){
            if(this.editIndex !== index){ // if(this.editIndex === null){
                this.$emit('openMCabUserList',data)
            }

        },
        async deleteCabinet(data,index){
            var param = {}
            param.cabinetKey = data.cabinetKey
            param.currentTeamKey = this.propData.currentTeamKey
            param.menuType = data.menuType
            try{
                // this.cabinetList.splice(index, 1)
                var result = await this.$commonAxiosFunction({
                    url: '/tp.deleteCabinet',
                    param: param
                })
                if(result.data === 'true' || result.data === true){
                    this.addressBookList.splice(index, 1)
                    if (this.addressBookList.length === 0) {
                        this.cabinetList.length = 0
                    }
                }
            }catch(e){
                console.log(e)
            }
        },
        addSelectedList(data, index) {

            if(!this.selectedBookList){
                this.selectedBookList = []
            }
            data.shareSeq = data.cabinetKey
            var indexOf = this.selectedBookList.findIndex(i => i.cabinetKey === data.cabinetKey);
            if (indexOf === -1) {
                this.selectedBookList.push(data)
                this.addressBookList[index].selectedYn = true
                this.$emit('changeSelectBookList', this.selectedBookList)
            }else{
                alert('중복선택')
            }
        },
        async addNewBook () {
            var param = new Object()
            param.creMenuYn = true
            var cabinet = new Object()
            var defaultAddBoardName = await this.$checkSameName(this.addressBookList, '주소록')
            cabinet.cabinetNameMtext = 'KO$^$' + defaultAddBoardName
            cabinet.currentTeamKey = this.propObject.currentTeamKey || this.propObject.teamKey || this.propObject.value.targetKey
            cabinet.sysCabinetCode = 'USER'
            // cabinet.creTeamKey = this.propObject.currentTeamKey
            cabinet.creTeamKey = this.propObject.currentTeamKey || this.propObject.teamKey || this.propObject.value.targetKey
            cabinet.menuType = 'G'
            param.cabinet = cabinet
            var result = await this.$saveCabinet(param)
            if (result.result === true && result.cabinetKey !== undefined && result.cabinetKey !== null && result.cabinetKey !== 0) {
                // var addBoard = {'cabinetNameMtext': defaultAddBoardName, 'idNum':2, 'cabinetKey': result.cabinetKey}

                this.$emit('refreshList')
                // await this.getTeamCabList()
                // if(!document.getElementsByClassName('foo')[0]){
                //     setTimeout(() => {
                //         this.anima()
                //     },200)
                // }else{
                //     this.anima()
                // }
            }
            this.anima()
        },
        anima(){
            document.getElementsByClassName('foo')[0].style.backgroundColor = 'rgba(186, 187, 215, 0.5)'
            setTimeout(() => {
                document.getElementsByClassName('foo')[0].style.backgroundColor = ''
            //     // document.getElementsByClassName('foo')[0].classList.remove('foo')
            }, 800);
        },
        async updateCabinet(data, index){

                var cabinet = new Object()
                cabinet.cabinetNameMtext = 'KO$^$'+this.cabinetInputText
                cabinet.currentTeamKey = data.currentTeamKey
                cabinet.sysCabinetCode = data.sysCabinetCode
                cabinet.cabinetKey = data.cabinetKey
                var paramSet = new Object()
                paramSet.creMenuYn = false
                paramSet.cabinet = cabinet

                var result = null
                var response = await this.$commonAxiosFunction({
                url: '/tp.saveCabinet',
                param: paramSet
                })
                result = response.data
                data.cabinetNameMtext =this.cabinetInputText
                this.editIndex = null

        },
        async changePosTeamMenu(event) {
            console.log(event);
            // event.oldIndex


            var paramSet = new Object()
            var teamMenuList = new Array()
            var menu = new Object()
            var cardList = document.getElementsByClassName('commonBookCard')
            var index = null
            console.log('this.addressBookList 여기요@@')
            console.log(this.addressBookList)
            for (var s = cardList.length - 1 ; s >=0; s--) {
                index = Number(cardList[s].getAttribute('index'))
                for (var i = 0; i < this.addressBookList.length; i ++) {
                if(index === i) {
                    menu = {}
                    var tt = this.addressBookList[i]
                    if(this.addressBookList[i].menuType)
                        menu.menuType = 'G'
                    menu.teamKey = this.propObject.currentTeamKey
                    if(this.addressBookList[i].parentMenuKey)
                        menu.parentMenuKey = this.addressBookList[i].parentMenuKey
                    if(this.addressBookList[i].cabinetKey)
                        menu.cabinetKey = this.addressBookList[i].cabinetKey
                    if(this.addressBookList[i].cabinetNameMtext)
                        menu.cabinetNameMtext = this.addressBookList[i].cabinetNameMtext

                    if(this.addressBookList[i].sysCabinetCode)
                        menu.sysCabinetCode = this.addressBookList[i].sysCabinetCode

                    teamMenuList.push(menu)
                    break
                }
                }
            }
            paramSet.teamMenuList = teamMenuList
            console.log(paramSet);
            var result = await this.$commonAxiosFunction(
                {
                url: '/tp.changePosTeamMenu',
                param: paramSet
                }
            )
            console.log(result);

            // this.$emit('getBookList')



        }
    }

}
</script>

<style >
/* .receiverTeamListCard{display: flex; flex-direction: row; align-items: center; justify-content: space-between; border-bottom:1px solid #eee;  padding: 0.7rem 0} */
.receiverTeamText{ height:40px; line-height:40px;}
.receiverTeamSubscImg{width: 12px;}
.foo {
    transition : background-color 0.5s ease-in;
}
.commonBookCard {
    /* width: 100%; padding: 10px; overflow: hidden; height:60px; position: relative; margin-bottom:10px; */
    width: 100%;
    height:60px;
    border-bottom:1px solid #ddd; padding: 0.7rem 0;
    position: relative;

    overflow: auto;
    /* transition : background-color 0.5s ease-in !important; */
}

input {
    background: none;
}
</style>
