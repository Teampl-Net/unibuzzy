<i18n>
{
  "ko": {
    "EXCEL_TITLE_EXCEL": "엑셀 업로드",
    "EXCEL_MSG_DOWN": "구성원 유형을 선택하면 템플릿이 다운로드 됩니다.",
    "EXCEL_MSG_CHECK": "작성한 템플릿 파일을 업로드하여 정합성 테스트를 합니다.",
    "EXCEL_BTN_STAFF": "일반 직원용",
    "EXCEL_BTN_STUDENT": "학생용",
    "EXCEL_TITLE_RESULT": "테스트 결과",
    "EXCEL_TITLE_FIT": "적합 데이터",
    "EXCEL_TITLE_NO_FIT": "부적합 데이터",
    "EXCEL_BTN_TEST": "정합성 테스트",
    "EXCEL_MSG_FAIL": "파일 확인 실패: 업로드 파일 확인 후 재 업로드 해주세요",
    "EXCEL_MSG_NO_DATA": "추가된 데이터가 없습니다. 업로드한 파일을 확인해주세요",
    "EXCEL_MSG_ADD": "위 구성원을 주소록에 추가합니다.",
    "EXCEL_BTN_UPLOAD": "업로드",
    "EXCEL_BTN_SELECT": "파일 선택"
  },
  "en": {
    "EXCEL_TITLE_EXCEL": "Upload Excel",
    "EXCEL_MSG_DOWN": "Select a member type to download the template.",
    "EXCEL_BTN_STAFF": "For staff",
    "EXCEL_BTN_STUDENT": "For students",
    "EXCEL_MSG_CHECK": "Upload the template file you created to test for consistency.",
    "EXCEL_TITLE_RESULT": "Result",
    "EXCEL_TITLE_FIT": "Fit Data",
    "EXCEL_TITLE_NO_FIT": "Invalid Data",
    "EXCEL_BTN_TEST": "Consistency Test",
    "EXCEL_MSG_FAIL": "File verification failed: Please check the upload file and re-upload it",
    "EXCEL_MSG_NO_DATA": "No data added. Please check the uploaded file.",
    "EXCEL_MSG_ADD": "Add the above members to your member type.",
    "EXCEL_BTN_UPLOAD": "Upload",
    "EXCEL_BTN_SELECT": "Select a File"
  }
}
</i18n>
<template>
    <div id="exelUploadPop" style="width: 80%; max-width: 500px; z-index: 99999999; height: 500px; border-radius: 10px; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background: #fff; border: 1px solid #ccc;">
        <commonConfirmPop v-if="confirmYn" @ok="saveList" @no="this.confirmYn = false" confirmType="two" :confirmText="confirmMsg" />
        <div style="width: 100%; height: 50px; position: relative; padding: 13px 10px; border-bottom: 2px solid #6768A7; float: left; text-align: left;">
            <p class="fontBold font18">{{ $t('EXCEL_TITLE_EXCEL') }}</p>
            <img @click="this.$emit('closePop')" class="cursorP" src="../../../assets/images/common/popup_close.png" style="position: absolute; right: 10px; top: 15px; width: 20px;" alt="">
        </div>

        <div style="width: 100%; height: calc(100% - 80px); overflow: hidden auto; margin-top: 10px; float: left; padding: 10px 1.5rem;">
            <!-- <div style="width: 100%; min-height: 50px; float: left;">
              <gStepProgress :activeStep="activeStep" :progressStep="progressStep" />
            </div> --> <!-- <span class="font14 lightGray">{{activeStep === 0 ? '[닫기]' : '[펼치기]'}}</span> -->
            <p class="commonColor font16 fontBold textLeft">STEP.0 {{ $t('EXCEL_MSG_DOWN') }}</p>
            <div style="margin-left: 10px;width: calc(100% - 10px); margin-top: 5px; min-height: 35px; border-radius: 5px; margin-bottom: 10px;float: left;">
              <!-- <p class="font15 fontBold textLeft commonBlack">구성원 유형</p> -->
              <div v-for="(value, index) in uploadTypeList" :key="index" style="background:#fff; float: right; min-height: 30px; line-height: 30px; text-align: center; margin-left: 10px; border-radius: 5px; height: 100%; ">
                  <gBtnSmall @click="downLoadTemplete(value.filePath)" :btnTitle="value.text"  style="min-width: 100px; padding: 0 10px;"/>
              </div>
            </div>
            <!-- <gBtnSmall class="fl mleft-05" style="float: right;" @click="activeStep === 1 ? this.$refs.downBtn.click() : ''" :style="activeStep !== 1 ? 'background-color:#ccc; cursor: default;' : ''" btnTitle="다운로드" />
             -->
            <!-- <div style="width: 100%; float: left; min-height: 40px;">
              <p class="commonColor font16 fl fontBold textLeft">STEP.1 <a class="lightGray" ref="downBtn" href="/commonFile/thealim_member_upload_list.xlsx" download>템플릿 파일을 다운로드</a> 하여 작성합니다.</p>
              <gBtnSmall class="fl mleft-05" style="float: left;" @click="activeStep === 1 ? this.$refs.downBtn.click() : ''" :style="activeStep !== 1 ? 'background-color:#ccc; cursor: default;' : ''" btnTitle="다운로드" />
            </div> -->
            <div v-if="activeStep >= 0" style="width: 100%; min-height: 50px; float: left;">
              <p class="commonColor font16 fontBold textLeft">STEP.1 {{ $t('EXCEL_MSG_CHECK') }}</p> <!-- 하고 정합성 테스트를 합니다. -->
              <div class="commonBoxStyle" style="padding-left: 20px;">
                  <!-- <gBtnSmall style="float: left;" btnTitle="파일선택"/> -->
                  <div class="w100P" style="display: flex; flex-direction: column; gap: 20px; align-items: flex-end;">
                    <label for="input-file">
                    {{ selectFile? selectFile.name:$t('COMMON_MSG_NOFILE') }}
                      <gBtnSmall style="margin-left: 10px;" :style="checkUserYn ? 'background-color:#ccc;' : ''" :btnTitle="$t('EXCEL_BTN_SELECT')" />
                    </label>
                    <form  @submit.prevent="formSubmit" style="overflow: hidden; float: left; width: calc(100% - 130px); min-width: 60%; margin-right: 10px; cursor: pointer; min-height: 45px;position: relative; display: none;" method="post">
                        <input class="formImageFile" type="file" title ="선택" accept=".xls,.xlsx"  style="background-color: #A9AACD; width: 100%; float: left; color: #FFFFFF;" ref="selectFile" id="input-file" @change="changeFile"/>
                    </form>
                    <gBtnSmall @click="checkUploadYn" :style="checkUserYn ? 'background-color:#ccc;' : ''" :btnTitle="$t('EXCEL_BTN_TEST')" />
                  </div>
              </div>
              <!-- <p class="commonBlack font16 textLeft">STEP.3 업로드한 데이터의 정보를 확인합니다.</p> -->
            </div>
            <div v-if="this.checkUserYn" style="width: 100%; min-height: 50px; float: left;">
              <p class="font14 fontBold font fl commonColor" style="margin-bottom: 2px; margin-left: 20px;">{{$t('EXCEL_TITLE_RESULT')}}</p>
              <p class="font13 fr lightGray">{{$t('EXCEL_TITLE_FIT') + ' ' + this.excelFileList.length + ', ' + $t('EXCEL_TITLE_NO_FIT') + this.failList.length}}</p>
              <div class="commonBoxStyle" style="width: calc(100% - 20px); margin-left: 20px; height: calc(100% - 300px); margin-top: 0px; min-height: 200px; margin-bottom: 10px; border: 1px solid #ccc;">
                  <table style="width: 100%; ">
                      <colgroup><col style="width: 10%"><col style="width: 20%"><col style="width: 15%;"><col style="width: 15%"><col style="width: 15%"><col style="width: 15%;"></colgroup>
                      <tbody>
                          <tr>
                              <th class="font14 whitePurpleBG" v-for="(value, index) in excelTitleRowList" :key="index">{{value}}</th>
                          </tr>
                      </tbody>
                  </table>
                  <div style="width: 100%; height: calc(100% - 25px); overflow: hidden auto;">
                    <table v-if="this.excelFileList.length > 0 " id="contentsTable" style="width: 100%; ">
                        <colgroup><col style="width: 10%"><col style="width: 20%"><col style="width: 15%;"><col style="width: 15%"><col style="width: 15%"><col style="width: 15%;"></colgroup>
                        <tbody>
                            <tr v-if="this.uploadErrorYn"><td colspan="3">{{ $t('EXCEL_MSG_FAIL') }}</td></tr>
                            <tr v-for="(value, index) in failList" :key="index">
                                <td v-for="(fData, fDIndex) in value" :key="fDIndex" class="font14">
                                  <span>{{fData}}</span>
                                </td>
                                <!-- <td v-if="value[1]" class="font14">{{value[1]}}</td>
                                <td v-else class="font14 commonRed">{{'필수정보 누락'}}</td>
                                <td v-if="value[2]" class="font14">{{value[2]}}</td>
                                <td v-else class="font14 commonBlue">{{'데이터 누락'}}</td>
                                <td v-if="value[3]" class="font14">{{value[3]}}</td>
                                <td v-else class="font14 commonRed">{{'필수정보 누락'}}</td> -->
                            </tr>
                            <tr v-for="(value, index) in excelFileList" :key="index">
                                <td v-for="(eData, eDIndex) in value" :key="eDIndex" class="font14">
                                  <div style="width: 100%; padding: 5px 5px; min-" class="" >{{eData}}</div>
                                </td>
                                <!-- <td v-if="value[1]" class="font14">{{value[1]}}</td>
                                <td v-else class="font14 commonRed">{{'필수정보 누락'}}</td>
                                <td v-if="value[2]" class="font14">{{value[2]}}</td>
                                <td v-else class="font14 commonBlue">{{'데이터 누락'}}</td>
                                <td v-if="value[3]" class="font14">{{value[3]}}</td>
                                <td v-else class="font14 commonRed">{{'필수정보 누락'}}</td> -->
                            </tr>
                        </tbody>
                    </table>
                    <p v-else class="font14 commonBlack textLeft mleft-05 mtop-05 ">{{ $t('EXCEL_MSG_NO_DATA') }}</p>
                  </div>
              </div>
            </div>
            <p v-show="activeStep === 2" class="commonColor font16 fontBold fl textLeft mtop-05">STEP.3 {{ $t('EXCEL_MSG_ADD') }}</p>
            <gBtnSmall v-show="activeStep === 2" @click="confirmSavePop" style="margin-top: 5px; " :style="!checkUserYn? 'background-color:#ccc;' : ''" :btnTitle="$t('EXCEL_BTN_UPLOAD')" />
        </div>
    </div>
