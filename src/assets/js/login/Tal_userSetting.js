
export async function setUserInfo (loginData) {
  if (loginData) {
    var userInfo = loginData
    console.log(userInfo)
    var loginType = localStorage.getItem('loginType')
    if (loginType === 'google') {
    // commonUserInfoMap = googleUserInfoMap
      userInfo.soType = 'G'
    } else if (loginType === 'kakao') {
    // commonUserInfoMap = kakoUserInfoMap
      userInfo.soType = 'K'
    } else if (loginType === 'naver') {
    //  commonUserInfoMap = naverUserInfoMap
      userInfo.soType = 'N'
    } else if (loginType === 'apple') {
    // commonUserInfoMap = appleUserInfoMap
      userInfo.soType = 'A'
    }
    userInfo.mobileYn = false
    return userInfo
  }
}
