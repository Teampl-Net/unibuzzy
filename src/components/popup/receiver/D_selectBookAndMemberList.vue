<template>
<div style="width: 100%; float: left;">
    <div v-for="(data, index) in bookList" :key="index">
        <gReceiveCard :propData="data" option="SELE" :compoIdx='index' @receiveCardEmit="receiveCardEmit"/>
    </div>
    <div v-for="(data, index) in memberList" :key="index">
        <gReceiveCard :propData="data" option="SELE"  :compoIdx='index' @receiveCardEmit="receiveCardEmit"/>
    </div>
</div>
    <!-- <div v-if="false" style="width: 100%; height: 100%;"  class="">
        <div style="width: 100%; padding: 0 5px; height: calc(100% - 60px); overflow: hidden scroll;">
            <div v-for="(data, index) in bookList" :key="index">
                <div class=" fl" style="width: 100%; border-bottom:1px solid #ddd; padding: 0.7rem 0;">
                    <div @click="clickList(data)" style="width: calc(100% - 60px); height: 100%;" class="fl">
                        <div style="width:40px; height:100%; line-height:40px" class="fl mright-05">
                            <img src="../../../assets/images/channel/channer_addressBook.svg" style="width:30px" alt="">
                        </div>
                        <p class="fl font15 commonBlack  receiverTeamText">{{this.$changeText(data.cabinetNameMtext)}}</p>
                    </div>

                    <div @click="addSelectedList(data, index, 'C')" class="fr mright-1" style="position: relative; height: 100%;">

                        <img style="width: 30px;" src="../../../assets/images/common/plusoutline.svg" alt="" v-if="!data.selectedYn">
                        <img style="width: 30px;" src="../../../assets/images/common/Tal_checkImage.svg" alt="" v-else>
                    </div>

                </div>
            </div>

            <div v-for="(data, index) in memberList" :key="index">
                <div @click="clickList(data)" class=" fl" style="width: 100%; border-bottom:1px solid #ddd; padding: 0.7rem 0;">
                    <div style="width: calc(100% - 60px); height: 100%;" class="fl">
                        <div style="width:40px; height:100%; line-height:40px" class="fl mright-05">
                            <img src="../../../assets/images/main/main_subscriber.png" style="width: 20px; height: 20px; margin-left: 10px; margin-top: 10px;" class="fl"/>
                        </div>
                        <p class="fl font15 commonBlack  receiverTeamText">{{this.$changeText(data.userDispMtext || data.userDispMtext)}}</p>
                    </div>

                    <div @click="addSelectedList(data, index, 'U')" class="fr mright-1" style="position: relative; height: 100%;">
                        <img style="width: 30px;" src="../../../assets/images/common/plusoutline.svg" alt="" v-if="!data.selectedYn">
                        <img style="width: 30px;" src="../../../assets/images/common/Tal_checkImage.svg" alt="" v-else>
                    </div>
                </div>
            </div>
        </div>
    </div> -->

</template>

