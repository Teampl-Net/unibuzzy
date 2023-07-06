<template>
  <div class="UBPopBackShadow" @click="pPopInfo.closeFn"></div>
  <component :is="'layout'" class="UBPopLayoutWrap" :style="reponsiveSize">
    <!-- <header>
      <button class="backBtn UBPopCloseBtn" @click="pPopInfo.closeFn">
        <img src="@/assets/images/common/UBCloseBtn.svg" alt="닫기" />
      </button>
      <h3 class="popTitle commonTitleText">{{ pPopInfo.title }}</h3>
    </header> -->
    <popHeader />

    <slot />

    <footer>
      <gBtn
        v-for="(btn, index) in pPopInfo.btnList"
        :key="index"
        :pBtnInfo="btn"
        :style="index > 0 ? 'margin-left: 10px' : ''"
        style="min-width: 80px"
      />
    </footer>
  </component>
</template>

<script>
/**
 * props 전달 예시
    {
      title: '팝업 제목',
      closeFn: () => {},
      size: { w: 600, h: 700 },
      btnList: [
        { btnText: '신고하기', onClickFn: () => {} },
        { btnText: '닫기', onClickFn: () => {}}
      ],
      isFull?: true,
      isConfirm?: true,
    }
 */

export default {
  props: {
    pPopInfo: {}
  },
  data () {
    return {
      mScreenWidth: window.innerWidth,
      mScreenHeight: window.innerHeight
    }
  },
  computed: {
    reponsiveSize () {
      if (this.mScreenWidth >= 750) {
        return {
          width: this.pPopInfo.size.w + 'px',
          height: this.pPopInfo.size.h + 'px'
        }
      } else if (this.pPopInfo.isFull) {
        return {
          width: '100%',
          height: '100%'
        }
      } else if (this.pPopInfo.isConfirm) {
        return {
          width: (this.mScreenWidth / 10) * 9 + 'px',
          height: (this.mScreenHeight / 10) * 4 + 'px'
        }
      } else {
        return {
          width: (this.mScreenWidth / 10) * 9 + 'px',
          height: (this.mScreenHeight / 10) * 6 + 'px'
        }
      }
    }
  },
  methods: {
    onResize () {
      this.mScreenWidth = window.innerWidth
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },
  beforeUnmount () {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<style scoped>
.UBPopLayoutWrap {
  border-radius: 0.8rem;
  z-index: 99;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
;
  background-color: #f1f1f5;
;
  border: 1px solid #ccc;
  box-shadow: 9px 9px 9px -9px #00000052;
;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.UBPopCloseBtn {
  display: flex;
  align-items: center;
}
header {
  position: relative;
  padding: 10px 0;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 7px 9px -9px #00000036;
}
slot {
  width: 100%;
  height: calc(100% - 110px);
}
.backBtn {
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
}
.backBtn > img {
  width: 30px;
}
.popTitle {
  text-align: center;
  font-weight: bold;
  margin-bottom: 0;
}
footer {
  /* border-top: 1px solid #000 */
  height: 50px;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px -7px 9px -9px #00000036;
}
</style>
