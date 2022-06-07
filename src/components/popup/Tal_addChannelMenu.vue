<template>

<div class="addChanMenuArea">
    <div class="addChanH" >
        <img v-on:click="this.$emit('closePop')" class="mleft-1 fl" style="width: 0.8rem; " src="../../assets/images/common/icon_back.png"/>
        <p>추가 게시판 유형</p>
    </div>
    <div class="listArea" style="padding-bottom:3rem">
        <div v-for="(value, index) in chanInfo" :key="index" style="">
            <p class="channelMenuTitle">{{value.chanName}}</p>
            <div v-for="(data, index) in value.group" :key="index" @click="selectItem(data.groupName,data.idNum)" class="channelMenuItem" >
                <div class="fl" style="width:50px; height: 50px;"> <img src="../../assets/images/common/Tal_checkImage.svg" style="width:1rem" v-if="selectedItemNum === data.idNum"></div>
                <div class="fl chanImg" ><img src="../../assets/images/main/main_subscriber.png" /></div>

                <p :class="{selectItem: selectedItemNum === data.idNum }">{{data.groupName}}</p>

            </div>

        </div>

    </div>


    <div style="width: 100vw; height:calc(50% - 50px); background-color:white; position: absolute; left:0; box-shadow: 0px -7px 9px -9px #00000036;">
        <!-- 설명 -->
        <p class="channelMenuTitle" style="margin-top:1.6rem; margin-left: calc(1rem + 20px)">설명</p>
        <div class="channelItemExplain" style="" v-html="explainText"></div>
        <div style="position: absolute; right: 2rem; bottom: 2rem;">
            <gBtnSmall class="btnBig  " v-on:click="this.$emit('closePop')" btnTitle="닫기" style="margin-left:10px"/>
            <gBtnSmall class="btnBig" v-on:click="setResult" btnTitle="적용" style="margin-right:10px"/>
        </div>
    </div>

</div>

