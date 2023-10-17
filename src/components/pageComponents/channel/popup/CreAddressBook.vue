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
    "EDIT_BOOK_MSG_NONAME": "Please enter a name for team.",
    "EDIT_BOOK_MSG_SAVE": "There was a problem saving. Please try again."
  }
}
</i18n>
<template>
  <div class="createTeamWrap">
    <gPopHeader :headerTitle="propData.targetType === 'creAddressBook'? 'Create Team':'Edit Team'" :pClosePop="pClosePop" />
    <div class="addressItemWrite">
      <p class="fontBold textLeft font16 fl">{{ $t('EDIT_BOOK_TITLE_NAME') }}</p>
      <input v-model="inputAddressBookName" mCreAdressOpenType="text" :placeholder="$t('EDIT_BOOK_MSG_NONAME')" class="addressBookInputType"  id="addressBookName">
    </div>
    <gBtnSmall class="font16 teamBtnStyle" :class="inputAddressBookName.trim() === '' ? 'CWhiteGrayBgColor CWDeepGrayColor' : 'CDeepBgColor'" :btnTitle='mCreAdressOpenType' @click="saveCabinet" />
  </div>
</template>

<script>
export default {
  props: {
    propData: {},
    pClosePop: Function
  },
  mounted () {
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
        this.inputAddressBookName = this.$changeText(cabinet.cabinetNameMtext)
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

      param.cabinet.cabinetNameMtext = this.inputAddressBookName
      try {
        var result
        result = await this.$saveCabinet(param)
        console.log(result)
        var thisParam = {}
        thisParam.cabinetType = 'address'
        this.closePop()
      } catch (error) {
        console.error(error)
        this.$showToastPop(this.$t('EDIT_BOOK_MSG_SAVE'))
      } finally {

      }
    },
    closePop () {
      this.$emit('closeXPop', 'address')
    }
  }
}
</script>
<style>
.addressBookInputType{
  padding-left: 5px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: text;
  width: calc(100% - 100px);
  background: white !important;
  float: left;
}
.addressBookInputType::placeholder {
  color : #BDBDBD;
}
.addressItemWrite{
  display: flex;
  align-items: center;
  min-height: 65px;
  padding-top: 100px !important;
}
.createTeamWrap {
  width:100%;
  height:100%;
  padding: 0rem 1rem 0rem 1rem;
  background: #fff;
}
.teamBtnStyle {
  width: 80% !important;
  height:50px !important;
  line-height: 50px !important;
  left: 10% !important;
  position: absolute !important;
  bottom: 2rem !important;
  font-size: 16px !important;
}
.addressItemWrite > p {
  width: 100px;
}
</style>
