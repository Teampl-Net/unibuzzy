<i18n>
{
  "ko": {
    "FORM_MSG_CONTENTS": "내용을 입력해주세요."
  },
  "en": {
    "FORM_MSG_CONTENTS": "Please enter the contents."
  }
}
</i18n>
<template>
  <pre @focus="showToolBox" @keyup="changeFont" :placeholder="$t('FORM_MSG_CONTENTS')" contenteditable style="display:inline-block; width: calc(100% - 30px); border-right: #ccc; word-break: break-all;" autofocus :formIdx="targetKey"  ref="formTextArea" :id="'formTextArea'+targetKey" class="formCard formText editableContent formCardTextid formEditorTextPadding" @input="inputResize('formTextArea'+targetKey)"></pre>
</template>

<script>
export default {
  data () {
    return {
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
          }
        }
      })
    }
    if (this.inputHtml) {
      this.$nextTick(() => {
        this.$refs.formTextArea.innerHTML = this.inputHtml
        this.formTextArea = this.inputHtml
      })
    }
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
  },
  methods: {
    changeFont (e) {
      if (e.keyCode === 8) {
        var test = document.querySelector('pre span')
        if (test) {
          if (test.style.fontSize === '0.875em') {
            test.style.removeProperty('font-size')
          }
        }
      }
    },
    showToolBox () {
      this.$emit('showToolBox', { tools: this.tools })
    },
    inputResize (value) {
      this.formTextArea = this.$refs.formTextArea.innerHTML
      this.$emit('updateCard', { value: this.formTextArea, type: 'updateInput' })
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
