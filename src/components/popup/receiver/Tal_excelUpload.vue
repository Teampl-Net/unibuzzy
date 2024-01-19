<template>
    <div id="exelUploadPop" style="width: 80%; max-width: 500px; z-index: 99999999; height: 500px; border-radius: 10px; position: absolute; top: 15%; left: 10%; background: #fff; border: 1px solid #ccc;">
        <commonConfirmPop v-if="confirmYn" @ok="saveList" @no="this.confirmYn = false" confirmType="two" :confirmText="confirmMsg" />
        <div style="width: 100%; height: 50px; position: relative; padding: 13px 10px; border-bottom: 2px solid rgb(74 102 158); float: left; text-align: left;">
            <p class="fontBold font18">엑셀업로드</p>
            <img @click="this.$emit('closePop')" class="cursorP" src="../../../assets/images/common/popup_close.png" style="position: absolute; right: 10px; top: 15px; width: 20px;" alt="">
        </div>

        <div style="width: 100%; height: calc(100% - 80px); overflow: hidden auto; margin-top: 10px; float: left; padding: 10px 1.5rem;">
            <!-- <div style="width: 100%; min-height: 50px; float: left;">
              <gStepProgress :activeStep="activeStep" :progressStep="progressStep" />
            </div> --> <!-- <span class="font14 lightGray">{{activeStep === 0 ? '[닫기]' : '[펼치기]'}}</span> -->
            <p class="commonColor font16 fontBold textLeft">STEP.0 구성원 유형을 선택하면 템플릿이 다운로드 됩니다. </p>
            <div style="margin-left: 10px;width: calc(100% - 10px); margin-top: 5px; min-height: 35px; border-radius: 5px; margin-bottom: 10px;float: left;">
              <!-- <p class="font15 fontBold textLeft commonBlack">구성원 유형</p> -->
              <div v-for="(value, index) in uploadTypeList" :key="index" style="background:#fff; float: right; min-height: 30px; line-height: 30px; text-align: center; margin-left: 10px; border-radius: 5px; height: 100%; ">
                  <gBtnSmall @click="downLoadTemplete(value.filePath)" :btnTitle="value.text"  style="min-width: 120px;"/>
              </div>
            </div>
            <!-- <gBtnSmall class="fl mleft-05" style="float: right;" @click="activeStep === 1 ? this.$refs.downBtn.click() : ''" :style="activeStep !== 1 ? 'background-color:#ccc; cursor: default;' : ''" btnTitle="다운로드" />
             -->
            <!-- <div style="width: 100%; float: left; min-height: 40px;">
              <p class="commonColor font16 fl fontBold textLeft">STEP.1 <a class="lightGray" ref="downBtn" href="/commonFile/thealim_member_upload_list.xlsx" download>템플릿 파일을 다운로드</a> 하여 작성합니다.</p>
              <gBtnSmall class="fl mleft-05" style="float: left;" @click="activeStep === 1 ? this.$refs.downBtn.click() : ''" :style="activeStep !== 1 ? 'background-color:#ccc; cursor: default;' : ''" btnTitle="다운로드" />
            </div> -->
            <div v-if="activeStep >= 0" style="width: 100%; min-height: 50px; float: left;">
              <p class="commonColor font16 fontBold textLeft">STEP.1 작성한 템플릿 파일을 업로드하여 정합성 테스트를 합니다.</p> <!-- 하고 정합성 테스트를 합니다. -->
              <div class="commonBoxStyle" style="padding-left: 20px;">
                  <!-- <gBtnSmall style="float: left;" btnTitle="파일선택"/> -->
                  <form  @submit.prevent="formSubmit" style="overflow: hidden; float: left; width: calc(100% - 130px); min-width: 60%; margin-right: 10px; cursor: pointer; min-height: 45px;position: relative;" method="post">
                      <input class="formImageFile" type="file" title ="선택" accept=".xls,.xlsx"  style="background-color: #A9AACD; width: 100%; float: left; color: #FFFFFF;" ref="selectFile" id="input-file" @change="changeFile"/>
                  </form>
                  <gBtnSmall class="fl" style="float: left;" @click="checkUploadYn" :style="checkUserYn ? 'background-color:#ccc;' : ''" btnTitle="정합성 테스트" />
              </div>
              <!-- <p class="commonBlack font16 textLeft">STEP.3 업로드한 데이터의 정보를 확인합니다.</p> -->
            </div>
            <div v-if="this.checkUserYn" style="width: 100%; min-height: 50px; float: left;">
              <p class="font14 fontBold font fl commonColor" style="margin-bottom: 2px; margin-left: 20px;">{{'테스트 결과'}}</p>
              <p class="font13 fr lightGray">{{'적합 데이터: ' + this.excelFileList.length + ', 부적합 데이터: ' + this.failList.length}}</p>
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
                            <tr v-if="this.uploadErrorYn"><td colspan="3">파일 확인 실패: 업로드 파일 확인 후 재 업로드 해주세요</td></tr>
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
                    <p v-else class="font14 commonBlack textLeft mleft-05 mtop-05 ">추가된 데이터가 없습니다. 업로드한 파일을 확인해주세요</p>
                  </div>
              </div>
            </div>
            <p v-show="activeStep === 2" class="commonColor font16 fontBold fl textLeft mtop-05">STEP.3 위 구성원을 주소록에 추가합니다.</p>
            <gBtnSmall v-show="activeStep === 2" @click="confirmSavePop" style="margin-top: 5px; " :style="!checkUserYn? 'background-color:#ccc;' : ''" btnTitle="업로드" />
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
      uploadTypeList: [{ text: '일반 직원용', type: 'employee', key: 0, filePath: '/commonFile/thealim_member_upload_list_employee.xlsx' }, { text: '학생용', type: 'student', key: 1, filePath: '/commonFile/thealim_member_upload_list_student.xlsx' }]
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
        url: '/sUniB/tp.uploadTpUserRequireListExcelFile',
        // eslint-disable-next-line no-new-object
        param: new Object()
      })
      this.excelFileList = result.data.resultList
    },
    changeFile () {
      this.activeStep = 1
      this.checkUserYn = false
      this.uploadErrorYn = false
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
            .post('/sUniB/tp.uploadTpUserRequireListExcelFile', form, {
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
        this.$showToastPop('파일을 선택해주세요.')
      }
      // }
    },
    confirmSavePop () {
      if (this.checkUserYn) {
        this.confirmMsg = ''
        this.confirmMsg += '총 ' + this.excelFileList.length + '명을 주소록에 추가하시겠습니까?'
        if (this.failCnt > 0) {
          this.confirmMsg += '(부적합 데이터' + this.failCnt + '명 제외)'
        }
        this.confirmYn = true
      }
    },
    async saveList () {
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.saveMUserFromExcelFile',
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
    }
  }
}
</script>

<style scoped>
.commonBoxStyle{width: 100%; min-height: 45px; float: left; margin-top: 5px;}
</style>
