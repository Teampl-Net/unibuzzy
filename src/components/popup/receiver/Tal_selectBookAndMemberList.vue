<template>
    <div style="width: 100%; height: 100%;"  class="">
        <!-- <pageTopCompo :btnTitle="pageTopBtnTitle" :titleText="propData.teamNameMtext" @btnClick="editClick" :selectPopYn="selectPopYn" :dataLength="cabinetList.length" /> -->
        <!-- {{selectBookNList}} -->
        <div style="width: 100%; padding: 0 5px; height: calc(100% - 60px); overflow: hidden scroll;">
            <p class="font16">선택된 그룹</p>
            <div v-for="(data, index) in bookList" :key="index">
                <div class="receiverTeamListCard fl" v-if="data.selectedYn !== true" style="width: 100%; padding: 10px; overflow: hidden; height:60px; position: relative; margin-bottom:10px;">
                    <div @click="clickList(data)" style="width: calc(100% - 60px); height: 100%;" class="fl">
                        <p class="fl font15 commonBlack  receiverTeamText">{{data.cabinetNameMtext}}</p>
                    </div>
                    <div @click="addSelectedList(data, index, 'C')" class="fr" style="position: relative; height: 100%;">
                        <div style="background-color:#a9aacd; width:40px; height: 40px; border-radius: 100%; line-height:40px; position:absolute; top:40px; right: 5px; transform: translateY(-40px)">
                            <img style="width: 30px;" src="../../../assets/images/common/plusoutline.svg" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <p class="font16">선택된 사람</p>
            <div v-for="(data, index) in memberList" :key="index">
                <div class="receiverTeamListCard fl" v-if="data.selectedYn !== true" style="width: 100%; padding: 10px; overflow: hidden; height:60px; position: relative; margin-bottom:10px;">
                    <div style="width: calc(100% - 60px); height: 100%;" class="fl">
                        <p class="fl font15 commonBlack  receiverTeamText">{{this.$changeText(data.userDispMtext)}}</p>
                    </div>
                    <div @click="addSelectedList(data, index, 'U')" class="fr" style="position: relative; height: 100%;">
                        <div style="background-color:#a9aacd; width:40px; height: 40px; border-radius: 100%; line-height:40px; position:absolute; top:40px; right: 5px; transform: translateY(-40px)">
                            <img style="width: 30px;" src="../../../assets/images/common/plusoutline.svg" alt="">
                        </div>
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
        // alert(JSON.stringify(this.selectBookNList.memberList))
        // this.bookList = this.selectBookNList.data.bookList
        // this.memberList = this.selectBookNList.data.memberList
        if (this.selectBookNList.memberList !== undefined && this.selectBookNList.memberList !== null && this.selectBookNList.memberList !== []) {
            if (this.selectBookNList.memberList.length > 0) {
                    this.memberList = this.selectBookNList.memberList
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
                // alert(JSON.stringify(this.bookList))
            }
        }
    },
    data () {
        return {
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
            this.$emit('openMCabUserList',data) // alert(data.reveiverTeamName)
        },
        addSelectedList(data, index, type) {
            if (this.memberList.length > 0 && type === 'U') {
                this.memberList[index].selectedYn = true
                // alert(true)
            }
            if (this.bookList.length > 0 && type === 'C') {
                this.bookList[index].selectedYn = true
            }
            data.shareType = this.itemType
            if (type === 'U') {
                this.setSelectedList.memberList.push(data)
            }
            else if (type === 'C') {
                this.setSelectedList.bookList.push(data)
            }
            this.$emit('addSelectList', this.setSelectedList)
        }
        /* addSelectedList(data, index, type) {
            // Cabinet(Team) : cabinetKey 만
            // User: userKey만
            if (this.memberList.length > 0 && type === 'U') {
                this.memberList[index].selectedYn = true
                // alert(true)
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
