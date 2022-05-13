<template>
  <p class="textLeft font16">관리자 등록 (최대 3명)</p>
  <div style="width: 100%; height: 25%; padding: 10px 5px; float: left; margin-top: 10px;">
    <div class="creChanInputWrap">
      <p class="fl creChanInputLabel" >관리자 이름</p>
      <input value="황수민" type="text" class="fl creChanInput font14" placeholder="이름을 입력해 주세요" name="" style="" id="managerName">
    </div>
    <div class="creChanInputWrap">
      <p class="fl creChanInputLabel" >관리자 연락처</p>
      <input value="01087546212" type="text" class="fl creChanInput font14" name="" placeholder="연락처를 입력해 주세요" id="managerTel">
    </div>
    <div class="creChanInputWrap">
      <p class="fl creChanInputLabel" >관리자 이메일</p>
      <input value="ghkdtnals@teampl.net" type="text" class="fl creChanInput font14" name="" placeholder="이메일을 입력해 주세요" id="managerEmail">
    </div>
    <gBtnSmall btnTitle="추가" class="mright-1" />
  </div>
  <p class="textLeft font16">등록된 관리자 목록 (2명)</p>
  <div style="width: 100%; height: calc(50% - 100px); padding: 10px 5px; float: left; margin-top: 10px;">
    <div style="width: 100%; height: 39px; border: 1px solid #ccc; position: relative; padding: 5px 10px; text-align: left;">
      <p style="width: 100px; height: 100%; float: left; font-size: 14px; line-height: 25px;">황수민</p>
      <p style="width: calc(100% -100px); height: 100%; float: left; font-size: 14px; line-height: 25px;">010-1234-5678</p>
      <img src="../../../assets/images/common/searchXIcon.svg" style="position: absolute; right: 10px; top: 15px;" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectFileList: []
    }
  },
  props: {
    selectedBType: {}
  },
  computed: {
  },
  methods: {
    setParam () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.managerNameMtext = 'KO$^$' + document.getElementById('managerName').value
      param.managerTel = document.getElementById('managerTel').value
      param.managerEmail = document.getElementById('managerEmail').value
      param.pageType = 3
      this.$emit('makeParam', param)
    },
    execDaumPostcode () {
      // eslint-disable-next-line no-undef
      new daum.Postcode({
        oncomplete: function (data) {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

          // 각 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          var addr = '' // 주소 변수
          var extraAddr = '' // 참고항목 변수

          // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
          if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
            addr = data.roadAddress
          } else { // 사용자가 지번 주소를 선택했을 경우(J)
            addr = data.jibunAddress
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === 'R') {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              extraAddr += data.bname
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== '' && data.apartment === 'Y') {
              extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName)
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (extraAddr !== '') {
              extraAddr = ' (' + extraAddr + ')'
            }
            // 조합된 참고항목을 해당 필드에 넣는다.
            document.getElementById('extraAddress').innerText = extraAddr
          } else {
            document.getElementById('extraAddress').innerText = ''
          }

          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          document.getElementById('postcode').value = data.zonecode
          document.getElementById('address').value = addr
          // 커서를 상세주소 필드로 이동한다.
          document.getElementById('detailAddress').focus()
        }
      }).open()
    },
    async formSubmit () {
      if (this.selectFileList.length > 0) {
        // Form 필드 생성
        var form = new FormData()
        // eslint-disable-next-line no-debugger
        // if (!this.selectFileList.length) return

        for (var i = 0; i < this.selectFileList.length; i++) {
          // var selFile = this.selectFileList[i].file
          // Here we create unique key 'files[i]' in our response dict
          form.append('files[' + i + ']', this.selectFileList[i].file)
        }
        this.isUploading = true

        this.$axios
          .post('/uploadFile', form, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(res => {
            this.response = res
            this.isUploading = false
            // eslint-disable-next-line no-debugger
          })
          .catch(error => {
            this.response = error
            this.isUploading = false
          })
      } else {
        alert('파일을 선택해 주세요.')
      }

      return true
    }
  }
}
</script>
<style scoped>
.creChanInput{width: calc(100% - 120px); height: 30px; border: none; border: 1px solid #ccc; border-radius: 5px; padding: 0 10px;}
.creChanInputLabel{width: 100px; margin-top: 3px; height: 30px; text-align: left; font-size: 14px; margin-right: 10px;}
.creChanInputWrap{width: 100%; height: 40px;}

.extraAddressInput{line-height: 28px; border: none; color: #6f6f6f;}
</style>
