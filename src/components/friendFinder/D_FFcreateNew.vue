<template>
  <div class="finderListWrap">
    <div class="fl font16 fontBold w100P finderListTitle">
      <div class="finderListTitleText">
        <p class="textOverdot textLeft font25">
          Select an Activity
        </p>
      </div>
      <div class="cursorP closeBox" @click="pClosePop">
        <img src="@/assets/images/common/popup_close.png" alt="" />
      </div>
    </div>
    <div class="fl w100P" style="height: calc(100% - 100px); padding-top:50px;">
      <div v-for="(btn, i) in mBtnList" :key="i" class="fl" style="width: 40%; height: 30%; margin: 10% 5%; border: 1px solid blue;">{{ btn.name }}</div>
    </div>
    <div class="w100P fl textRight" style="height: 50px;">Next</div>
  </div>
</template>

<script>
export default {
  props: {
    pSelectedInfo: {},
    pClosePop: Function
  },
  data () {
    return {
      mBtnList: [
        { id: 0, name: 'Study Buddy', imgLink: '../resources/uniB/unib_sticker_1.png' },
        { id: 1, name: 'Gym Buddy', imgLink: '../resources/uniB/unib_sticker_2.png' },
        { id: 2, name: 'Dining Buddy', imgLink: '../resources/uniB/unib_sticker_3.png' },
        { id: 3, name: 'Coffee Buddy', imgLink: '../resources/uniB/unib_sticker_1.png' }
      ],
      isVisible2: false,
      mSelectedInfo: {}
    }
  },
  methods: {
    showNext () {
      this.isVisible2 = true
    },

    closeThis () {
      this.isVisible2 = false
    }
  }
}
</script>
<style scoped>
.finderListWrap {
  padding: 10px 20px;
  background: rgb(255 255 255 / 65%);
  backdrop-filter: blur(9px);
  position: absolute;
  z-index: 9999;
  bottom: 10%;
  box-shadow: rgb(0 0 0 / 26%) 0px -6px 13px 4px;
  left: 5%;
  height: 80%;
  width: 90%;
  border-radius: 0.8rem 0.8rem 0.8rem 0.8rem;
}

.finderListTitle {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.finderListTitleText {
  display: flex;
  align-items: center;
  width: calc(100% - 25px);
}

.finderListTitleText > img {
  width: 45px;
  margin-right: 5px;
}

.finderListTitleText > p {
  width: calc(100% - 40px);
}</style>
