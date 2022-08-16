<template>
    <div id="exelUploadPop" style="width: 80%; max-width: 500px; z-index: 99999999; height: 500px; border-radius: 10px; position: fixed; top: 15%; left: 10%; background: #fff; border: 1px solid #ccc;">
        <commonConfirmPop v-if="confirmYn" @ok="saveList" @no="this.confirmYn = false" confirmType="two" :confirmText="confirmMsg" />
        <div style="width: 100%; height: 50px; position: relative; padding: 13px 10px; border-bottom: 2px solid #6768A7; float: left; text-align: left;">
            <p class="fontBold font18">엑셀업로드</p>
            <img @click="this.$emit('closePop')" src="../../../assets/images/common/popup_close.png" style="position: absolute; right: 10px; top: 15px; width: 20px;" alt="">
        </div>
        <div style="width: 100%; height: calc(100% - 50px); float: left; padding: 10px;">
            <p class="commonBlack font16 textLeft">STEP.1 추가할 구성원 엑셀 파일을 업로드 합니다.</p>
            <div class="commonBoxStyle">
                <!-- <gBtnSmall style="float: left;" btnTitle="파일선택"/> -->
                <form  @submit.prevent="formSubmit" style="overflow: hidden; float: left; cursor: pointer; min-height: 50px;position: relative;" method="post">
                    <input class="formImageFile" type="file" title ="선택" accept=".xls,.xlsx"  style="background-color: #A9AACD;     color: #FFFFFF;" ref="selectFile" id="input-file" @change="changeFile"/>
                </form>
                <a style="float: left; margin-left: 5px; margin-top: 10px;" class="lightGray font15" @click="downLoadTemplete">템플릿 다운</a>
            </div>
            <p class="commonBlack font16 textLeft">STEP.2 업로드한 데이터의 정보를 확인합니다.</p>
            <div class="commonBoxStyle" style="min-height: 35px;">
                <gBtnSmall class="fl" style="float: left;" @click="checkUploadYn" :style="checkUserYn? 'background-color:#ccc;' : ''" btnTitle="정합성 확인" />
                <div v-if="this.excelFileList.length > 0" class="font13 textLeft lightGray mleft-05 fl mtop-05">{{'적합 데이터: ' + this.excelFileList.length + ', 부적합 데이터: ' + this.failList.length}}</div>
            </div>
            <div class="commonBoxStyle" style="width: 100%; height: calc(100% - 300px); min-height: 200px; margin-bottom: 10px; border: 1px solid #ccc;">
                <table style="width: 100%; ">
                    <colgroup><col style="width: 20%"><col style="width: 40%"><col style="width: 40%;"></colgroup>
                    <tbody>
                        <tr>
                            <th class="font14 whitePurpleBG">이름</th><th class="font14 whitePurpleBG">전화번호</th><th class="font14 whitePurpleBG">이메일</th>
                        </tr>
                    </tbody>
                </table>
                <table id="contentsTable" style="width: 100%; ">
                    <colgroup><col style="width: 20%"><col style="width: 40%"><col style="width: 40%;"></colgroup>
                    <tbody>
                        <tr v-if="this.uploadErrorYn"><td colspan="3">파일 확인 실패: 업로드 파일 확인 후 재 업로드 해주세요</td></tr>
                        <tr v-for="(value, index) in failList" :key="index">
                            <td v-if="value[1]" class="font14">{{value[1]}}</td>
                            <td v-else class="font14 commonRed">{{'필수정보 누락'}}</td>
                            <td v-if="value[2]" class="font14">{{value[2]}}</td>
                            <td v-else class="font14 commonBlue">{{'데이터 누락'}}</td>
                            <td v-if="value[3]" class="font14">{{value[3]}}</td>
                            <td v-else class="font14 commonRed">{{'필수정보 누락'}}</td>
                        </tr>
                        <tr v-for="(value, index) in excelFileList" :key="index">
                            <td v-if="value[1]" class="font14">{{value[1]}}</td>
                            <td v-else class="font14 commonRed">{{'필수정보 누락'}}</td>
                            <td v-if="value[2]" class="font14">{{value[2]}}</td>
                            <td v-else class="font14 commonBlue">{{'데이터 누락'}}</td>
                            <td v-if="value[3]" class="font14">{{value[3]}}</td>
                            <td v-else class="font14 commonRed">{{'필수정보 누락'}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p class="commonBlack font16 fl textLeft">STEP.3 추가하기 버튼을 클릭하면 구성원이 추가됩니다.</p>
            <gBtnSmall @click="confirmSavePop" style="margin-top: 5px; " btnTitle="추가하기" />
        </div>
    </div>
</template>

<script>
import commonConfirmPop from '../../../components/popup/confirmPop/Tal_commonConfirmPop.vue'
export default {
  data () {
    return {
      excelFileList: [],
      checkUserYn: false,
      uploadErrorYn: false,
      failCnt: 0,
      failMsg: '',
      failList: [],
      confirmMsg: '',
      confirmYn: false
    }
  },
  components: {
    commonConfirmPop
  },
  props: {
    cabinetKey: {},
    targetKey: {}
  },
  methods: {
    downLoadTemplete () {
      var iframe
      iframe = document.getElementById('hiddenExcelDownloader')
      if (iframe == null) {
        iframe = document.createElement('iframe')
        iframe.id = 'hiddenExcelDownloader'
        iframe.style.visibility = 'none'
        document.body.appendChild(iframe)
      }
      iframe.src = '/commonFile/thealim_member_upload_list.xlsx'
      // iframe.download = name
      return false
    },
    async test () {
      var result = await this.$commonAxiosFunction({
        url: '/tp.uploadTpUserRequireListExcelFile',
        // eslint-disable-next-line no-new-object
        param: new Object()
      })
      this.excelFileList = result.data.resultList
      console.log(result)
    },
    changeFile () {
      this.checkUserYn = false
      this.uploadErrorYn = false
    },
    checkUploadYn () {
      if (!this.checkUserYn) {
        if (this.$refs.selectFile.files.length > 0) {
        // 0 번째 파일을 가져 온다.
          var form = new FormData()
          for (var k = 0; k < this.$refs.selectFile.files.length; k++) {
            this.selectFile = this.$refs.selectFile.files[k]
            // var selFile = this.selectFileList[i].file
            // Here we create unique key 'files[i]' in our response dict
            form.append('files[' + k + ']', this.selectFile)

            this.isUploading = true

            this.$axios
              .post('/tp.uploadTpUserRequireListExcelFile', form, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
              .then(res => {
                console.log(res)
                if (res.data.result) {
                  this.excelFileList = res.data.resultMap.dataList
                  this.failCnt = res.data.resultMap.failCnt
                  if (this.failCnt > 0) {
                    var fList = res.data.resultMap.failList
                    for (var i = this.excelFileList.length - 1; i > -1; i--) {
                      for (var f = 0; f < fList.length; f++) {
                        if (i === fList[f]) {
                          this.failList.push(this.excelFileList[i])
                          this.excelFileList.splice(i, 1)
                        }
                      }
                    }
                    this.failMsg = res.data.resultMap.failMsg
                  }
                  this.checkUserYn = true
                } else {
                  this.uploadErrorYn = true
                  this.checkUserYn = true
                }
              })
              .catch(error => {
                this.response = error
              })
          }
        } else {
          alert('파일을 선택해주세요')
        }
      }
    },
    confirmSavePop () {
      this.confirmMsg = ''
      this.confirmMsg += '총 ' + this.excelFileList.length + '명을 주소록에 추가하시겠습니까?'
      if (this.failCnt > 0) {
        this.confirmMsg += '(부적합 데이터' + this.failCnt + '명 제외)'
      }
      this.confirmYn = true
    },
    async saveList () {
      var result = await this.$commonAxiosFunction({
        url: '/tp.saveMUserFromExcelFile',
        param: {
          excelList: this.excelFileList,
          cabinetKey: this.cabinetKey,
          targetKey: this.targetKEy
        }
      })
      this.$emit('success')
      if (result.result) {
        this.$emit('success')
      }
      console.log(result)
      // eslint-disable-next-line no-debugger
      debugger
    }
  }
}
</script>

<style scoped>
.commonBoxStyle{width: 100%; min-height: 50px; float: left; margin-top: 5px;}
</style>
