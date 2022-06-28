<template>
    <div style="width: 100%; min-height: 300px; background: white; padding: 10px; box-shadow:-3px -2px 14px 0px #ccc" class="">
        <div class="mbottom-05" style="width: 100%; height: 30px; margin-top:1rem; margin-left:0.5rem">
            <p class="textLeft fontBold font18 fl commonBlack" style="">선택된 리스트</p>
            <!-- <gBtnSmall class="fr" btnTitle='담기' @click="sendReceivers" v-if="btnVisible !== false" /> -->
        </div>
        <!-- <div v-if="editYn" @click="newAddTeam"  class="fl receiverTeamMemberCard" style="width:100%; min-height: 60px; line-height: 40px;margin-bottom: 10px;">
            <p class="font15 commonBlack">+</p>
        </div> -->
        <div style="width:100%; background-color:#6768A720; height:calc(100% - 3.5rem); padding:15px; overflow: hidden auto">
            <div v-for="(team, index) in teamList.bookList" :key='index' class=" fl"  style="padding: 5px 10px; margin-right: 1.5rem; margin-bottom: 5px; background: #fff;  border-radius: 5px; position:relative; margin-bottom:1.3rem" >
                <!-- <img src="../../../assets/images/common/people.svg" class="fl" alt=""> -->
                <img src="../../../assets/images/channel/channer_addressBook.svg" class="fl mright-05" style="width:20px" alt="">
                <p class="fl font15 commonBlack">{{team.cabinetNameMtext}}</p>
                <!-- <p class="fl font15 commonBlack">{{'그룹: ' + team.cabinetNameMtext}}</p> -->
                <!-- <span class="fr" @click="removeSelectedYn('book',index)">x</span> -->
                <span class="fr commonColor" @click="removeSelectedYn('book',index)" style="border-radius: 100%; border: 1px solid #6768A7; background-color:white; width:20px; height:20px; line-height:18px; position:absolute; right: -10px; top:-10px;">x</span>
            </div>
            <div v-for="(member, index) in teamList.memberList" :key='index' class=" fl"  style="padding: 5px 10px; margin-right: 1.5rem; margin-bottom: 5px; background: #fff;  border-radius: 5px; position:relative; margin-bottom:1.3rem"  >
                <!-- <p class="fl font15 commonBlack">{{'개인: ' + this.$changeText(member.userDispMtext || member.userNameMtext) }}</p> -->

                <img src="../../../assets/images/main/main_subscriber.png" style="float: left; width: 20px; " />
                <p class="fl font15 commonBlack">{{this.$changeText(member.userDispMtext || member.userNameMtext) }}</p>
                <span class="fr commonColor" @click="removeSelectedYn('member',index)" style="border-radius: 100%; border: 1px solid #6768A7; background-color:white; width:20px; height:20px; line-height:18px; position:absolute; right: -10px; top:-10px;">x</span>
            </div>
        </div>
                <!-- <div v-for="(data, index) in listData" :key='index' class="receiverTeamListCard fl" @click="clickList(data)" style="width:100%; height:4rem; margin-bottom:10px; "  > -->
    </div>
</template>

<script>
/* eslint-disable */
// eslint-disable-next-line
// import a from '../../../assets/images/common/people.svg'
export default {
    props:{
        listData: {},
        itemType: {},
        btnVisible: {},
        sessionData:{}
    },
    data(){
        return{
            upTxt:'>',
            downTxt:'<',
            editTeamName:'',
            editNameYn:null,
            teamList: {bookList: [], memberList: []},
            dragging: false
        }
    },
    created() {
        this.upDatePage()
    /* this.teamList = {
        bookList: [
            {cabinetNameMtext: '팀플 주소록', cabinetKey: 10, creTeamKey: 200},
            {cabinetNameMtext: '팀플 주소록', cabinetKey: 10, creTeamKey: 200},
            {cabinetNameMtext: '팀플 주소록', cabinetKey: 10, creTeamKey: 200},
            {cabinetNameMtext: '팀플 주소록', cabinetKey: 10, creTeamKey: 200}
        ],
        memeberList: [
            {userDispMtext: 'KO$^$수망고', userKey: 1},
            {userDispMtext: 'KO$^$수망고', userKey: 1},
            {userDispMtext: 'KO$^$수망고', userKey: 1},
            {userDispMtext: 'KO$^$수망고', userKey: 1}
        ]
    } */
    if(this.sessionData){
        // this.sessionData.sessionYn=true
        this.teamList.memberList.push(this.sessionData)
    }

    },
    watch: {
    },
    components: {
    },
    // computed: {
    //     setTotalHeight () {
    //         return {
    //             '--scrollHeight' : this.teamList.length * 70 + 20 + 'px'
    //         }
    //     }
    // },
    methods: {
        //유민참고
        upDatePage(data) {
            if (data) {
                if (data.bookList !== undefined && data.bookList !== null) {
                    this.teamList.bookList = data.bookList
                }
                if (data.memberList !== undefined && data.memberList !== null && data.memberList.length > 0) {
                    this.teamList.memberList = data.memberList
                }
            } else {
                if (this.listData !== undefined && this.listData !== null) {
                    if (this.listData.bookList !== undefined && this.listData.bookList !== null) {
                        this.teamList.bookList = this.listData.bookList
                    }
                    if (this.listData.memberList !== undefined && this.listData.memberList !== null && this.listData.memberList.length > 0) {
                        this.teamList.memberList = this.listData.memberList
                    }
                }
            }

        },
        sendReceivers() {
            // this.teamList.itemType = this.itemType
            this.$emit('btnClick', this.teamList)
        },
        removeSelectedYn(type, index) {
            if(type === 'book') {
                this.teamList.bookList.splice(index, 1)
            } else if(type === 'member') {
                this.teamList.memberList.splice(index, 1)
            }
            this.teamList.index = index
            this.$emit('changeSelectedList', this.teamList)
        },
        teamPlusClick(data, index){
            // const obj = new Object();
            // obj.data = data;
            // obj.index = index
            // this.teamList.splice(index, 1)
            // this.$emit('selectTeam', obj);
        },
        clickList(data){
            // if(this.selectPopYn !== true)
            // this.$emit('openDetail',data)
        },
        deleteTeamClick(data,index){

            // this.teamList.splice(index, 1)
        },
        editClick(data, index){
            // var editTeamName = document.getElementById(index)
            // if(this.editNameYn === index){
            //     this.editNameYn = null
            //     data.reveiverTeamName = editTeamName.value
            // }else{
            //     this.editNameYn = index
            //     editTeamName.value = data.reveiverTeamName
            // }
        },
        newAddTeam(){
            // this.editNameYn = null
            // var addlistData = []

            // const newList = [
            //     ...addlistData,
            //     ...this.teamList
            // ]
            // this.memberList.team.unshift({ name: '새로운 구성원', grade: '구성원', creDate: undefined, email: '', phone: '' })
            // this.teamList.unshift({receiverTeamColor:'#ff9999', reveiverTeamName: '새로운 그룹',team:[]})
            // this.editNameYn = 0
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
</style>
