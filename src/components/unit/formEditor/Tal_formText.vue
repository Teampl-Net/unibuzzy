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
