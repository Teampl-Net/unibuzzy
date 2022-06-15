<template>
    <div style="width: 100%; height: 100%;"  class="">
        <!-- <pageTopCompo :btnTitle="pageTopBtnTitle" :titleText="propData.teamNameMtext" @btnClick="editClick" :selectPopYn="selectPopYn" :dataLength="cabinetList.length" /> -->
        <!-- {{selectBookNList}} -->
        <div style="width: 100%; padding: 0 5px; height: calc(100% - 60px); overflow: hidden scroll;">
            <p class="font16">선택된 그룹</p>
            <div v-for="(data, index) in bookList" :key="index">
                <div class="receiverTeamListCard fl" style="width: 100%; padding: 10px; overflow: hidden; height:60px; position: relative; margin-bottom:10px;">
                    <div @click="clickList(data)" style="width: calc(100% - 60px); height: 100%;" class="fl">
                        <p class="fl font15 commonBlack  receiverTeamText">{{data.cabinetNameMtext}}</p>
                    </div>
                    <div @click="addSelectedList(data, index)" class="fr" style="position: relative; height: 100%;">
                        <div style="background-color:#a9aacd; width:40px; height: 40px; border-radius: 100%; line-height:40px; position:absolute; top:40px; right: 5px; transform: translateY(-40px)">
                            <img style="width: 30px;" src="../../../assets/images/common/plusoutline.svg" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <p class="font16">선택된 사람</p>
            <div v-for="(data, index) in memberList" :key="index">
                <div class="receiverTeamListCard fl" style="width: 100%; padding: 10px; overflow: hidden; height:60px; position: relative; margin-bottom:10px;">
                    <div style="width: calc(100% - 60px); height: 100%;" class="fl">
                        <p class="fl font15 commonBlack  receiverTeamText">{{data.userNameMtext}}</p>
                    </div>
                    <div @click="addSelectedList(data, index)" class="fr" style="position: relative; height: 100%;">
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
    created () {
        this.bookList = this.selectBookNList.bookList
        this.memberList = this.selectBookNList.memberList
    },
    data () {
        return {
            bookList:[],
            memberList: [],
            itemList: [],
            type: ''
        }
    },
    components: {
        pageTopCompo
    },
    methods: {
        clickList(data) {
            this.$emit('openMCabUserList',data) // alert(data.reveiverTeamName)
        },
        addSelectedList(data, index) {
            // Cabinet(Team) : cabinetKey 만
            // User: userKey만
            this.memberList[index].selectedYn = true
            var access = null
            if (type === 'U') {
                debugger
                access = { accessKey: data.userKey, accessKind: type, shareType: itemType, shareSeq: data.shareSeq }
            } else if (type === 'C') {
                access = { accessKey: data.cabinetKey, accessKind: type, shareType: itemType, shareSeq: data.shareSeq }
            }
            this.itemList.push(access)
            this.$emit('changeSelectedItem', { itemList: this.itemList, itemType })

        }
    }
}
</script>

<style >

</style>
