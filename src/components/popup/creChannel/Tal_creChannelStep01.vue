<template>
<div style="    overflow: auto;">
  <!-- <p class="textLeft font16">기본정보 입력</p> -->
  <div style="width: 100%; position: relative; min-height: 300px; height: 50%; border: 1px solid #ccc;">
    <div style="position: absolute; width: 100%; min-height: 100px; background: #FFF; bottom: 0; height: 40%;  box-shadow: rgb(189 189 189) 0px -1px 12px -4px; ">
      <form @submit.prevent="formSubmit" style="width: calc(100% - 120px); margin-bottom: 5px; float: left; overflow: hidden; cursor: pointer; min-height: 50px;position: relative;" method="post">
          <div style="cursor: pointer; height: 100%;font-size: 14px;color: rgb(103, 104, 167); margin: 0px auto; ">
              <span class="fr" style="color: #6f6f6f;">편집</span>
          </div>
          <input type="file" title ="선택" accept="image/*" style="cursor: pointer; position: absolute;width: 100%;top: -10px;left: 0;font-size: 0;min-height: 60px;" multiple  ref="selectFile" id="input-file" @change="previewFile"/>
          <div ref="imageBox" class="fl mright-05 w-100P" style="position: relative;">
              <div v-for="(value, index) in selectFileList"  :key="index" class="fl mright-05" :style="settingImgSize" style="width:var(--imgWidth);">
                  <img  style="width:100%;" :src="value.previewImgUrl" />
                  <!-- <span @click="deleteFile(index)" style="position: absolute; top: 0; right: 7px; cursor: pointer;">x</span> -->
              </div>
          </div>
      </form>
      <div style="border:1px solid #ccc; width: 120px; height: 120px; border-radius: 120px; margin: 0 auto; margin-top: -80px; background: #fff;"></div>
      <input type="text" placeholder="채널명을 입력해주세요" name="" value="팀플" class="creChanInput"  id="channelName" style="font-size: 15px; width: 200px; border: none; border-bottom: 1px solid #ccc; background: rgb(204 204 204 / 20%); margin-top: 20px;">
    </div>
  </div>
  <p class="textLeft font14 mtop-3">채널을 잘 표현할 수 있는 카테고리를 선택해주세요</p>
  <div class="categoryBox" style="background: #ccc;  margin-top: 8px;">
    <img src="../../../assets/images/common/searchXIcon.svg" style="float: right; margin-top: 8px;" alt="">
  </div>
  <div style="width: 200px; height: 30px; float: right;  margin-top: 8px; position: relative;">
    <input type="text" name="" id="" style="width: 80%; height: 25px; float: right; padding-right: 10px; border: none;border-bottom: 1px solid #ccc;">
    <img src="../../../assets/images/common/iocn_search.png" style="width: 1rem; position: absolute; right: 8px; top: 5px;" alt="">
  </div>
  <div style="width: 100%; height: 30px;  margin-top: 8px; float: left; overflow: auto hidden;">
    <div style="min-width: 100%; height: 25px; overflow-x: auto;     inline-size: max-content;">
      <div v-for="(value, index) in 7" :key="index" class="categoryBox" style="border: 1px solid #ccc;"></div>
    </div>
  </div>
  <p class="textLeft font14 mtop-1 fl">채널에 대한 간단한 소개글을 작성해주세요</p>
  <textarea value="팀플은 협업을 위한 파워풀한 도구를 제안합니다." name=""  id="channelMemo"  style="width: 100%; height: 100px; border: 1px solid #ccc; resize: none; margin-top: 5px;" cols="30" rows="10"></textarea>
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
  methods: {
    setParam () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      /* // eslint-disable-next-line no-new-object
      var channel = new Object()
       */
      param.pageType = 1
      param.nameMtext = 'KO$^$' + document.getElementById('channelName').value
      param.memoMtext = 'KO$^$' + document.getElementById('channelMemo').value
      this.$emit('makeParam', param)
    }
  }
}
</script>
<style scoped>

.categoryBox{min-width: 100px; padding: 0 10px; margin-right: 5px; height: 25px;float: left; border-radius: 5px;}
</style>
