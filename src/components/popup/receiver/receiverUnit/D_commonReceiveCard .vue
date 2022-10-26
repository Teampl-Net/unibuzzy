<template>
  <div class="fl w-100P" style="border-bottom: 1px solid; border-color: #BDBDBD50" :class="{ CWhiteGrayBgColor: (option === 'SELE' && propData.selectedYn === true) }" >
    <div class="fl w-100P rowBaseCss"  style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;" >
      <img v-if="searchYn === true" class="img-w15 fl" src="../../../../assets/images/common/icon_searchGray.svg" alt="">

      <!-- 주소록 영역 -->
      <template v-if="propData.jobKindId === 'BOOK'">
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
      </template>

      <!-- 유저 영역 -->
      <template v-else-if="propData.jobKindId === 'USER'">
        <div class="imgCircle middleBgColor fl" >
          <div v-if="propData.userProfileImg" :style="'background-image: url(' + (propData.domainPath? propData.domainPath + propData.userProfileImg : propData.userProfileImg ) + ');'" style="background-size: cover; background-repeat: no-repeat; background-position: center;"  class="memberPicImgWrap">
          </div>
          <div v-else style="background-image: url('../../../../assets/images/main/main_subscriber.png');background-size: cover; background-repeat: no-repeat; background-position: center;"  class="memberPicImgWrap">
          </div>
        </div>
        <div class="fl w-100P" style="display: flex; align-items: center; " @click="emit('open')">
          <div class="textLeft fl w-100P " style="">
            <p class="fl font16 commonDarkGray fontBold w-100P"><img v-if="propData.userKey === GE_USER.userKey" class="img-w20 mright-03" src="../../../../assets/images/editChan/icon_self.svg">{{this.$changeText(propData.userDispMtext)}}</p>
            <p class="fl font14 commonDarkGray " style="" >{{propData.userEmail ? propData.userEmail : '등록된 이메일이 없습니다.'}}</p>
            <pp class="fl font14 commonDarkGray" style="margin: 0 0.3rem">|</pp>
            <p class="fl font14 commonDarkGray " style="" >{{propData.phoneEnc ? propData.phoneEnc : '등록된 번호가 없습니다.'}}</p>
          </div>
        </div>
      </template>

      <!-- 공통 -->
      <div v-if="option === 'EDIT'" class="fr cursorP" style="display: flex; align-items: center;">
        <img v-if="propData.jobKindId === 'BOOK'" src="../../../../assets/images/board/icon_edit.svg" class="img-w20 fl" style="margin: 0 10px;" @click="emit('edit')" >
        <img src="../../../../assets/images/board/icon_trash.svg" class="img-w20 fl" style="width: 20px; margin: 0 10px;" @click="emit('delete')" >
      </div>

      <div v-if="option === 'SELE'" class="fr cursorP" style="display: flex; align-items: center;" @click="emit('add')">
        <div class="fl mright-03" style="width:20px; height:20px; border-radius:100%; border:1px solid #5F61BD; display: flex; justify-content: center; align-items: center;" :class="{ 'CDeepBgColor' : propData.selectedYn === true }">
          <!-- <img v-if="propData.selectedYn === true" class="fl img-w13" src="../../../../assets/images/common/icon_check_white.svg" alt="선택 아이콘"> -->
          <img class="fl img-w13" src="../../../../assets/images/common/icon_check_white.svg" alt="선택 아이콘">
        </div>
      </div>
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
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  }
}

</script>

<style>

/* .imgCircle{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #ECEDF5;
  flex-shrink: 0;
  flex-grow: 0;
  display: flex;
  justify-content: center;
  align-items: center;
} */

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
