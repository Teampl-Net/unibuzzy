<template>
    <div style="width: 100%; height: 100%;"  class="">
        <!-- <pageTopCompo :btnTitle="pageTopBtnTitle" :titleText="propData.teamNameMtext" @btnClick="editClick" :selectPopYn="selectPopYn" :dataLength="cabinetList.length" /> -->
        {{selectBookNList}}
        <div style="width: 100%; padding: 0 5px; height: calc(100% - 60px); overflow: hidden scroll;">
            <div v-for="(data, index) in bookList" :key="index">

            </div>
            <div v-for="(data, index) in memberList" :key="index">

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
        selectBookNList: {}
    },
    created () {
        this.bookList = this.selectBookNList.bookList
        this.memberList = this.selectBookNList.memberList
    },
    data () {
        return{
            bookList:[],
            memberList:[]
        }
    },
    components: {
        pageTopCompo
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
