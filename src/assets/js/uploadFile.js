const methods = {
  async sendMessage (previewImgList) {
    for (var i = 0; i < previewImgList.length; i++) {
      await this.editorImgResize(previewImgList[i])
    }
  },
  editorImgResize1 (dataurl) {
    var arr = dataurl.src.split(',')
    var mime = arr[0].match(/:(.*?);/)[1]
    var bstr = atob(arr[1])
    var n = bstr.length
    var u8arr = new Uint8Array(n)

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }

    var test = new File([u8arr], 'test.png', { type: mime })
    dataurl.src = test.src
    return new File([u8arr], 'test.png', { type: mime })
  },

  async editorImgResize (dataurl) {
    var arr = dataurl.src.split(',')
    var mime = arr[0].match(/:(.*?);/)[1]
    var bstr = atob(arr[1])
    var n = bstr.length
    var u8arr = new Uint8Array(n)

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    var reader = new FileReader()
    reader.onload = function (readerEvent) {
      var image = new Image()
      image.onload = async function () {
        // Resize image
        var canvas = document.createElement('canvas')
        var width = image.width
        var height = image.height
        if (width > height) { // 가로모드
          if (width > 900) {
            height *= 900 / width
            width = 900
          }
        } else { // 세로모드
          if (height > 900) {
            width *= 900 / height
            height = 900
          }
        }
        canvas.width = width
        canvas.height = height

        canvas.getContext('2d').drawImage(image, 0, 0, width, height)
        const imgBase64 = canvas.toDataURL('image/png', 0.8)
        dataurl.src = imgBase64
        /* const decodImg = atob(imgBase64.split(',')[1])
        const array = []
        for (let i = 0; i < decodImg.length; i++) {
          array.push(decodImg.charCodeAt(i))
        }
        const Bfile = new Blob([new Uint8Array(array)], { type: 'image/png' })
        var file = new File([Bfile], thisthis.selectFile.name)
        dataurl.src = canvas.toDataURL('image/png', 0.8) */

        // editorImgResize1(canvas.toDataURL('image/png', 0.8))
        // settingSrc(tempImg, canvas.toDataURL('image/png', 0.8))
      }
      image.onerror = function () {

      }
      image.src = readerEvent.target.result
    }
    reader.readAsDataURL(new File([u8arr], 'editor' + '.png', { type: mime }))
  }
  /* settingSrc (tempImg, url) {
    // tempImg.src = url
    // oEditors.getById["smarteditor"].exec("UPDATE_CONTENTS_FIELD", []);
    // var content = document.getElementById("smarteditor").value;
} */

}

export default {
  install (Vue) {
    Vue.config.globalProperties.$sendMessage = methods.sendMessage
    Vue.config.globalProperties.$editorImgResize = methods.editorImgResize
  }
}
