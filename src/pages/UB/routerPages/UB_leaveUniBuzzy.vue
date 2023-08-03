<i18n>
{
  "ko": {
    "MSG_ASK_LEAVE": "더알림을 탈퇴하시겠습니까?",
    "MSG_ASK_AGREE": "아래 내용을 읽고 동의해주세요.",
    "TITLE_UNIBUZZY_LEAVE": "더알림 회원 탈퇴 안내",
    "TITLE_UNIBUZZY_POLICY": "더알림 개인정보 이용약관",
    "MSG_AGREE": "동의합니다"
  },
  "en": {
    "MSG_ASK_LEAVE": "Are you sure to withdraw from uniBuzzy?",
    "MSG_ASK_AGREE": "Read and agree terms below",
    "TITLE_UNIBUZZY_LEAVE": "uniBuzzy Membership Withdrawal Information",
    "TITLE_UNIBUZZY_POLICY": "uniBuzzy Terms and Conditions of Use of Personal Information",
    "MSG_AGREE": "I agree"
  }
}
</i18n>
<template>
<div class="pagePaddingWrap leavePageWrap" style="padding-top: 0!important; height: calc(100% - 80px);">
  <popHeader :pClosePop="backClick" class="headerShadow" headerTitle="Withdrawal from an account"  />
  <leaveResultPop v-if="this.resultPopShowYn" @closeXPop="closeXPop"/>
  <div class="leaveContentsWrap">
    <p class="pointTitle">{{ $t('MSG_ASK_LEAVE') }}</p>
    <p class="title">{{ $t('MSG_ASK_AGREE') }}</p>
    <div class="guideBox">

      <p class= "mtop-2" >{{ $t('TITLE_UNIBUZZY_LEAVE') }}</p>
          <textarea class="guideTextWrap">[Terms and conditions]

Please check the information before applying for withdrawal.
After completing the withdrawal, you can re-enroll with the currently logged-in ID, but there is no record of use.
Even if a member withdraws, the member's personal information is kept for a certain period of time in accordance with the terms of service and the personal information handling policy.

- Notifications History
- Records of notifications, bulletin boards, and posts
- Records on the preparation and use of bulletin boards

※ For more information, please refer to the personal information handling policy on the site.
</textarea>
    </div>
    <div class="guideBox">
      <p class= "mtop-1" >{{$t('TITLE_UNIBUZZY_POLICY')}}</p>
      <textarea class="guideTextWrap">
Article 1 (Purpose)

