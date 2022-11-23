<template>
  <div class="fl w-100P" style="border-bottom: 1px solid; border-color: #BDBDBD50" :class="{ CWhiteGrayBgColor: (option === 'SELE' && propData.selectedYn === true) }" >
    <div class="fl w-100P rowBaseCss"  style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;" >
      <img v-if="searchYn === true" class="img-w15 fl" src="../../../../assets/images/common/icon_searchGray.svg" alt="">

      <!-- 주소록 영역 -->
      <template v-if="propData.jobKindId === 'BOOK'">
        <div class="imgCircle middleBgColor fl" @click="emit('open')" >
          <img src="../../../../assets/images/board/icon_book.svg" class="content img-w25"/>
        </div>
        <div class="fl" style="display: flex; align-items: center;" :style="option === 'EDIT' ? 'width: calc(100% - 150px);' : 'width: calc(100% - 100px);' " @click="emit('open')">
          <div class="textLeft fl textOverdot w-100P" style="" >
            <p class="fl font16 commonDarkGray fontBold textOverdot w-100P">{{propData.cabinetNameMtext}}</p>
            <p class="fl font14 commonDarkGray textOverdot" style="width: calc(100%)" >{{cabinetNames}}</p>
          </div>
        </div>
      </template>

      <!-- 유저 영역 -->
      <template v-else-if="propData.jobKindId === 'USER'">
        <div class="imgCircle middleBgColor fl" @click="emit('open')" >
          <div v-if="propData.domainPath || propData.userProfileImg" :style="'background-image: url(' + (propData.domainPath? propData.domainPath + (propData.userProfileImg ? propData.userProfileImg : propData.pathMtext ) : propData.userProfileImg ) + ');'" style="background-size: cover; background-repeat: no-repeat; background-position: center;"  class="memberPicImgWrap">
          </div>
          <div v-else style="background-image: url('/resource/userCommonIcon/userImg01.svg');background-size: cover; background-repeat: no-repeat; background-position: center;"  class="memberPicImgWrap">
          </div>
        </div>
        <div class="fl w-100P" style="display: flex; align-items: center; " @click="emit('open')">
          <div class="textLeft fl w-100P " style="" >
            <p class="fl font16 commonDarkGray fontBold w-100P"><img v-if="propData.userKey === GE_USER.userKey" class="img-w20 mright-03" src="../../../../assets/images/editChan/icon_self.svg">{{this.$changeText(propData.userDispMtext)}}</p>
            <p class="fl font14 commonDarkGray " style="" >{{propData.userEmail ? changeDot('email', propData.userEmail) : '등록된 이메일이 없습니다.'}}</p>
            <pp class="fl font14 commonDarkGray" style="margin: 0 0.3rem">|</pp>
            <p class="fl font14 commonDarkGray " style="" >{{propData.phoneEnc ? changeDot('phone', propData.phoneEnc) : '등록된 번호가 없습니다.'}}</p>
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
    compoIdx: {},
    subTitleHidden: { type: Boolean, default: false }
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
      if (this.propData.mUserList && this.propData.mUserList.length > 0) {
        var list = this.propData.mUserList
        var name = ''
        for (let i = 0; i < list.length; i++) {
          name += this.$changeText(list[i].userDispMtext) + ','
        }
        this.cabinetNames = name.substring(0, name.length - 1)
      } else {
        this.cabinetNames = '비어있는 주소록'
      }
    },
    changeDot (type, data) {
      if (this.propData.memberNameMtext) {
        return data
      } else {
        return this.$changeFollowerInfo(type, data)
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
.selectedSpan{
  width: 20px;
  height: 20px;
  left: 330px;
  top: 25px;
  background: #5F61BD;
  border: 1.5px solid #5F61BD;
  border-radius: 50%;
}
</style>
