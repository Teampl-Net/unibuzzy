
export const onMessage = (inputT, inputP) => {
  const sendMessageCont = {
    type: inputT,
    callFunc: inputP
  }
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify(sendMessageCont))
  }
}
