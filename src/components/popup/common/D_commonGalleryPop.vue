<template>
  <div v-if="GE_IMG_LIST && GE_IMG_LIST.length > 0">
  </div>
</template>

<script>
import PhotoSwipeLightbox from 'photoswipe/dist/photoswipe-lightbox.esm.js'
import { onMessage } from '../../../assets/js/webviewInterface'

import 'photoswipe/dist/photoswipe.css'
export default {
  name: 'SimpleGallery',
  props: {
    propFirstIndex: {},
    propImgList: {}
  },
  watch: {
    pageUpdate (value, old) {
      this.backClick()
    },
    GE_IMG_LIST: {
      immediate: true,
      handler (value, old) {
        if (!value || value.length === 0) return
        this.options.dataSource = [
          ...value
        ]
      },
      deep: true
    }
  },
  created () {
    var history = this.$store.getters['D_HISTORY/hStack']
    this.popId = 'previewImgPop' + history.length
    history.push(this.popId)
    this.$store.commit('D_HISTORY/updateStack', history)
  },
  data () {
    return {
      mWidth: window.innerWidth,
      mHeight: window.innerHeight,
      popId: null,
      lightbox: null,
      options: {
        dataSource: [
        ], // 이미지에 대한 내용을 넘겨받음
        allowPanToNext: false,
        arrowPrevSVG: '<svg aria-hidden="true" class="pswp__icn" viewBox="0 0 100 125" width="100" height="125"><path d="M5,50L50,5l3,3L11,50l42,42l-3,3L5,50z M92,95l3-3L53,50L95,8l-3-3L47,50L92,95z"/></svg>',
        arrowNextSVG: '<svg aria-hidden="true" class="pswp__icn" viewBox="0 0 100 125" width="100" height="125"><path d="M5,50L50,5l3,3L11,50l42,42l-3,3L5,50z M92,95l3-3L53,50L95,8l-3-3L47,50L92,95z"/></svg>',
        mainClass: 'pswp--custom-icon-colors',
        bgOpacity: 1,
        pswpModule: () => import('photoswipe')
      }
    }
  },
  computed: {
    historyStack () {
      return this.$store.getters['D_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    GE_IMG_LIST () {
      if (!this.propImgList || this.propImgList.length === 0) return
      if (!this.propImgList[0].attributes) {
        console.log(this.propImgList)
        return this.propImgList
      }
      var returnImgList = []
      for (var i = 0; i < this.propImgList.length; i++) {
        var imgObject = {}
        var img = new Image()
        // img.src = this.propImgList[i].domainPath + this.propImgList[i].pathMtext
        img.src = this.propImgList[i].currentSrc
        imgObject.src = img.src
        imgObject.fileKey = Number(this.propImgList[i].attributes.fileKey.value)
        imgObject.width = this.propImgList[i].width
        imgObject.height = this.propImgList[i].height
        returnImgList.push(imgObject)
      }
      return returnImgList
    }
  },
  methods: {
    popupGallery (index) {
      this.lightbox.loadAndOpen(index) // 갤러리를 화면에 띄우는 메소드(인자로 몇 번째 사진을 띄울지에 대한 인덱스를 넘겨 받음)
    },
    backClick () {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      if (this.popId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', hStack)
        this.$emit('closeXPop')
      } else {

      }
    },
    async download (img) {
      var imgPath = img.src
      var fKey = img.fileKey
      try {
        var isMobile = /Mobi/i.test(window.navigator.userAgent)
        if (isMobile) {
          onMessage('REQ', 'saveCameraRoll', imgPath)
        } else {
          var result = await this.$downloadFile(fKey, imgPath)
          console.log(result)
        }
        this.$showToastPop('정상적으로 저장되었습니다!')
        // this.saveOkPopShowYn = true
      } catch (error) {
        // console.log(error)
      }
    }
  },
  /* setup (props) {
     return {
       imagesData: props.images
     }
   }, */
  mounted () {
    var this_ = this
    if (!this.GE_IMG_LIST || this.GE_IMG_LIST.length === 0) return
    if (!this.lightbox) {
      this.lightbox = new PhotoSwipeLightbox(
        this.options
      )
      this.lightbox.on('uiRegister', () => {
        this.lightbox.pswp.ui.registerElement({
          name: 'test-button',
          ariaLabel: 'Toggle zoom',
          order: 9,
          isButton: true,
          html: {
            isCustomSVG: true,
            inner: '<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1ZM23 23H9v2h14Z" id="pswp__icn-download"/>',
            outlineID: 'pswp__icn-download'
          },
          onClick: (event, el, pswp) => {
            console.log(pswp.currIndex)
            var index = pswp.currIndex
            var targetImg = this.GE_IMG_LIST[index]
            this.download(targetImg)
          }
        })
      })
      this.lightbox.on('close', () => {
        this_.backClick()
      })

      this.lightbox.init()
    }
    this.popupGallery(this.propFirstIndex)
  },
  unmounted () {
    if (this.lightbox) {
      this.$emit('closeXPop')
      // this.lightbox.destroy()
      // this.lightbox = null
    }
  }
}
</script>

 <style>
 .pswp--custom-icon-colors {
   --pswp-icon-color: #fff;
   --pswp-icon-color-secondary: #333;
 }
 .pswp__top-bar {
  padding-top: 30px;
 }
 </style>
