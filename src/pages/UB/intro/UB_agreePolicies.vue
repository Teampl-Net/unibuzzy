<template>
  <div class="policiesWrap">
    <div class="policyHeaderWrap px-4" >
      <img src="../../../assets/images/intro/login/uniB_logo.png" class="h100P fl" >
    </div>
    <div class="policyContentsWrap" >
      <p class="font14 fontBold">uniBuzzy begins when you agree Terms and Conditions and Privacy Policy.</p>
      <div class="policyWrap" v-for="(value, index) in policyList"  :key="index">
          <p class="font16 mt-1 fontBold commonBlack" v-html="value.title"></p>
          <div class="policyBodyBox font13 textBold mt-1 commonBlack" v-html="value.body" ></div>
          <div class="checkboxDiv">
            <input type="checkbox" :name="'checkbox' + index" :id="'checkbox' + index" class="checkBox"  @click="checkedOne($event.target.checked, index)" :value="index" v-model="agree[index]" >
            <label :for="'checkbox' + index" class="font15 mLeft-05">I agree to the above.</label>
          </div>
      </div>
      <div class="policyBtnArea">
        <div class="checkboxDiv">
          <input type="checkbox" name="checkboxAll" id="checkboxAll" class="checkBox" @click="checkedAll($event.target.checked)" v-model="agreeAll" >
          <label for="checkboxAll" class="font15 mLeft-05">I agree to all of the above.</label>
        </div>
        <div class="startBigBtn">
          <p @click="goLoginPage" class="font20" >I Agree</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { onMessage } from '../../../assets/js/webviewInterface'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'policy',
  created () {
    onMessage('REQ', 'CheckUserPermission')
    if (localStorage.getItem('policiesOk') === true || localStorage.getItem('policiesOk') === 'true') {
      if (this.pPartnerLoginYn && this.pGoLoginPage) {
        // this.pGoLoginPage()
      } else {
        this.$router.push('/login')
      }
    }
  },
  data () {
    return {
      agree: [],
      agreeAll: [],
      policyList: [
        { idx: '0', title: '[Required] Agree to Terms and Conditions', body: '<p class="mbottom-1 font15"> Welcome to uniBuzzy! By using uniBuzzy, you agree to be bound by these Terms of Use ("Terms"). Please read them carefully.<br><br> </p> <p class="font16 titleText mbottom-05">Description of uniBuzzy</p> <p class="font16 mbottom-05 ml-04">uniBuzzy is a Social Metaverse app designed for universities. It allows users to promote and communicate with their clubs, stay updated on school events, and engage in discussions within their university community.<br><br></p> <p class="subTitle font15 ml-04">① User-Generated Content</p> <p class="mbottom-1 font15 mleft-1"> You are solely responsible for the content you generate and share on uniBuzzy.<br><br> </p> <p class="subTitle font15 ml-04">② Guidelines and Rules</p> <p class="mbottom-1 font15 mleft-1"> Respect others, refrain from illegal activities, and ensure content is appropriate and respectful.<br><br> </p> <p class="subTitle font15 ml-04">③ Intellectual Property</p> <p class="mbottom-1 font15 mleft-1"> Respect intellectual property rights and attribute content to the original source when using and sharing it.<br><br> </p> <p class="subTitle font15 ml-04">④ Age Restrictions</p> <p class="mbottom-1 font15 mleft-1"> uniBuzzy is intended for use by university students or users who meet the minimum age requirement.<br><br> </p> <p class="subTitle font15 ml-04">⑤ User Responsibilities</p> <p class="mbottom-1 font15 mleft-1"> Maintain the confidentiality and security of your uniBuzzy account and ensure the accuracy and legality of your posted content.<br><br> </p> <p class="subTitle font15 ml-04">⑥ Termination</p> <p class="mbottom-1 font15 mleft-1"> We reserve the right to terminate or suspend your access to uniBuzzy at any time without prior notice.<br><br> </p> <p class="subTitle font15 ml-04">⑦ Disclaimer of Warranties</p> <p class="mbottom-1 font15 mleft-1"> uniBuzzy is provided "as-is" and we do not guarantee uninterrupted or error-free service.<br><br> </p> <p class="subTitle font15 ml-04">⑧ Limitation of Liability</p> <p class="mbottom-1 font15 mleft-1"> We are not liable for any damages arising from your use of uniBuzzy.<br><br> </p> <p class="subTitle font15 ml-04">⑨ Governing Law and Dispute Resolution: </p> <p class="mbottom-1 font15 mleft-1"> These Terms are governed by the laws of United States, and any disputes shall be subject to the exclusive jurisdiction of United States courts.<br><br> </p> <p class="mbottom-1 font15 mleft-1"> If you have any questions or concerns, please contact us at <b>unibuzzy@gmail.com</b>.<br><br> Thank you for using uniBuzzy! </p>' },
        { idx: '1', title: '[Required] Privacy Policy Agreement', body: '<p class="mbottom-1 font16">At uniBuzzy, we prioritize the privacy and security of personal information of our users. This Privacy Policy explains how we collect, use, and protect the individual data provided through our app. By using uniBuzzy, you agree to the terms outlined in this policy.<br><br></p> <p class="font16 titleText mbottom-05">1. Collected Personal Information</p> <p class="ml-04 font15 mbottom-05">Users can use most of the services provided by uniBuzzy, such as information search and news viewing, without signing up as a member. However, if users wish to use member-based services such as subscription and notifications, uniBuzzy collects the minimum amount of personal information necessary for service usage.</p> <p class="subTitle font15 ml-04">The personal information collected by uniBuzzy at the time of membership registration is as follows:</p> <p class="mbottom-1 font15 mleft-1">When registering as a member, the following items are collected as mandatory: social account integration information, name, date of birth, gender, mobile phone number, email. If the date of birth entered indicates that they are under 14 years old, additional information about the legal guardian (name of legal guardian, date of birth, gender, duplicate registration confirmation information (DI), mobile phone number) is collected.</p> <p class="subTitle font15 ml-04">The following personal information is collected from users during the service usage process:</p> <p class="mbottom-1 font15 mleft-1">- Users can set profile information (nickname, profile picture) in member information or individual services. If no nickname is entered in the member information, a masked ID is automatically entered as the nickname.<br>- Additional personal information may be collected for individual services, event participation, and prize applications. If additional personal information is collected, the user will be informed of the items of personal information collected, purpose of collecting and using personal information, and retention period of personal information at the time of collecting the personal information and consent will be obtained.</p> <p class="subTitle font15 ml-04">During the service usage process, IP addresses, cookies, service usage records, device information, and location information may be generated and collected.<br>In addition, images and voices may be collected in image and voice-based search services.</p> <p class="mbottom-1 font15 mleft-1">1) Information about users may be automatically generated and stored (collected) using automated methods during the service usage process,<br>2) The unique information of the device of the user may be safely converted in a way that the original value cannot be identified and collected.<br>Location information may be collected during the service usage process. <br>Based on the linkage with personal information, the collected information may or may not be considered as personal information.<br><br></p> <p class="font16 titleText mbottom-05">2. Use of Collected Personal Information</p> <p class="mbottom-1 font15">uniBuzzy and its related services (including mobile web/apps) use personal information solely for the following purposes: member management, service development/provision and improvement, establishment of a safe internet environment, and more.</p> <p class="mbottom-1 font15 mleft-1"> - Personal information is used for member management purposes, such as verifying the intention of membership registration, confirming age and obtaining consent from legal guardians, verifying the identity of users and legal guardians, identifying users, and confirming the intention of membership withdrawal.<br> - In addition to providing existing services (including advertisements), personal information is used for discovering new service elements, improving existing services, conducting demographic analysis, analyzing service visit and usage records, forming relationships between users based on personal information and interests, and providing customized services based on subscriptions and interests.<br> - Personal information is used for measures to prevent and sanction acts that hinder the smooth operation of services, including restrictions on users who violate laws and uniBuzzy Terms of Service, prevention of account theft and fraudulent transactions, notification of amendments to terms and conditions, record retention for dispute resolution, handling of complaints, and protection of users and service operations.<br> - Personal information is used for authentication, purchase and payment of fees, and delivery of goods and services related to paid services.<br> - Personal information is used for marketing and promotion purposes, such as providing event information and participation opportunities, and providing advertising information.<br> - Personal information is used for analyzing service usage records, access frequency, statistical analysis of service usage, providing customized services and displaying advertisements based on the analysis, and more.<br> - Personal information is used to establish a secure service usage environment that allows users to use the service with peace of mind, ensuring security, privacy, and safety. </p><br> <p class="font16 titleText mbottom-05">3. Retention Period of Personal Information</p> <p class="subTitle font15 ml-04">As a general rule, uniBuzzy promptly destroys the personal information of users upon withdrawal of membership.<br>However, if the user has separately agreed to the retention period of personal information or if there is an obligation to retain information under applicable laws, uniBuzzy securely retains the personal information for the specified period.</p> <p class="subTitle font15 ml-04">The cases where the user has given consent to the retention period of personal information at the time of membership registration or service subscription are as follows:</p> <p class="mbottom-1 font15 mleft-1">- Prevention of fraudulent registration and use<br>Verification of mobile phone number for fraudulent users.</p> <p class="subTitle font15 ml-04">The cases where certain periods of information retention are prescribed by laws, such as the Act on Consumer Protection in Electronic Commerce, the Electronic Financial Transactions Act, and the Telecommunications Privacy Act, are as follows.<br>uniBuzzy retains the personal information in accordance with the provisions of the applicable laws during these periods and does not use the information for any other purposes.</p> <p class="mbottom-1 font15 mleft-1">- Records related to contracts or withdrawal of offers under the Act on Consumer Protection in Electronic Commerce: Retained for 5 years<br>Records related to payment of fees and supply of goods and services: Retained for 5 years<br>Records related to handling of consumer complaints or disputes: Retained for 3 years<br>- Records related to the distribution of electronic documents through certified electronic addresses: Retained for 10 years<br>- Login records under the Telecommunications Privacy Act: Retained for 3 months</p><br> <p class="font16 titleText mbottom-05">4. Right to Refuse Consent for Collection and Use of Personal Information</p> <p class="mbottom-5 mleft-1 font15">Users have the right to refuse consent for the collection and use of personal information. However, if you refuse to give consent to the collection and use of the minimum required personal information, i.e., the mandatory items, it may be difficult to complete the membership registration.</p>' }
      ],
      allSelected: false
    }
  },
  props: {
    pGoLoginPage: Function,
    pPartnerLoginYn: {}
  },
  methods: {
    checkedAll (checked) {
      this.agreeAll = checked
      this.agree[0] = checked
      this.agree[1] = checked
    },
    checkedOne (checked, index) {
      var checkedCnt = 0
      for (var i = 0; i < this.policyList.length; i++) {
        if (this.agree[i] === checked) {
          if (i === index) return
          checkedCnt += 1
        }
      }
      if (checkedCnt === this.policyList.length - 1) {
        this.agreeAll = checked
      } else {
        this.agreeAll = false
      }
    },
    goLoginPage () {
      if (this.agreeAll !== true) {
        return
      }
      localStorage.setItem('policiesOk', true)
      if (this.pPartnerLoginYn && this.pGoLoginPage) {
        this.pGoLoginPage()
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>
<style scoped>
.checkBox {
  flex-direction: row;
}
.policyHeaderWrap {
  box-sizing: border-box;
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: none !important;
}
.policyHeader {
  margin-top: 14px;
  line-height: 27px
}
.policyHeader p {
  color: #6768A7;
  font-weight: bold;
}
.policyContentsWrap {
  padding: 20px;
  height: calc(100vh - 150px);
  box-sizing: border-box;
  text-align: left;
}
.policyHeader .headerFont {
  line-height: 32px
}
.startBigBtn {
  background-color: #6768A7;
  margin-top: 10px;
  color:#ffff;
  height: 40px;
  box-sizing: border-box;
  padding: 5px 10px;
  width: 100%;
  border-radius: 5px;
  text-align: center;
}
.startBigBtn p {
  color:#ffff;
  text-decoration: none;
}
.checkboxDiv {
  display: flex;
  align-items: center;
  margin-top: 5px;
}
.policyBodyBox {
  height: calc(100% - 70px);
  overflow-y: scroll;
  border: 1px solid #ccc;
  padding: 10px 10px;
}

.policyBtnArea {
  width: 100%;
  height: 80px;
  margin-top: 10px;
  float: left;
}
.policyWrap {
  width: 100%;
  height: calc((100% - 190px)/2);
  min-height: 100px;
}
.mLeft-05 {
  margin-left: 5px;
}
</style>
