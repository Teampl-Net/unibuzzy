<template>
<div class="receiverTeamListArea">
    <div v-if="editYn" @click="newAddTeam"  class="fl receiverTeamMemberCard" style="width:100%; height:60px; line-height: 40px;margin-bottom: 10px;">
        <p class="font15 cBlack">+</p>
    </div>

    <div v-for="(data, index) in teamList" :key='index' class="receiverTeamListCard fl" @click="clickList(data)" style="width:100%; height:60px; margin-bottom:10px; "  >
    <!-- <div v-for="(data, index) in listData" :key='index' class="receiverTeamListCard fl" @click="clickList(data)" style="width:100%; height:4rem; margin-bottom:10px; "  > -->
        <div class="fl">
            <div class="fl movePointerArea" style="width:30px; background-color:#ddd" v-if="editYn"><p class="tB trans90 cBlack " >{{upTxt}}</p><p class="tB trans90 cBlack">{{downTxt}}</p> </div>
            <div class="fl receiverTeamColor" :style="{background:data.receiverTeamColor}"></div>

            <p v-if='editNameYn !== index' @click="editClick(data,index)" class="fl font15 cBlack  receiverTeamText">{{data.reveiverTeamName}}</p>
            <input v-show='editNameYn === index && editYn == true' :id="index" style="border:none; border-bottom: 0.5px solid #ccc;"/>
        </div>

        <div class="fr mright-1 mtop-05" v-if="!editYn">
            <p class="fr font15 cBlack" style="margin-right:10px">{{data.team.length}}</p>
            <img src="../../../assets/images/main/main_subscriber.png"  class="fr receiverTeamSubscImg"  >
        </div>

        <div class="fr mtop-05" v-else style="position: relative; ">
            <div @click="editClick(data,index)" class="fl" style="background-color:#ddd;  width:55px; height: 60px; line-height:60px; position:absolute; top:-1.2rem; right: 55px;">
                <img src="../../../assets/images/common/editbtn.svg" >
            </div>
            <div @click="deleteTeamClick(data)" class="fl " style="background-color:#a9aacd;  width:55px; height: 60px; line-height:60px; position:absolute; top:-1.2rem; right: 0; ">
                <p class="cBlack tB">삭제</p>
            </div>
        </div>

    </div>

</div>
</template>

<script>
/* eslint-disable */
// eslint-disable-next-line
export default {
  props: {
    listData: {},
    editYn: {}
  },
  data () {
    return {
      upTxt: '>',
      downTxt: '<',
      editTeamName: '',
      editNameYn: null,

      teamList: {}
    }
  },
  mounted () {
    this.teamList = this.listData
  },
  methods: {
    clickList (data) {
      this.$emit('openDetail', data) // alert(data.reveiverTeamName)
    },
    deleteTeamClick (data) {

    },
    editClick (data, index) {
      var editTeamName = document.getElementById(index)
      if (this.editNameYn === index) {
        this.editNameYn = null
        data.reveiverTeamName = editTeamName.value
      } else {
        this.editNameYn = index
        editTeamName.value = data.reveiverTeamName
      }
    },
    newAddTeam () {
      this.editNameYn = null
      var addlistData = [{ receiverTeamColor: '#ff9999', reveiverTeamName: '', team: [] }]

      const newList = [
        ...addlistData,
        ...this.teamList
      ]
      this.teamList = newList
      this.editNameYn = 0
      document.getElementById(0).focus()
    }
  }
}
</script>

<style >
.receiverTeamListArea{margin-top: 100px;}
/* .receiverTeamListCard{display: flex; flex-direction: row; align-items: center; justify-content: space-between; border-bottom:1px solid #eee;  padding: 0.7rem 0} */
.receiverTeamListCard{border-bottom:1px solid #eee;  padding: 0.7rem 0; box-shadow: 0px 1px 5px 0px #ccc;}
.receiverTeamListCard input{
    width: 130px;
}
.receiverTeamColor{width:30px; height:30px; border-radius:100%; border:4px solid #ddd; margin: 0 10px;}
.receiverTeamText{font-weight: bold; height:40px; line-height:40px;}
.receiverTeamSubscImg{border:2px solid #a9aacd; border-radius:100%; width: 20px;height: 20px; margin-right:10px;}

.cBlack{color: black;}
.tB{font-weight: bold;}
.trans90{transform:rotate(270deg)}
.movePointerArea{
    transform: scaleY(1.7);
        margin-top: 0.1rem;
}

</style>
