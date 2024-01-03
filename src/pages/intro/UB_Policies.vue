<template>
  <div id="commonWrap" class="policyPageWrap" ref="commonWrap">
      <gPopHeader :headerTitle="headerTitle" :pClosePop="closeXPop" class="policyHeader"/>
      <div id="Uarea" v-if="mPolicyType === 'termsOfUse'" class="policy-01">
          <p class="font16 titleText mbottom-05">Effective Date: 2023-07-11</p>
          <p class="mbottom-1 font15 mleft-1">
            Welcome to ModuZoin! By using ModuZoin, you agree to be bound by these Terms of Use ("Terms"). Please read them carefully.<br><br>
          </p>
          <p class="font16 titleText mbottom-05">Description of ModuZoin</p>
          <p class="font16 mbottom-05 ml-04">ModuZoin is a Social Metaverse app designed for universities. It allows users to promote and communicate with their clubs, stay updated on school events, and engage in discussions within their university community.<br><br></p>
          <p class="subTitle font15 ml-04">① User-Generated Content</p>
          <p class="mbottom-1 font15 mleft-1">
              You are solely responsible for the content you generate and share on ModuZoin.<br><br>
          </p>
          <p class="subTitle font15 ml-04">② Guidelines and Rules</p>
          <p class="mbottom-1 font15 mleft-1">
              Respect others, refrain from illegal activities, and ensure content is appropriate and respectful.<br><br>
          </p>
          <p class="subTitle font15 ml-04">③ Intellectual Property</p>
          <p class="mbottom-1 font15 mleft-1">
            Respect intellectual property rights and attribute content to the original source when using and sharing it.<br><br>
          </p>
          <p class="subTitle font15 ml-04">④ Age Restrictions</p>
          <p class="mbottom-1 font15 mleft-1">
            ModuZoin is intended for use by university students or users who meet the minimum age requirement.<br><br>
          </p>
          <p class="subTitle font15 ml-04">⑤ User Responsibilities</p>
          <p class="mbottom-1 font15 mleft-1">
            Maintain the confidentiality and security of your ModuZoin account and ensure the accuracy and legality of your posted content.<br><br>
          </p>
          <p class="subTitle font15 ml-04">⑥ Termination</p>
          <p class="mbottom-1 font15 mleft-1">
            We reserve the right to terminate or suspend your access to ModuZoin at any time without prior notice.<br><br>
          </p>
          <p class="subTitle font15 ml-04">⑦ Disclaimer of Warranties</p>
          <p class="mbottom-1 font15 mleft-1">
            ModuZoin is provided "as-is" and we do not guarantee uninterrupted or error-free service.<br><br>
          </p>
          <p class="subTitle font15 ml-04">⑧ Limitation of Liability</p>
          <p class="mbottom-1 font15 mleft-1">
            We are not liable for any damages arising from your use of ModuZoin.<br><br>
          </p>
          <p class="subTitle font15 ml-04">⑨ Governing Law and Dispute Resolution: </p>
          <p class="mbottom-1 font15 mleft-1">
            These Terms are governed by the laws of United States, and any disputes shall be subject to the exclusive jurisdiction of United States courts.<br><br>
          </p>
          <p class="mbottom-1 font15 mleft-1">
            If you have any questions or concerns, please contact us at <b>ModuZoin@gmail.com</b>.<br><br>
            Thank you for using ModuZoin!
          </p>
    </div>
    <div id="Parea" v-else-if="mPolicyType === 'privacy'" class="policy-02">
      <p class="font16 titleText mbottom-05">Privacy Policy Statement for ModuZoin</p>
      <p class="mbottom-1 font16">At ModuZoin, we prioritize the privacy and security of our users' personal information. This Privacy Policy explains how we collect, use, and protect the individual data provided through our app. By using ModuZoin, you agree to the terms outlined in this policy.<br><br></p>

      <p class="font16 titleText mbottom-05">1. Collected Personal Information</p>
      <p class="ml-04 font15 mbottom-05">Users can use most of the services provided by ModuZoin, such as information search and news viewing, without signing up as a member. However, if users wish to use member-based services such as subscription and notifications, ModuZoin collects the minimum amount of personal information necessary for service usage.</p>
      <p class="subTitle font15 ml-04">The personal information collected by ModuZoin at the time of membership registration is as follows:</p>
      <p class="mbottom-1 font15 mleft-1">When registering as a member, the following items are collected as mandatory: 'social account integration information, name, date of birth, gender, mobile phone number, email.' If the user's date of birth entered indicates that they are under 14 years old, additional information about the legal guardian (legal guardian's name, date of birth, gender, duplicate registration confirmation information (DI), mobile phone number) is collected.</p>
      <p class="subTitle font15 ml-04">The following personal information is collected from users during the service usage process:</p>
      <p class="mbottom-1 font15 mleft-1">- Users can set profile information (nickname, profile picture) in member information or individual services. If no nickname is entered in the member information, a masked ID is automatically entered as the nickname.<br>- Additional personal information may be collected for individual services, event participation, and prize applications. If additional personal information is collected, the user will be informed of the 'items of personal information collected, purpose of collecting and using personal information, and retention period of personal information' at the time of collecting the personal information and consent will be obtained.</p>
      <p class="subTitle font15 ml-04">During the service usage process, IP addresses, cookies, service usage records, device information, and location information may be generated and collected.<br>In addition, images and voices may be collected in image and voice-based search services.</p>
      <p class="mbottom-1 font15 mleft-1">1) Information about users may be automatically generated and stored (collected) using automated methods during the service usage process,<br>2) The unique information of the user's device may be safely converted in a way that the original value cannot be identified and collected.<br>Location information may be collected during the service usage process. For location-based services provided by ModuZoin, detailed provisions are stipulated in the 'ModuZoin Location Information Usage Agreement'.<br>Based on the linkage with personal information, the collected information may or may not be considered as personal information.<br><br></p>
      <p class="font16 titleText mbottom-05">2. Use of Collected Personal Information</p>
      <p class="mbottom-1 font15">ModuZoin and its related services (including mobile web/apps) use personal information solely for the following purposes: member management, service development/provision and improvement, establishment of a safe internet environment, and more.</p>
      <p class="mbottom-1 font15 mleft-1">
          - Personal information is used for member management purposes, such as verifying the intention of membership registration, confirming age and obtaining consent from legal guardians, verifying the identity of users and legal guardians, identifying users, and confirming the intention of membership withdrawal.<br>
          - In addition to providing existing services (including advertisements), personal information is used for discovering new service elements, improving existing services, conducting demographic analysis, analyzing service visit and usage records, forming relationships between users based on personal information and interests, and providing customized services based on subscriptions and interests.<br>
          - Personal information is used for measures to prevent and sanction acts that hinder the smooth operation of services, including restrictions on users who violate laws and ModuZoin's Terms of Service, prevention of account theft and fraudulent transactions, notification of amendments to terms and conditions, record retention for dispute resolution, handling of complaints, and protection of users and service operations.<br>
          - Personal information is used for authentication, purchase and payment of fees, and delivery of goods and services related to paid services.<br>
          - Personal information is used for marketing and promotion purposes, such as providing event information and participation opportunities, and providing advertising information.<br>
          - Personal information is used for analyzing service usage records, access frequency, statistical analysis of service usage, providing customized services and displaying advertisements based on the analysis, and more.<br>
          - Personal information is used to establish a secure service usage environment that allows users to use the service with peace of mind, ensuring security, privacy, and safety.
      </p><br>
      <p class="font16 titleText mbottom-05">3. Retention Period of Personal Information</p>
      <p class="subTitle font15 ml-04">As a general rule, ModuZoin promptly destroys the personal information of users upon withdrawal of membership.<br>However, if the user has separately agreed to the retention period of personal information or if there is an obligation to retain information under applicable laws, ModuZoin securely retains the personal information for the specified period.</p>
      <p class="subTitle font15 ml-04">The cases where the user has given consent to the retention period of personal information at the time of membership registration or service subscription are as follows:</p>
      <p class="mbottom-1 font15 mleft-1">- Prevention of fraudulent registration and use<br>Verification of mobile phone number for fraudulent users or DI (legal guardian's DI in the case of individuals under 14 years old): Retained for 6 months from the date of withdrawal<br>Mobile phone number (one-way encrypted hash processing that cannot be decrypted): Retained for 6 months from the date of withdrawal<br>Mobile phone number: Retained for up to 1 year from the date of registration/modification/deletion request</p>
      <p class="subTitle font15 ml-04">The cases where certain periods of information retention are prescribed by laws, such as the Act on Consumer Protection in Electronic Commerce, the Electronic Financial Transactions Act, and the Telecommunications Privacy Act, are as follows.<br>ModuZoin retains the personal information in accordance with the provisions of the applicable laws during these periods and does not use the information for any other purposes.</p>
      <p class="mbottom-1 font15 mleft-1">- Records related to contracts or withdrawal of offers under the Act on Consumer Protection in Electronic Commerce: Retained for 5 years<br>Records related to payment of fees and supply of goods and services: Retained for 5 years<br>Records related to handling of consumer complaints or disputes: Retained for 3 years<br>- Records related to the distribution of electronic documents through certified electronic addresses: Retained for 10 years<br>- Login records under the Telecommunications Privacy Act: Retained for 3 months</p><br>
      <p class="font16 titleText mbottom-05">4. Right to Refuse Consent for Collection and Use of Personal Information</p>
      <p class="mbottom-5 mleft-1 font15">Users have the right to refuse consent for the collection and use of personal information. However, if you refuse to give consent to the collection and use of the minimum required personal information, i.e., the mandatory items, it may be difficult to complete the membership registration.</p>

    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.mPolicyType = this.$route.params.type
    if (this.mPolicyType === 'termsOfUse') {
      this.headerTitle = 'Terms Of Use'
    } else if (this.mPolicyType === 'privacy') {
      this.headerTitle = 'Privacy'
    }
  },
  data () {
    return {
      headerTitle: '',
      mPolicyType: ''
    }
  },
  props: {
    pPolicyType: {},
    pClosePolicyPop: Function
  },
  mounted () {
    this.settingPop()
  },
  computed: {
    pageUpdate () {
      return this.$store.getters['UB_HISTORY/hUpdate']
    },
    history () {
      return this.$store.getters['UB_HISTORY/hStack']
    }
  },
  watch: {
    pageUpdate () {
      if (this.history[this.history.length - 1] === 'PolicyPop') {
        this.closeXPop()
      }
    }
  },
  beforeUnmount () {
    this.$checkDeleteHistory('PolicyPop')
  },
  methods: {
    hasHistory () {
      return window.history.length > 1
    },
    settingPop () {
      this.$addHistoryStack('PolicyPop')
      if (this.pPolicyType === 'termsOfUse') { this.headerTitle = 'Terms of Use' } else if (this.pPolicyType === 'privacy') { this.headerTitle = 'Privacy Policy' }
    },
    closeXPop (pThisPopN) { // 내 팝업 닫기
      if (this.hasHistory()) {
        this.$router.go(-1)
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
@import url(../../assets/css/common.css);
p{color: #2c3e50;}
.policyPageWrap{position: absolute;width: 100%;height: 100vh;top: 0;z-index: 999999; background: #FFFFFF; left: 0; padding-bottom: 30px;}
.policyHeader{box-shadow: 0px 7px 9px -9px #00000036;}
.policy-01{margin-top: 70px; text-align: left; overflow-y: auto; height: calc(100% - 60px); padding: 0.5rem 1rem;}
.policy-02{margin-top: 70px; text-align: left; overflow-y: auto; height: calc(100% - 60px); padding: 0.5rem 1rem;}
/* .policy-01{margin-top: 70px; text-align: left; padding: 0.5rem 1rem; overflow-y: auto; height: calc(100% - 60px)}
.policy-02{margin-top: 70px; text-align: left; padding: 0.5rem 1rem; overflow-y: auto; height: calc(100% - 60px) } */
.dNone{display: none;}
.titleText{font-weight: bold;}
.subTitle{font-weight: bold;}

</style>
