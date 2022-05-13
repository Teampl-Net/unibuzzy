<template>
  <p class="textLeft font16">대표자 정보</p>
  <div style="width: 100%; height: calc(50% - 100px); padding: 10px 5px; float: left; margin-top: 10px;">
    <div class="creChanInputWrap">
      <p class="fl creChanInputLabel" >대표자 이름</p>
      <input type="text" value="최병진" class="fl creChanInput font14" placeholder="이름을 입력해 주세요" name="" style="" id="masterName">
    </div>
    <div class="creChanInputWrap">
      <p class="fl creChanInputLabel" >대표자 연락처</p>
      <input type="text" value="01012345678" class="fl creChanInput font14" name="" placeholder="연락처를 입력해 주세요" id="masterTel">
    </div>
  </div>
  <p class="textLeft font16">사업자 등록 정보</p>
  <div style="width: 100%; height: calc(50% - 100px); padding: 10px 5px; float: left; margin-top: 10px;">
    <div class= "creChanInputWrap">
      <div class="creChanInputLabel fl">주소</div>
      <input readonly type="text" id="address" class="creChanInput fl font14" @click="execDaumPostcode()" v-model="channelTel" placeholder="주소를 입력해주세요." style="">
    </div>
    <div class= "creChanInputWrap" style="position: relative;">
      <p class="creChanInputLabel fl"></p>
      <input type="hidden" id="postcode" class="creChanInput textLeft fl font14" placeholder="우편번호">
      <input type="text" id="detailAddress" class="creChanInput fl textLeft font14 mbottom-05 " placeholder="상세주소 입력">
      <p class="creChanInputLabel fl"></p>
      <!-- <p class="creChanInputLabel fl" style="width: 70px;">참고항목</p> -->
      <div id="extraAddress" class="creChanInput textLeft font14 fl extraAddressInput"></div>
    </div>
    <div class="creChanInputWrap mtop-05 fl">
      <p class="fl creChanInputLabel" >등록번호</p>
      <input value="541615896421" type="text" class="fl creChanInput font14" placeholder="등록번호를 입력해 주세요" name="" style="" id="legacyId">
    </div>
    <div class="creChanInputWrap">
      <p class="fl creChanInputLabel" >등록증 사본</p>
      <!-- <div class="creChanInput fr">업로드</div> -->
      <form @submit.prevent="formSubmit" style="width: calc(100% - 120px); margin-bottom: 5px; float: left; overflow: hidden; cursor: pointer; min-height: 50px;position: relative;" method="post">
        <div v-if="selectFileList.length === 0" style="cursor: pointer; height: 100%;font-size: 14px;color: rgb(103, 104, 167); margin: 0px auto;justify-content: center;align-items: center;">
            <span class="fr" style="color: #6f6f6f;">업로드</span>
            <img  class="fr mright-03" src="../../../assets/images/common/gallery.svg" style="width: 20px;" @click="openSelectFilePop" alt="">
        </div>
        <input type="file" title ="선택" accept="image/*" style="cursor: pointer; position: absolute;width: 100%;top: -10px;left: 0;font-size: 0;min-height: 60px;" multiple  ref="selectFile" id="input-file" @change="previewFile"/>
        <div ref="imageBox" class="fl mright-05 w-100P" style="position: relative;">
            <div v-for="(value, index) in selectFileList"  :key="index" class="fl mright-05" :style="settingImgSize" style="width:var(--imgWidth);">
                <img  style="width:100%;" :src="value.previewImgUrl" />
                <!-- <span @click="deleteFile(index)" style="position: absolute; top: 0; right: 7px; cursor: pointer;">x</span> -->
            </div>
        </div>
        <!-- <button  class="whiteBtn mright-1" type="submit" :disabled="isUploading">업로드</button> -->
    <!-- <div>
        <hr />
        selectFileList : {{ selectFileList }}
    </div> -->
    </form>
    </div>
    <!-- <div class="creChanInputWrap">
      <p class="fl creChanInputLabel" >사업자명</p>
      <input type="text" class="fl creChanInput font14" placeholder="이름을 입력해 주세요" name="" style="" id="">
    </div>
    <div class="creChanInputWrap">
      <p class="fl creChanInputLabel" >대표자 연락처</p>
      <input type="text" class="fl creChanInput font14" name="" placeholder="연락처를 입력해 주세요" id="">
    </div> -->
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
      param.masterNameMtext = 'KO$^$' + document.getElementById('masterName').value
      param.masterTel = document.getElementById('masterTel').value
      param.teamAddress = document.getElementById('address').value + document.getElementById('detailAddress').value + document.getElementById('extraAddress').innerHTML
      param.legacyId = document.getElementById('legacyId').value
      param.pageType = 2
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
