<template>
        <span @focus="test" contenteditable style="padding: 0 5px; display:inline-block; width: calc(100% - 30px); border-right: #ccc;     word-break: break-all;" autofocus :formIdx="targetKey"  ref="formTextArea" :id="'formTextArea'+targetKey" class="formCard formText editableContent" @input="inputResize('formTextArea'+targetKey)"></span>
        <!-- <div class="" style="width: 30px; background: #BFBFDA; float: right border-radius: 3px; box-shadow: rgb(191 191 218) 0px 0px 2px 0px; height: 100%; margin-right: 5px; display: flex; justify-content: center; align-items: center;"><img class="fl" src="../../../assets/images/formEditor/scroll.svg" alt=""></div> -->
</template>

<script>
export default {
  data () {
    return {
      toolBoxShowYn: false,
      formTextArea: '',
      tools: { boldYn: false, italicYn: false, underLineYn: false, ftSize: 16 }
    }
  },
  props: {
    targetKey: {},
    propsTools: {},
    inputHtml: {}
  },
  mounted () {
    document.querySelector('#formCard' + this.targetKey).addEventListener('paste', (e) => {
      var items = (e.clipboardData || e.originalEvent.clipboardData).items
      for (const i of items) {
        var item = i
        if (item.type.indexOf('image') !== -1) {
          e.preventDefault()
          // uploadFile(file);
        }
      }
    })
    this.init()
    if (this.inputHtml) {
      document.querySelectorAll('.formDiv #' + 'formTextArea' + this.targetKey)[0].innerHTML = this.inputHtml

      this.formTextArea = this.inputHtml
    }
    // this.formTextArea = this.inputHtml
    if (this.propsTools !== undefined && this.propsTools !== 'undefined' && this.propsTools !== null && this.propsTools !== 'null' && this.propsTools !== '') {
      this.tools = this.propsTools
    }
  },
  updated () {
    this.formTextArea = this.inputHtml
  },
  computed: {
    $textarea () {
      return document.getElementById('formTextArea' + this.targetKey)
    }
    /* settingTextArea () {
      var bold = 'nomal'
      var underLine = 'none'
      var ftSize = 16
      var italic = 'normal'
      if (this.tools.boldYn === true) {
        bold = 'bold'
      }
      if (this.tools.underLineYn === true) {
        underLine = 'underLine'
      }
      if (this.tools.italicYn === true) {
        italic = 'italic'
      }
      ftSize = this.tools.ftSize
      return {
        '--boldYn': bold,
        '--decoration': underLine,
        '--fontSize': ftSize + 'px',
        '--fontStyle': italic
      }
    } */
  },
  methods: {
    test () {
      this.$emit('showToolBox', { tools: this.tools })
      var tt = this.$refs.formTextArea
      console.log(tt)
      this.$emit('inputScroll', tt.scrollHeight)
    },
    focusInput () {
      this.$nextTick(() => {
        this.$refs.formTextArea.focus()
      })
    },
    init () {
      // this.resize()
    },
    inputResize (value) {
      // this.formTextArea = document.getElementById(value).outerHTML
      this.formTextArea = this.$refs.formTextArea.innerHTML
      this.$emit('updateCard', { value: this.formTextArea, type: 'updateInput' })
      // this.resize()
    },
    async previewFile (file) {
      let fileExt = file.name.substring(
        file.name.lastIndexOf('.') + 1
      )
      // 소문자로 변환
      fileExt = fileExt.toLowerCase()
      if (
        ['jpeg', 'jpg', 'png', 'gif', 'bmp'].includes(fileExt)
      ) {
        // FileReader 를 활용하여 파일을 읽는다
        var reader = new FileReader()
        var thisthis = this
        reader.onload = e => {
          var image = new Image()
          image.onload = function () {
            // Resize image
            var canvas = document.createElement('canvas')
            var width = image.width
            var height = image.height
            if (width > height) { // 가로모드
              if (width > 900) {
                height *= 900 / width
                width = 900
              }
            } else { // 세로모드
              if (height > 900) {
                width *= 900 / height
                height = 900
              }
            }
            var fileUrl = null
            canvas.width = width
            canvas.height = height

            canvas.getContext('2d').drawImage(image, 0, 0, width, height)
            const imgBase64 = canvas.toDataURL('image/png', 0.8)
            fileUrl = imgBase64
            const decodImg = atob(imgBase64.split(',')[1])
            const array = []
            for (let i = 0; i < decodImg.length; i++) {
              array.push(decodImg.charCodeAt(i))
            }
            const Bfile = new Blob([new Uint8Array(array)], { type: 'image/png' })
            var newFile = new File([Bfile], file.name)
            thisthis.$refs.complexEditor.successImgPreview({ targetKey: document.querySelectorAll('#eContentsWrap .formDiv').length - 1, selectFileList: [{ previewImgUrl: canvas.toDataURL('image/png', 0.8), addYn: true, file: newFile }], originalType: 'image' })
            thisthis.$refs.complexEditor.addFormCard('image', fileUrl, true)
            // this.$emit('updateImgForm', this.previewImgUrl)
            // editorImgResize1(canvas.toDataURL('image/png', 0.8))
            // settingSrc(tempImg, canvas.toDataURL('image/png', 0.8))
          }
          image.onerror = function () {

          }
          image.src = e.target.result
          // this.previewImgUrl = e.target.result
        }
        reader.readAsDataURL(file)
        // await this.$editorImgResize(this.selectFile)
      }
      /* if (thisthis.$refs.selectFile.files.length > 1) {
        thisthis.$emit('setMultiFile', thisthis.selectFileList)
      } */
    }
    // eslint-disable-next-line no-unused-vars
    /* blurEvnt () {
      this.$emit('updateCard', { type: 'goBlur' })
    } */
  }
}
</script>

<style scoped>
textarea:focus, input:focus{
    outline: none;
}
[contenteditable=true] {
  outline: none;
}

</style>