<script>
import gReceiveCard from './receiverUnit/D_commonReceiveCard .vue'
import pageTopCompo from './Tal_commonBookTitle.vue'
/* eslint-disable */
// eslint-disable-next-line
export default {
    props: {
        propData: {},
        selectBookNList: {},
        itemType: {},
        selectList: {}
    },
    created() {
        var history = this.$store.getters['D_HISTORY/hStack']
        this.popId = 'selectBookNMemPop' + history.length
        history.push(this.popId)
        this.$store.commit('D_HISTORY/updateStack', history)

        if (this.selectBookNList.memberList !== undefined && this.selectBookNList.memberList !== null && this.selectBookNList.memberList !== []) {
            if (this.selectBookNList.memberList.length > 0) {
                this.memberList = [...this.selectBookNList.memberList]
                for (var i = 0; i < this.memberList.length; i++) {
									this.memberList[i].jobKindId = 'USER'
									this.memberList[i].selectedYn = false
                }
            }
        }
        if (this.selectBookNList.bookList !== undefined && this.selectBookNList.bookList !== null && this.selectBookNList.bookList !== []) {
            if (this.selectBookNList.bookList.length > 0) {
                this.bookList = [...this.selectBookNList.bookList]
                for (var i = 0; i < this.bookList.length; i++) {
									this.bookList[i].jobKindId = 'BOOK'
									this.bookList[i].selectedYn = false
                }
            }
        }
        console.log(this.selectList)
        if (this.selectList) {
            if (this.selectList.bookList){
                this.selectedBookList = this.selectList.bookList
            }
            if (this.selectList.memberList){
                this.selectedMemberList = this.selectList.memberList
            }
        }
        this.$nextTick(() => {
            this.setParentSelectList()
        })
    },
    computed: {
        historyStack () {
            return this.$store.getters['D_HISTORY/hRPage']
        },
        pageUpdate () {
            return this.$store.getters['D_HISTORY/hUpdate']
        }
    },
    watch: {
        historyStack (value, old) {
            var hStack = this.$store.getters['D_HISTORY/hStack']
            if (this.popId === hStack[hStack.length - 1]) {
            var history = this.$store.getters['D_HISTORY/hStack']
            var removePage = history[history.length - 1]
            history = history.filter((element, index) => index < history.length - 1)
            this.$store.commit('D_HISTORY/setRemovePage', removePage)
            this.$store.commit('D_HISTORY/updateStack', history)
            this.closeXPop()
            }
        }
    },
    data () {
        return {
            popId: null,
            bookList:[],
            memberList: [],
            itemList: [],
            setSelectedList: { bookList: [], memberList: [] },
            selectedBookList: {},
            selectedMemberList: {}
        }
    },
    components: {
        pageTopCompo,
				gReceiveCard
    },
    methods: {
			receiveCardEmit (param) {
				var type = param.targetType
				var data = param.data
				var idx = param.index

				if (type === 'add') {
					this.addSelectedList(data, idx)
				} else if (type === 'open') {
                    // this.$emit('detail', data)
                }
    	},
        setParentSelectList () {
            console.log(this.selectedMemberList)
            console.log(this.memberList)
            debugger
            if (this.memberList) {
                for (var i = 0; i < this.memberList.length; i++) {
                    this.memberList[i].selectedYn = false

                    for (var s = 0; s < this.selectedMemberList.length; s++) {
                        if (!this.memberList[i].accessKey && this.memberList[i].shareSeq) {
                            this.memberList[i].accessKey = this.memberList[i].shareSeq
                        }
                        if (this.selectedMemberList[s].accessKey === this.memberList[i].accessKey) {
                        this.memberList[i].selectedYn = true
                        this.memberList[i].shareSeq = this.memberList[i].accessKey
                        this.setSelectedList.memberList.push(this.memberList[i])
                        break
                        }
                    }
                }
            }
            if(this.bookList) {
                for (var i = 0; i < this.bookList.length; i ++) {
                    this.bookList[i].selectedYn = false
                    for (var s = 0; s < this.selectedBookList.length; s ++) {
                        // console.log(this.selectedBookList[s].accessKey + '??' + this.bookList[i].accessKey )
                        if (this.selectedBookList[s].accessKey === this.bookList[i].accessKey) {
                            this.bookList[i].selectedYn = true
                            console.log('setParentSelectList')
                            console.log(this.bookList[i])
                            this.bookList[i].shareSeq = this.bookList[i].accessKey
                            this.setSelectedList.bookList.push(this.bookList[i])
                            break
                        }
                    }
                }
            }
            this.$emit('addSelectList', this.setSelectedList)
        },
        clickList(data) {
            // console.log(data);
        },
        addSelectedList(data, index, type) {
            // var indexOf = this.activeTabList.findIndex(i => i.name === tabName); // ** map 에서 index찾기 ** (#맵 #map #Map #멥 #indexOf #인덱스 #index #Index)

            // if (this.memberList.length > 0 && type === 'U') {
            //     this.memberList[index].selectedYn = true
            // }
            // if (this.bookList.length > 0 && type === 'C') {
            //     this.bookList[index].selectedYn = true
            // }

            data.shareType = this.itemType
            console.log('***************************')
            console.log(this.setSelectedList.bookList)
            console.log(data)
            console.log(type)
            if (type === undefined){
                type = data.jobKindId === 'BOOK' ? 'C' : 'U'
            }
            if (type === 'U') {
                var indexOf = this.setSelectedList.memberList.findIndex(i => (i.accessKey === data.accessKey && i.selectedYn === true))
                if (indexOf === -1) {
                    data.selectedYn = true
                    // data.shareSeq = data.userKey
                    // data.accessKey = data.userKey
                    this.setSelectedList.memberList.push(data)
                }else{
                    this.$showToastPop('중복선택되었습니다.')
                }
            }else if (type === 'C') {
                var indexOf = this.setSelectedList.bookList.findIndex(i => (i.cabinetKey === data.cabinetKey && i.selectedYn === true))
                if (indexOf === -1) {
                    data.selectedYn = true
                    // data.shareSeq = data.cabinetKey
                    // data.accessKey = data.cabinetKey
                    this.setSelectedList.bookList.push(data)
                }else{
                    this.$showToastPop('중복선택되었습니다.')
                }

            }
            console.log(this.setSelectedList)
            this.$emit('addSelectList', this.setSelectedList)
        },
        delSelectList (key, type) {
            if (type === 'U') {
                var indexOf = this.memberList.findIndex(i => i.accessKey === key && i.selectedYn === true);
                if (indexOf !== -1) {
                    this.memberList[indexOf].selectedYn = false
                }
            }else if (type === 'C') {
                var indexOf = this.bookList.findIndex(i => i.accessKey === key && i.selectedYn === true);
                if (indexOf !== -1) {
                    this.bookList[indexOf].selectedYn = false
                }
            }

            // this.listData[index].selectedYn = false
        },



        /* addSelectedList(data, index, type) {
            // Cabinet(Team) : cabinetKey 만
            // User: userKey만
            if (this.memberList.length > 0 && type === 'U') {
                this.memberList[index].selectedYn = true
            }
            if (this.bookList.length > 0 && type === 'C') {
                this.bookList[index].selectedYn = true
            }
            var access = null
            if (type === 'U') {
                access = { accessKey: data.userKey, accessKind: type, shareType: this.itemType, shareSeq: data.shareSeq }
            } else if (type == 'C') {
                access = { accessKey: data.cabinetKey, accessKind: type, shareType: this.itemType, shareSeq: data.shareSeq }
            }
            this.itemList.push(access)
            // eslint-disable-next-line no-

            this.$emit('changeSelectedItem', { itemList: this.itemList, itemType: this.itemType })
        } */
    }
}
</script>

<style >

</style>
