
export const onMessage = (inputT, inputP, inputD) => {
  const sendMessageCont = {
    type: inputT,
    callFunc: inputP,
    data: inputD
  }
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify(sendMessageCont))
  }
}
