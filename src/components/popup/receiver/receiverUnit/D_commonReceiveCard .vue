<template>
  <!-- <div class="fl w-100P rowBaseCss" :class="selectedYn === true ? 'lightPurpleBgColor ' : 'whiteBGColor'">
    <div v-if="propData.jobkindId === 'USER'" class="fl w-100P" style="display: flex;
    flex-direction: row; align-items: center; justify-content: space-between">

      <div class="imgCircle middleBgColor fl" style="min-width:50px; min-height:50px">
        <img src="" class='fl img-20'>
      </div>

      <div class="fl " style="width:80%;">
        <div class="fl w-100P" >
          <p v-if="propData.self === 'Y'" class="fl font12 whiteColor" style="background:#ccc; padding:3px; border-radius:100%;width: 20px;height: 20px; display: flex; justify-content: center; align-items: center;">나</p>
          <p class="fl mleft-1">{{this.propData[0].name}}</p>
        </div>
        <div class="fl w-100P" >
          <span class="fl">{{this.propData.email}}</span>
          <span class="fl mleft-05">{{this.propData[0].phone}}</span>
        </div>
      </div>

      <div  @click="emit('SELE')" class="fl selectedSpan" style="padding: 0; display: flex; justify-content: center;" >
        <img style="width=50%; " v-if="this.selectedYn === true" src="../../../../assets/images/common/check.svg"/>
      </div>
    </div>

    <div v-else-if="propData.jobkindId === 'BOOK'" class="fl w-100P" style="display: flex;
    flex-direction: row; align-items: center; justify-content: space-between;" >

      <div class="fl " style="display: flex; align-items: center;">
        <div class="imgCircle middleBgColor fl" >
          <img src="../../../../assets/images/channel/channer_addressBook.svg" class="content img-w25"/>
        </div>
        <p class="fl font20 fontBold mleft-05">{{this.propData.cabinetNameMtext}}</p>
      </div>

      <span @click="emit('SELE')" class="fl selectedSpan">
        <img v-if="this.selectedYn === false" src=""/>
        <img v-if="this.selectedYn === true" src="../../../../assets/images/common/check.svg"/>
      </span>
    </div>
  </div> -->
  <div class="fl w-100P" style="border-bottom: 1px solid #ccc; ">
    <div class="fl w-100P rowBaseCss" v-if="propData.jobKindId === 'BOOK'" style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;" >
      <div class="imgCircle middleBgColor fl" >
        <img src="../../../../assets/images/board/icon_book.svg" class="content img-w25"/>
      </div>
      <div class="fl w-100P" style="display: flex; align-items: center; " @click="emit('open')">
        <div class="textLeft fl w-100P " style="">
          <p class="fl font16 commonDarkGray fontBold w-100P">{{propData.cabinetNameMtext}}</p>
          <!-- <div class="fl w-100P textLeft" style="overflow: hidden; white-space: nowrap; display: flex; align-items: center">
            <p class="fl font14 commonDarkGray mleft-05" :class="index === 0 ? 'mleft-0' : '' " v-for="(value, index) in propData.mUserList" :key="index">{{this.$changeText(value.userDispMtext)}}</p>
          </div> -->
          <!-- white-space: nowrap; text-overflow: ellipsis; overflow: hidden; -->
          <p class="fl font14 commonDarkGray " style="" >{{cabinetNames}}</p>
          <!-- <p class="fl font14 commonDarkGray mleft-05" >{{this.propData.mUserList.length}}</p> -->
        </div>
      </div>

      <div v-if="option === 'EDIT'" class="fr cursorP" style="display: flex; align-items: center;">
        <img src="../../../../assets/images/board/icon_edit.svg" class="img-w20 fl" style="margin: 0 10px;" @click="emit('edit')" >
        <img src="../../../../assets/images/board/icon_trash.svg" class="img-w20 fl" style="width: 20px; margin: 0 10px;" @click="emit('delete')" >
      </div>

      <div v-if="option === 'SELE'" class="fr cursorP" style="display: flex; align-items: center;">
        <img class="img-w30" src="../../../../assets/images/common/plusoutline.svg" alt="" v-if="!propData.selectedYn">
        <img class="img-w30" src="../../../../assets/images/common/Tal_checkImage.svg" alt="" v-else>
      </div>

      <!-- <span @click="emit('SELE')" class="fl selectedSpan">
        <img v-if="this.selectedYn === false" src=""/>
        <img v-if="this.selectedYn === true" src="../../../../assets/images/common/check.svg"/>
      </span> -->
    </div>
    <div class="fl w-100P rowBaseCss" v-else-if="propData.jobKindId === 'USER'" style="">
      {{propData}}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cabinetNames: {}
    }
  },
  props: {
    propData: {},
    option: { type: String, default: 'EDIT' },
    selectedYn: { type: Boolean, default: false },
    compoIdx: {}
  },
  methods: {
    emit (type) {
      var param = {}
      param.targetType = type
      param.data = this.propData
      param.index = this.compoIdx
      this.$emit('receiveCardEmit', param)
    },
    setCabinetNames () {
      if (this.propData.mUserList.length > 0) {
        var list = this.propData.mUserList
        var name = ''
        for (let i = 0; i < list.length; i++) {
          name += this.$changeText(list[i].userDispMtext) + ','
        }
        // this.cabinetNames = name.substring(0, name.length - 1)
        if (name.length > 20) {
          this.cabinetNames = name.substring(0, 20) + '..'
        } else {
          this.cabinetNames = name.substring(0, name.length - 1)
        }
        this.cabinetNames += ' ' + this.propData.mUserList.length
      } else {
        this.cabinetNames = '비어있는 주소록'
      }
    }
  },
  created () {
    console.log(this.propData)
    if (this.propData.jobKindId === 'BOOK') {
      this.setCabinetNames()
    }
  }
}

</script>

<style>

.imgCircle{
  padding: 1rem;
  border-radius: 50%;
  /*
  display: inline-block;
  width: 10%;
  position: absolute;
  top:8px;
  left: 16px; */
}

.rowBaseCss{
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

/* position: absolute; */
width: 100%;
min-height: 70px;
left: 0px;
/* top: 143px; */
/* background: #F5F5F9; */
/* padding: 5%; */
  }

.selectedSpan{
/* position: absolute; */
width: 20px;
height: 20px;
left: 330px;
top: 25px;

/* 더알림1 */

background: #5F61BD;
/* 더알림1 */

border: 1.5px solid #5F61BD;

border-radius: 50%;
}
</style>
