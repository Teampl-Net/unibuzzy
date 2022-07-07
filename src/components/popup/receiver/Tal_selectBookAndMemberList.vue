<template>
    <div style="width: 100%; height: 100%;"  class="">
        <!-- <pageTopCompo :btnTitle="pageTopBtnTitle" :titleText="propData.teamNameMtext" @btnClick="editClick" :selectPopYn="selectPopYn"  /> -->
        <!-- {{selectBookNList}} -->

        <div style="width: 100%; padding: 0 5px; height: calc(100% - 60px); overflow: hidden scroll;">
            <!-- <p class="font16">선택된 그룹</p> -->
            <div v-for="(data, index) in bookList" :key="index">
                <div class=" fl" style="width: 100%; border-bottom:1px solid #ddd; padding: 0.7rem 0;">
                    <div @click="clickList(data)" style="width: calc(100% - 60px); height: 100%;" class="fl">
                        <div style="width:40px; height:100%; line-height:40px" class="fl mright-05">
                            <img src="../../../assets/images/channel/channer_addressBook.svg" style="width:30px" alt="">
                        </div>
                        <p class="fl font15 commonBlack  receiverTeamText">{{data.cabinetNameMtext}}</p>
                    </div>
                    <!-- <div @click="addSelectedList(data, index, 'C')" class="fr" style="position: relative; height: 100%;">
                        <div style="background-color:#a9aacd; width:40px; height: 40px; border-radius: 100%; line-height:40px; position:absolute; top:40px; right: 5px; transform: translateY(-40px)">
                            <img style="width: 30px;" src="../../../assets/images/common/plusoutline.svg" alt="">
                        </div>
                    </div> -->

                    <div @click="addSelectedList(data, index, 'C')" class="fr mright-1" style="position: relative; height: 100%;">
                        <!-- <div style="background-color:#a9aacd; width:40px; height: 40px; border-radius: 100%; line-height:40px; position:absolute; top:40px; right: 5px; transform: translateY(-40px)">
                            <img style="width: 30px;" src="../../../assets/images/common/plusoutline.svg" alt="">
                        </div> -->
                        <img style="width: 30px;" src="../../../assets/images/common/plusoutline.svg" alt="" v-if="!data.selectedYn">
                        <img style="width: 30px;" src="../../../assets/images/common/Tal_checkImage.svg" alt="" v-else>
                    </div>

                </div>
            </div>
            <!-- <p class="font16">선택된 사람</p> -->
            <div v-for="(data, index) in memberList" :key="index">
                <div @click="clickList(data)" class=" fl" style="width: 100%; border-bottom:1px solid #ddd; padding: 0.7rem 0;">
                    <div style="width: calc(100% - 60px); height: 100%;" class="fl">
                        <div style="width:40px; height:100%; line-height:40px" class="fl mright-05">
                            <img src="../../../assets/images/main/main_subscriber.png" style="width: 20px; height: 20px; margin-left: 10px; margin-top: 10px;" class="fl"/>
                        </div>
                        <p class="fl font15 commonBlack  receiverTeamText">{{this.$changeText(data.userDispMtext)}}</p>
                    </div>

                    <div @click="addSelectedList(data, index, 'U')" class="fr mright-1" style="position: relative; height: 100%;">
                        <!-- <div style="background-color:#a9aacd; width:40px; height: 40px; border-radius: 100%; line-height:40px; position:absolute; top:40px; right: 5px; transform: translateY(-40px)">
                            <img style="width: 30px;" src="../../../assets/images/common/plusoutline.svg" alt="">
                        </div> -->
                        <img style="width: 30px;" src="../../../assets/images/common/plusoutline.svg" alt="" v-if="!data.selectedYn">
                        <img style="width: 30px;" src="../../../assets/images/common/Tal_checkImage.svg" alt="" v-else>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import pageTopCompo from './Tal_commonBookTitle.vue'
/* eslint-disable */
// eslint-disable-next-line
export default {
    props: {
        propData: {},
        selectBookNList: {},
        itemType: {}
    },
    created() {
        var history = this.$store.getters.hStack
        this.popId = 'selectBookNMemPop' + history.length
        history.push(this.popId)
        this.$store.commit('updateStack', history)
        // this.bookList = this.selectBookNList.data.bookList
        // this.memberList = this.selectBookNList.data.memberList
        if (this.selectBookNList.memberList !== undefined && this.selectBookNList.memberList !== null && this.selectBookNList.memberList !== []) {
            if (this.selectBookNList.memberList.length > 0) {
                this.memberList = this.selectBookNList.memberList
                    for (var i = 0; i < this.bookList.length; i++) {
                        this.bookList[i].selectedYn = false
                    }
                    for (var i = 0; i < this.memberList.length; i++) {
                    this.memberList[i].selectedYn = false
                }
                }
        }
        if (this.selectBookNList.bookList !== undefined && this.selectBookNList.bookList !== null && this.selectBookNList.bookList !== []) {
            if (this.selectBookNList.bookList.length > 0) {
                this.bookList = this.selectBookNList.bookList
                for (var i = 0; i < this.bookList.length; i++) {
                    this.bookList[i].selectedYn = false
                }
            }
        }
    },
    computed: {
        historyStack () {
            return this.$store.getters.hRPage
        },
        pageUpdate () {
            return this.$store.getters.hUpdate
        }
    },
    watch: {
        historyStack (value, old) {
            var hStack = this.$store.getters.hStack
            if (this.popId === hStack[hStack.length - 1]) {
            var history = this.$store.getters.hStack
            var removePage = history[history.length - 1]
            // alert(removePage)
            history = history.filter((element, index) => index < history.length - 1)
            this.$store.commit('setRemovePage', removePage)
            this.$store.commit('updateStack', history)
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
            setSelectedList: { bookList: [], memberList: [] }
        }
    },
    components: {
        pageTopCompo
    },
    methods: {
        clickList(data) {
            console.log(data);
        },
        addSelectedList(data, index, type) {

            // var indexOf = this.activeTabList.findIndex(i => i.name === tabName); // ** map 에서 index찾기 ** (#맵 #map #Map #멥 #indexOf #인덱스 #index #Index)

            if (this.memberList.length > 0 && type === 'U') {
                this.memberList[index].selectedYn = true
            }
            if (this.bookList.length > 0 && type === 'C') {
                this.bookList[index].selectedYn = true
            }

            data.shareType = this.itemType

            if (type === 'U') {
                var indexOf = this.setSelectedList.memberList.findIndex(i => i.userKey === data.userKey);
                if (indexOf === -1) {
                    this.setSelectedList.memberList.push(data)
                }else{
                    alert('중복선택')
                }
            }else if (type === 'C') {
                var indexOf = this.setSelectedList.bookList.findIndex(i => i.cabinetKey === data.cabinetKey);
                if (indexOf === -1) {
                    this.setSelectedList.bookList.push(data)
                }else{
                    alert('중복선택')
                }

            }
            this.$emit('addSelectList', this.setSelectedList)
        },
        delSelectList (key, type) {
            // alert('type : ' + type + ' key : ' + key)
            if (type === 'U') {
                var indexOf = this.memberList.findIndex(i => i.userKey === key);
                if (indexOf !== -1) {
                    this.memberList[indexOf].selectedYn = false
                }
            }else if (type === 'C') {
                var indexOf = this.bookList.findIndex(i => i.cabinetKey === key);
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
            // eslint-disable-next-line no-debugger

            this.$emit('changeSelectedItem', { itemList: this.itemList, itemType: this.itemType })
        } */
    }
}
</script>

<style >

</style>