The purpose of this Terms and Conditions of Use (hereinafter referred to as "Company") is to specify the terms and conditions of subscription and use of the uniBuzzy service (http://www.pushmsg.net or "Service") provided by the company between TeamPl Co., Ltd. (hereinafter referred to as "Company") and customers (hereinafter referred to as "Members").

Article 2 (Definition of Terms)

① The terms used in these Terms and Conditions are defined as follows.

- A 'member' refers to a user who agrees to these terms and conditions and uses the service.

- The term "use contract" refers to all contracts concluded between the company and its members in connection with the use of the service, including these terms and conditions.

- The term "social login" refers to a unique combination of letters and numbers identified by the company at the request of the member for the identification and service use of the member's use of the service.

- The term "terminal" refers to computer devices such as personal computers, PDAs, and mobile phones used by members to access services.

- The term "cancellation" refers to the cancellation of a contract for use by a company or member.

② Among the terms used in these terms and conditions, those not prescribed in paragraph (1) shall be in accordance with the relevant statutes and the guidance for each service, and otherwise shall be in accordance with general customs.

Article 3 (Effect of Terms and Conditions and Changes)

① These terms and conditions are disclosed online through uniBuzzy and take effect with the consent of the member and the consent of the company, and in the event of a reasonable reason, the company may amend them to the extent that it does not violate the relevant laws.
The revised terms and conditions shall take effect by making a notice through uniBuzzy in due course.

② Members should visit the uniBuzzy regularly to confirm any changes to the terms and conditions.
The company is not responsible for any damage to the member caused by not knowing the information on the changed terms and conditions.

③ Members may request membership withdrawal if they do not agree to the changed terms and conditions.

Article 4 (Criteria other than terms and conditions)

If necessary, the company may determine individual terms and conditions or operating principles for individual items in the service (hereinafter referred to as "service-specific guidance"), and if these terms and conditions conflict with the service-specific guidance, the service-specific guidance shall be applied first.

Article 5 (Establishment of a Use Contract)

① The use contract is established with the consent of the company for the user's consent to the user's use contract and the application for use.
② Consent to the use contract is expressed by pressing the "I agree" button on the application form at the time of application for use.

Article 6 (Application for Service Use)

① Users who wish to use the service by signing up as a member must provide all the information requested by the company (social login, name, email address, contact information, etc.).

②All members must provide their own information to use the service. Members who do not register their true information, such as stealing other people's information or registering false information, cannot claim any rights in relation to the use of the service and can be punished according to relevant laws.

③ Membership registration can only be signed up through their true information, and the company can check the information registered by the member.

Members shall actively cooperate with the company's confirmation measures, and if they fail to comply, the company may treat the information registered by the member as illegal.

④ The company can differentiate the use of members by dividing them by grade and dividing the usage time, number of use, service menu, etc.

Article 7 (Protection and Use of Personal Information)

① The company strives to protect the personal information of its members as prescribed by relevant laws and regulations. Regarding the protection and use of personal information, the relevant laws and company's personal information protection policy apply.

However, the company's privacy policy does not apply to linked sites other than the company's official site. In addition, members should thoroughly manage their passwords so that they are not exposed to others, and the company is not responsible for information exposed due to reasons attributable to members.

② The Company may provide the Member's personal information to third parties to the extent permitted by law in the following cases.

- When requested to provide information from an investigative agency or other government agency
- When necessary for information protection work, such as confirmation of fraud, including violation of laws or terms and conditions of a member
- If required by other laws

Article 8 (Acceptance and restriction of application for use)

① In principle, the company accepts the use of the service in accordance with the order of application for use under Articles 5 and 6, if there is no technical obstacle to the performance of the business.

② The company may withhold its consent in the following cases.

- In the case of an application for use without providing the person's true information

- Where an application is filed for the purpose of violating the law or hindering the well-being and order of society and good customs

- If you wish to use this service for improper use

- When a user who is in a competitive relationship with the service applies

- Where an application is made by a user whose contract of use has been terminated in violation of laws or terms and conditions

- If you apply in violation of all other regulations

③ If the application for the use of the service falls under any of the following subparagraphs, the company may withhold its consent until the grounds for restriction on consent are resolved.

- When the company does not have enough facilities

- In case of technical difficulties in the company

- If it is difficult to accept the use due to reasons attributable to other companies

④ If the customer applying for use is a minor prescribed by the relevant laws and regulations, the company may withhold consent as prescribed by the service-specific guidance.

⑤ The company may withdraw its consent to use if a reason under each subparagraph of paragraph (2) is found after the completion of the membership process.

Article 9 (Company Obligations)

① The company shall make the service available to the member on the desired service start date unless there are special circumstances.

② In order to provide continuous and stable service, the company shall repair or repair any failure or loss of facilities without delay unless there is an unavoidable reason.

③ The company establishes a security system to protect personal information and discloses and complies with the privacy policy.

④ If the company objectively recognizes that an opinion or complaint filed by a member is justified, it shall immediately process it through appropriate procedures. However, if it is difficult to process immediately, the reason and processing schedule must be notified to the member.

Article 10 (Duty of Members)

① When applying for membership or changing member information, a member shall fill out all matters with his/her true information based on facts, and shall not claim all rights related thereto if he/she registers false or other person's information.

② Members shall comply with the company's announcements, such as the terms and conditions, all regulations, notices, and other related laws and regulations, and shall not interfere with the company's business, damage the company's reputation, or damage others.

③ The member shall immediately notify the company of any changes in the terms of the contract, such as the address, contact number, or e-mail address.

④ A member may not engage in business activities using the service without prior consent from the company, and the company shall not be responsible for the results of such business activities. In addition, if a member damages the company due to such business activities, the member is obligated to compensate the company, and the company can claim damages from the member through restrictions on service use and due process.

⑤ A member shall not transfer or donate the right to use the service or other status under the contract of use to another person unless explicitly agreed by the company and shall not provide it as collateral.

⑥ A member shall not infringe on all rights, including the intellectual property rights of the company and third parties, or engage in any act falling under each item of Article 18.

Article 11 (Service hours)

①In principle, the use of the service shall be operated 24 hours a day, 24/7, unless there is any special problem with the company's work or technology. However, the company may suspend the service on the day or time specified by the company for regular system inspection, expansion and replacement, and the suspension of the service due to scheduled work is notified in advance through the uniBuzzy app.

②The Company may temporarily suspend all or part of the Services without prior notice in the event of unavoidable reasons such as urgent system checks, expansion and replacement, facility failures, congestion of service use, national emergencies, or power outages.

③The company may discontinue the provision of all or part of the service after prior notice to the member, if necessary for the operation of the service, such as service reorganization.

Article 12 (Notification of Members, etc.)

① Notification refers to articles, photos, various files and links sent by a member while using the service.

② In the event of damage or other problems to yourself or another person due to notification of a member registering for the service, the member shall be responsible for it, and the company shall not be responsible for it unless there are special circumstances.

③ The Company may take relevant measures such as temporary suspension of posting, modification, deletion, movement, or refusal of registration of notifications, etc. that fall under any of the following subparagraphs without the prior consent of the Member.

- If the content is to seriously insult other members or third parties or to damage their reputation

- When disseminating or linking information that violates public order and customs

- If the content encourages illegal copying or hacking

- If the content is objectively recognized as being related to a crime

- In the case of infringement of other rights, such as copyrights of other users or third parties

- Where the company determines that it does not conform to the nature of the service based on personal political judgment or religious views

- If it violates the company's notification principles or does not conform to the uniBuzzy nature

- Where it is deemed to be in violation of other relevant laws and regulations

Article 10 (Duty of Members)

④ The Company shall be honored by a third party for notification, etcIf a request for suspension of shipment is received due to damage or infringement of intellectual property rights, it may be temporarily suspended (transmitted), and if a lawsuit, agreement, or other decision of a related agency is made between the requestor and the notification registrant.

⑤ If the notification is temporarily suspended, the member who registered the notification can request the company to resend (resume transmission), and if the notification is not requested within three months from the date of suspension, the company can delete it.

Article 13 (Copyright to Notifications)

① Any notification or copyright or other intellectual property rights to a work created by the Company shall be vested in the Company.

② The copyright of notifications posted by the member within the service belongs to the member who posted them.

However, the Company may use the following notifications, to the extent reasonable, in accordance with the fair practices prescribed in the Copyright Act, free of charge, for the purpose of operating, exhibiting, transmitting, distributing, and promoting the Services.

- reproduction, modification, alteration, exhibition, transmission, distribution, and creation of edited works within the service to the extent that it does not impair the copyrightability of member notifications

- To provide, display, or promote members' notifications to service partners such as media and telecommunications companies.

However, in this case, the company does not provide the member's personal information other than the member's user ID without separate consent.

③ If the company intends to use a member's notification by means other than the preceding paragraph, it shall obtain prior consent from the member through telephone, fax, e-mail, etc.

④ If a member cancels the use contract, all notifications recorded in his or her account will be deleted.

However, this shall not apply to notifications that have been republished or reproduced by others, such as storage or inclusion, and notifications provided in combination with notifications of others.

Article 14 (Provision of Information)

① The company may provide various information to the member by e-mail, correspondence, mail, SMS, telephone, etc. that the member deems necessary to use the service.

② The company may collect additional personal information in accordance with relevant laws and regulations with the consent of the members for the purpose of improving services and introducing services to members.

Article 15 (Advertising and transactions with advertisers)

① Part of the service investment base that a company can provide services to its members comes from revenue from advertising. The member agrees with the advertisement that is exposed when using the service.

② The Company shall not be liable for losses and damages arising from the participation, communication, or transaction of members in the advertiser's promotional activities on or through the Service.

Article 16 (Change and Termination of Contract)

①When a member intends to terminate a user contract, the member himself/herself must cancel the subscription using the My Page menu in the service.

②When the company cancels the use contract, it cancels the membership registration in accordance with the uniBuzzy privacy policy. In this case, the member shall be notified, and if the company intends to terminate the use contract ex officio, the member shall be given an opportunity to explain before cancellation.

Article 17 (Restriction on Service Use)

The Company may restrict the use of the Service, initialize, terminate the Service Contract, or take other applicable measures if the Member violates the contents of Article 11 of this Agreement in terms of the use of the Service or falls under any of the following.

- Registering fraudulent information in member information, stealing other people's user IDs, passwords, and other personal information, or trading or providing user IDs with others

- Transfer, publish, e-mail, or otherwise disseminate information, sentences, figures, sounds, and videos that violate public order and customs, obscene content, or that may infringe on the honor or privacy of others

- Teasing or threatening other users, or causing continuous pain or inconvenience to specific users

- Change the company's client program, hack into the company's server, or arbitrarily select any or all of the website or published information without any special rights from the company the act of changing

- reproducing information obtained through the service for purposes other than the use of the service without prior consent of the company, using it for publication, broadcasting, etc., or providing it to a third party

- the management of the company, If it interferes with the normal operation of the service, such as impersonating an employee or related person or intentionally interfering with the service

- Where there is a request for correction from related public institutions, such as the Information and Communication Ethics Committee

-If you have not used the service for more than 3 months

- Violation of all laws and regulations, such as violation of all regulations set by the company, including the terms and conditions, or objectively determined to be associated with a crime

Article 18 (Compensation for damages)

① The company and the user shall compensate the other party if they intentionally or negligently cause damage to the other party in connection with the use of the service. Only,

② The Company shall not be liable for any damages in connection with the use of free services unless it violates the provisions of the Privacy Policy.

Article 19 (Exemption Clause)

① The Company is exempted from responsibility for providing the Services if it is unable to provide the Services due to natural disasters, wars, termination of the Services of the Terminals or other equivalent force majeure.

② The company is exempted from liability for damages caused by unavoidable reasons such as repair, replacement, regular inspection, and construction of service facilities.

③ The company shall not be liable for damages caused by a computer error of a member, or if the member causes damages due to poor personal information and e-mail address.

④ The Company shall not be liable for any loss or loss of revenue expected by the Member from the use of the Service and shall not be liable for any damages caused by the data obtained from the use of the Service.

⑤ The company shall not be responsible for the information, data, reliability, accuracy, etc. posted by the member in the service, nor shall it be liable to intervene in disputes arising through the service between the member and the third party.

⑥ The company is not obligated to review the members' notifications before registration or to check or review the contents of the notifications on a regular basis, and is not responsible for the results.

Article 20 (Notice)

① If the company notifies the member, the member can use the e-mail address registered with the company.

② If the company needs to notify a large number of unspecified members, it can replace the individual notification by posting it on the notice board for at least 7 days.

Article 21 (Trial Rights and Applicable Acts)

① Matters not specified in these terms and conditions shall be governed by relevant laws and regulations of the Republic of Korea, such as the Telecommunications Business Act.

② In the case of members of the company's flat-rate service and other paid service users, the company shall comply with the terms and conditions and policies separately set by the company regarding the service.

Supplementary Provisions

① These Terms and Conditions shall apply from February 10, 2022.
      </textarea>
    </div>
    <div style="text-align: center; margin-top: 1rem;"><input type="checkbox" name="agreeOut" v-model="agreeOut" id="agreeOut"><label  for="agreeOut">{{ $t('MSG_AGREE') }}</label></div>
    <gBtnSmall v-on:click="requestLeave()" :btnTitle="this.completeBtnTitle" style="width:100%; height:3rem; line-height:3rem; font-size:20px;" class="mtop-1" />
  </div>
<smallPop v-if="smallPopYn" :confirmText='confirmMsg' @no="smallPopYn=false"/>
</div>

</template>

<script>
import leaveResultPop from '../../../components/popup/info/Tal_leaveTheAlimResultPop.vue'
export default {
  data () {
    return {
      completeBtnTitle: 'Completed',
      resultPopShowYn: false,
      agreeOut: false,
      smallPopYn: false,
      confirmMsg: ''
    }
  },
  mounted () {
    this.$emit('changePageHeader', 'leave')
  },
  props: {
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    GE_LOCALE () {
      return this.$i18n.locale
    }
  },
  methods: {
    backClick () {
      this.$router.go(-1)
    },
    requestLeave () {
      if (this.agreeOut === true) {
        this.saveActAxiosFunc()
      } else {
        this.confirmMsg = '위 내용을 읽고 동의합니다 에 체크해주세요.'
        this.smallPopYn = true
      }
    },
    async saveActAxiosFunc () {
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.deleteUser',
        param: {
          userKey: this.GE_USER.userKey
        }
      })
      console.log(result)
      this.resultPopShowYn = true
      // if (result.data.result === true) {
      //   this.resultPopShowYn = true
      // }
    },
    closeXPop () {
      this.resultPopShowYn = false
      // this.$emit('closeXPop')
      // this.$store.commit('D_CHANNEL/MU_CLEAN_CHAN_LIST')
      // this.$store.commit('D_USER/MU_CLEAN_USER')
      // localStorage.setItem('loginYn', false)
      // localStorage.setItem('user', '')
      // localStorage.setItem('sessionUser', '')
      // this.$router.replace({ name: 'policies' })
      this.$UBLogOut()
      this.$router.replace({ name: 'login' })
    }
  },
  components: {
    leaveResultPop
  }
}
</script>
<style scoped>
.leaveContentsWrap .pointTitle{color: #6768A7; font-size: 16px; font-weight: bold; text-align: center;}
.leaveContentsWrap .title{color: #B8B8B8; font-size: 14px; font-weight: bold; text-align: center;}
.leaveContentsWrap{width: 100%; height: 80%; margin-bottom: 3rem; }
.leavePageWrap{display: flex; flex-direction: column; text-align: left; height: 100vh; overflow: hidden scroll;}
.guideText{color: #303030; font-size: 15px;}
.guideTextWrap{width: 100%; min-height: 180px; margin-top: 0.5rem; border: 1px solid #CFCFCF; padding: 0 0.7rem}
.guideBox{width: 100%; min-height: 80px; margin-top: 2rem;}
.guideBox p{color: #6768A7; font-size: 15px; font-weight: bold;}
input{margin-right: 0.5rem;}
label{color: #6768A7; font-weight: 15px;}

</style>
