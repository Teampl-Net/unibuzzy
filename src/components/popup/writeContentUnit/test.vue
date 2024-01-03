<template>

  <div class="fl w-100P rowBaseCss" :class="selectedYn === true ? 'lightPurpleBgColor ' : 'whiteBGColor'">
    <div v-if="propData[0].jobkindId === 'USER'" class="fl w-100P" style="display: flex;
    flex-direction: row; align-items: center; justify-content: space-between">

      <div class="imgCircle middleBgColor fl" style="min-width:50px; min-height:50px">
        <img src="" class='fl img-20'>
      </div>

      <div class="fl " style="width:80%;">
        <div class="fl w-100P" >
          <p v-if="propData[0].self === 'Y'" class="fl font12 whiteColor" style="background:#ccc; padding:3px; border-radius:100%;width: 20px;height: 20px; display: flex; justify-content: center; align-items: center;">나</p>
          <p class="fl mleft-1">{{this.propData[0].name}}</p>
        </div>
        <div class="fl w-100P" >
          <span class="fl">{{this.propData[0].email}}</span>
          <span class="fl mleft-05">{{this.propData[0].phone}}</span>
        </div>
      </div>

      <div  @click="emit('SELE')" class="fl selectedSpan" style="padding: 0; display: flex; justify-content: center;" >
        <img style="width=50%; " v-if="this.selectedYn === true" src="../../../assets/images/common/check.svg"/>
      </div>
    </div>

    <div v-else-if="propData[0].jobkindId === 'BOOK'" class="fl w-100P" style="display: flex;
    flex-direction: row; align-items: center; justify-content: space-between;" >

      <div class="fl " style="display: flex; align-items: center;">
        <div class="imgCircle middleBgColor fl" >
          <img src="../../../assets/images/channel/channer_addressBook.svg" class="content img-w25"/>
        </div>
        <p class="fl font20 fontBold mleft-05">{{this.propData[0].name}}</p>
      </div>

      <span @click="emit('SELE')" class="fl selectedSpan">
        <img v-if="this.selectedYn === false" src=""/>
        <img v-if="this.selectedYn === true" src="../../../assets/images/common/check.svg"/>
      </span>
    </div>
  </div>

</template>

<script>

export default {
  data () {
    return {
      data: {}
    }
  },
  props: {
    propData: {},
    selectedYn: { type: Boolean, default: false }
  },
  methods: {
    emit (type) {
      this.$emit('bookEmit', type)
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

position: absolute;
width: 100%;
height: 70px;
left: 0px;
top: 143px;
background: #F5F5F9;
padding: 5%;
  }

.selectedSpan{
/* position: absolute; */
width: 20px;
height: 20px;
left: 330px;
top: 25px;

/* 모두조인1 */

background: #5F61BD;
/* 모두조인1 */

border: 1.5px solid #5F61BD;

border-radius: 50%;
}
</style>