</template>
<script>
export default{
    data(){
        return{
            chanInfo: [{chanName: '공지 게시판', group:
            [
                { groupName: '포토게시판',idNum:0},
                { groupName: '새소식',idNum:1},
                { groupName: '자료실',idNum:2},
                { groupName: '자주 묻는 질문',idNum:3},
                { groupName: '직접입력',idNum:4},
            ]},
            {chanName: '전체 문의 게시판', group:
            [
                { groupName: '문의사항', idNum: 5 },
                { groupName: '불편 접수', idNum: 6 },
                { groupName: '직접입력', idNum: 7 },

            ]},
            {chanName: '전체 자유 게시판', group:
            [
                { groupName: '자유 게시판', idNum: 8 },
                { groupName: '묻고 답하기', idNum: 9 },
                { groupName: '경조사', idNum: 10 },
                { groupName: '무료나눔', idNum: 11 },
                { groupName: '중고장터', idNum: 12 },
                { groupName: '자랑하기', idNum: 13 },
                { groupName: '직접입력', idNum: 14 },
            ]},
            {chanName: '대상 지정 게시판', group:
            [
                { groupName: '업무게시판', idNum: 15 },
                { groupName: '직접입력', idNum: 16 },
            ]},
            {chanName: '익명 게시판', group:
            [
                { groupName: '개선 요청', idNum: 17 },
                { groupName: '헬프미', idNum: 18 },
                { groupName: '직접입력', idNum: 19 },
            ]},
            ],
            selectedItemNum:null,
            explainText:'',
            selectedItemTitle:''



            // list: [
            // { iconUrl: 'http://placehold.it/25', menuText: '포토게시판', link: '', type: 'page'},
            // { iconUrl: 'http://placehold.it/25', menuText: '새소식', link: 'pushList', type: 'page' },
            // { iconUrl: 'http://placehold.it/25', menuText: '문의사항', link: 'chanList', type: 'page' },
            // ]

        }
    },
    methods: {
        setResult(){
            var obj = new Object()

            obj.chanMenuTitle = this.selectedItemTitle
            obj.idNum = this.selectedItemNum

            // alert(obj.selectedTitle + '\n' + obj.selectedIdNum)
            this.$emit('addFinish',obj)
        },
        selectItem(name,idNum){

            this.selectedItemNum = idNum
            this.selectedItemTitle = name

            switch(this.selectedItemNum){
                case 0 :
                    this.explainText='사진 및 동영상을 올리고 나누는 게시판입니다. 포토 게시판에 동영상을 업로드 시, 연동되어 있는 유튜브 채널에 자동 업로드합니다. <br>'
                    +'*게시글 권한 대상 : 매니저 '
                    break;
                case 1 :
                    this.explainText='새 소식에 대한 공지를 올립니다. <br>'
                    +'*게시글 권한 대상 : 매니저 '
                    break;
                case 2 :
                    this.explainText='파일 등의 자료를 올리고 공유합니다. <br>'
                    +'*게시글 권한 대상 : 매니저 '
                    break;
                case 3 :
                    this.explainText='구독자가 자주 묻는 질문과 그에 대한 답을 올립니다. <br>'
                    +'*게시글 권한 대상 : 매니저 '
                    break;
                case 4 :
                    this.explainText="'공지 게시판'의 이름을 직접 지정합니다. <br>"
                    +'*게시글 권한 대상 : 매니저 '
                    break;
                case 5 :
                    this.explainText='구독자가 문의를 할 때, 그에 대한 답을 줄 수 있습니다. <br>'
                    +'*게시글 권한 대상 : 매니저 '
                    break;
                case 6 :
                    this.explainText="구독자가 느끼는 불편함을 올릴 때, 그에 대한 답변을 줍니다.  <br>"
                    +'*게시글 권한 대상 : 매니저 '
                    break;
                case 7 :
                    this.explainText="'전체 문의 게시판'의 이름을 직접 지정합니다. <br>"
                    +'*게시글 권한 대상 : 매니저 '
                    break;
                case 8 :
                    this.explainText='구독자라면 누구나 자유롭게 소통하는 게시판입니다. <br>'
                    +'*게시글 권한 대상 : 모두 '
                    break;
                case 9 :
                    this.explainText='구독자라면 누구나 서로 질의응답을 할 수 있는 게시판입니다. <br>'
                    +'*게시글 권한 대상 : 모두 '
                    break;
                case 10 :
                    this.explainText='구독자라면 누구나 경조사에 관련한 게시글을 올릴 수 있는 게시판입니다. <br>'
                    +'*게시글 권한 대상 : 모두 '
                    break;
                case 11 :
                    this.explainText='구독자라면 누구나 무료로 나눔하고 싶은 것을 올릴 수 있는 게시판입니다. <br>'
                    +'*게시글 권한 대상 : 모두 '
                    break;
                case 12 :
                    this.explainText='구독자라면 누구나 중고 거래를 할 수 있는 게시판입니다. <br>'
                    +'*게시글 권한 대상 : 모두 '
                    break;
                case 13 :
                    this.explainText='구독자라면 누구나 자유롭게 본인이 갖고 있는 것에 대해 자랑하는 게시판입니다. <br>'
                    +'*게시글 권한 대상 : 모두 '
                    break;
                case 14 :
                    this.explainText="'전체 자유 게시판'의 이름을 직접 지정합니다. <br>"
                    +'*게시글 권한 대상 : 모두 '
                    break;
                case 15 :
                    this.explainText='대상을 지정해 업무를 지정하고, 대상자에게 지정 알림을 보냅니다. <br>'
                    +'*게시글 권한 대상 : 대상지정 '
                    break;
                case 16 :
                    this.explainText="'대상지정 게시판'의 이름을 직접 지정합니다. <br>"
                    +'*게시글 권한 대상 : 대상지정 '
                    break;
                case 17 :
                    this.explainText='구독자가 익명으로 서비스의 개선점을 요청합니다. <br>'
                    +'*게시글 권한 대상 : 모두 '
                    break;
                case 18 :
                    this.explainText='익명으로 서비스에 어려움을 겪을 때 도움을 요청합니다. <br>'
                    +'*게시글 권한 대상 : 모두 '
                    break;
                case 19 :
                    this.explainText="'익명 게시판'의 이름을 직접 지정합니다.<br>"
                    +'*게시글 권한 대상 : 모두 '
                    break;


            }



        }
    }

}
</script>

<style>

.addChanMenuArea{
    width:100vw ;
    position: fixed;
    z-index: 9999;
    height: 100vh;
    top: 0;
    right: 0;
    background-color: #f0f0f6;
    padding: 0 20px;

}
.addChanH {padding:0.5rem 0;position: absolute; top: 0rem; left: 0; width: 100%; height: 50px; border-bottom: 1.5px solid #999; background-color: white;}
.addChanH p{color: #6768a7; font-size: 20px; text-align: center; font-weight: bold;}

.listArea{
    margin-top: 50px;
    overflow: auto;
    width: 100%;
    height: 50%;
}

.channelMenuItem{
    border-bottom: 1px solid #d7d7d7;
    background-color: white;
    height: 50px;
    line-height: 50px;


}
.channelMenuItem .chanImg{
    margin: 0 15px;
    height: 50px;
}

.channelMenuItem p{
    font-size: 1rem;
    color:black;
    text-align: left;
}
.channelMenuTitle{
    text-align:left;
    font-size: 1.2rem;
    color:black;
    margin-left: 1rem;
    margin-top: 2.5rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
}

.channelItemExplain{
    min-height:40%;
    background-color:#6768a735;
    margin: 0 1.5rem;
    text-align: left;
    padding: 1rem
    /* border-radius: 10px; */

}

.btnBig{
  font-size: 16px !important;
  width: 5rem !important;
  height: 2rem !important;
}

.selectItem{
    color: #6768a7 !important;
    /* color: black !important; */
    font-weight: bold;
    background-color: #6768a710;
}
</style>