</template>

<script>
import commonConfirmPop from '../confirmPop/Tal_commonConfirmPop.vue'
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
      confirmYn: false,
      progressStep: [0, 1, 3],
      excelTitleRowList: [],
      activeStep: 0,
      bookType: 'EMPL',
      uploadTypeList: [{ text: this.$t('EXCEL_BTN_STAFF'), type: 'employee', key: 0, filePath: '/commonFile/thealim_member_upload_list_employee.xlsx' }, { text: this.$t('EXCEL_BTN_STUDENT'), type: 'student', key: 1, filePath: '/commonFile/thealim_member_upload_list_student.xlsx' }]
    }
  },
  components: {
    commonConfirmPop
  },
  props: {
    cabinetKey: {},
    targetKey: {}
  },
  computed: {
    GE_LOCALE () {
      return this.$i18n.locale
    }
  },
  methods: {
    downLoadTemplete (path) {
      // console.log(path)
      var iframe
      iframe = document.getElementById('hiddenExcelDownloader')
      if (iframe == null) {
        iframe = document.createElement('iframe')
        iframe.id = 'hiddenExcelDownloader'
        iframe.style.visibility = 'none'
        document.body.appendChild(iframe)
      }
      iframe.src = path
      // link = link.replaceAll('http://61.97.186.14:19090/', '')
      // iframe.src = 'https://mo.d-alim.com/commonFile/thealim_member_upload_list.xlsx'
      // iframe.download = name
      return false
    },
    async test () {
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tpuploadTpUserRequireListExcelFile',
        // eslint-disable-next-line no-new-object
        param: new Object()
      })
      this.excelFileList = result.data.resultList
      // console.log(result)
    },
    changeFile () {
      this.activeStep = 1
      this.checkUserYn = false
      this.uploadErrorYn = false
      if (this.$refs.selectFile.files.length > 0) {
        this.selectFile = this.$refs.selectFile.files[0]
      }
    },
    checkUploadYn () {
      // if (!this.checkUserYn) {
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
            .post('/sUniB/tpuploadTpUserRequireListExcelFile', form, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then(res => {
              // console.log(res)
              if (res.data.result === true) {
                this.excelFileList = res.data.resultMap.dataList
                this.failCnt = res.data.resultMap.failCnt

                var fList = res.data.resultMap.failList
                for (var i = this.excelFileList.length - 1; i > -1; i--) {
                  if (i === 0) {
                    for (var e = 0; e < this.excelFileList[0].length; e++) {
                      this.excelTitleRowList.push((this.excelFileList[0])[e])
                      if ((this.excelFileList[0])[e] === '학번') {
                        this.bookType = 'STUD'
                      }
                    }
                    this.excelFileList.splice(i, 1)
                  } else {
                    var dataList = this.excelFileList[i]
                    for (var d = 0; d < dataList.length; d++) {
                      if (dataList[d] === null) {
                        dataList[d] = ''
                      }
                    }
                    if (this.failCnt > 0) {
                      for (var f = 0; f < fList.length; f++) {
                        if (i === fList[f]) {
                          this.failList.push(this.excelFileList[i])
                          this.excelFileList.splice(i, 1)
                        }
                      }
                    }
                  }
                  this.failMsg = res.data.resultMap.failMsg
                }

                this.checkUserYn = true
                if (this.excelFileList.length > 0) {
                  this.activeStep = 2
                }
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
        this.$showToastPop(this.$t('COMMON_MSG_NOFILE'))
      }
      // }
    },
    confirmSavePop () {
      if (this.checkUserYn) {
        this.confirmMsg = ''
        if (this.GE_LOCALE === 'ko') {
          this.confirmMsg += '총 ' + this.excelFileList.length + '명을 주소록에 추가하시겠습니까?'
        } else {
          this.confirmMsg += `Do you want to add a total of ${this.excelFileList.length} people to your member type?`
        }
        if (this.failCnt > 0) {
          if (this.GE_LOCALE === 'ko') {
            this.confirmMsg += '(부적합 데이터' + this.failCnt + '명 제외)'
          } else {
            this.confirmMsg += `Excluding ${this.failCnt} non-conforming data`
          }
        }
        this.confirmYn = true
      }
    },
    async saveList () {
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tpsaveMUserFromExcelFile',
        param: {
          /* cabientType:  */
          bookType: this.bookType,
          excelList: this.excelFileList,
          cabinetKey: this.cabinetKey,
          jobkindId: 'USER',
          targetKey: this.targetKEy
        }
      })
      this.$emit('success')
      if (result.result) {
        this.$emit('success')
      }
      // console.log(result)
    }
  }
}
</script>

<style scoped>
.commonBoxStyle{width: 100%; min-height: 45px; float: left; margin-top: 5px;}
</style>
