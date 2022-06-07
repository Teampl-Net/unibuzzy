<template>
<div class="addTeamMemberArea">

    <div class="menuHeader" style="box-shadow: 0px 7px 9px -9px #00000036; position: relative; box-sizing: border-box; white-space: nowrap;" >
        <img v-on:click="backClick" class="mtop-05 mleft-1 fl" src="../../../assets/images/common/icon_back.png"/>
        <p style="text-align:left; margin-left:3rem; font-weight:bold;">{{receiverTitle}}</p>
    </div>

    <div class="memberLogoArea" style="">
        <img :src="selectIcon" style="width:90%"/>
        <form @submit.prevent="formSubmit" method="post" style="position: absolute; left:40%; bottom:0; transform: translate(-30%)" >
            <label @click="iconBgPopupYn='iconPop'" for="input-Logoimgfile" class='memberLogoLabel' >아바타 선택</label>
        </form>
    </div>

    <div class="addMemberTextArea">
        <div style="width:100%; height: 30px; margin-top:2rem" class="mtop-1 fl">
            <p class="textLeft font16 fl cBlack tB" style="line-height: 30px;">이름</p>
            <input type="text" placeholder="구성원의 이름을 입력해주세요" class="creChanInput fr"  v-model="memName" >
        </div>

        <div style="width:100%; height: 30px; margin-top:2rem" class="mtop-1 fl">
            <p class="textLeft font16 fl cBlack tB" style="line-height: 30px;">이메일</p>
            <input type="text" placeholder="구성원의 이메일을 입력해주세요" class="creChanInput fr"  v-model="memEmail" >
        </div>

        <div style="width:100%; height: 30px; margin-top:2rem" class="mtop-1 fl">
            <p class="textLeft font16 fl cBlack tB" style="line-height: 30px;">전화번호</p>
            <input type="text" placeholder="구성원의 전화번호를 입력해주세요" class="creChanInput fr"  v-model="memPhone" >
        </div>

    </div>

    <div @click="checkPopYn= true" class="creMemberBigBtn fl mtop-1;">구성원 추가</div>

</div>
</template>

<script>
/* eslint-disable */
// eslint-disable-next-line
export default {
    props:{
        setEditMember:{},

    },
    data(){
        return{
            receiverTitle:'구성원 추가하기',
            memName:'',
            memEmail:'',
            memPhone:'',

        }
    },
    created(){
        if(this.setEditMember != '' || this.setEditMember != null){
            this.memName  = this.setEditMember.name
            this.memEmail = this.setEditMember.email
            this.memPhone = this.setEditMember.phone
        }
    },
    methods:{
        backClick(){
            this.$emit('closePop')
        }

    }
}
</script>

<style >
.addMemberTextArea{
    font-size:14px; width: 100%; min-height: 100px; background: #FFF; padding: 0 3rem; opacity:0.9;

}

.memberLogoArea{
border:1px solid #ccc; width: 120px; height: 120px; border-radius: 120px; margin: 0 auto;  background: #ffffff66; position: relative;display:flex; flex-direction: column; justify-content: center; align-items: center;
margin-top: 3rem;
margin-bottom: 2rem;
}

.memberLogoLabel{
  color: white; padding: 0.25rem 0.5rem;background-color:black; opacity: 0.8; font-size:14px;white-space: nowrap;
}

.creChanInput{
    width:70%;
    min-width: 170px;

}

.addTeamMemberArea{
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: white;

}
/* .receiverTeamMemberCard{display: flex; flex-direction: row; align-items: center; justify-content: space-between; border-bottom:1px solid #eee;  padding: 0.7rem 0} */
.receiverTeamMemberCard {border-bottom:1px solid #eee;  padding: 0.7rem 0;box-shadow: 0px 1px 5px 0px #ccc;}

.receiverTeamColor{width:40px; height:40px; border-radius:100%; border:4px solid #ddd;}
.receiverTeamText{font-weight: bold; height:40px; line-height:40px;}
.receiverTeamSubscImg{border:2px solid #a9aacd; border-radius:100%; width: 20px;height: 20px; margin-right:10px;}

.cBlack{
    color: black;
}
.tB{
    font-weight: bold;
}

.creMemberBigBtn{
    height: 50px; line-height: 50px; font-size: 18px; background: #6768a7; color: #fff; border-radius: 8px;
  /* width: 100%;  */

  /* add Jeong */
    width: 90%;
    position: fixed;
    bottom: 10px;
    left: 5%;
}
</style>