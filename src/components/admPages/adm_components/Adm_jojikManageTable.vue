<template>
    <div class="w100P manageInfos">
      <div class="w100P manageAreaTitle">
        <p class="font15 fontBold">권한 관리</p>
        <div class="managerBtns">
          <div class="font25">
            <span class="cursorP font13">⬆️</span>
            <span class="cursorP font13">⬇️</span>
          </div>
          <div>
            <span v-if="addManagerTypeYn === false" @click="addManage" class="btnAdd cursorP font12">추가</span>
            <span v-if="addManagerTypeYn === true" @click="saveAuths(null, null)" class="btnAdd cursorP font12">저장</span>
            <span class="btnDel cursorP font12">삭제</span>
            <span class="btnEdit cursorP font12">수정</span>
          </div>
        </div>
      </div>

  <table class="w100P manageTable">
    <thead>
      <th style="width:30px;"></th>
      <th style="width:25px;">No</th>
      <th style="width:48%'">권한명</th>
      <th style="width:17%;">유저관리</th>
      <th style="width:15%;">조직관리</th>
      <th style="width:15%;">전문가</th>
    </thead>

    <tbody>
        <tr v-for="(auth, index) in pSelectedOrg.authList" :key="index">
            <td>
              <input type="checkbox" />
            </td>
            <td>{{ index + 1 }}</td>
            <td class="name" @click="openUserInfo(auth.authName)">{{ auth.authName ? auth.authName : ''}} ({{ auth.count ? auth.count + '명': '0명' }})</td>
            <td>
              <input type="checkbox" class="mngUser" @click="saveAuths(auth, 'user')" :checked="auth.mngUserYn"/>
            </td>
            <td>
              <input type="checkbox" class="mngOrg" @click="saveAuths(auth, 'org')" :checked="auth.mngOrgYn"/>
            </td>
            <td>
              <input type="checkbox" class="mExpert" @click="saveAuths(auth, 'expert')" :checked="auth.sSub && auth.sSub === 'E'"/>
            </td>
        </tr>
        <tr v-if="addManagerTypeYn === true">
            <td>
              <p class="cursorP" @click="closeAddManage">X</p>
            </td>
            <td>{{ pSelectedOrg.authList.length + 1 }}</td>
            <td class="name">
              <input type="text" v-model="newAuthName" style="width:50%; min-width:70px;"/>
            </td>
            <td>
              <input type="checkbox" v-model="mNewMngOrg"/>
            </td>
            <td>
              <input type="checkbox" v-model="mNewMngUser"/>
            </td>
            <td>
              <input type="checkbox" v-model="mNewExpert"/>
            </td>
        </tr>
    </tbody>
  </table>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    pPageData: {},
    pSelectedOrg: {},
    pGE_USER: {}
  },
  created () {
    console.log('jojikManageTable pPageData', this.pPageData)
    console.log('jojikManageTable pSelectedOrg', this.pSelectedOrg)
  },
  data () {
    return {
      addManagerTypeYn: false,
      mMngOrg: false,
      mMngUser: false,
      mNewMngOrg: false,
      mNewMngUser: false,
      mNewExpert: false,
      mExpert: false,
      dispName: '회원님',
      newAuthName: ''
    }
  },
  methods: {
    addManage () {
      this.addManagerTypeYn = true
    },
    closeAddManage () {
      this.addManagerTypeYn = false
    },
    openUserInfo (param) {
      this.$emit('openUserInfo', param)
    },
    async saveAuths (auth, type) {
      const paramSet = {}
      if (!auth && !type) { // 새 조직
        if (this.newAuthName === '') return
        console.log('새 조직을 만듭니다.')
        paramSet.orgKey = this.pSelectedOrg.orgKey
        paramSet.authName = this.newAuthName
        paramSet.authDispName = this.dispName
        paramSet.mngOrgYn = this.mNewMngOrg
        paramSet.mngUserYn = this.mNewMngUser
        paramSet.creUserKey = this.GE_USER.userKey
        if (this.mExpert === true) {
          paramSet.ssub = 'E'
        }
      } else if (auth && type) {
        console.log('기존 조직을 수정합니다.')
        if (auth.authKey) { // 수정이면
          paramSet.authKey = auth.authKey
        }
        paramSet.orgKey = this.pSelectedOrg.orgKey
        paramSet.authName = auth.authName
        paramSet.authDispName = this.dispName
        paramSet.creUserKey = this.GE_USER.userKey
        if (auth && type === 'user') { // 유저 권한 수정
          if (auth.mngUserYn === true || auth.mngUserYn === 1) {
            paramSet.mngUserYn = false
          } else if (auth.mngUserYn === false || auth.mngUserYn === 0) {
            paramSet.mngUserYn = true
          }
        } else if (auth && type === 'org') { // 조직 권한 수정
          paramSet.mngOrgYn = !auth.mngOrgY
          if (auth.mngOrgYn === true || auth.mngOrgYn === 1) {
            paramSet.mngOrgYn = false
          } else if (auth.mngOrgYn === false || auth.mngOrgYn === 0) {
            paramSet.mngOrgYn = true
          }
        } else if (auth && type === 'expert') { // 전문가 여부 수정
          console.log('전문가를 수정합니다.')
          if (paramSet.ssub && paramSet.ssub === 'E') {
            console.log('원래 전문가였다.')
            paramSet.ssub = null
          } else { console.log('원래 전문가가 아니었다.'); paramSet.ssub = 'E' }
        }
      }
      console.log('paramSet', paramSet)

      const result = await axios.post('/sUniB/tp.saveOrgAuth', { orgAuth: paramSet }, { withCredentials: true, headers: { UserAuthorization: this.GE_USER.userToken, Authorization: this.$APP_CONFIG.appToken } })
      console.log('result', result)
      if (!auth && !type) {
        location.reload()
      }
    }
  },
  watch: {
    mMngOrg: {
      handler (value) {
        console.log('mMngOrg', value)
      }
    },
    mMngUser: {
      handler (value) {
        console.log('mMngUser', value)
      }
    }
  },
  computed: {
    GE_USER () {
      if (this.pGE_USER) {
        return this.pGE_USER
      } else {
        return this.$store.getters['D_USER/GE_USER']
      }
    }
  }
}
</script>

<style scoped>

.manageInfos{
  padding-top:30px;
  height:auto;
}
.manageAreaTitle{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding-bottom:5px;
  border-bottom:1px solid #ccc;
}
.managerBtns{
  width:auto;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:1rem;
}
.btnDel, .btnAdd, .btnEdit{
  padding:5px 10px;
  border:1px solid #ccc;
  background-color:#fff;
  margin-right:0.3rem;

}
.btnDel{
  background-color:#eee !important;
}

thead th{
  padding:10px 0;
  border-bottom:1px solid #e8e8e8;
  font-size:13px;
}
tbody td{
  padding:10px 0;
  font-size:13px;
}
td.name{
  text-align:left !important;
  padding-left:5px;
}
</style>
