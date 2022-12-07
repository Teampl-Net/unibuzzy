<template>
  <pre @focus="test" placeholder="내용을 입력해주세요." contenteditable style="display:inline-block; width: calc(100% - 30px); border-right: #ccc; word-break: break-all;" autofocus :formIdx="targetKey"  ref="formTextArea" :id="'formTextArea'+targetKey" class="formCard formText editableContent formCardTextid formEditorTextPadding" @input="inputResize('formTextArea'+targetKey)"></pre>
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
    if (this.targetKey) {
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
    }
    this.init()
    if (this.inputHtml) {
      this.$nextTick(() => {
        // console.log('formTextArea' + this.targetKey)
        // // eslint-disable-next-line no-debugger
        // debugger
        // document.querySelectorAll('.formDiv #' + 'formTextArea' + this.targetKey)[0].innerHTML = this.inputHtml
        // document.querySelectorAll('.formDiv .formText').innerHTML = this.inputHtml
        this.$refs.formTextArea.innerHTML = this.inputHtml

        // document.getElementById('formTextArea' + this.targetKey).innerHTML = this.inputHtml

        this.formTextArea = this.inputHtml
      })
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
        ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'webp', 'svg', 'tiff', 'tif', 'eps', 'heic', 'bpg'].includes(fileExt)
      ) {
        // FileReader 를 활용하여 파일을 읽는다
        var reader = new FileReader()
        var thisthis = this
        reader.onload = e => {
          var image = new Image()
          image.onload = async function () {
            // Resize image
            var result = await thisthis.$saveFileSize(image, file)
            thisthis.$refs.complexEditor.successImgPreview({ targetKey: document.querySelectorAll('#eContentsWrap .formDiv').length - 1, selectFileList: [{ previewImgUrl: result.path, addYn: true, file: result.file }], originalType: 'image' })
            thisthis.$refs.complexEditor.addFormCard('image', result.path, true)
          }
          image.onerror = function () {

          }
          image.src = e.target.result
        }
        reader.readAsDataURL(file)
      }
    }
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
.formCardTextid:empty:before{
  content: attr(placeholder);
  color:#AFAFAF;
}

</style>
