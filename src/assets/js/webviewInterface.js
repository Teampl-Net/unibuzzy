
export const onMessage = (inputT, inputP, inputD) => {
  const sendMessageCont = {
    type: inputT,
    callFunc: inputP,
    data: inputD
  }
  if (window.ReactNativeWebView) {
    // alert(JSON.stringify(sendMessageCont))
    window.ReactNativeWebView.postMessage(JSON.stringify(sendMessageCont))
    // document.ReactNativeWebView.postMessage(JSON.stringify(sendMessageCont))
  }
}
