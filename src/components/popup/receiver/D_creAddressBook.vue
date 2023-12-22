<i18n>
{
  "ko": {
    "EDIT_BOOK_TITLE_NAME": "주소록 이름",
    "EDIT_BOOK_BTN_CREATE": "생성하기",
    "EDIT_BOOK_BTN_EDIT": "수정하기",
    "EDIT_BOOK_MSG_NONAME": "주소록 이름을 입력해주세요.",
    "EDIT_BOOK_MSG_SAVE": "저장 중 문제가 발생했습니다. 다시 시도해주세요."
  },
  "en": {
    "EDIT_BOOK_TITLE_NAME": "Book Name",
    "EDIT_BOOK_BTN_CREATE": "Create",
    "EDIT_BOOK_BTN_EDIT": "Edit",
    "EDIT_BOOK_MSG_NONAME": "Please enter a name for address book.",
    "EDIT_BOOK_MSG_SAVE": "There was a problem saving. Please try again."
  }
}
</i18n>
<template>
  <div id='dlTskdy' style="width:100%; height:100%; margin-top:50px; padding: 1rem 1rem 0rem 1rem; ">
    <div class="addressItemWrite">
      <p class="fontBold textLeft font16 fl" style="width: 100px;">{{ $t('EDIT_BOOK_TITLE_NAME') }}</p>
      <input v-model="inputAddressBookName" mCreAdressOpenType="text" :placeholder="$t('EDIT_BOOK_MSG_NONAME')" class="addressBookInputType"  id="addressBookName" style="">
    </div>
    <gBtnSmall class="font16 " :class="inputAddressBookName.trim() === '' ? 'CWhiteGrayBgColor CWDeepGrayColor' : 'CDeepBgColor' " style="width: 80%; height:50px; line-height:50px; left:10%; position:absolute; bottom:2rem; font-size:16px" :btnTitle='mCreAdressOpenType' @click="saveCabinet" />
  </div>
</template>

<script>
export default {
  props: {
    propData: {}
  },
  mounted () {
    console.log(this.propData)
    this.setting()
  },
  data () {
    return {
      mCreAdressOpenType: '',
      inputAddressBookName: ''
    }
  },
  methods: {
    setting () {
      if (this.propData) {
        var cabinet = this.propData.cabinet
        this.mCreAdressOpenType = this.propData.newAddressYn === true ? this.$t('EDIT_BOOK_BTN_CREATE') : this.$t('EDIT_BOOK_BTN_EDIT')
        this.inputAddressBookName = cabinet.cabinetNameMtext
      }
    },
    async saveCabinet () {
      if (this.inputAddressBookName.trim() === '') {
        this.$showToastPop(this.$t('EDIT_BOOK_MSG_NONAME'))
        return
      }
      var param = {}
      param.creMenuYn = true
      param.cabinet = this.propData.cabinet

      delete param.cabinet.mUserList // mUserList가 있으면 서비스에서 모델 바인딩할 때 에러 납니다.

      param.cabinet.cabinetNameMtext = 'KO$^$' + this.inputAddressBookName
      console.log(param)
      try {
        var result
        result = await this.$saveCabinet(param)
        console.log(result)
        var thisParam = {}
        thisParam.cabinetType = 'address'
        thisParam.targetKind = param.targetKind
        this.$emit('saveCabinet', thisParam)
        if (this.propData.callbackFn) {
          this.propData.callbackFn(param)
        }
      } catch (error) {
        console.error(error)
        this.$showToastPop(this.$t('EDIT_BOOK_MSG_SAVE'))
      } finally {

      }

      this.closePop()
    },
    closePop () {
      this.$emit('closeXPop', true)
    }
  }
}
</script>
<style>
.addressBookInputType{
  padding-left: 5px; height: 30px; border: 1px solid #ccc; border-radius: 5px; cursor: text; width: calc(100% - 100px); background: white !important; float: left;
}
.addressBookInputType::placeholder {
  color : #BDBDBD;
}
.addressItemWrite{
  display: flex;
  align-items: center;
  min-height: 65px;
  /* border-bottom: 1px solid #ccc; */
}
</style>
